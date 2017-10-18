import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Popover } from 'antd';
import styles from './styles.scss'

class FindEvent extends Component {

    constructor() {
        super();
        this.state = {
            visible: false,
        }
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    render() {
        const arr = [
            {
                date: '12213',
                name: 'Ev 1'
            },
            {
                date: '3333',
                name: 'Ev 2'
            },
            {
                date: '12213',
                name: 'Ev 1'
            },
            {
                date: '3333',
                name: 'Ev 2'
            },
            {
                date: '12213',
                name: 'Ev 1'
            },
            {
                date: '3333',
                name: 'Ev 2'
            },
            {
                date: '12213',
                name: 'Ev 1'
            },
            {
                date: '3333',
                name: 'Ev 2'
            },
            {
                date: '12213',
                name: 'Ev 1'
            },
            {
                date: '3333',
                name: 'Ev 2'
            },
            {
                date: '12213',
                name: 'Ev 1'
            },
            {
                date: '3333',
                name: 'Ev 2'
            },
        ]
        const content = <div className={'find-event-popover__content'}>
            <div className="inner">
                {
                    arr.map((item, i) => {
                      return (
                          <div className={'find-event-popover__event'} key={i}>
                              <div className="title">
                                  {item.name}
                              </div>
                              <div className="date">
                                  {item.date}
                              </div>
                          </div>
                      )
                    })
                }
            </div>
        </div>
        return (
            <Popover
                content={content}
                trigger="click"
                visible={this.state.visible}
                placement="bottomLeft"
                onVisibleChange={this.handleVisibleChange}
                overlayClassName='find-event-popover'
            >
                {this.props.children}
            </Popover>
        );
    }
}

FindEvent.propTypes = {};
FindEvent.defaultProps = {};

export default FindEvent;
