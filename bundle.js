/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = PropTypes;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global document */
/* eslint react/forbid-component-props: 0 */

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(6);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = __webpack_require__(7);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(9);
__webpack_require__(12);

class Checkbox extends _react2.default.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onChange(e);
	}

	render() {
		const {
			disabled,
			label,
			name,
			value
		} = this.props;

		return _react2.default.createElement(
			'label',
			null,
			_react2.default.createElement('input', {
				onChange: this.handleChange,
				type: 'checkbox',
				checked: value,
				disabled: disabled,
				name: name
			}),
			label
		);
	}
}
Checkbox.propTypes = {
	disabled: _propTypes2.default.bool,
	label: _propTypes2.default.string.isRequired,
	name: _propTypes2.default.string.isRequired,
	onChange: _propTypes2.default.func.isRequired,
	value: _propTypes2.default.bool.isRequired
};
Checkbox.defaultProps = {
	disabled: false
};

class App extends _react2.default.Component {
	constructor(props) {
		super(props);

		this.state = {
			options: [{ label: 'Foo', value: 0 }, { label: 'Bar', value: 1 }, { label: 'Baz', value: 2, disabled: true }, { label: 'Qux', value: 3 }, { label: 'Quux', value: 4 }, { label: 'Corge', value: 5 }, { label: 'Grault', value: 6 }, { label: 'Garply', value: 7 }, { label: 'Waldo', value: 8 }, { label: 'Fred', value: 9 }, { label: 'Plugh', value: 10 }, { label: 'Xyzzy', value: 11 }, { label: 'Thud', value: 12 }],
			value: [0, 3, 9],
			highlight: [5, 8, 9],
			settings: [{
				label: 'Show controls',
				name: 'showControls',
				value: true
			}, {
				label: 'Searchable',
				name: 'searchable',
				value: true
			}, {
				label: 'Clearable',
				name: 'clearable',
				value: true
			}, {
				label: 'Disabled',
				name: 'disabled',
				value: false
			}, {
				label: 'Limit',
				name: 'limit',
				value: 5
			}]
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeSetting = this.handleChangeSetting.bind(this);
	}

	handleChange(value) {
		this.setState({ value });
	}

	handleChangeSetting(e) {
		var _this = this;

		const {
			name,
			value
		} = e.target;

		this.setState(function (state) {
			const setting = _this.getSettingByName(state, name);
			const newValue = typeof setting.value === 'boolean' ? !setting.value : parseInt(value, 10);
			setting.value = newValue;

			if (name === 'searchable') {
				_this.getSettingByName(state, 'clearable').disabled = !newValue;
			}

			return state;
		});
	}

	getSettingByName(state, name) {
		let result;

		for (const setting of state.settings) {
			if (setting.name === name) {
				result = setting;
				continue;
			}
		}

		return result;
	}

	render() {
		var _this2 = this;

		const {
			highlight,
			options,
			settings,
			value
		} = this.state;
		const selectedCount = value.length;
		const availableCount = options.length - selectedCount;
		const s = settings.reduce(function (a, b) {
			a[b.name] = b.value;
			return a;
		}, {});

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'p',
				null,
				settings.map(function (setting) {
					if (typeof setting.value === 'boolean') {
						return _react2.default.createElement(Checkbox, _extends({
							key: setting.name,
							onChange: _this2.handleChangeSetting
						}, setting));
					}

					if (typeof setting.value === 'number') {
						return _react2.default.createElement(
							'label',
							{
								key: setting.name
							},
							` ${setting.label}: `,
							_react2.default.createElement('input', _extends({
								onChange: _this2.handleChangeSetting,
								type: 'number',
								min: '0'
							}, setting))
						);
					}

					return null;
				})
			),
			_react2.default.createElement(_index2.default, _extends({
				className: 'msts_theme_example',
				onChange: this.handleChange,
				availableHeader: 'Available',
				availableFooter: `Available: ${availableCount}`,
				selectedHeader: 'Selected',
				selectedFooter: `Selected: ${selectedCount}`,
				placeholder: 'Filter\u2026'
			}, {
				options,
				highlight,
				value
			}, s))
		);
	}
}

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MultiselectTwoSides extends _react.Component {
	constructor(props) {
		super(props);

		this.state = {
			filterAvailable: '',
			filterSelected: ''
		};

		this.handleClickAvailable = this.handleClickAvailable.bind(this);
		this.handleClickSelected = this.handleClickSelected.bind(this);
		this.handleClickSelectAll = this.handleClickSelectAll.bind(this);
		this.handleClickDeselectAll = this.handleClickDeselectAll.bind(this);
		this.handleChangeFilterAvailable = this.handleChangeFilterAvailable.bind(this);
		this.handleChangeFilterSelected = this.handleChangeFilterSelected.bind(this);
	}

	handleClickAvailable(value) {
		this.props.onChange(this.props.value.concat(value));
	}

	handleClickSelected(value) {
		const {
			onChange,
			value: currentValue
		} = this.props;
		const newValue = currentValue.slice();

		newValue.splice(currentValue.indexOf(value), 1);
		onChange(newValue);
	}

	handleClickSelectAll() {
		const {
			limit,
			onChange,
			options,
			value,
			valueKey
		} = this.props;
		const previousValue = value.slice();

		const newValue = options.reduce(function (a, b) {
			if (!b.disabled && previousValue.indexOf(b[valueKey]) === -1) {
				a.push(b[valueKey]);
			}
			return a;
		}, previousValue);

		let limitedValue = newValue;
		if (limit >= 0) {
			limitedValue = limitedValue.slice(0, limit);
		}

		limitedValue.sort();

		onChange(limitedValue);
	}

	handleClickDeselectAll() {
		this.props.onChange([]);
	}

	filterAvailable() {
		const {
			highlight,
			labelKey,
			limit,
			options,
			value,
			valueKey
		} = this.props;
		const filtered = options.reduce(function (a, b) {
			if (value.indexOf(b[valueKey]) === -1) {
				a.push(b);
			}
			return a;
		}, []);

		let limited = filtered;
		if (value.length >= limit) {
			limited = filtered.map(function (item) {
				return Object.assign({}, item, { disabled: true });
			});
		}

		if (highlight && highlight.length > 0) {
			limited = limited.map(function (item) {
				if (highlight.indexOf(item[valueKey]) > -1) {
					return Object.assign({}, item, { highlighted: true });
				}
				return item;
			});
		}

		if (!this.props.searchable) {
			return limited;
		}

		const {
			filterAvailable: filter
		} = this.state;
		if (filter) {
			return limited.filter(function (a) {
				return filterByName(a, filter, labelKey);
			});
		}

		return limited;
	}

	filterActive() {
		const {
			labelKey,
			options,
			value,
			valueKey
		} = this.props;
		const filtered = options.reduce(function (a, b) {
			if (value.indexOf(b[valueKey]) > -1) {
				a.push(b);
			}
			return a;
		}, []);

		if (!this.props.searchable) {
			return filtered;
		}

		const { filterSelected: filter } = this.state;
		if (filter) {
			return filtered.filter(function (a) {
				return filterByName(a, filter, labelKey);
			});
		}

		return filtered;
	}

	handleChangeFilterAvailable(filterAvailable) {
		this.setState({ filterAvailable });
	}

	handleChangeFilterSelected(filterSelected) {
		this.setState({ filterSelected });
	}

	renderFilter(value, onChange) {
		const {
			clearFilterText,
			clearable,
			disabled,
			filterComponent,
			placeholder
		} = this.props;

		if (!filterComponent) {
			return _react2.default.createElement(Filter, _extends({
				value: value,
				onChange: onChange
			}, {
				clearFilterText,
				clearable,
				disabled,
				placeholder
			}));
		}

		return _react2.default.createElement(filterComponent, {
			clearFilterText,
			clearable,
			disabled,
			onChange,
			placeholder,
			value
		});
	}

	render() {
		const {
			availableFooter,
			availableHeader,
			className,
			deselectAllText,
			disabled,
			labelKey,
			limit,
			options,
			searchable,
			selectAllText,
			selectedFooter,
			selectedHeader,
			showControls,
			value,
			valueKey
		} = this.props;

		const {
			filterAvailable,
			filterSelected
		} = this.state;

		const componentClassName = 'msts';

		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)(componentClassName, disabled && `${componentClassName}_disabled`, className) },
			availableHeader || selectedHeader ? _react2.default.createElement(
				'div',
				{ className: 'msts__heading' },
				_react2.default.createElement(
					'div',
					{ className: 'msts__side msts__side_available' },
					availableHeader
				),
				_react2.default.createElement(
					'div',
					{ className: 'msts__side msts__side_selected' },
					selectedHeader
				)
			) : null,
			searchable ? _react2.default.createElement(
				'div',
				{ className: 'msts__subheading' },
				_react2.default.createElement(
					'div',
					{ className: 'msts__side msts__side_filter' },
					this.renderFilter(filterAvailable, this.handleChangeFilterAvailable)
				),
				_react2.default.createElement(
					'div',
					{ className: 'msts__side msts__side_filter' },
					this.renderFilter(filterSelected, this.handleChangeFilterSelected)
				)
			) : null,
			_react2.default.createElement(
				'div',
				{ className: 'msts__body' },
				_react2.default.createElement(
					'div',
					{ className: 'msts__side msts__side_available' },
					_react2.default.createElement(List, _extends({
						options: this.filterAvailable(),
						onClick: this.handleClickAvailable
					}, {
						disabled,
						labelKey,
						valueKey
					}))
				),
				showControls ? _react2.default.createElement(
					'div',
					{ className: 'msts__side msts__side_controls' },
					_react2.default.createElement('button', {
						className: 'msts__control msts__control_select-all',
						onClick: this.handleClickSelectAll,
						title: selectAllText,
						type: 'button',
						disabled: value.length === options.length || value.length >= limit || disabled
					}),
					_react2.default.createElement('button', {
						className: 'msts__control msts__control_deselect-all',
						onClick: this.handleClickDeselectAll,
						title: deselectAllText,
						type: 'button',
						disabled: !value.length || disabled
					})
				) : null,
				_react2.default.createElement(
					'div',
					{ className: 'msts__side msts__side_selected' },
					_react2.default.createElement(List, _extends({
						options: this.filterActive(),
						onClick: this.handleClickSelected
					}, {
						disabled,
						labelKey,
						valueKey
					}))
				)
			),
			availableFooter || selectedFooter ? _react2.default.createElement(
				'div',
				{ className: 'msts__footer' },
				_react2.default.createElement(
					'div',
					{ className: 'msts__side msts__side_available' },
					availableFooter
				),
				_react2.default.createElement(
					'div',
					{ className: 'msts__side msts__side_selected' },
					selectedFooter
				)
			) : null
		);
	}
}
exports.default = MultiselectTwoSides;
MultiselectTwoSides.propTypes = {
	availableFooter: _propTypes2.default.node,
	availableHeader: _propTypes2.default.node,
	className: _propTypes2.default.string,
	clearFilterText: _propTypes2.default.string,
	clearable: _propTypes2.default.bool,
	deselectAllText: _propTypes2.default.string,
	disabled: _propTypes2.default.bool,
	filterComponent: _propTypes2.default.func,
	highlight: _propTypes2.default.array,
	labelKey: _propTypes2.default.string,
	limit: _propTypes2.default.number,
	onChange: _propTypes2.default.func,
	options: _propTypes2.default.array,
	placeholder: _propTypes2.default.string,
	searchable: _propTypes2.default.bool,
	selectAllText: _propTypes2.default.string,
	selectedFooter: _propTypes2.default.node,
	selectedHeader: _propTypes2.default.node,
	showControls: _propTypes2.default.bool,
	value: _propTypes2.default.array,
	valueKey: _propTypes2.default.string
};
MultiselectTwoSides.defaultProps = {
	availableFooter: null,
	availableHeader: null,
	className: null,
	clearFilterText: 'Clear',
	clearable: true,
	deselectAllText: 'Deselect all',
	disabled: false,
	filterComponent: null,
	highlight: [],
	labelKey: 'label',
	limit: undefined,
	onChange: function onChange() {},
	options: [],
	placeholder: '',
	searchable: false,
	selectAllText: 'Select all',
	selectedFooter: null,
	selectedHeader: null,
	showControls: false,
	value: [],
	valueKey: 'value'
};

