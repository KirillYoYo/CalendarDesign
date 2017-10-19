import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Input, Icon, Popover} from 'antd';
import styles from './style.scss'
import {getMonthName} from '../../helpres'

const {TextArea} = Input;

class CalendarPopover extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        }
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    }
    handleVisibleChange = (visible) => {
        this.setState({visible});
    }

    render() {
        console.log('!!!');
        console.log(this.props);
        console.log(this.props.event);
        console.log('!!!');
        const content = <div className='add-event__content'>
            {
                !this.props.event ?
                    <div>
                        <div className="add-event__content__row">
                            <Input className='add-event__content__input' placeholder='Событие'/>
                        </div>
                        <div className="add-event__content__row">
                            <Input className='add-event__content__input' placeholder='день, месяц, год'/>
                        </div>
                        <div className="add-event__content__row">
                            <Input className='add-event__content__input' placeholder='имена участников'/>
                        </div>
                        <div className="add-event__content__row">
                            <TextArea className={'add-event__content__textarea'}/>
                        </div>
                    </div>
                    : <div>
                        <div>{this.props.event.eventName}</div>
                        <div>{this.props.event.date.getDay()}</div>
                        <div>{getMonthName(this.props.event.date.getMonth())}</div>

                    </div>
            }

            <div className="add-event__content__row">
                <Button style={{marginRight: '14px'}}>Создать</Button>
                <Button>Удалить</Button>
            </div>
            <div className="close" onClick={this.hide}><Icon type="close"/></div>
        </div>;

        return (
            <Popover
                content={content}
                trigger="click"
                visible={this.state.visible}
                placement="rightTop"
                onVisibleChange={this.handleVisibleChange}
                overlayClassName='update-event-popover'
            >
                {this.props.children}
            </Popover>
        );
    }
}

CalendarPopover.propTypes = {};
CalendarPopover.defaultProps = {};

export default CalendarPopover;
