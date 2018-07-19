import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ListItem from './ListItem';

const propTypes = {
	disabled: PropTypes.bool.isRequired,
	labelKey: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	valueKey: PropTypes.string.isRequired
};

export default class List extends Component {
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
		const {
			labelKey,
			options,
			valueKey
		} = this.props;

		return (
			<ul className="msts__list">
				{options.map(item => (
					<ListItem
						key={item[valueKey]}
						onClick={this.handleClick}
						disabled={item.disabled}
						highlighted={item.highlighted}
						label={item[labelKey]}
						value={item[valueKey]}
					/>
				))}
			</ul>
		);
	}
}
List.propTypes = propTypes;
