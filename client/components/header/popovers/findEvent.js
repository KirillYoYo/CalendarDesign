import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Input, Icon, Popover} from 'antd';
import styles from './style.scss'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addEventAction, getCalendarNumbers} from '../../../actions/calendar';

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
		const arr = [
			{
				date: '12213',
				name: 'Ev 1'
			},
			{
				date: '3333',
				name: 'Ev 2'
			},
			{
				date: '12213',
				name: 'Ev 1'
			},
			{
				date: '3333',
				name: 'Ev 2'
			},
			{
				date: '12213',
				name: 'Ev 1'
			},
			{
				date: '3333',
				name: 'Ev 2'
			},
			{
				date: '12213',
				name: 'Ev 1'
			},
			{
				date: '3333',
				name: 'Ev 2'
			},
			{
				date: '12213',
				name: 'Ev 1'
			},
			{
				date: '3333',
				name: 'Ev 2'
			},
			{
				date: '12213',
				name: 'Ev 1'
			},
			{
				date: '3333',
				name: 'Ev 2'
			},
		]
		const content = <div className={'find-event-popover__content'}>
			<div className="inner">
				{
					this.props.calendar.events.map((event, i) => {
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
