import React from 'react';
import styles from './style.scss';
import {Row, Col, Grid, Button} from 'react-bootstrap'
import getMonthName from '../../helpres'

export default class CalendarComp extends React.Component {

    constructor() {
        super();
        const d = new Date
        this.state = {
            curMonth: d.getMonth(),
            curYear: d.getFullYear(),
            activeDay: null,
            daysArr: []
        }
    }

    componentDidMount() {
        this.getDayesNumbers(this.state.curMonth)
    }

    updateYear (year) {
        year !== this.state.curYear ?
        this.setState({
            curYear: year
        })
            : null
    }

    getDayesNumbers(month) {
        var dayes_arr = [];

        const now_date = new Date
        const now_y =  now_date.getFullYear();
        var now_m =  now_date.getMonth();

        month ?  now_m = month : null;

        /* 33, а не 32 - для safari*/
        const dayes_in_now_m = 33 - new Date(now_y, now_m, 33).getDate();

        const first_day = new Date(now_y, now_m, 1, 0, 0, 0, 0);

        /*Prev month*/
        if (first_day.getDay() !== 1) {
            var first_day_cnt = first_day.getDay();
            first_day_cnt === 0 ? first_day_cnt = 7 : null;
            for (let i = (first_day_cnt - 2); i >= 0; i-- ) {
                const d = new Date(now_y, now_m + 1, -i);
                dayes_arr.push({date: d, isPrev: true, color: '#0f0'})
            }
        }

        /*now month*/
        for (let i = 1; i <= dayes_in_now_m; i++) {
            const d = new Date(now_y, now_m, i, 0 , 0 ,0);
            dayes_arr.push({date: d,  color: 'none'})
        }
        const last_el_year = dayes_arr[dayes_arr.length -1].date.getFullYear()
        if (last_el_year !== now_y) {
            this.updateYear(last_el_year)
        }

        const last_day = dayes_arr[dayes_arr.length -1];
        var last_day_cnt = last_day.date.getDay();
        last_day_cnt === 0 ? last_day_cnt = 7 : null;

        /*Next month*/
        for (let i = 1; i < (7 - (last_day_cnt -1)); i++) {
            const d = new Date(now_y, now_m + 1, i);
            dayes_arr.push({date: d, isNext: true,  color: '#00f'})
        }

        this.setState({
            daysArr: dayes_arr
        })
    }
    prevMonth () {
        this.setState({
            curMonth: this.state.curMonth -1
        }, () => {
            this.getDayesNumbers(this.state.curMonth)
            console.log("current month ", getMonthName(this.state.curMonth))
        })
    }
    nextMonth () {
        this.setState({
            curMonth: this.state.curMonth +1
        }, () => {
            this.getDayesNumbers(this.state.curMonth)
            console.log("current month ", getMonthName(this.state.curMonth))
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


    render() {
        const days_names = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс',];

        return (
			<div className="calendar-comp">
				<div className="calendar">
                    <div className="arrows">
                        <Button onClick={::this.prevMonth} className='calendar-comp__left' />
                        <Button onClick={::this.nextMonth} className='calendar-comp__right' />
                    </div>
                    <div className="animate-block">
                        <div className="calendar-comp__mounth">
                            <span>{getMonthName(this.state.curMonth)} </span>
                            <span style={{marginLeft: '10px'}}>{this.state.curYear}</span>
                        </div>
                        <div className="calendar-comp__dayes">
                            <div className="dayes__dayes-names">
                                {
                                    days_names.map((item, i) => {
                                        return (
                                            <div className={`dayes-names_block`} key={i}>
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="dayes__dayes-numbers">
                                {
                                    this.state.daysArr.map( (day, i) => {
                                        return (
                                            <div
                                                className={
                                                    `
                                                        dayes-numbers__day ${day.active ? 'active' : ''}
                                                        ${day.isNext ? 'next-month' : null}
                                                        ${day.isPrev ? 'prev-month' : null}
                                                    `
                                                } key={i}
                                                style={{background: day.color}}
                                                onClick={this.dayClickHandler.bind(this, i, day.date)}
                                            >
                                                {day.date.getDate()}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
				</div>
			</div>
        )
    }
}