class List extends _react.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(value) {
		if (this.props.disabled) {
			return;
		}

		this.props.onClick(value);
	}

	render() {
		var _this = this;

		const {
			labelKey,
			options,
			valueKey
		} = this.props;

		return _react2.default.createElement(
			'ul',
			{ className: 'msts__list' },
			options.map(function (item) {
				return _react2.default.createElement(ListItem, {
					key: item[valueKey],
					onClick: _this.handleClick,
					disabled: item.disabled,
					highlighted: item.highlighted,
					label: item[labelKey],
					value: item[valueKey]
				});
			})
		);
	}
}
List.propTypes = {
	disabled: _propTypes2.default.bool.isRequired,
	labelKey: _propTypes2.default.string.isRequired,
	onClick: _propTypes2.default.func.isRequired,
	options: _propTypes2.default.array.isRequired,
	valueKey: _propTypes2.default.string.isRequired
};

class ListItem extends _react.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (this.props.disabled) {
			return;
		}

		const {
			onClick,
			value
		} = this.props;
		onClick(value);
	}

	render() {
		const {
			disabled,
			highlighted,
			label
		} = this.props;
		const className = 'msts__list-item';

		return _react2.default.createElement(
			'li',
			{
				className: (0, _classnames2.default)(className, disabled && `${className}_disabled`, highlighted && `${className}_highlighted`),
				onClick: this.handleClick
			},
			label
		);
	}
}
ListItem.propTypes = {
	disabled: _propTypes2.default.bool,
	highlighted: _propTypes2.default.bool,
	label: _propTypes2.default.string,
	onClick: _propTypes2.default.func.isRequired,
	value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired
};
ListItem.defaultProps = {
	disabled: false,
	highlighted: false,
	label: ''
};

class Filter extends _react.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleClickClear = this.handleClickClear.bind(this);
	}

	handleChange(e) {
		this.props.onChange(e.target.value);
	}

	handleClickClear() {
		this.props.onChange('');
	}

	render() {
		const {
			clearFilterText,
			clearable,
			disabled,
			placeholder,
			value
		} = this.props;

		return _react2.default.createElement(
			'div',
			{ className: 'msts__filter' },
			_react2.default.createElement('input', _extends({
				className: 'msts__filter-input',
				onChange: this.handleChange,
				type: 'text'
			}, {
				disabled,
				placeholder,
				value
			})),
			clearable && value && !disabled ? _react2.default.createElement('span', {
				className: 'msts__filter-clear',
				onClick: this.handleClickClear,
				title: clearFilterText
			}) : null
		);
	}
}
Filter.propTypes = {
	clearFilterText: _propTypes2.default.string.isRequired,
	clearable: _propTypes2.default.bool.isRequired,
	disabled: _propTypes2.default.bool.isRequired,
	onChange: _propTypes2.default.func.isRequired,
	placeholder: _propTypes2.default.string.isRequired,
	value: _propTypes2.default.string.isRequired
};

