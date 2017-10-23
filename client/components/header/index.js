import React from 'react';
import styles from './style.scss';
import { Button, Input, Icon } from 'antd';
import AddEvent from './popovers/addEvent'
import FindEvent from './popovers/findEvent'
const Search = Input.Search;

export default class Header extends React.Component {

	constructor() {
		super();
		this.state = {
			visible: false,
			searchText: null
		}
	}


	changeSearch (e) {
		console.log('changeSearch')
		this.setState({
			searchText: e.target.value,
		});

	};

	render () {
        return(
			<div className="header">
				<div className="page-container">
					<div className="calendar-panel">
						<div className="calendar-panel__buttons">
							<AddEvent>
								<Button type="primary">Добавить</Button>
							</AddEvent>
							<Button type="primary">Обновить</Button>
						</div>
						<div className="calendar-panel__search">
							<div className="search-clear-val">
								<Icon type="close" />
							</div>
							<FindEvent searchText={this.state.searchText}>
								<Search
									placeholder="input search text"
									style={{ width: 200 }}
									onSearch={value => console.log(value)}
									onChange={::this.changeSearch}
								/>
							</FindEvent>
						</div>

					</div>
				</div>
			</div>
        );
	}
}
