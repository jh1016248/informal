import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

class UserEditModal extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        }
    }

    showModalHandle = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    handleOk() {
        console.log('ok')
    }

    handleCancel() {
        console.log('ok')
    }

    render() {
        const { children } = this.props;
        return (
            <>
                <span onClick={this.showModalHandle}>
                    {children}
                </span>
                <Modal
                    title="编辑用户"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>呵呵哈哈哈</p>
                </Modal>
            </>
        )
    }
}

export default UserEditModal
