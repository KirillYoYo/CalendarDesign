import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Input, Icon, Popover} from 'antd';
import styles from './style.scss'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addEventAction, getCalendarNumbers} from '../../../actions/calendar';

import {getMonthName} from '../../../helpres'

class FindEvent extends Component {

	constructor() {
		super();
		this.state = {
			visible: false,
		}
	}

	handleVisibleChange = (visible) => {
		this.setState({visible});
	}

	goToEvent(month) {
		this.props.getCalendarNumbers(month)
	}

	render() {
		const searchText = this.props.searchText;
		const content = <div className={'find-event-popover__content'}>
			<div className="inner">
				{
					this.props.calendar.events.map((event, i) => {

						if (!this.props.searchText) {
							return (
								<div onClick={this.goToEvent.bind(this, event.date.getMonth())} className={'find-event-popover__event'} key={i}>
									<div className="title">
										{event.eventName}
									</div>
									<div className="date">
										{event.date.toLocaleDateString()}
									</div>
								</div>
							)
						} else {
							if (event.eventName.includes(searchText) ||
								event.eventParty && event.eventParty.includes(searchText) ||
								String(event.date.getMonth() + 1) === searchText ||
								getMonthName(event.date.getMonth()).includes(searchText)
							) {
								return (
									<div onClick={this.goToEvent.bind(this, event.date.getMonth())} className={'find-event-popover__event'} key={i}>
										<div className="title">
											{event.eventName}
										</div>
										<div className="date">
											{event.date.toLocaleDateString()}
										</div>
									</div>
								)
							} else {
								return null
							}
						}
					})
				}
				{
					this.props.calendar.events.length === 0 ?
						<div>Нет событий</div>
						: null
				}

			</div>
		</div>
		return (
			<Popover
				content={content}
				trigger="click"
				visible={this.state.visible}
				placement="bottomLeft"
				onVisibleChange={this.handleVisibleChange}
				overlayClassName='find-event-popover'
			>
				{this.props.children}
			</Popover>
		);
	}
}

FindEvent.propTypes = {};
FindEvent.defaultProps = {};


function mapStateToProps(state) {
	return {
		calendar: state.calendar
	};
}
const mapDispatchToProps = (dispatch) => {
	return {
		addEventAction: bindActionCreators(addEventAction, dispatch),
		getCalendarNumbers: bindActionCreators(getCalendarNumbers, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FindEvent);
