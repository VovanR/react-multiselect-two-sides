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
		selectedFooter: React.PropTypes.node
	},

	getDefaultProps() {
		return {
			options: [],
			value: [],
			disabled: false
		};
	},

	getInitialState() {
		return {};
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

	filterAvailable() {
		const {options, value} = this.props;
		return options.reduce((a, b) => {
			if (value.indexOf(b.id) === -1) {
				a.push(b);
			}
			return a;
		}, []);
	},

	filterActive() {
		const {options, value} = this.props;
		return options.reduce((a, b) => {
			if (value.indexOf(b.id) > -1) {
				a.push(b);
			}
			return a;
		}, []);
	},

	render() {
		const {
			className,
			availableHeader,
			availableFooter,
			selectedHeader,
			selectedFooter
		} = this.props;

		return (
			<div className={classNames('msts', className)}>
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

				<div className="msts__body">
					<div className="msts__side msts__side_available">
						<List
							data={this.filterAvailable()}
							onClick={this.handleClickAvailable}
							/>
					</div>

					<div className="msts__side msts__side_selected">
						<List
							data={this.filterActive()}
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
});

export default MultiselectTwoSides;

const List = React.createClass({
	propTypes: {
		data: React.PropTypes.array,
		onClick: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			data: []
		};
	},

	handleClick(id) {
		this.props.onClick(id);
	},

	render() {
		return (
			<ul className="msts__list">
				{this.props.data.map(item => {
					return (
						<ListItem
							key={item.id}
							id={item.id}
							onClick={this.handleClick}
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
		children: React.PropTypes.node
	},

	handleClick() {
		const {onClick, id} = this.props;
		onClick(id);
	},

	render() {
		const {children} = this.props;

		return (
			<li
				className="msts__list-item"
				onClick={this.handleClick}
				>
				{children}
			</li>
		);
	}
});
