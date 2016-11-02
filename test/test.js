import test from 'ava';
import React from 'react';
import {mount, shallow} from 'enzyme';
import C from '../';

test('render component block', t => {
	const wrapper = shallow(<C/>);
	t.true(wrapper.hasClass('msts'));
	t.is(wrapper.type('div'), 'div');
});

test('allow to add custom class name', t => {
	const props = {
		className: 'foo bar'
	};
	const wrapper = shallow(<C {...props}/>);
	t.true(wrapper.hasClass('msts foo bar'));
});

test('render children blocks', t => {
	const props = {
	};
	const wrapper = shallow(<C {...props}/>);
	t.true(wrapper.find('.msts__side').length === 2);

	const sideAvailable = wrapper.find('.msts__side_available');
	t.is(sideAvailable.type(), 'div');
	t.true(sideAvailable.hasClass('msts__side msts__side_available'));

	const sideSelected = wrapper.find('.msts__side_selected');
	t.is(sideSelected.type(), 'div');
	t.true(sideSelected.hasClass('msts__side msts__side_selected'));
});

test('render list items', t => {
	const props = {
		options: [
			{label: 'Foo', value: 0},
			{label: 'Bar', value: 1}
		],
		value: [1]
	};
	const wrapper = mount(<C {...props}/>);
	const items = wrapper.find('.msts__list-item');
	t.is(items.get(0).innerHTML, 'Foo');
	t.is(items.get(1).innerHTML, 'Bar');
});

test('render controls', t => {
	const props = {
		showControls: true
	};
	const wrapper = shallow(<C {...props}/>);
	const items = wrapper.find('.msts__side_controls');
	t.is(items.type(), 'div');
	t.true(items.hasClass('msts__side msts__side_controls'));
});

test('dont render controls by default', t => {
	const props = {};
	const wrapper = shallow(<C {...props}/>);
	const items = wrapper.find('.msts__side_controls');
	t.is(items.length, 0);
});

test('render filter', t => {
	const props = {
		searchable: true
	};
	const wrapper = shallow(<C {...props}/>);
	const items = wrapper.find('.msts__subheading');
	t.is(items.type(), 'div');
	t.true(items.hasClass('msts__subheading'));
});

test('dont render filter by default', t => {
	const props = {};
	const wrapper = shallow(<C {...props}/>);
	const items = wrapper.find('.msts__subheading');
	t.is(items.length, 0);
});

test('render filter clear', t => {
	const props = {
		searchable: true
	};
	const wrapper = mount(<C {...props}/>);
	const filters = wrapper.find('.msts__filter-input');

	t.is(wrapper.find('.msts__filter-clear').length, 0, 'dont render if filter is empty');

	filters.get(0).value = 'foo';
	filters.at(0).simulate('change');
	t.is(wrapper.find('.msts__filter-clear').length, 1);

	filters.get(1).value = 'foo';
	filters.at(1).simulate('change');
	t.is(wrapper.find('.msts__filter-clear').length, 2);

	const filterClear = wrapper.find('.msts__filter-clear');
	t.is(filterClear.length, 2);
	t.is(filterClear.at(0).type(), 'span');
	t.true(filterClear.at(0).hasClass('msts__filter-clear'));
});

test('dont render filter clear if `clearable` is false', t => {
	const props = {
		searchable: true,
		clearable: false
	};
	const wrapper = mount(<C {...props}/>);
	const filters = wrapper.find('.msts__filter-input');

	filters.get(0).value = 'foo';
	filters.at(0).simulate('change');
	t.is(wrapper.find('.msts__filter-clear').length, 0);
});

test('`disabled`: disable controls', t => {
	const props = {
		showControls: true,
		disabled: true,
		options: [
			{label: 'Foo', value: 0},
			{label: 'Bar', value: 1}
		],
		value: [1]
	};
	const wrapper = mount(<C {...props}/>);
	const controls = wrapper.find('.msts__control');

	t.is(controls.get(0).disabled, true);
	t.is(controls.get(1).disabled, true);
});

test('`disabled`: disable filter', t => {
	const props = {
		searchable: true,
		disabled: true
	};
	const wrapper = mount(<C {...props}/>);
	const filters = wrapper.find('.msts__filter-input');

	t.is(filters.get(0).disabled, true);
	t.is(filters.get(1).disabled, true);

	filters.get(0).value = 'foo';
	filters.at(0).simulate('change');
	filters.get(1).value = 'foo';
	filters.at(1).simulate('change');

	t.is(wrapper.find('.msts__filter-clear').length, 0, 'dont render clear buttons');
});

test('`disabled`: disable component', t => {
	const props = {
		disabled: true
	};
	const wrapper = shallow(<C {...props}/>);
	t.true(wrapper.hasClass('msts msts_disabled'));
});

test('`disabled`: disable handle', t => {
	let isChanged = false;
	const props = {
		disabled: true,
		options: [
			{label: 'Foo', value: 0}
		],
		onChange() {
			isChanged = true;
		}
	};
	const wrapper = mount(<C {...props}/>);
	const items = wrapper.find('.msts__list-item');
	items.simulate('click');
	t.false(isChanged);
});

test('`disabled`: disable option', t => {
	let isChanged = false;
	const props = {
		options: [
			{label: 'Foo', value: 0, disabled: true}
		],
		onChange() {
			isChanged = true;
		}
	};
	const wrapper = mount(<C {...props}/>);
	const items = wrapper.find('.msts__list-item');
	items.simulate('click');
	t.false(isChanged);
	t.true(items.hasClass('msts__list-item'));
	t.true(items.hasClass('msts__list-item_disabled'));
});

