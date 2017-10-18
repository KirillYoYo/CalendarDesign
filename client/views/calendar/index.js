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
				<Grid>
					<Row>
						<Col xs={12} md={12} >
							{this.props.children}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}