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
		filterComponent: React.PropTypes.func,
		highlight: React.PropTypes.array,
		labelKey: React.PropTypes.string,
		limit: React.PropTypes.number,
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
			highlight: [],
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
		const {
			onChange,
			value: currentValue
		} = this.props;
		const newValue = currentValue.slice();

		newValue.splice(currentValue.indexOf(value), 1);
		onChange(newValue);
	},

	handleClickSelectAll() {
		const {
			limit,
			onChange,
			options,
			value,
			valueKey
		} = this.props;
		const previousValue = value.slice();

		const newValue = options.reduce((a, b) => {
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
	},

	handleClickDeselectAll() {
		this.props.onChange([]);
	},

	filterAvailable() {
		const {
			highlight,
			labelKey,
			limit,
			options,
			value,
			valueKey
		} = this.props;
		const filtered = options.reduce((a, b) => {
			if (value.indexOf(b[valueKey]) === -1) {
				a.push(b);
			}
			return a;
		}, []);

		let limited = filtered;
		if (value.length >= limit) {
			limited = filtered.map(item => {
				return Object.assign({}, item, {disabled: true});
			});
		}

		if (highlight && highlight.length > 0) {
			limited = limited.map(item => {
				if (highlight.indexOf(item[valueKey]) > -1) {
					return Object.assign({}, item, {highlighted: true});
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
			return limited.filter(a => (filterByName(a, filter, labelKey)));
		}

		return limited;
	},

	filterActive() {
		const {
			labelKey,
			options,
			value,
			valueKey
		} = this.props;
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
			return filtered.filter(a => (filterByName(a, filter, labelKey)));
		}

		return filtered;
	},

	handleChangeFilterAvailable(filterAvailable) {
		this.setState({filterAvailable});
	},

	handleChangeFilterSelected(filterSelected) {
		this.setState({filterSelected});
	},

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
					onChange={onChange}
					{...{
						clearFilterText,
						clearable,
						disabled,
						placeholder
					}}
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
	},

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
							onClick={this.handleClickAvailable}
							{...{
								disabled,
								labelKey,
								valueKey
							}}
							/>
					</div>

					{showControls ? (
						<div className="msts__side msts__side_controls">
							<button
								className="msts__control msts__control_select-all"
								onClick={this.handleClickSelectAll}
								title={selectAllText}
								type="button"
								disabled={value.length === options.length || value.length >= limit || disabled}
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
							{...{
								disabled,
								labelKey,
								valueKey
							}}
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
		disabled: React.PropTypes.bool,
		labelKey: React.PropTypes.string,
		onClick: React.PropTypes.func,
		options: React.PropTypes.array,
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
});

const ListItem = React.createClass({
	propTypes: {
		disabled: React.PropTypes.bool,
		highlighted: React.PropTypes.bool,
		label: React.PropTypes.string,
		onClick: React.PropTypes.func,
		value: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string
		])
	},

	handleClick() {
		if (this.props.disabled) {
			return;
		}

		const {
			onClick,
			value
		} = this.props;
		onClick(value);
	},

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
					onChange={this.handleChange}
					type="text"
					{...{
						disabled,
						placeholder,
						value
					}}
					/>

				{clearable && value && !disabled ? (
					<span
						className="msts__filter-clear"
						onClick={this.handleClickClear}
						title={clearFilterText}
						/>
				) : null}
			</div>
		);
	}
});

function filterByName(a, name, labelKey) {
	return a[labelKey].toLowerCase().indexOf(name.toLowerCase()) > -1;
}
