# react-multiselect-two-sides

[![Commitizen friendly][commitizen-image]][commitizen-url]
[![XO code style][codestyle-image]][codestyle-url]

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> React multiselect two sides component

Demo: [vovanr.github.io/react-multiselect-two-sides][demo]

![](preview.png)

## Install

```
npm install --save react-multiselect-two-sides
```

## Usage
See: [example](example/app.jsx)

```js
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
            value: [0, 3, 5, 9]
        };
    },

    handleChange(value) {
        this.setState({value});
    },

    render() {
        const {options, value} = this.state;
        const selectedCount = value.length;
        const availableCount = options.length - selectedCount;

        return (
            <MultiselectTwoSides
                {...this.state}
                className="msts_theme_example"
                onChange={this.handleChange}
                availableHeader="Available"
                availableFooter={`Available: ${availableCount}`}
                selectedHeader="Selected"
                selectedFooter={`Selected: ${selectedCount}`}
                showControls
                searchable
                />
        );
    }
});

ReactDOM.render(<App/>, document.getElementById('app'));
```

## Api

```js
MultiselectTwoSides.propTypes = {
    options: React.PropTypes.array,
    value: React.PropTypes.array,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    availableHeader: React.PropTypes.node,
    availableFooter: React.PropTypes.node,
    selectedHeader: React.PropTypes.node,
    selectedFooter: React.PropTypes.node,
    showControls: React.PropTypes.bool,
    searchable: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    clearable: React.PropTypes.bool
};

MultiselectTwoSides.defaultProps = {
    options: [],
    value: [],
    disabled: false,
    showControls: false,
    searchable: false,
    clearable: true
};
```

## License
MIT © [Vladimir Rodkin](https://github.com/VovanR)

[demo]: http://vovanr.github.io/react-multiselect-two-sides

[commitizen-url]: http://commitizen.github.io/cz-cli/
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square

[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square

[npm-url]: https://npmjs.org/package/react-multiselect-two-sides
[npm-image]: https://img.shields.io/npm/v/react-multiselect-two-sides.svg?style=flat-square

[travis-url]: https://travis-ci.org/VovanR/react-multiselect-two-sides
[travis-image]: https://img.shields.io/travis/VovanR/react-multiselect-two-sides.svg?style=flat-square

[depstat-url]: https://david-dm.org/VovanR/react-multiselect-two-sides
[depstat-image]: https://david-dm.org/VovanR/react-multiselect-two-sides.svg?style=flat-square

[depstat-dev-url]: https://david-dm.org/VovanR/react-multiselect-two-sides
[depstat-dev-image]: https://david-dm.org/VovanR/react-multiselect-two-sides/dev-status.svg?style=flat-square
