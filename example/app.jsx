/* global document React ReactDOM */
/* eslint react/forbid-component-props: 0 */

import MultiselectTwoSides from '../index.jsx';

require('../style.css');
require('./style.css');

const Checkbox = React.createClass({
	propTypes: {
		disabled: React.PropTypes.bool,
		label: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		value: React.PropTypes.bool.isRequired
	},

	handleChange(e) {
		this.props.onChange(e);
	},

	render() {
		const {
			disabled,
			label,
			name,
			value: checked
		} = this.props;

		return (
			<label>
				<input
					onChange={this.handleChange}
					type="checkbox"
					{...{
						checked,
						disabled,
						name
					}}
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
				{label: 'Foo', value: 0},
				{label: 'Bar', value: 1},
				{label: 'Baz', value: 2, disabled: true},
				{label: 'Qux', value: 3},
				{label: 'Quux', value: 4},
				{label: 'Corge', value: 5},
				{label: 'Grault', value: 6},
				{label: 'Garply', value: 7},
				{label: 'Waldo', value: 8},
				{label: 'Fred', value: 9},
				{label: 'Plugh', value: 10},
				{label: 'Xyzzy', value: 11},
				{label: 'Thud', value: 12}
			],
			value: [0, 3, 9],
			highlight: [5, 8, 9],
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
				},
				{
					label: 'Limit',
					name: 'limit',
					value: 5
				}
			]
		};
	},

	handleChange(value) {
		this.setState({value});
	},

	handleChangeSetting(e) {
		const {
			name,
			value
		} = e.target;

		this.setState(state => {
			const setting = this.getSettingByName(state, name);
			const newValue = typeof setting.value === 'boolean' ? !setting.value : parseInt(value, 10);
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
		const {
			highlight,
			options,
			settings,
			value
		} = this.state;
		const selectedCount = value.length;
		const availableCount = options.length - selectedCount;
		const s = settings.reduce((a, b) => {
			a[b.name] = b.value;
			return a;
		}, {});

		return (
			<div>
				<p>
					{settings.map(setting => {
						if (typeof setting.value === 'boolean') {
							return (
								<Checkbox
									key={setting.name}
									onChange={this.handleChangeSetting}
									{...setting}
									/>
							);
						} else if (typeof setting.value === 'number') {
							return (
								<label
									key={setting.name}
									>
									{` ${setting.label}: `}

									<input
										onChange={this.handleChangeSetting}
										type="number"
										min="0"
										{...setting}
										/>
								</label>
							);
						}

						return null;
					})}
				</p>

				<MultiselectTwoSides
					className="msts_theme_example"
					onChange={this.handleChange}
					availableHeader="Available"
					availableFooter={`Available: ${availableCount}`}
					selectedHeader="Selected"
					selectedFooter={`Selected: ${selectedCount}`}
					placeholder="Filter…"
					{...{
						options,
						highlight,
						value
					}}
					{...s}
					/>
			</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'));
