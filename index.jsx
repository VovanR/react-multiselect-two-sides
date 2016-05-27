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
		onChange: React.PropTypes.func,
		options: React.PropTypes.array,
		placeholder: React.PropTypes.string,
		searchable: React.PropTypes.bool,
		selectAllText: React.PropTypes.string,
		selectedFooter: React.PropTypes.node,
		selectedHeader: React.PropTypes.node,
		showControls: React.PropTypes.bool,
		value: React.PropTypes.array
	},

	getDefaultProps() {
		return {
			clearable: true,
			clearFilterText: 'Clear',
			disabled: false,
			options: [],
			searchable: false,
			showControls: false,
			selectAllText: 'Select all',
			deselectAllText: 'Deselect all',
			value: []
		};
	},

	getInitialState() {
		return {
			filterAvailable: '',
			filterSelected: ''
		};
	},

	handleClickAvailable(id) {
		this.props.onChange(this.props.value.concat(id));
	},

	handleClickSelected(id) {
		const {value, onChange} = this.props;
		const newValue = value.slice();
		newValue.splice(value.indexOf(id), 1);
		onChange(newValue);
	},

	handleClickSelectAll() {
		const value = this.props.options.reduce((a, b) => {
			if (!b.disabled) {
				a.push(b.id);
			}

			return a;
		}, []);

		this.props.onChange(value);
	},

	handleClickDeselectAll() {
		this.props.onChange([]);
	},

	filterAvailable() {
		const {options, value} = this.props;
		const filtered = options.reduce((a, b) => {
			if (value.indexOf(b.id) === -1) {
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
				return filterByName(a, filter);
			});
		}

		return filtered;
	},

	filterActive() {
		const {options, value} = this.props;
		const filtered = options.reduce((a, b) => {
			if (value.indexOf(b.id) > -1) {
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
				return filterByName(a, filter);
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
			options,
			placeholder,
			searchable,
			selectAllText,
			selectedFooter,
			selectedHeader,
			showControls,
			value
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
							data={this.filterAvailable()}
							onClick={this.handleClickAvailable}
							disabled={disabled}
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
							data={this.filterActive()}
							onClick={this.handleClickSelected}
							disabled={disabled}
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
		data: React.PropTypes.array,
		disabled: React.PropTypes.bool,
		onClick: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			data: []
		};
	},

	handleClick(id) {
		if (this.props.disabled) {
			return;
		}

		this.props.onClick(id);
	},

	render() {
		const {data} = this.props;

		return (
			<ul className="msts__list">
				{data.map(item => {
					return (
						<ListItem
							key={item.id}
							id={item.id}
							onClick={this.handleClick}
							disabled={item.disabled}
							>
							{item.name}
						</ListItem>
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
		id: React.PropTypes.number,
		onClick: React.PropTypes.func
	},

	handleClick() {
		if (this.props.disabled) {
			return;
		}

		const {onClick, id} = this.props;
		onClick(id);
	},

	render() {
		const {children, disabled} = this.props;
		const className = 'msts__list-item';

		return (
			<li
				className={classNames(className, disabled && `${className}_disabled`)}
				onClick={this.handleClick}
				>
				{children}
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

function filterByName(a, name) {
	return a.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
}