function filterByName(a, name, labelKey) {
	return a[labelKey].toLowerCase().indexOf(name.toLowerCase()) > -1;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./node_modules/css-loader/index.js?importLoaders=1!./node_modules/postcss-loader/lib/index.js??ref--1-2!./style.css", function() {
			var newContent = require("!!./node_modules/css-loader/index.js?importLoaders=1!./node_modules/postcss-loader/lib/index.js??ref--1-2!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".msts {\n\t-webkit-user-select: none;\n\t   -moz-user-select: none;\n\t    -ms-user-select: none;\n\t        user-select: none;\n\tcursor: default;\n}\n\n.msts_disabled {\n}\n\n.msts__heading {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n}\n\n.msts__subheading {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n}\n\n.msts__body {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n}\n\n.msts__footer {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n}\n\n.msts__side {\n\twidth: 50%;\n}\n\n.msts__side_available {\n}\n\n.msts__side_selected {\n}\n\n.msts__side_controls {\n\twidth: auto;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: normal;\n\t    -ms-flex-direction: column;\n\t        flex-direction: column;\n\t-webkit-box-pack: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n}\n\n.msts__list {\n\tpadding: 0;\n\tmargin: 0;\n}\n\n.msts__list-item {\n\tlist-style-type: none;\n\tcursor: pointer;\n}\n\n.msts__list-item_disabled {\n\tcursor: default;\n}\n\n.msts__list-item_highlighted {\n}\n\n.msts__control {\n}\n\n.msts__control_select-all {\n}\n\n.msts__control_deselect-all {\n}\n\n.msts__filter-input {\n}\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?importLoaders=1!../node_modules/postcss-loader/lib/index.js??ref--1-2!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?importLoaders=1!../node_modules/postcss-loader/lib/index.js??ref--1-2!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "/* Example theme */\n.msts_theme_example {\n\tborder: 1px solid silver;\n}\n.msts_theme_example .msts__heading .msts__side {\n\t\t\tpadding: 5px;\n\t\t\ttext-align: center;\n\t\t\tcolor: #fff;\n\t\t\tfont-weight: bold;\n\t\t}\n.msts_theme_example .msts__heading .msts__side_available {\n\t\t\tbackground-color: #9b59b6;\n\t\t}\n.msts_theme_example .msts__heading .msts__side_selected {\n\t\t\tbackground-color: #2ecc71;\n\t\t}\n.msts_theme_example .msts__subheading .msts__side_filter {\n\t\t\tpadding: 5px;\n\t\t}\n.msts_theme_example .msts__footer .msts__side {\n\t\t\tpadding: 5px 15px;\n\t\t\tbackground-color: #ecf0f1;\n\t\t\tfont-size: 0.75em;\n\t\t\tcolor: #7f8c8d;\n\t\t\ttext-align: right;\n\t\t}\n.msts_theme_example .msts__list {\n\t\theight: 140px;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t}\n.msts_theme_example .msts__list-item {\n\t\tpadding: 5px 10px;\n\t\t-webkit-transition: background-color ease-in 0.1s, color ease-in 0.1s;\n\t\ttransition: background-color ease-in 0.1s, color ease-in 0.1s\n\t}\n.msts_theme_example .msts__list-item:hover {\n\tbackground-color: #2980b9;\n\tcolor: #fff;\n}\n.msts_theme_example .msts__list-item_disabled {\n\t\t\tbackground-color: #ecf0f1;\n\t\t\tcolor: #7f8c8d;\n}\n.msts_theme_example .msts__list-item_disabled:hover {\n\tbackground-color: #ecf0f1;\n\tcolor: #7f8c8d;\n}\n.msts_theme_example .msts__list-item_highlighted {\n\t\t\tbackground-color: rgba(41, 128, 185, 0.25);\n}\n.msts_theme_example .msts__control {\n\t\tborder: none;\n\t\tbackground: none;\n\t\tcursor: pointer;\n\t\tpadding: 10px 3px;\n\t\tcolor: #bdc3c7;\n\t\t-webkit-transition: color ease 0.15s;\n\t\ttransition: color ease 0.15s\n\t}\n.msts_theme_example .msts__control:hover {\n\tcolor: #95a5a6;\n}\n.msts_theme_example .msts__control[disabled] {\n\tcolor: #ecf0f1;\n}\n.msts_theme_example .msts__control_select-all:after {\n\tcontent: '\\276F';\n}\n.msts_theme_example .msts__control_deselect-all:after {\n\tcontent: '\\276E';\n}\n.msts_theme_example .msts__filter {\n\t\tposition: relative;\n\t}\n.msts_theme_example .msts__filter-input {\n\t\twidth: 100%;\n\t\t-webkit-box-sizing: border-box;\n\t\t        box-sizing: border-box;\n\t\tpadding: 5px;\n\t\tborder: 1px solid silver;\n\t}\n.msts_theme_example .msts__filter-clear {\n\t\tcursor: pointer;\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tright: 0;\n\t\theight: 100%;\n\t\tpadding: 0 10px;\n\t\tfont-size: 1.25em;\n\t\tcolor: silver;\n\t\t-webkit-transition: color ease 0.15s;\n\t\ttransition: color ease 0.15s\n\t}\n.msts_theme_example .msts__filter-clear:after {\n\tcontent: '\\D7';\n\tvertical-align: middle;\n}\n.msts_theme_example .msts__filter-clear:hover {\n\tcolor: #c0392b;\n}\n.msts_theme_example.msts_disabled {\n\tbackground-color: #ecf0f1;\n}\n", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTJlMGNmMTBkYTdjMmZmMWY4YjYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJQcm9wVHlwZXNcIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL2V4YW1wbGUvYXBwLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdERPTVwiIiwid2VicGFjazovLy8uL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZS5jc3M/YTUwNCIsIndlYnBhY2s6Ly8vLi9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9leGFtcGxlL3N0eWxlLmNzcz82NzlmIiwid2VicGFjazovLy8uL2V4YW1wbGUvc3R5bGUuY3NzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJDaGVja2JveCIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJoYW5kbGVDaGFuZ2UiLCJiaW5kIiwiZSIsIm9uQ2hhbmdlIiwicmVuZGVyIiwiZGlzYWJsZWQiLCJsYWJlbCIsIm5hbWUiLCJ2YWx1ZSIsInByb3BUeXBlcyIsImJvb2wiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiZnVuYyIsImRlZmF1bHRQcm9wcyIsIkFwcCIsInN0YXRlIiwib3B0aW9ucyIsImhpZ2hsaWdodCIsInNldHRpbmdzIiwiaGFuZGxlQ2hhbmdlU2V0dGluZyIsInNldFN0YXRlIiwidGFyZ2V0Iiwic2V0dGluZyIsImdldFNldHRpbmdCeU5hbWUiLCJuZXdWYWx1ZSIsInBhcnNlSW50IiwicmVzdWx0Iiwic2VsZWN0ZWRDb3VudCIsImxlbmd0aCIsImF2YWlsYWJsZUNvdW50IiwicyIsInJlZHVjZSIsImEiLCJiIiwibWFwIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIk11bHRpc2VsZWN0VHdvU2lkZXMiLCJmaWx0ZXJBdmFpbGFibGUiLCJmaWx0ZXJTZWxlY3RlZCIsImhhbmRsZUNsaWNrQXZhaWxhYmxlIiwiaGFuZGxlQ2xpY2tTZWxlY3RlZCIsImhhbmRsZUNsaWNrU2VsZWN0QWxsIiwiaGFuZGxlQ2xpY2tEZXNlbGVjdEFsbCIsImhhbmRsZUNoYW5nZUZpbHRlckF2YWlsYWJsZSIsImhhbmRsZUNoYW5nZUZpbHRlclNlbGVjdGVkIiwiY29uY2F0IiwiY3VycmVudFZhbHVlIiwic2xpY2UiLCJzcGxpY2UiLCJpbmRleE9mIiwibGltaXQiLCJ2YWx1ZUtleSIsInByZXZpb3VzVmFsdWUiLCJwdXNoIiwibGltaXRlZFZhbHVlIiwic29ydCIsImxhYmVsS2V5IiwiZmlsdGVyZWQiLCJsaW1pdGVkIiwiT2JqZWN0IiwiYXNzaWduIiwiaXRlbSIsImhpZ2hsaWdodGVkIiwic2VhcmNoYWJsZSIsImZpbHRlciIsImZpbHRlckJ5TmFtZSIsImZpbHRlckFjdGl2ZSIsInJlbmRlckZpbHRlciIsImNsZWFyRmlsdGVyVGV4dCIsImNsZWFyYWJsZSIsImZpbHRlckNvbXBvbmVudCIsInBsYWNlaG9sZGVyIiwiY3JlYXRlRWxlbWVudCIsImF2YWlsYWJsZUZvb3RlciIsImF2YWlsYWJsZUhlYWRlciIsImNsYXNzTmFtZSIsImRlc2VsZWN0QWxsVGV4dCIsInNlbGVjdEFsbFRleHQiLCJzZWxlY3RlZEZvb3RlciIsInNlbGVjdGVkSGVhZGVyIiwic2hvd0NvbnRyb2xzIiwiY29tcG9uZW50Q2xhc3NOYW1lIiwibm9kZSIsImFycmF5IiwibnVtYmVyIiwidW5kZWZpbmVkIiwiTGlzdCIsImhhbmRsZUNsaWNrIiwib25DbGljayIsIkxpc3RJdGVtIiwi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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7a1FDN1dBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLG1CQUFBQSxD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RyxxQ0FBcUMsOEJBQThCLEdBQUc7O0FBRXp0RiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMmUwY2YxMGRhN2MyZmYxZjhiNiIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gUHJvcFR5cGVzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUHJvcFR5cGVzXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZ2xvYmFsIGRvY3VtZW50ICovXG4vKiBlc2xpbnQgcmVhY3QvZm9yYmlkLWNvbXBvbmVudC1wcm9wczogMCAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IE11bHRpc2VsZWN0VHdvU2lkZXMgZnJvbSAnLi4vaW5kZXgnO1xuXG5yZXF1aXJlKCcuLi9zdHlsZS5jc3MnKTtcbnJlcXVpcmUoJy4vc3R5bGUuY3NzJyk7XG5cbmNsYXNzIENoZWNrYm94IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG5cdH1cblxuXHRoYW5kbGVDaGFuZ2UoZSkge1xuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0ZGlzYWJsZWQsXG5cdFx0XHRsYWJlbCxcblx0XHRcdG5hbWUsXG5cdFx0XHR2YWx1ZVxuXHRcdH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxsYWJlbD5cblx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuXHRcdFx0XHRcdHR5cGU9XCJjaGVja2JveFwiXG5cdFx0XHRcdFx0Y2hlY2tlZD17dmFsdWV9XG5cdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdG5hbWU9e25hbWV9XG5cdFx0XHRcdC8+XG5cblx0XHRcdFx0e2xhYmVsfVxuXHRcdFx0PC9sYWJlbD5cblx0XHQpO1xuXHR9XG59XG5DaGVja2JveC5wcm9wVHlwZXMgPSB7XG5cdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0bmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0dmFsdWU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbn07XG5DaGVja2JveC5kZWZhdWx0UHJvcHMgPSB7XG5cdGRpc2FibGVkOiBmYWxzZVxufTtcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHR7bGFiZWw6ICdGb28nLCB2YWx1ZTogMH0sXG5cdFx0XHRcdHtsYWJlbDogJ0JhcicsIHZhbHVlOiAxfSxcblx0XHRcdFx0e2xhYmVsOiAnQmF6JywgdmFsdWU6IDIsIGRpc2FibGVkOiB0cnVlfSxcblx0XHRcdFx0e2xhYmVsOiAnUXV4JywgdmFsdWU6IDN9LFxuXHRcdFx0XHR7bGFiZWw6ICdRdXV4JywgdmFsdWU6IDR9LFxuXHRcdFx0XHR7bGFiZWw6ICdDb3JnZScsIHZhbHVlOiA1fSxcblx0XHRcdFx0e2xhYmVsOiAnR3JhdWx0JywgdmFsdWU6IDZ9LFxuXHRcdFx0XHR7bGFiZWw6ICdHYXJwbHknLCB2YWx1ZTogN30sXG5cdFx0XHRcdHtsYWJlbDogJ1dhbGRvJywgdmFsdWU6IDh9LFxuXHRcdFx0XHR7bGFiZWw6ICdGcmVkJywgdmFsdWU6IDl9LFxuXHRcdFx0XHR7bGFiZWw6ICdQbHVnaCcsIHZhbHVlOiAxMH0sXG5cdFx0XHRcdHtsYWJlbDogJ1h5enp5JywgdmFsdWU6IDExfSxcblx0XHRcdFx0e2xhYmVsOiAnVGh1ZCcsIHZhbHVlOiAxMn1cblx0XHRcdF0sXG5cdFx0XHR2YWx1ZTogWzAsIDMsIDldLFxuXHRcdFx0aGlnaGxpZ2h0OiBbNSwgOCwgOV0sXG5cdFx0XHRzZXR0aW5nczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdTaG93IGNvbnRyb2xzJyxcblx0XHRcdFx0XHRuYW1lOiAnc2hvd0NvbnRyb2xzJyxcblx0XHRcdFx0XHR2YWx1ZTogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdTZWFyY2hhYmxlJyxcblx0XHRcdFx0XHRuYW1lOiAnc2VhcmNoYWJsZScsXG5cdFx0XHRcdFx0dmFsdWU6IHRydWVcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsOiAnQ2xlYXJhYmxlJyxcblx0XHRcdFx0XHRuYW1lOiAnY2xlYXJhYmxlJyxcblx0XHRcdFx0XHR2YWx1ZTogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdEaXNhYmxlZCcsXG5cdFx0XHRcdFx0bmFtZTogJ2Rpc2FibGVkJyxcblx0XHRcdFx0XHR2YWx1ZTogZmFsc2Vcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsOiAnTGltaXQnLFxuXHRcdFx0XHRcdG5hbWU6ICdsaW1pdCcsXG5cdFx0XHRcdFx0dmFsdWU6IDVcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH07XG5cblx0XHR0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVDaGFuZ2VTZXR0aW5nID0gdGhpcy5oYW5kbGVDaGFuZ2VTZXR0aW5nLmJpbmQodGhpcyk7XG5cdH1cblxuXHRoYW5kbGVDaGFuZ2UodmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHt2YWx1ZX0pO1xuXHR9XG5cblx0aGFuZGxlQ2hhbmdlU2V0dGluZyhlKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0bmFtZSxcblx0XHRcdHZhbHVlXG5cdFx0fSA9IGUudGFyZ2V0O1xuXG5cdFx0dGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG5cdFx0XHRjb25zdCBzZXR0aW5nID0gdGhpcy5nZXRTZXR0aW5nQnlOYW1lKHN0YXRlLCBuYW1lKTtcblx0XHRcdGNvbnN0IG5ld1ZhbHVlID0gdHlwZW9mIHNldHRpbmcudmFsdWUgPT09ICdib29sZWFuJyA/ICFzZXR0aW5nLnZhbHVlIDogcGFyc2VJbnQodmFsdWUsIDEwKTtcblx0XHRcdHNldHRpbmcudmFsdWUgPSBuZXdWYWx1ZTtcblxuXHRcdFx0aWYgKG5hbWUgPT09ICdzZWFyY2hhYmxlJykge1xuXHRcdFx0XHR0aGlzLmdldFNldHRpbmdCeU5hbWUoc3RhdGUsICdjbGVhcmFibGUnKS5kaXNhYmxlZCA9ICFuZXdWYWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0U2V0dGluZ0J5TmFtZShzdGF0ZSwgbmFtZSkge1xuXHRcdGxldCByZXN1bHQ7XG5cblx0XHRmb3IgKGNvbnN0IHNldHRpbmcgb2Ygc3RhdGUuc2V0dGluZ3MpIHtcblx0XHRcdGlmIChzZXR0aW5nLm5hbWUgPT09IG5hbWUpIHtcblx0XHRcdFx0cmVzdWx0ID0gc2V0dGluZztcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRoaWdobGlnaHQsXG5cdFx0XHRvcHRpb25zLFxuXHRcdFx0c2V0dGluZ3MsXG5cdFx0XHR2YWx1ZVxuXHRcdH0gPSB0aGlzLnN0YXRlO1xuXHRcdGNvbnN0IHNlbGVjdGVkQ291bnQgPSB2YWx1ZS5sZW5ndGg7XG5cdFx0Y29uc3QgYXZhaWxhYmxlQ291bnQgPSBvcHRpb25zLmxlbmd0aCAtIHNlbGVjdGVkQ291bnQ7XG5cdFx0Y29uc3QgcyA9IHNldHRpbmdzLnJlZHVjZSgoYSwgYikgPT4ge1xuXHRcdFx0YVtiLm5hbWVdID0gYi52YWx1ZTtcblx0XHRcdHJldHVybiBhO1xuXHRcdH0sIHt9KTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8cD5cblx0XHRcdFx0XHR7c2V0dGluZ3MubWFwKHNldHRpbmcgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBzZXR0aW5nLnZhbHVlID09PSAnYm9vbGVhbicpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHQ8Q2hlY2tib3hcblx0XHRcdFx0XHRcdFx0XHRcdGtleT17c2V0dGluZy5uYW1lfVxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlU2V0dGluZ31cblx0XHRcdFx0XHRcdFx0XHRcdHsuLi5zZXR0aW5nfVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICh0eXBlb2Ygc2V0dGluZy52YWx1ZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWxcblx0XHRcdFx0XHRcdFx0XHRcdGtleT17c2V0dGluZy5uYW1lfVxuXHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdHtgICR7c2V0dGluZy5sYWJlbH06IGB9XG5cblx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VTZXR0aW5nfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlPVwibnVtYmVyXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bWluPVwiMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHsuLi5zZXR0aW5nfVxuXHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9KX1cblx0XHRcdFx0PC9wPlxuXG5cdFx0XHRcdDxNdWx0aXNlbGVjdFR3b1NpZGVzXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwibXN0c190aGVtZV9leGFtcGxlXCJcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG5cdFx0XHRcdFx0YXZhaWxhYmxlSGVhZGVyPVwiQXZhaWxhYmxlXCJcblx0XHRcdFx0XHRhdmFpbGFibGVGb290ZXI9e2BBdmFpbGFibGU6ICR7YXZhaWxhYmxlQ291bnR9YH1cblx0XHRcdFx0XHRzZWxlY3RlZEhlYWRlcj1cIlNlbGVjdGVkXCJcblx0XHRcdFx0XHRzZWxlY3RlZEZvb3Rlcj17YFNlbGVjdGVkOiAke3NlbGVjdGVkQ291bnR9YH1cblx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIkZpbHRlcuKAplwiXG5cdFx0XHRcdFx0ey4uLntcblx0XHRcdFx0XHRcdG9wdGlvbnMsXG5cdFx0XHRcdFx0XHRoaWdobGlnaHQsXG5cdFx0XHRcdFx0XHR2YWx1ZVxuXHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0ey4uLnN9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9leGFtcGxlL2FwcC5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RET01cIlxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlzZWxlY3RUd29TaWRlcyBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGZpbHRlckF2YWlsYWJsZTogJycsXG5cdFx0XHRmaWx0ZXJTZWxlY3RlZDogJydcblx0XHR9O1xuXG5cdFx0dGhpcy5oYW5kbGVDbGlja0F2YWlsYWJsZSA9IHRoaXMuaGFuZGxlQ2xpY2tBdmFpbGFibGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUNsaWNrU2VsZWN0ZWQgPSB0aGlzLmhhbmRsZUNsaWNrU2VsZWN0ZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUNsaWNrU2VsZWN0QWxsID0gdGhpcy5oYW5kbGVDbGlja1NlbGVjdEFsbC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlQ2xpY2tEZXNlbGVjdEFsbCA9IHRoaXMuaGFuZGxlQ2xpY2tEZXNlbGVjdEFsbC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlQ2hhbmdlRmlsdGVyQXZhaWxhYmxlID0gdGhpcy5oYW5kbGVDaGFuZ2VGaWx0ZXJBdmFpbGFibGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUNoYW5nZUZpbHRlclNlbGVjdGVkID0gdGhpcy5oYW5kbGVDaGFuZ2VGaWx0ZXJTZWxlY3RlZC5iaW5kKHRoaXMpO1xuXHR9XG5cblx0aGFuZGxlQ2xpY2tBdmFpbGFibGUodmFsdWUpIHtcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMudmFsdWUuY29uY2F0KHZhbHVlKSk7XG5cdH1cblxuXHRoYW5kbGVDbGlja1NlbGVjdGVkKHZhbHVlKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0b25DaGFuZ2UsXG5cdFx0XHR2YWx1ZTogY3VycmVudFZhbHVlXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgbmV3VmFsdWUgPSBjdXJyZW50VmFsdWUuc2xpY2UoKTtcblxuXHRcdG5ld1ZhbHVlLnNwbGljZShjdXJyZW50VmFsdWUuaW5kZXhPZih2YWx1ZSksIDEpO1xuXHRcdG9uQ2hhbmdlKG5ld1ZhbHVlKTtcblx0fVxuXG5cdGhhbmRsZUNsaWNrU2VsZWN0QWxsKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdGxpbWl0LFxuXHRcdFx0b25DaGFuZ2UsXG5cdFx0XHRvcHRpb25zLFxuXHRcdFx0dmFsdWUsXG5cdFx0XHR2YWx1ZUtleVxuXHRcdH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHByZXZpb3VzVmFsdWUgPSB2YWx1ZS5zbGljZSgpO1xuXG5cdFx0Y29uc3QgbmV3VmFsdWUgPSBvcHRpb25zLnJlZHVjZSgoYSwgYikgPT4ge1xuXHRcdFx0aWYgKCFiLmRpc2FibGVkICYmIHByZXZpb3VzVmFsdWUuaW5kZXhPZihiW3ZhbHVlS2V5XSkgPT09IC0xKSB7XG5cdFx0XHRcdGEucHVzaChiW3ZhbHVlS2V5XSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYTtcblx0XHR9LCBwcmV2aW91c1ZhbHVlKTtcblxuXHRcdGxldCBsaW1pdGVkVmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRpZiAobGltaXQgPj0gMCkge1xuXHRcdFx0bGltaXRlZFZhbHVlID0gbGltaXRlZFZhbHVlLnNsaWNlKDAsIGxpbWl0KTtcblx0XHR9XG5cblx0XHRsaW1pdGVkVmFsdWUuc29ydCgpO1xuXG5cdFx0b25DaGFuZ2UobGltaXRlZFZhbHVlKTtcblx0fVxuXG5cdGhhbmRsZUNsaWNrRGVzZWxlY3RBbGwoKSB7XG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZShbXSk7XG5cdH1cblxuXHRmaWx0ZXJBdmFpbGFibGUoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0aGlnaGxpZ2h0LFxuXHRcdFx0bGFiZWxLZXksXG5cdFx0XHRsaW1pdCxcblx0XHRcdG9wdGlvbnMsXG5cdFx0XHR2YWx1ZSxcblx0XHRcdHZhbHVlS2V5XG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgZmlsdGVyZWQgPSBvcHRpb25zLnJlZHVjZSgoYSwgYikgPT4ge1xuXHRcdFx0aWYgKHZhbHVlLmluZGV4T2YoYlt2YWx1ZUtleV0pID09PSAtMSkge1xuXHRcdFx0XHRhLnB1c2goYik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYTtcblx0XHR9LCBbXSk7XG5cblx0XHRsZXQgbGltaXRlZCA9IGZpbHRlcmVkO1xuXHRcdGlmICh2YWx1ZS5sZW5ndGggPj0gbGltaXQpIHtcblx0XHRcdGxpbWl0ZWQgPSBmaWx0ZXJlZC5tYXAoaXRlbSA9PiB7XG5cdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBpdGVtLCB7ZGlzYWJsZWQ6IHRydWV9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChoaWdobGlnaHQgJiYgaGlnaGxpZ2h0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGxpbWl0ZWQgPSBsaW1pdGVkLm1hcChpdGVtID0+IHtcblx0XHRcdFx0aWYgKGhpZ2hsaWdodC5pbmRleE9mKGl0ZW1bdmFsdWVLZXldKSA+IC0xKSB7XG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGl0ZW0sIHtoaWdobGlnaHRlZDogdHJ1ZX0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBpdGVtO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcblx0XHRcdHJldHVybiBsaW1pdGVkO1xuXHRcdH1cblxuXHRcdGNvbnN0IHtcblx0XHRcdGZpbHRlckF2YWlsYWJsZTogZmlsdGVyXG5cdFx0fSA9IHRoaXMuc3RhdGU7XG5cdFx0aWYgKGZpbHRlcikge1xuXHRcdFx0cmV0dXJuIGxpbWl0ZWQuZmlsdGVyKGEgPT4gKGZpbHRlckJ5TmFtZShhLCBmaWx0ZXIsIGxhYmVsS2V5KSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBsaW1pdGVkO1xuXHR9XG5cblx0ZmlsdGVyQWN0aXZlKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdGxhYmVsS2V5LFxuXHRcdFx0b3B0aW9ucyxcblx0XHRcdHZhbHVlLFxuXHRcdFx0dmFsdWVLZXlcblx0XHR9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCBmaWx0ZXJlZCA9IG9wdGlvbnMucmVkdWNlKChhLCBiKSA9PiB7XG5cdFx0XHRpZiAodmFsdWUuaW5kZXhPZihiW3ZhbHVlS2V5XSkgPiAtMSkge1xuXHRcdFx0XHRhLnB1c2goYik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYTtcblx0XHR9LCBbXSk7XG5cblx0XHRpZiAoIXRoaXMucHJvcHMuc2VhcmNoYWJsZSkge1xuXHRcdFx0cmV0dXJuIGZpbHRlcmVkO1xuXHRcdH1cblxuXHRcdGNvbnN0IHtmaWx0ZXJTZWxlY3RlZDogZmlsdGVyfSA9IHRoaXMuc3RhdGU7XG5cdFx0aWYgKGZpbHRlcikge1xuXHRcdFx0cmV0dXJuIGZpbHRlcmVkLmZpbHRlcihhID0+IChmaWx0ZXJCeU5hbWUoYSwgZmlsdGVyLCBsYWJlbEtleSkpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmlsdGVyZWQ7XG5cdH1cblxuXHRoYW5kbGVDaGFuZ2VGaWx0ZXJBdmFpbGFibGUoZmlsdGVyQXZhaWxhYmxlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7ZmlsdGVyQXZhaWxhYmxlfSk7XG5cdH1cblxuXHRoYW5kbGVDaGFuZ2VGaWx0ZXJTZWxlY3RlZChmaWx0ZXJTZWxlY3RlZCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe2ZpbHRlclNlbGVjdGVkfSk7XG5cdH1cblxuXHRyZW5kZXJGaWx0ZXIodmFsdWUsIG9uQ2hhbmdlKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0Y2xlYXJGaWx0ZXJUZXh0LFxuXHRcdFx0Y2xlYXJhYmxlLFxuXHRcdFx0ZGlzYWJsZWQsXG5cdFx0XHRmaWx0ZXJDb21wb25lbnQsXG5cdFx0XHRwbGFjZWhvbGRlclxuXHRcdH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0aWYgKCFmaWx0ZXJDb21wb25lbnQpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxGaWx0ZXJcblx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e29uQ2hhbmdlfVxuXHRcdFx0XHRcdHsuLi57XG5cdFx0XHRcdFx0XHRjbGVhckZpbHRlclRleHQsXG5cdFx0XHRcdFx0XHRjbGVhcmFibGUsXG5cdFx0XHRcdFx0XHRkaXNhYmxlZCxcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyXG5cdFx0XHRcdFx0fX1cblx0XHRcdFx0Lz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZmlsdGVyQ29tcG9uZW50LCB7XG5cdFx0XHRjbGVhckZpbHRlclRleHQsXG5cdFx0XHRjbGVhcmFibGUsXG5cdFx0XHRkaXNhYmxlZCxcblx0XHRcdG9uQ2hhbmdlLFxuXHRcdFx0cGxhY2Vob2xkZXIsXG5cdFx0XHR2YWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdGF2YWlsYWJsZUZvb3Rlcixcblx0XHRcdGF2YWlsYWJsZUhlYWRlcixcblx0XHRcdGNsYXNzTmFtZSxcblx0XHRcdGRlc2VsZWN0QWxsVGV4dCxcblx0XHRcdGRpc2FibGVkLFxuXHRcdFx0bGFiZWxLZXksXG5cdFx0XHRsaW1pdCxcblx0XHRcdG9wdGlvbnMsXG5cdFx0XHRzZWFyY2hhYmxlLFxuXHRcdFx0c2VsZWN0QWxsVGV4dCxcblx0XHRcdHNlbGVjdGVkRm9vdGVyLFxuXHRcdFx0c2VsZWN0ZWRIZWFkZXIsXG5cdFx0XHRzaG93Q29udHJvbHMsXG5cdFx0XHR2YWx1ZSxcblx0XHRcdHZhbHVlS2V5XG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cblx0XHRjb25zdCB7XG5cdFx0XHRmaWx0ZXJBdmFpbGFibGUsXG5cdFx0XHRmaWx0ZXJTZWxlY3RlZFxuXHRcdH0gPSB0aGlzLnN0YXRlO1xuXG5cdFx0Y29uc3QgY29tcG9uZW50Q2xhc3NOYW1lID0gJ21zdHMnO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKGNvbXBvbmVudENsYXNzTmFtZSwgZGlzYWJsZWQgJiYgYCR7Y29tcG9uZW50Q2xhc3NOYW1lfV9kaXNhYmxlZGAsIGNsYXNzTmFtZSl9PlxuXHRcdFx0XHR7YXZhaWxhYmxlSGVhZGVyIHx8IHNlbGVjdGVkSGVhZGVyID8gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibXN0c19faGVhZGluZ1wiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtc3RzX19zaWRlIG1zdHNfX3NpZGVfYXZhaWxhYmxlXCI+XG5cdFx0XHRcdFx0XHRcdHthdmFpbGFibGVIZWFkZXJ9XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtc3RzX19zaWRlIG1zdHNfX3NpZGVfc2VsZWN0ZWRcIj5cblx0XHRcdFx0XHRcdFx0e3NlbGVjdGVkSGVhZGVyfVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCkgOiBudWxsfVxuXG5cdFx0XHRcdHtzZWFyY2hhYmxlID8gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibXN0c19fc3ViaGVhZGluZ1wiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtc3RzX19zaWRlIG1zdHNfX3NpZGVfZmlsdGVyXCI+XG5cdFx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlckZpbHRlcihmaWx0ZXJBdmFpbGFibGUsIHRoaXMuaGFuZGxlQ2hhbmdlRmlsdGVyQXZhaWxhYmxlKX1cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1zdHNfX3NpZGUgbXN0c19fc2lkZV9maWx0ZXJcIj5cblx0XHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyRmlsdGVyKGZpbHRlclNlbGVjdGVkLCB0aGlzLmhhbmRsZUNoYW5nZUZpbHRlclNlbGVjdGVkKX1cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpIDogbnVsbH1cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1zdHNfX2JvZHlcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1zdHNfX3NpZGUgbXN0c19fc2lkZV9hdmFpbGFibGVcIj5cblx0XHRcdFx0XHRcdDxMaXN0XG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM9e3RoaXMuZmlsdGVyQXZhaWxhYmxlKCl9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2tBdmFpbGFibGV9XG5cdFx0XHRcdFx0XHRcdHsuLi57XG5cdFx0XHRcdFx0XHRcdFx0ZGlzYWJsZWQsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWxLZXksXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWVLZXlcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHR7c2hvd0NvbnRyb2xzID8gKFxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtc3RzX19zaWRlIG1zdHNfX3NpZGVfY29udHJvbHNcIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1zdHNfX2NvbnRyb2wgbXN0c19fY29udHJvbF9zZWxlY3QtYWxsXCJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrU2VsZWN0QWxsfVxuXHRcdFx0XHRcdFx0XHRcdHRpdGxlPXtzZWxlY3RBbGxUZXh0fVxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRcdFx0XHRcdGRpc2FibGVkPXt2YWx1ZS5sZW5ndGggPT09IG9wdGlvbnMubGVuZ3RoIHx8IHZhbHVlLmxlbmd0aCA+PSBsaW1pdCB8fCBkaXNhYmxlZH1cblx0XHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwibXN0c19fY29udHJvbCBtc3RzX19jb250cm9sX2Rlc2VsZWN0LWFsbFwiXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5oYW5kbGVDbGlja0Rlc2VsZWN0QWxsfVxuXHRcdFx0XHRcdFx0XHRcdHRpdGxlPXtkZXNlbGVjdEFsbFRleHR9XG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHRcdFx0ZGlzYWJsZWQ9eyF2YWx1ZS5sZW5ndGggfHwgZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQpIDogbnVsbH1cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibXN0c19fc2lkZSBtc3RzX19zaWRlX3NlbGVjdGVkXCI+XG5cdFx0XHRcdFx0XHQ8TGlzdFxuXHRcdFx0XHRcdFx0XHRvcHRpb25zPXt0aGlzLmZpbHRlckFjdGl2ZSgpfVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrU2VsZWN0ZWR9XG5cdFx0XHRcdFx0XHRcdHsuLi57XG5cdFx0XHRcdFx0XHRcdFx0ZGlzYWJsZWQsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWxLZXksXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWVLZXlcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdHthdmFpbGFibGVGb290ZXIgfHwgc2VsZWN0ZWRGb290ZXIgPyAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtc3RzX19mb290ZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibXN0c19fc2lkZSBtc3RzX19zaWRlX2F2YWlsYWJsZVwiPlxuXHRcdFx0XHRcdFx0XHR7YXZhaWxhYmxlRm9vdGVyfVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibXN0c19fc2lkZSBtc3RzX19zaWRlX3NlbGVjdGVkXCI+XG5cdFx0XHRcdFx0XHRcdHtzZWxlY3RlZEZvb3Rlcn1cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpIDogbnVsbH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbk11bHRpc2VsZWN0VHdvU2lkZXMucHJvcFR5cGVzID0ge1xuXHRhdmFpbGFibGVGb290ZXI6IFByb3BUeXBlcy5ub2RlLFxuXHRhdmFpbGFibGVIZWFkZXI6IFByb3BUeXBlcy5ub2RlLFxuXHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdGNsZWFyRmlsdGVyVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcblx0Y2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcblx0ZGVzZWxlY3RBbGxUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cdGZpbHRlckNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXG5cdGhpZ2hsaWdodDogUHJvcFR5cGVzLmFycmF5LFxuXHRsYWJlbEtleTogUHJvcFR5cGVzLnN0cmluZyxcblx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LFxuXHRwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcblx0c2VhcmNoYWJsZTogUHJvcFR5cGVzLmJvb2wsXG5cdHNlbGVjdEFsbFRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdHNlbGVjdGVkRm9vdGVyOiBQcm9wVHlwZXMubm9kZSxcblx0c2VsZWN0ZWRIZWFkZXI6IFByb3BUeXBlcy5ub2RlLFxuXHRzaG93Q29udHJvbHM6IFByb3BUeXBlcy5ib29sLFxuXHR2YWx1ZTogUHJvcFR5cGVzLmFycmF5LFxuXHR2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZ1xufTtcbk11bHRpc2VsZWN0VHdvU2lkZXMuZGVmYXVsdFByb3BzID0ge1xuXHRhdmFpbGFibGVGb290ZXI6IG51bGwsXG5cdGF2YWlsYWJsZUhlYWRlcjogbnVsbCxcblx0Y2xhc3NOYW1lOiBudWxsLFxuXHRjbGVhckZpbHRlclRleHQ6ICdDbGVhcicsXG5cdGNsZWFyYWJsZTogdHJ1ZSxcblx0ZGVzZWxlY3RBbGxUZXh0OiAnRGVzZWxlY3QgYWxsJyxcblx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRmaWx0ZXJDb21wb25lbnQ6IG51bGwsXG5cdGhpZ2hsaWdodDogW10sXG5cdGxhYmVsS2V5OiAnbGFiZWwnLFxuXHRsaW1pdDogdW5kZWZpbmVkLFxuXHRvbkNoYW5nZTogKCkgPT4ge30sXG5cdG9wdGlvbnM6IFtdLFxuXHRwbGFjZWhvbGRlcjogJycsXG5cdHNlYXJjaGFibGU6IGZhbHNlLFxuXHRzZWxlY3RBbGxUZXh0OiAnU2VsZWN0IGFsbCcsXG5cdHNlbGVjdGVkRm9vdGVyOiBudWxsLFxuXHRzZWxlY3RlZEhlYWRlcjogbnVsbCxcblx0c2hvd0NvbnRyb2xzOiBmYWxzZSxcblx0dmFsdWU6IFtdLFxuXHR2YWx1ZUtleTogJ3ZhbHVlJ1xufTtcblxuY2xhc3MgTGlzdCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcblx0fVxuXG5cdGhhbmRsZUNsaWNrKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLnByb3BzLm9uQ2xpY2sodmFsdWUpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdGxhYmVsS2V5LFxuXHRcdFx0b3B0aW9ucyxcblx0XHRcdHZhbHVlS2V5XG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHVsIGNsYXNzTmFtZT1cIm1zdHNfX2xpc3RcIj5cblx0XHRcdFx0e29wdGlvbnMubWFwKGl0ZW0gPT4gKFxuXHRcdFx0XHRcdDxMaXN0SXRlbVxuXHRcdFx0XHRcdFx0a2V5PXtpdGVtW3ZhbHVlS2V5XX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17aXRlbS5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdGhpZ2hsaWdodGVkPXtpdGVtLmhpZ2hsaWdodGVkfVxuXHRcdFx0XHRcdFx0bGFiZWw9e2l0ZW1bbGFiZWxLZXldfVxuXHRcdFx0XHRcdFx0dmFsdWU9e2l0ZW1bdmFsdWVLZXldfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCkpfVxuXHRcdFx0PC91bD5cblx0XHQpO1xuXHR9XG59XG5MaXN0LnByb3BUeXBlcyA9IHtcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG5cdGxhYmVsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuXHR2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG59O1xuXG5jbGFzcyBMaXN0SXRlbSBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcblx0fVxuXG5cdGhhbmRsZUNsaWNrKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3Qge1xuXHRcdFx0b25DbGljayxcblx0XHRcdHZhbHVlXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0b25DbGljayh2YWx1ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0ZGlzYWJsZWQsXG5cdFx0XHRoaWdobGlnaHRlZCxcblx0XHRcdGxhYmVsXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gJ21zdHNfX2xpc3QtaXRlbSc7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGxpXG5cdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhjbGFzc05hbWUsIGRpc2FibGVkICYmIGAke2NsYXNzTmFtZX1fZGlzYWJsZWRgLCBoaWdobGlnaHRlZCAmJiBgJHtjbGFzc05hbWV9X2hpZ2hsaWdodGVkYCl9XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG5cdFx0XHQ+XG5cdFx0XHRcdHtsYWJlbH1cblx0XHRcdDwvbGk+XG5cdFx0KTtcblx0fVxufVxuTGlzdEl0ZW0ucHJvcFR5cGVzID0ge1xuXHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cdGhpZ2hsaWdodGVkOiBQcm9wVHlwZXMuYm9vbCxcblx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFByb3BUeXBlcy5zdHJpbmdcblx0XSkuaXNSZXF1aXJlZFxufTtcbkxpc3RJdGVtLmRlZmF1bHRQcm9wcyA9IHtcblx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRoaWdobGlnaHRlZDogZmFsc2UsXG5cdGxhYmVsOiAnJ1xufTtcblxuY2xhc3MgRmlsdGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVDbGlja0NsZWFyID0gdGhpcy5oYW5kbGVDbGlja0NsZWFyLmJpbmQodGhpcyk7XG5cdH1cblxuXHRoYW5kbGVDaGFuZ2UoZSkge1xuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuXHR9XG5cblx0aGFuZGxlQ2xpY2tDbGVhcigpIHtcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKCcnKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRjbGVhckZpbHRlclRleHQsXG5cdFx0XHRjbGVhcmFibGUsXG5cdFx0XHRkaXNhYmxlZCxcblx0XHRcdHBsYWNlaG9sZGVyLFxuXHRcdFx0dmFsdWVcblx0XHR9ID0gdGhpcy5wcm9wcztcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1zdHNfX2ZpbHRlclwiPlxuXHRcdFx0XHQ8aW5wdXRcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJtc3RzX19maWx0ZXItaW5wdXRcIlxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cblx0XHRcdFx0XHR0eXBlPVwidGV4dFwiXG5cdFx0XHRcdFx0ey4uLntcblx0XHRcdFx0XHRcdGRpc2FibGVkLFxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXIsXG5cdFx0XHRcdFx0XHR2YWx1ZVxuXHRcdFx0XHRcdH19XG5cdFx0XHRcdC8+XG5cblx0XHRcdFx0e2NsZWFyYWJsZSAmJiB2YWx1ZSAmJiAhZGlzYWJsZWQgPyAoXG5cdFx0XHRcdFx0PHNwYW5cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1zdHNfX2ZpbHRlci1jbGVhclwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrQ2xlYXJ9XG5cdFx0XHRcdFx0XHR0aXRsZT17Y2xlYXJGaWx0ZXJUZXh0fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCkgOiBudWxsfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuRmlsdGVyLnByb3BUeXBlcyA9IHtcblx0Y2xlYXJGaWx0ZXJUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdGNsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHR2YWx1ZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG59O1xuXG5mdW5jdGlvbiBmaWx0ZXJCeU5hbWUoYSwgbmFtZSwgbGFiZWxLZXkpIHtcblx0cmV0dXJuIGFbbGFiZWxLZXldLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuYW1lLnRvTG93ZXJDYXNlKCkpID4gLTE7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qc3giLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/aW1wb3J0TG9hZGVycz0xIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLTIhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9pbXBvcnRMb2FkZXJzPTEhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtMiEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9pbXBvcnRMb2FkZXJzPTEhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtMiEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5tc3RzIHtcXG5cXHQtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcblxcdCAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuXFx0ICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG5cXHQgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcblxcdGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLm1zdHNfZGlzYWJsZWQge1xcbn1cXG5cXG4ubXN0c19faGVhZGluZyB7XFxuXFx0ZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuXFx0ZGlzcGxheTogLW1zLWZsZXhib3g7XFxuXFx0ZGlzcGxheTogZmxleDtcXG59XFxuXFxuLm1zdHNfX3N1YmhlYWRpbmcge1xcblxcdGRpc3BsYXk6IC13ZWJraXQtYm94O1xcblxcdGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcblxcdGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5tc3RzX19ib2R5IHtcXG5cXHRkaXNwbGF5OiAtd2Via2l0LWJveDtcXG5cXHRkaXNwbGF5OiAtbXMtZmxleGJveDtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ubXN0c19fZm9vdGVyIHtcXG5cXHRkaXNwbGF5OiAtd2Via2l0LWJveDtcXG5cXHRkaXNwbGF5OiAtbXMtZmxleGJveDtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ubXN0c19fc2lkZSB7XFxuXFx0d2lkdGg6IDUwJTtcXG59XFxuXFxuLm1zdHNfX3NpZGVfYXZhaWxhYmxlIHtcXG59XFxuXFxuLm1zdHNfX3NpZGVfc2VsZWN0ZWQge1xcbn1cXG5cXG4ubXN0c19fc2lkZV9jb250cm9scyB7XFxuXFx0d2lkdGg6IGF1dG87XFxuXFx0ZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuXFx0ZGlzcGxheTogLW1zLWZsZXhib3g7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHQtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcblxcdC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcblxcdCAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHQgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0LXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcblxcdCAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuXFx0ICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLm1zdHNfX2xpc3Qge1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0bWFyZ2luOiAwO1xcbn1cXG5cXG4ubXN0c19fbGlzdC1pdGVtIHtcXG5cXHRsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ubXN0c19fbGlzdC1pdGVtX2Rpc2FibGVkIHtcXG5cXHRjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5tc3RzX19saXN0LWl0ZW1faGlnaGxpZ2h0ZWQge1xcbn1cXG5cXG4ubXN0c19fY29udHJvbCB7XFxufVxcblxcbi5tc3RzX19jb250cm9sX3NlbGVjdC1hbGwge1xcbn1cXG5cXG4ubXN0c19fY29udHJvbF9kZXNlbGVjdC1hbGwge1xcbn1cXG5cXG4ubXN0c19fZmlsdGVyLWlucHV0IHtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9pbXBvcnRMb2FkZXJzPTEhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliP3t9IS4vc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP2ltcG9ydExvYWRlcnM9MSEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtMiEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/aW1wb3J0TG9hZGVycz0xIS4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS0yIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9pbXBvcnRMb2FkZXJzPTEhLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLTIhLi9zdHlsZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhhbXBsZS9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogRXhhbXBsZSB0aGVtZSAqL1xcbi5tc3RzX3RoZW1lX2V4YW1wbGUge1xcblxcdGJvcmRlcjogMXB4IHNvbGlkIHNpbHZlcjtcXG59XFxuLm1zdHNfdGhlbWVfZXhhbXBsZSAubXN0c19faGVhZGluZyAubXN0c19fc2lkZSB7XFxuXFx0XFx0XFx0cGFkZGluZzogNXB4O1xcblxcdFxcdFxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRcXHRcXHRjb2xvcjogI2ZmZjtcXG5cXHRcXHRcXHRmb250LXdlaWdodDogYm9sZDtcXG5cXHRcXHR9XFxuLm1zdHNfdGhlbWVfZXhhbXBsZSAubXN0c19faGVhZGluZyAubXN0c19fc2lkZV9hdmFpbGFibGUge1xcblxcdFxcdFxcdGJhY2tncm91bmQtY29sb3I6ICM5YjU5YjY7XFxuXFx0XFx0fVxcbi5tc3RzX3RoZW1lX2V4YW1wbGUgLm1zdHNfX2hlYWRpbmcgLm1zdHNfX3NpZGVfc2VsZWN0ZWQge1xcblxcdFxcdFxcdGJhY2tncm91bmQtY29sb3I6ICMyZWNjNzE7XFxuXFx0XFx0fVxcbi5tc3RzX3RoZW1lX2V4YW1wbGUgLm1zdHNfX3N1YmhlYWRpbmcgLm1zdHNfX3NpZGVfZmlsdGVyIHtcXG5cXHRcXHRcXHRwYWRkaW5nOiA1cHg7XFxuXFx0XFx0fVxcbi5tc3RzX3RoZW1lX2V4YW1wbGUgLm1zdHNfX2Zvb3RlciAubXN0c19fc2lkZSB7XFxuXFx0XFx0XFx0cGFkZGluZzogNXB4IDE1cHg7XFxuXFx0XFx0XFx0YmFja2dyb3VuZC1jb2xvcjogI2VjZjBmMTtcXG5cXHRcXHRcXHRmb250LXNpemU6IDAuNzVlbTtcXG5cXHRcXHRcXHRjb2xvcjogIzdmOGM4ZDtcXG5cXHRcXHRcXHR0ZXh0LWFsaWduOiByaWdodDtcXG5cXHRcXHR9XFxuLm1zdHNfdGhlbWVfZXhhbXBsZSAubXN0c19fbGlzdCB7XFxuXFx0XFx0aGVpZ2h0OiAxNDBweDtcXG5cXHRcXHRvdmVyZmxvdy15OiBhdXRvO1xcblxcdFxcdG92ZXJmbG93LXg6IGhpZGRlbjtcXG5cXHR9XFxuLm1zdHNfdGhlbWVfZXhhbXBsZSAubXN0c19fbGlzdC1pdGVtIHtcXG5cXHRcXHRwYWRkaW5nOiA1cHggMTBweDtcXG5cXHRcXHQtd2Via2l0LXRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgZWFzZS1pbiAwLjFzLCBjb2xvciBlYXNlLWluIDAuMXM7XFxuXFx0XFx0dHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciBlYXNlLWluIDAuMXMsIGNvbG9yIGVhc2UtaW4gMC4xc1xcblxcdH1cXG4ubXN0c190aGVtZV9leGFtcGxlIC5tc3RzX19saXN0LWl0ZW06aG92ZXIge1xcblxcdGJhY2tncm91bmQtY29sb3I6ICMyOTgwYjk7XFxuXFx0Y29sb3I6ICNmZmY7XFxufVxcbi5tc3RzX3RoZW1lX2V4YW1wbGUgLm1zdHNfX2xpc3QtaXRlbV9kaXNhYmxlZCB7XFxuXFx0XFx0XFx0YmFja2dyb3VuZC1jb2xvcjogI2VjZjBmMTtcXG5cXHRcXHRcXHRjb2xvcjogIzdmOGM4ZDtcXG59XFxuLm1zdHNfdGhlbWVfZXhhbXBsZSAubXN0c19fbGlzdC1pdGVtX2Rpc2FibGVkOmhvdmVyIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZWNmMGYxO1xcblxcdGNvbG9yOiAjN2Y4YzhkO1xcbn1cXG4ubXN0c190aGVtZV9leGFtcGxlIC5tc3RzX19saXN0LWl0ZW1faGlnaGxpZ2h0ZWQge1xcblxcdFxcdFxcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDEsIDEyOCwgMTg1LCAwLjI1KTtcXG59XFxuLm1zdHNfdGhlbWVfZXhhbXBsZSAubXN0c19fY29udHJvbCB7XFxuXFx0XFx0Ym9yZGVyOiBub25lO1xcblxcdFxcdGJhY2tncm91bmQ6IG5vbmU7XFxuXFx0XFx0Y3Vyc29yOiBwb2ludGVyO1xcblxcdFxcdHBhZGRpbmc6IDEwcHggM3B4O1xcblxcdFxcdGNvbG9yOiAjYmRjM2M3O1xcblxcdFxcdC13ZWJraXQtdHJhbnNpdGlvbjogY29sb3IgZWFzZSAwLjE1cztcXG5cXHRcXHR0cmFuc2l0aW9uOiBjb2xvciBlYXNlIDAuMTVzXFxuXFx0fVxcbi5tc3RzX3RoZW1lX2V4YW1wbGUgLm1zdHNfX2NvbnRyb2w6aG92ZXIge1xcblxcdGNvbG9yOiAjOTVhNWE2O1xcbn1cXG4ubXN0c190aGVtZV9leGFtcGxlIC5tc3RzX19jb250cm9sW2Rpc2FibGVkXSB7XFxuXFx0Y29sb3I6ICNlY2YwZjE7XFxufVxcbi5tc3RzX3RoZW1lX2V4YW1wbGUgLm1zdHNfX2NvbnRyb2xfc2VsZWN0LWFsbDphZnRlciB7XFxuXFx0Y29udGVudDogJ1xcXFwyNzZGJztcXG59XFxuLm1zdHNfdGhlbWVfZXhhbXBsZSAubXN0c19fY29udHJvbF9kZXNlbGVjdC1hbGw6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICdcXFxcMjc2RSc7XFxufVxcbi5tc3RzX3RoZW1lX2V4YW1wbGUgLm1zdHNfX2ZpbHRlciB7XFxuXFx0XFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdH1cXG4ubXN0c190aGVtZV9leGFtcGxlIC5tc3RzX19maWx0ZXItaW5wdXQge1xcblxcdFxcdHdpZHRoOiAxMDAlO1xcblxcdFxcdC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG5cXHRcXHQgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuXFx0XFx0cGFkZGluZzogNXB4O1xcblxcdFxcdGJvcmRlcjogMXB4IHNvbGlkIHNpbHZlcjtcXG5cXHR9XFxuLm1zdHNfdGhlbWVfZXhhbXBsZSAubXN0c19fZmlsdGVyLWNsZWFyIHtcXG5cXHRcXHRjdXJzb3I6IHBvaW50ZXI7XFxuXFx0XFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdFxcdHRvcDogMDtcXG5cXHRcXHRyaWdodDogMDtcXG5cXHRcXHRoZWlnaHQ6IDEwMCU7XFxuXFx0XFx0cGFkZGluZzogMCAxMHB4O1xcblxcdFxcdGZvbnQtc2l6ZTogMS4yNWVtO1xcblxcdFxcdGNvbG9yOiBzaWx2ZXI7XFxuXFx0XFx0LXdlYmtpdC10cmFuc2l0aW9uOiBjb2xvciBlYXNlIDAuMTVzO1xcblxcdFxcdHRyYW5zaXRpb246IGNvbG9yIGVhc2UgMC4xNXNcXG5cXHR9XFxuLm1zdHNfdGhlbWVfZXhhbXBsZSAubXN0c19fZmlsdGVyLWNsZWFyOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnXFxcXEQ3JztcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG4ubXN0c190aGVtZV9leGFtcGxlIC5tc3RzX19maWx0ZXItY2xlYXI6aG92ZXIge1xcblxcdGNvbG9yOiAjYzAzOTJiO1xcbn1cXG4ubXN0c190aGVtZV9leGFtcGxlLm1zdHNfZGlzYWJsZWQge1xcblxcdGJhY2tncm91bmQtY29sb3I6ICNlY2YwZjE7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/aW1wb3J0TG9hZGVycz0xIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj97fSEuL2V4YW1wbGUvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9