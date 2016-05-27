import React from 'react';
import classNames from 'classnames';

const MultiselectTwoSides = React.createClass({
	propTypes: {
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
	},

	getDefaultProps() {
		return {
			options: [],
			value: [],
			disabled: false,
			showControls: false,
			searchable: false,
			clearable: true
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
			className,
			availableHeader,
			availableFooter,
			selectedHeader,
			selectedFooter,
			showControls,
			options,
			value,
			searchable,
			placeholder,
			clearable,
			disabled
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
								placeholder={placeholder}
								clearable={clearable}
								disabled={disabled}
								/>
						</div>

						<div className="msts__side msts__side_filter">
							<Filter
								value={filterSelected}
								onChange={this.handleChangeFilterSelected}
								placeholder={placeholder}
								clearable={clearable}
								disabled={disabled}
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
								title="Select all"
								type="button"
								disabled={options.length === value.length || disabled}
								/>
							<button
								className="msts__control msts__control_deselect-all"
								onClick={this.handleClickDeselectAll}
								title="Deselect all"
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
		onClick: React.PropTypes.func,
		disabled: React.PropTypes.bool
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
		id: React.PropTypes.number,
		onClick: React.PropTypes.func,
		children: React.PropTypes.node,
		disabled: React.PropTypes.bool
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
		value: React.PropTypes.string,
		onChange: React.PropTypes.func.isRequired,
		placeholder: React.PropTypes.string,
		clearable: React.PropTypes.bool,
		disabled: React.PropTypes.bool
	},

	handleChange(e) {
		this.props.onChange(e.target.value);
	},

	handleClickClear() {
		this.props.onChange('');
	},

	render() {
		const {
			value,
			placeholder,
			clearable,
			disabled
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
						title="Clear"
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
