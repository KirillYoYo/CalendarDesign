import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Popover } from 'antd';
import styles from './styles.scss'

class AddEvent extends Component {
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
        this.setState({ visible });
    }

    render() {
        const content = <div className='add-event__content'>
            <Input className='add-event__content__input' placeholder='15 марта, 14:00, день рождения' />
            <Button>Создать</Button>
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

export default AddEvent;
