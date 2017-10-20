import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Popover } from 'antd';
import styles from './style.scss'
import {getMonthNum} from '../../../helpres'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addEventAction} from '../../../actions/calendar';

class AddEvent extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            value: null
        }
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    }
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }
    addEventClick () {
        const d = new Date();
        const stringArr = this.state.value.split(' ');
        d.setDate(stringArr[0])
        d.setMonth(getMonthNum(stringArr[1]))
        d.setHours(stringArr[2].split(':')[0])
        d.setMinutes(stringArr[2].split(':')[1])
        d.setSeconds(0)
        var eventName = '';
        if (stringArr[3]) {
            for (let i = 3; i < stringArr.length; i++) {
                eventName += stringArr[i] + ' '
            }
        } else {
            eventName = null
        }
        const new_val = {
            date: d,
            eventName
        }
        this.props.addEventAction(new_val)
    }
    changeInput = (e) => {
        this.setState({
            value: e.target.value,
        });

    };

    render() {
        const content = <div className='add-event__content'>
            <Input
                className='add-event__content__input'
                placeholder='15 марта, 14:00, день рождения'
                onChange={this.changeInput}
            />
            <Button onClick={::this.addEventClick}>Создать</Button>
            <div className="close" onClick={this.hide}><Icon type="close" /></div>
        </div>;

        return (
            <Popover
                content={content}
                trigger="click"
                visible={this.state.visible}
                placement="bottomLeft"
                onVisibleChange={this.handleVisibleChange}
                overlayClassName='add-event-popover'
            >
                {this.props.children}
            </Popover>
        );
    }
}

AddEvent.propTypes = {};
AddEvent.defaultProps = {};

function mapStateToProps(state)  {
    return {
        calendar: state.calendar
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEventAction: bindActionCreators(addEventAction, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
