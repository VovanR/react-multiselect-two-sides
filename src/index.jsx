import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {filterBy} from './utils';
import Filter from './Filter';
import List from './List';

const propTypes = {
	availableFooter: PropTypes.node,
	availableHeader: PropTypes.node,
	className: PropTypes.string,
	clearFilterText: PropTypes.string,
	clearable: PropTypes.bool,
	deselectAllText: PropTypes.string,
	disabled: PropTypes.bool,
	filterBy: PropTypes.func,
	filterComponent: PropTypes.func,
	highlight: PropTypes.array,
	labelKey: PropTypes.string,
	limit: PropTypes.number,
	onChange: PropTypes.func,
	options: PropTypes.array,
	placeholder: PropTypes.string,
	searchable: PropTypes.bool,
	selectAllText: PropTypes.string,
	selectedFooter: PropTypes.node,
	selectedHeader: PropTypes.node,
	showControls: PropTypes.bool,
	value: PropTypes.array,
	valueKey: PropTypes.string
};
const defaultProps = {
	availableFooter: null,
	availableHeader: null,
	className: null,
	clearFilterText: 'Clear',
	clearable: true,
	deselectAllText: 'Deselect all',
	disabled: false,
	filterBy: filterBy,
	filterComponent: null,
	highlight: [],
	labelKey: 'label',
	limit: undefined,
	onChange: () => {},
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

export default class MultiselectTwoSides extends Component {
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
			value,
			valueKey
		} = this.props;
		const previousValue = value.slice();

		const options = this.filterAvailable();

		const newValue = options.reduce((acc, option) => {
			if (!option.disabled && previousValue.indexOf(option[valueKey]) === -1) {
				acc.push(option[valueKey]);
			}

			return acc;
		}, previousValue);

		let limitedValue = newValue;
		if (limit >= 0) {
			limitedValue = limitedValue.slice(0, limit);
		}

		limitedValue.sort();

		onChange(limitedValue);
	}

	handleClickDeselectAll() {
		const {
			onChange,
			value,
			valueKey
		} = this.props;
		const previousValue = value.slice();

		const options = this.filterActive();

		const optionsValueMap = options.reduce((acc, option) => {
			acc[option[valueKey]] = true;

			return acc;
		}, {});

		const newValue = previousValue.reduce((acc, value) => {
			if (!optionsValueMap[value]) {
				acc.push(value);
			}

			return acc;
		}, []);

		onChange(newValue);
	}

	filterAvailable() {
		const {
			filterBy,
			highlight,
			labelKey,
			limit,
			options,
			value,
			valueKey,
			searchable
		} = this.props;

		const filtered = options.reduce((acc, option) => {
			if (value.indexOf(option[valueKey]) === -1) {
				acc.push(option);
			}

			return acc;
		}, []);

		let limited = filtered;
		if (value.length >= limit) {
			limited = filtered.map(option => {
				return Object.assign({}, option, {disabled: true});
			});
		}

		if (highlight && highlight.length > 0) {
			limited = limited.map(option => {
				if (highlight.indexOf(option[valueKey]) > -1) {
					return Object.assign({}, option, {highlighted: true});
				}

				return option;
			});
		}

		if (!searchable) {
			return limited;
		}

		const {
			filterAvailable: filter
		} = this.state;
		if (filter) {
			return limited.filter(option => filterBy(option, filter, labelKey));
		}

		return limited;
	}

	filterActive() {
		const {
			filterBy,
			labelKey,
			options,
			value,
			valueKey
		} = this.props;
		const filtered = options.reduce((acc, option) => {
			if (value.indexOf(option[valueKey]) > -1) {
				acc.push(option);
			}

			return acc;
		}, []);

		if (!this.props.searchable) {
			return filtered;
		}

		const {filterSelected: filter} = this.state;
		if (filter) {
			return filtered.filter(option => filterBy(option, filter, labelKey));
		}

		return filtered;
	}

	handleChangeFilterAvailable(filterAvailable) {
		this.setState({filterAvailable});
	}

	handleChangeFilterSelected(filterSelected) {
		this.setState({filterSelected});
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
			return (
				<Filter
					value={value}
					clearFilterText={clearFilterText}
					clearable={clearable}
					disabled={disabled}
					placeholder={placeholder}
					onChange={onChange}
				/>
			);
		}

		return React.createElement(filterComponent, {
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

		return (
			<div className={classNames('msts', disabled && 'msts_disabled', className)}>
				{availableHeader || selectedHeader ? (
					<div className="msts__heading">
						<div className="msts__side msts__side_available">
							{availableHeader}
						</div>

						<div className="msts__side msts__side_selected">
							{selectedHeader}
						</div>
					</div>
				) : null}

				{searchable ? (
					<div className="msts__subheading">
						<div className="msts__side msts__side_filter">
							{this.renderFilter(filterAvailable, this.handleChangeFilterAvailable)}
						</div>

						<div className="msts__side msts__side_filter">
							{this.renderFilter(filterSelected, this.handleChangeFilterSelected)}
						</div>
					</div>
				) : null}

				<div className="msts__body">
					<div className="msts__side msts__side_available">
						<List
							options={this.filterAvailable()}
							disabled={disabled}
							labelKey={labelKey}
							valueKey={valueKey}
							onClick={this.handleClickAvailable}
						/>
					</div>

					{showControls ? (
						<div className="msts__side msts__side_controls">
							<button
								className="msts__control msts__control_select-all"
								title={selectAllText}
								type="button"
								disabled={value.length === options.length || value.length >= limit || disabled}
								onClick={this.handleClickSelectAll}
							/>

							<button
								className="msts__control msts__control_deselect-all"
								title={deselectAllText}
								type="button"
								disabled={!value.length || disabled}
								onClick={this.handleClickDeselectAll}
							/>
						</div>
					) : null}

					<div className="msts__side msts__side_selected">
						<List
							options={this.filterActive()}
							disabled={disabled}
							labelKey={labelKey}
							valueKey={valueKey}
							onClick={this.handleClickSelected}
						/>
					</div>
				</div>

				{availableFooter || selectedFooter ? (
					<div className="msts__footer">
						<div className="msts__side msts__side_available">
							{availableFooter}
						</div>

						<div className="msts__side msts__side_selected">
							{selectedFooter}
						</div>
					</div>
				) : null}
			</div>
		);
	}
}
MultiselectTwoSides.propTypes = propTypes;
MultiselectTwoSides.defaultProps = defaultProps;
