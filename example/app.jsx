/* global document, React, ReactDOM */

import MultiselectTwoSides from '../index.jsx';

require('../style.styl');
require('./style.styl');

const App = React.createClass({
	getInitialState() {
		return {
			options: [
				{name: 'Foo', value: 0, id: 0},
				{name: 'Bar', value: 1, id: 1},
				{name: 'Baz', value: 2, id: 2},
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
			value: [0, 3, 5, 6, 9]
		};
	},

	handleChange(value) {
		this.setState({value});
	},

	render() {
		return (
			<div className="msts_theme_example">
				<MultiselectTwoSides
					{...this.state}
					onChange={this.handleChange}
					/>
			</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'));
