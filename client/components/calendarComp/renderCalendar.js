import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

class RenderCalendar extends Component {
    dayClickHandler (num, date) {
        console.log("selected day", date)
    }

    render() {
        console.log('~');
        console.log(this.props);
        return (
            <div className={'dayes__dayes-numbers'}>
                {
                    this.props.calendarNumbers && this.props.calendarNumbers.map( (day, i) => {
                        return (
                            <div
                                className={
                                    `dayes-numbers__day ${day.active ? 'active' : ''}
                                    ${day.isNext ? 'next-month' : null}
                                    ${day.isPrev ? 'prev-month' : null}`
                                }
                                key={i}
                                style={{background: day.color}}
                                onClick={this.dayClickHandler.bind(this, i, day.date)}
                            >
                                {day.date.getDate()}
                            </div>
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
