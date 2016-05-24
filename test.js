import test from 'ava';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import C from './';

test.beforeEach(() => {
	global.document = jsdom.jsdom();
	global.window = global.document.defaultView;
});

test.afterEach(() => {
	delete global.document;
	delete global.window;
});

test(t => {
	const result = createComponent(C);

	t.is(result.props.className, 'msts');
	t.is(result.type, 'div');
});

test('allow to add custom class name', t => {
	const props = {
		className: 'foo bar'
	};
	const result = createComponent(C, props);

	t.is(result.props.className, 'msts foo bar');
});

test('render childrens', t => {
	const props = {};
	const result = renderIntoDocument(props);

	const dec = getSideAvailable(result);
	t.is(dec.nodeName, 'DIV');
	t.is(dec.className, 'msts__side msts__side_available');

	const inc = getSideSelected(result);
	t.is(inc.nodeName, 'DIV');
	t.is(inc.className, 'msts__side msts__side_selected');
});

test('render controls', t => {
	const props = {
		showControls: true
	};
	const result = renderIntoDocument(props);

	const dec = getElem(result, 'msts__side_controls');
	t.is(dec.nodeName, 'DIV');
	t.is(dec.className, 'msts__side msts__side_controls');
});

test('dont render controls by default', t => {
	const props = {};
	const result = renderIntoDocument(props);

	t.throws(() => getElem(result, 'msts__side_controls'));
});

test('render filter', t => {
	const props = {
		searchable: true
	};
	const result = renderIntoDocument(props);

	const dec = getElem(result, 'msts__subheading');
	t.is(dec.nodeName, 'DIV');
	t.is(dec.className, 'msts__subheading');
});

test('dont render filter by default', t => {
	const props = {};
	const result = renderIntoDocument(props);

	t.throws(() => getElem(result, 'msts__subheading'));
});

// Shallow renderer
function createComponent(component, props = {}) {
	const shallowRenderer = ReactTestUtils.createRenderer();
	shallowRenderer.render(React.createElement(component, props));
	return shallowRenderer.getRenderOutput();
}

// Document renderer
function renderIntoDocument(props) {
	return ReactTestUtils.renderIntoDocument(React.createElement(C, props));
}

function getSideAvailable(component) {
	return getElem(component, 'msts__side_available');
}

function getSideSelected(component) {
	return getElem(component, 'msts__side_selected');
}

function getElem(component, className) {
	return ReactTestUtils.findRenderedDOMComponentWithClass(component, className);
}
