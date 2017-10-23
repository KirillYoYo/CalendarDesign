import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
import Calendar from './calendar';
import CalendarComp from '../components/calendarComp';
import app from './app.scss';

class App extends React.Component {

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if (nextProps.match !== this.props.match) {
			return false
		}
		return true
	}


	render () {
		return (
			<div className='app-inner'>
				<Header />
				<div className="page-container">
					<Calendar>
						<CalendarComp />
					</Calendar>
				</div>
			</div>
		)
	}
}

export default App;