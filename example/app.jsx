/* global document, React, ReactDOM */

import MultiselectTwoSides from '../index.jsx';

require('../style.css');
require('./style.css');

const Checkbox = React.createClass({
	propTypes: {
		label: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
		value: React.PropTypes.bool.isRequired,
		disabled: React.PropTypes.bool,
		onChange: React.PropTypes.func.isRequired
	},

	handleChange(e) {
		this.props.onChange(e);
	},

	render() {
		const {label, name, value, disabled} = this.props;

		return (
			<label>
				<input
					onChange={this.handleChange}
					name={name}
					checked={value}
					type="checkbox"
					disabled={disabled}
					/>
				{label}
			</label>
		);
	}
});

const App = React.createClass({
	getInitialState() {
		return {
			options: [
				{name: 'Foo', value: 0, id: 0},
				{name: 'Bar', value: 1, id: 1},
				{name: 'Baz', value: 2, id: 2, disabled: true},
				{name: 'Qux', value: 3, id: 3},
				{name: 'Quux', value: 4, id: 4},
				{name: 'Corge', value: 5, id: 5},
				{name: 'Grault', value: 6, id: 6},
				{name: 'Garply', value: 7, id: 7},
				{name: 'Waldo', value: 8, id: 8},
				{name: 'Fred', value: 9, id: 9},
				{name: 'Plugh', value: 10, id: 10},
				{name: 'Xyzzy', value: 11, id: 11},
				{name: 'Thud', value: 12, id: 12}
			],
			value: [0, 3, 5, 9],
			settings: [
				{
					label: 'Show controls',
					name: 'showControls',
					value: true
				},
				{
					label: 'Searchable',
					name: 'searchable',
					value: true
				},
				{
					label: 'Clearable',
					name: 'clearable',
					value: true
				},
				{
					label: 'Disabled',
					name: 'disabled',
					value: false
				}
			]
		};
	},

	handleChange(value) {
		this.setState({value});
	},

	handleChangeSetting(e) {
		const name = e.target.name;

		this.setState(state => {
			const setting = this.getSettingByName(state, name);
			const newValue = !setting.value;
			setting.value = newValue;

			if (name === 'searchable') {
				this.getSettingByName(state, 'clearable').disabled = !newValue;
			}

			return state;
		});
	},

	getSettingByName(state, name) {
		let result;

		for (const setting of state.settings) {
			if (setting.name === name) {
				result = setting;
				continue;
			}
		}

		return result;
	},

	render() {
		const {options, value, settings} = this.state;
		const selectedCount = value.length;
		const availableCount = options.length - selectedCount;
		const s = settings.reduce((a, b) => {
			a[b.name] = b.value;
			return a;
		}, {});

		return (
			<div className="">
				<p className="">
					{settings.map(setting => {
						return (
							<Checkbox
								key={setting.name}
								onChange={this.handleChangeSetting}
								{...setting}
								/>
						);
					})}
				</p>

				<MultiselectTwoSides
					{...{options, value}}
					className="msts_theme_example"
					onChange={this.handleChange}
					availableHeader="Available"
					availableFooter={`Available: ${availableCount}`}
					selectedHeader="Selected"
					selectedFooter={`Selected: ${selectedCount}`}
					placeholder="Filter…"
					{...s}
					/>
			</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'));
