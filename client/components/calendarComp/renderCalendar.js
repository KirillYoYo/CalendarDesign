import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import CalendarPopover from './calendarPopover';


class RenderCalendar extends Component {
    dayClickHandler (num, date) {
        console.log("selected day", date)
    }

	componentDidMount() {
        console.log('componentDidMount componentDidMount componentDidMount')
	}

	componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.events !== nextProps.events) {
	        localStorage.setItem('eventsStorage', JSON.stringify(nextProps.events));
        }
	}

	componentDidMount() {
		if (localStorage.getItem('eventsStorage') && false) {
		    // запись в store из localstorage находится в calendarPopover
		}
	}


	renderEvent (month, day) {
        var res = false;
        var arr = this.props.events
        if (localStorage.getItem('eventsStorage')) {
	        arr = JSON.parse(localStorage.getItem('eventsStorage'))
            arr.map((item, i) => {
            	item.date = new Date(item.date)
            })
        }
		arr.map((item, i) => {

            if (item.date.getMonth() === month && item.date.getDate() === day) {
                res = item
            }
        });
        return res
    }


	render() {
        return (
            <div className={'dayes__dayes-numbers'}>
                {
                    this.props.calendarNumbers && this.props.calendarNumbers.map( (day, i) => {
                        const event = this.renderEvent(day.date.getMonth(), day.date.getDate())
                        return (
                            <CalendarPopover event={event} key={i} date={day.date}>
                                <div
                                    className={
                                        `dayes-numbers__day ${day.active ? 'active' : ''}
                                        ${day.isNext ? 'next-month' : ''}
                                        ${day.isNext ? 'next-month' : ''}
                                        ${day.isToday ? 'todayDay' : ''}
                                        ${event ? 'is-event' : null}`

                                    }
                                    onClick={this.dayClickHandler.bind(this, i, day.date)}
                                >
                                    <div className="inner">
                                        {day.dayName ? <span>{day.dayName}, </span> : null}
                                        <span>{day.date.getDate()}</span>
                                        <div className={'title'}>{event.eventName}</div>
                                    </div>
                                </div>
                            </CalendarPopover>
                        )
                    })
                }
            </div>
        );
    }
}

RenderCalendar.propTypes = {};
RenderCalendar.defaultProps = {};

export default RenderCalendar;
