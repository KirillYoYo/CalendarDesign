import React from 'react';
import styles from './style.scss';
import {Button, Icon} from 'antd'
import {getMonthName} from '../../helpres'
import Anim from '../Anim'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getCalendarNumbers} from '../../actions/calendar';

import RenderCalendar from './renderCalendar'

class CalendarComp extends React.Component {

    constructor() {
        super();
        const d = new Date
        this.state = {
            curMonth: d.getMonth(),
            curYear: d.getFullYear(),
            activeDay: null,
            daysArr: [],
            animSide: null
        }
    }

    componentDidMount() {
        this.props.getCalendarNumbers();
    }

    updateYear (year) {
        year !== this.state.curYear ?
        this.setState({
            curYear: year
        })
            : null
    }

    prevMonth () {
        this.setState({
            //curMonth: this.state.curMonth -1,
            animSide: 'left'
        }, () => {
            console.log("current month ", getMonthName(this.state.curMonth -1))
            setTimeout(() => {
                this.updateMonthName(-1)
                this.props.getCalendarNumbers(this.state.curMonth);
            }, 200)
        })
    }
    nextMonth () {
        this.setState({
            //curMonth: this.state.curMonth +1,
            animSide: 'right'
        }, () => {
            setTimeout(() => {
                this.updateMonthName(+1)
                this.props.getCalendarNumbers(this.state.curMonth);
            }, 200)
            console.log("current month ", getMonthName(this.state.curMonth +1))
        })

    }

    dayClickHandler (num, date) {
        console.log("selected day", date)
        var new_arr = [];
        this.state.daysArr.map( (item, i) => {
            var n_item = item
            num === i ? n_item.active = true : n_item.active = false
            new_arr.push(n_item)
        })
        this.setState({
            daysArr: new_arr
        })
    }

    updateMonthName (num, month) {
        !month ?
        this.setState({
            curMonth: this.state.curMonth + num,
        })
            :
            this.setState({
                curMonth: month
            })
    }


    render() {

        return (
			<div className="calendar-comp">
				<div className="calendar">
                    <div className="calendar-navigate">
                        <Button onClick={::this.prevMonth} className='calendar-comp__left' >
                            <Icon type="caret-left" />
                        </Button>
                        <div className="calendar-comp__mounth">
                            <span>{getMonthName(this.state.curMonth)} </span>
                            <span style={{marginLeft: '10px'}}>{this.state.curYear}</span>
                        </div>
                        <Button onClick={::this.nextMonth} className='calendar-comp__right' >
                            <Icon type="caret-right" />
                        </Button>
                    </div>
                    <Anim animSide={this.state.animSide}>
                        <div className="animate-block">

                            <div className="calendar-comp__dayes">
                                <RenderCalendar
                                    calendarNumbers = {this.props.calendar.calendarNumbers}
                                    events = {this.props.calendar.events}
                                />
                            </div>
                        </div>
                    </Anim>

				</div>
			</div>
        )
    }
}

function mapStateToProps(state)  {
    return {
        calendar: state.calendar
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCalendarNumbers: bindActionCreators(getCalendarNumbers, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComp);
