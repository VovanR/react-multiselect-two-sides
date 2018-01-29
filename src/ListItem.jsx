import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

const propTypes = {
	disabled: PropTypes.bool,
	highlighted: PropTypes.bool,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]).isRequired
};
const defaultProps = {
	disabled: false,
	highlighted: false,
	label: ''
};

export default class ListItem extends Component {
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

		return (
			<li
				className={classNames(className, disabled && `${className}_disabled`, highlighted && `${className}_highlighted`)}
				onClick={this.handleClick}
			>
				{label}
			</li>
		);
	}
}
ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;
