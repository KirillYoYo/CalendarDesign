import React from 'react';
import styles from './style.scss';
import {Button, Icon} from 'antd'
import {getMonthName} from '../../helpres'
//import Anim from '../Anim'

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
            curMonth: this.state.curMonth -1,
            animSide: 'left'
        }, () => {
	        this.props.getCalendarNumbers(this.state.curMonth);
	        //todo setTimeout для анимации
            // setTimeout(() => {
            //
            // }, 200)
        })
    }
    nextMonth () {
        this.setState({
            curMonth: this.state.curMonth +1,
            animSide: 'right'
        }, () => {
	        this.props.getCalendarNumbers(this.state.curMonth);
            // setTimeout(() => {
            //
            // }, 200)
        })

    }
	findToday() {
        console.log('findToday')
		this.props.getCalendarNumbers();
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

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return this.props.calendar.calendarNumbers === nextProps.calendar.calendarNumbers || this.props.calendar.events === nextProps.calendar.events
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
                            <span>{(() => {return this.props.calendar.calendarNumbers && getMonthName(this.props.calendar.calendarNumbers[15].date.getMonth())})()} </span>
                            <span style={{marginLeft: '10px'}}>{this.state.curYear}</span>
                        </div>
                        <Button onClick={::this.nextMonth} className='calendar-comp__right' >
                            <Icon type="caret-right" />
                        </Button>
                        <Button onClick={::this.findToday} className='calendar-comp__today' >
                            Сегодня
                        </Button>
                    </div>
                    <div className="animate-block">

                        <div className="calendar-comp__dayes">
                            <RenderCalendar
                                calendarNumbers = {this.props.calendar.calendarNumbers}
                                events = {this.props.calendar.events}
                            />
                        </div>
                    </div>
                    {/*<Anim animSide={this.state.animSide}>

                    </Anim>*/}

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
