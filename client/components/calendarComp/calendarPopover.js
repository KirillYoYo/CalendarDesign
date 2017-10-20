import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Input, Icon, Popover} from 'antd';
import styles from './style.scss'
import {getMonthName, getMonthNum} from '../../helpres'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {deleteEvent, addEventAction} from '../../actions/calendar';

const {TextArea} = Input;

class CalendarPopover extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            eventName: null,
            eventDate: null,
            eventParty: null,
            eventDescription: null,
        }
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    }
    handleVisibleChange = (visible) => {
        this.setState({visible});
    }
    deleteEventClick (date) {
        this.props.deleteEvent(date)
    }
	changeInput (string, e) {
		this.setState({
			[string]: e.target.value,
		});

	};
	addEventClick = () => {
	    const {eventName, eventDate, eventParty, eventDescription,} = this.state
        const arr_date = eventDate.split(' ').reverse()
		const d = new Date(arr_date[0], getMonthNum(arr_date[1]), arr_date[2], 0, 0, 0, 0);
		const new_val = {
			date: d,
			eventName,
			eventParty,
			eventDescription
		}
	    this.props.addEventAction(new_val)
    }

	componentDidMount() {
		this.setState({
			eventDate: `${this.props.date.getDate()} ${this.props.date.getMonth()} ${this.props.date.getFullYear()}`
		});
	}


	render() {
		const {date} = this.props
        const content = <div className='add-event__content'>
            {
                (() => {
                    if ( !this.props.event) {
                    	return (
                            <div>
                                <div className="add-event__content__row">
                                    <Input className='add-event__content__input' placeholder='Событие' onChange={this.changeInput.bind(this, 'eventName')} />
                                </div>
                                <div className="add-event__content__row">
                                    <Input
	                                        defaultValue={`${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`}
                                            className='add-event__content__input'
                                            placeholder='день, месяц, год'
                                            onChange={this.changeInput.bind(this, 'eventDate')}
                                    />
                                </div>
                                <div className="add-event__content__row">
                                    <Input className='add-event__content__input' placeholder='имена участников' onChange={this.changeInput.bind(this, 'eventParty')} />
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="about-event">
                                <div className="about-event__title">{this.props.event.eventName}</div>
                                <div className="about-event__date">
                                    <span>{this.props.event.date.getDate()}</span>
                                    <span>{getMonthName(this.props.event.date.getMonth())}</span>
                                </div>
                                {
	                                this.props.event.eventParty ?
                                        <div className="about-event__event-party">
                                            <div>Участники:</div>
                                            <div className="about-event__event-party__names">{this.props.event.eventParty}</div>
                                        </div>
		                                : null
                                }
                            </div>
                        )
                    }
                })()
            }

            <div className="add-event__content__row">
                <TextArea value={ this.props.event.eventDescription || this.state.eventDescription} className={'add-event__content__textarea'} onChange={this.changeInput.bind(this, 'eventDescription')} />
            </div>

            <div className="add-event__content__row">
                {
	                !this.props.event ?
                        <Button onClick={this.addEventClick} style={{marginRight: '14px'}}>Создать</Button>
                     : <Button onClick={this.hide} style={{marginRight: '14px'}}>Готово</Button>
                }
                <Button onClick={this.deleteEventClick.bind(this, this.props.event.date)}>Удалить</Button>
            </div>
            <div className="close" onClick={this.hide}><Icon type="close"/></div>
        </div>;

        return (
            <Popover
                content={content}
                trigger="click"
                visible={this.state.visible}
                placement="rightTop"
                onVisibleChange={this.handleVisibleChange}
                overlayClassName='update-event-popover'
            >
                {this.props.children}
            </Popover>
        );
    }
}

CalendarPopover.propTypes = {};
CalendarPopover.defaultProps = {};

function mapStateToProps(state)  {
	return {
		calendar: state.calendar
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteEvent: bindActionCreators(deleteEvent, dispatch),
		addEventAction: bindActionCreators(addEventAction, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPopover);
