import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import CalendarPopover from './calendarPopover';


class RenderCalendar extends Component {
    dayClickHandler (num, date) {
        console.log("selected day", date)
    }
    renderEvent (month, day) {
        var res = false;
        this.props.events.map((item, i) => {

            if (item.date.getMonth() === month && item.date.getDate() === day) {
                res = item
            //     res = (
            //         <div>
            //             <div className={'title'}>{item.eventName}</div>
            //         </div>
            //     )
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
                            <CalendarPopover event={event} key={i}>
                                <div
                                    className={
                                        `dayes-numbers__day ${day.active ? 'active' : ''}
                                        ${day.isNext ? 'next-month' : ''}
                                        ${day.isNext ? 'next-month' : ''}
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
