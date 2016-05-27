import React from 'react';
import classNames from 'classnames';

const MultiselectTwoSides = React.createClass({
	propTypes: {
		availableFooter: React.PropTypes.node,
		availableHeader: React.PropTypes.node,
		className: React.PropTypes.string,
		clearFilterText: React.PropTypes.string,
		clearable: React.PropTypes.bool,
		deselectAllText: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		labelKey: React.PropTypes.string,
		onChange: React.PropTypes.func,
		options: React.PropTypes.array,
		placeholder: React.PropTypes.string,
		searchable: React.PropTypes.bool,
		selectAllText: React.PropTypes.string,
		selectedFooter: React.PropTypes.node,
		selectedHeader: React.PropTypes.node,
		showControls: React.PropTypes.bool,
		value: React.PropTypes.array,
		valueKey: React.PropTypes.string
	},

	getDefaultProps() {
		return {
			clearFilterText: 'Clear',
			clearable: true,
			deselectAllText: 'Deselect all',
			disabled: false,
			labelKey: 'label',
			options: [],
			searchable: false,
			selectAllText: 'Select all',
			showControls: false,
			value: [],
			valueKey: 'value'
		};
	},

	getInitialState() {
		return {
			filterAvailable: '',
			filterSelected: ''
		};
	},

	handleClickAvailable(value) {
		this.props.onChange(this.props.value.concat(value));
	},

	handleClickSelected(value) {
		const {value: currentValue, onChange} = this.props;
		const newValue = currentValue.slice();
		newValue.splice(currentValue.indexOf(value), 1);
		onChange(newValue);
	},

	handleClickSelectAll() {
		const {options, valueKey, onChange} = this.props;

		const value = options.reduce((a, b) => {
			if (!b.disabled) {
				a.push(b[valueKey]);
			}

			return a;
		}, []);

		onChange(value);
	},

	handleClickDeselectAll() {
		this.props.onChange([]);
	},

	filterAvailable() {
		const {options, value, labelKey, valueKey} = this.props;
		const filtered = options.reduce((a, b) => {
			if (value.indexOf(b[valueKey]) === -1) {
				a.push(b);
			}
			return a;
		}, []);

		if (!this.props.searchable) {
			return filtered;
		}

		const {filterAvailable: filter} = this.state;
		if (filter) {
			return filtered.filter(a => {
				return filterByName(a, filter, labelKey);
			});
		}

		return filtered;
	},

	filterActive() {
		const {options, value, labelKey, valueKey} = this.props;
		const filtered = options.reduce((a, b) => {
			if (value.indexOf(b[valueKey]) > -1) {
				a.push(b);
			}
			return a;
		}, []);

		if (!this.props.searchable) {
			return filtered;
		}

		const {filterSelected: filter} = this.state;
		if (filter) {
			return filtered.filter(a => {
				return filterByName(a, filter, labelKey);
			});
		}

		return filtered;
	},

	handleChangeFilterAvailable(value) {
		this.setState({filterAvailable: value});
	},

	handleChangeFilterSelected(value) {
		this.setState({filterSelected: value});
	},

	render() {
		const {
			availableFooter,
			availableHeader,
			className,
			clearFilterText,
			clearable,
			deselectAllText,
			disabled,
			labelKey,
			options,
			placeholder,
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

		return (
			<div className={classNames(componentClassName, disabled && `${componentClassName}_disabled`, className)}>
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
							<Filter
								value={filterAvailable}
								onChange={this.handleChangeFilterAvailable}
								{...{placeholder, clearable, disabled, clearFilterText}}
								/>
						</div>

						<div className="msts__side msts__side_filter">
							<Filter
								value={filterSelected}
								onChange={this.handleChangeFilterSelected}
								{...{placeholder, clearable, disabled, clearFilterText}}
								/>
						</div>
					</div>
				) : null}

				<div className="msts__body">
					<div className="msts__side msts__side_available">
						<List
							options={this.filterAvailable()}
							onClick={this.handleClickAvailable}
							{...{disabled, labelKey, valueKey}}
							/>
					</div>

					{showControls ? (
						<div className="msts__side msts__side_controls">
							<button
								className="msts__control msts__control_select-all"
								onClick={this.handleClickSelectAll}
								title={selectAllText}
								type="button"
								disabled={options.length === value.length || disabled}
								/>
							<button
								className="msts__control msts__control_deselect-all"
								onClick={this.handleClickDeselectAll}
								title={deselectAllText}
								type="button"
								disabled={!value.length || disabled}
								/>
						</div>
					) : null}

					<div className="msts__side msts__side_selected">
						<List
							options={this.filterActive()}
							onClick={this.handleClickSelected}
							{...{disabled, labelKey, valueKey}}
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
});

export default MultiselectTwoSides;

const List = React.createClass({
	propTypes: {
		options: React.PropTypes.array,
		disabled: React.PropTypes.bool,
		onClick: React.PropTypes.func,
		labelKey: React.PropTypes.string,
		valueKey: React.PropTypes.string
	},

	getDefaultProps() {
		return {
			options: []
		};
	},

	handleClick(value) {
		if (this.props.disabled) {
			return;
		}

		this.props.onClick(value);
	},

	render() {
		const {options, labelKey, valueKey} = this.props;

		return (
			<ul className="msts__list">
				{options.map(item => {
					return (
						<ListItem
							key={item[valueKey]}
							onClick={this.handleClick}
							disabled={item.disabled}
							label={item[labelKey]}
							value={item[valueKey]}
							/>
					);
				})}
			</ul>
		);
	}
});

const ListItem = React.createClass({
	propTypes: {
		children: React.PropTypes.node,
		disabled: React.PropTypes.bool,
		label: React.PropTypes.string,
		onClick: React.PropTypes.func,
		value: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		])
	},

	handleClick() {
		if (this.props.disabled) {
			return;
		}

		const {onClick, value} = this.props;
		onClick(value);
	},

	render() {
		const {label, disabled} = this.props;
		const className = 'msts__list-item';

		return (
			<li
				className={classNames(className, disabled && `${className}_disabled`)}
				onClick={this.handleClick}
				>
				{label}
			</li>
		);
	}
});

const Filter = React.createClass({
	propTypes: {
		clearFilterText: React.PropTypes.string,
		clearable: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		onChange: React.PropTypes.func.isRequired,
		placeholder: React.PropTypes.string,
		value: React.PropTypes.string
	},

	handleChange(e) {
		this.props.onChange(e.target.value);
	},

	handleClickClear() {
		this.props.onChange('');
	},

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
					value={value}
					onChange={this.handleChange}
					type="text"
					placeholder={placeholder}
					disabled={disabled}
					/>
				{clearable && value ? (
					<button
						className="msts__filter-clear"
						onClick={this.handleClickClear}
						title={clearFilterText}
						type="button"
						disabled={disabled}
						/>
				) : null}
			</div>
		);
	}
});

function filterByName(a, name, labelKey) {
	return a[labelKey].toLowerCase().indexOf(name.toLowerCase()) > -1;
}