test('dont select disabled option by select all', t => {
	let value = [];
	const props = {
		showControls: true,
		options: [
			{label: 'Foo', value: 0, disabled: true},
			{label: 'Bar', value: 1}
		],
		onChange(newValue) {
			value = newValue;
		}
	};
	const wrapper = mount(<C {...props}/>);
	const selectAll = wrapper.find('.msts__control_select-all');
	selectAll.simulate('click');
	t.deepEqual(value, [1]);
});

test('prop clearFilterText', t => {
	const props = {
		searchable: true,
		clearFilterText: 'Foo'
	};
	const wrapper = mount(<C {...props}/>);
	const filters = wrapper.find('.msts__filter-input');

	filters.get(0).value = 'foo';
	filters.at(0).simulate('change');
	filters.get(1).value = 'foo';
	filters.at(1).simulate('change');

	const filterClear = wrapper.find('.msts__filter-clear');
	t.is(filterClear.get(0).title, 'Foo');
	t.is(filterClear.get(1).title, 'Foo');
});

test('prop selectAllText and deselectAllText', t => {
	const props = {
		showControls: true,
		selectAllText: 'Foo',
		deselectAllText: 'Bar'
	};
	const wrapper = mount(<C {...props}/>);

	const selectAll = wrapper.find('.msts__control_select-all');
	t.is(selectAll.get(0).title, 'Foo');

	const deselectAll = wrapper.find('.msts__control_deselect-all');
	t.is(deselectAll.get(0).title, 'Bar');
});

test('prop labelKey and valueKey', t => {
	let value = [];
	const props = {
		labelKey: 'foo',
		valueKey: 'bar',
		options: [
			{foo: 'Foo', bar: 3},
			{foo: 'Bar', bar: 4}
		],
		value: [4],
		onChange(newValue) {
			value = newValue;
		}
	};
	const wrapper = mount(<C {...props}/>);
	const items = wrapper.find('.msts__list-item');

	t.is(items.length, 2);
	t.is(items.get(0).innerHTML, 'Foo');

	items.at(0).simulate('click');
	t.deepEqual(value, [4, 3]);
});

test('prop labelKey and valueKey controls', t => {
	let value = [];
	const props = {
		labelKey: 'foo',
		valueKey: 'bar',
		showControls: true,
		options: [
			{foo: 'Foo', bar: 3},
			{foo: 'Bar', bar: 4}
		],
		value: [4],
		onChange(newValue) {
			value = newValue;
		}
	};
	const wrapper = mount(<C {...props}/>);

	const selectAll = wrapper.find('.msts__control_select-all');
	selectAll.at(0).simulate('click');
	t.deepEqual(value, [3, 4]);

	const deselectAll = wrapper.find('.msts__control_deselect-all');
	deselectAll.at(0).simulate('click');
	t.deepEqual(value, []);
});

test('prop labelKey and valueKey filterAvailable', t => {
	const props = {
		labelKey: 'foo',
		valueKey: 'bar',
		searchable: true,
		options: [
			{foo: 'Foo', bar: 3}
		]
	};
	const wrapper = mount(<C {...props}/>);
	const filters = wrapper.find('.msts__filter-input');

	t.is(wrapper.find('.msts__list-item').length, 1);

	filters.get(0).value = 'f';
	filters.at(0).simulate('change');
	t.is(wrapper.find('.msts__list-item').length, 1);

	filters.get(0).value = 'fb';
	filters.at(0).simulate('change');
	t.is(wrapper.find('.msts__list-item').length, 0);
});

test('prop labelKey and valueKey filterSelected', t => {
	const props = {
		labelKey: 'foo',
		valueKey: 'bar',
		searchable: true,
		options: [
			{foo: 'Foo', bar: 3}
		],
		value: [3]
	};
	const wrapper = mount(<C {...props}/>);

	t.is(wrapper.find('.msts__list-item').length, 1);

	const filters = wrapper.find('.msts__filter-input');

	filters.get(1).value = 'f';
	filters.at(1).simulate('change');
	t.is(wrapper.find('.msts__list-item').length, 1, '`f`');

	filters.get(1).value = 'fb';
	filters.at(1).simulate('change');
	t.is(wrapper.find('.msts__list-item').length, 0, '`fb`');
});

test('limit list', t => {
	let isChanged = false;
	const props = {
		options: [
			{label: 'Foo', value: 0},
			{label: 'Bar', value: 1},
			{label: 'Baz', value: 2},
			{label: 'Qux', value: 3},
			{label: 'Quux', value: 4}
		],
		limit: 3,
		value: [0, 1, 2],
		onChange() {
			isChanged = true;
		}
	};
	const wrapper = mount(<C {...props}/>);
	const items = wrapper.find('.msts__list-item');

	items.at(0).simulate('click');

	t.is(items.at(0).props().className, 'msts__list-item msts__list-item_disabled');
	t.is(items.at(0).text(), 'Qux');
	t.is(items.at(1).props().className, 'msts__list-item msts__list-item_disabled');
	t.is(items.at(1).text(), 'Quux');
	t.false(isChanged);
});

test('limit list selectall', t => {
	let value = [];
	const props = {
		showControls: true,
		options: [
			{label: 'Foo', value: 0},
			{label: 'Bar', value: 1, disabled: true},
			{label: 'Baz', value: 2},
			{label: 'Qux', value: 3},
			{label: 'Quux', value: 4}
		],
		value: [4],
		limit: 3,
		onChange(newValue) {
			value = newValue;
		}
	};
	const wrapper = mount(<C {...props}/>);
	const selectAll = wrapper.find('.msts__control_select-all');
	selectAll.simulate('click');
	t.deepEqual(value, [0, 2, 4]);
});
