import React from 'react';
import calendar from './calendar.scss'
import {Row, Col, Grid} from 'react-bootstrap'

export default class Calendar extends React.Component {

	constructor() {
		super();
		this.state = {
			flag: null
		}
	}

	render() {
		return (
			<div className='calendar-page'>
                {this.props.children}
			</div>
		);
	}
}