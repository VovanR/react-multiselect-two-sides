import PropTypes from 'prop-types';
import React, {Component} from 'react';

const propTypes = {
	clearFilterText: PropTypes.string.isRequired,
	clearable: PropTypes.bool.isRequired,
	disabled: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
};

export default class Filter extends Component {
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

		return (
			<div className="msts__filter">
				<input
					className="msts__filter-input"
					type="text"
					disabled={disabled}
					placeholder={placeholder}
					value={value}
					onChange={this.handleChange}
				/>

				{clearable && value && !disabled ? (
					<span
						className="msts__filter-clear"
						title={clearFilterText}
						onClick={this.handleClickClear}
					/>
				) : null}
			</div>
		);
	}
}
Filter.propTypes = propTypes;
