import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserEditModal extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        }
    }

    showModalHandle = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            visible: true
        })
    }

    handleOk = () => {
        this.props.form.validateFields((err, value) => {
            if(!err) {
                this.props.handleOk(value)
                this.handleCancel();
            }
        })
    }

    handleCancel = () => {
        this.setState({ visible: false })
    }

    render() {
        const { children } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { name, email, website } = this.props.record;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
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
                    <Form layout="horizontal" onSubmit={this.okHandle}>
                        <FormItem {...formItemLayout} label="Name">
                            {
                                getFieldDecorator('name', {
                                    initialValue: name,
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="Email">
                            {
                                getFieldDecorator('email', {
                                    initialValue: email,
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="Website">
                            {
                                getFieldDecorator('website', {
                                    initialValue: website
                                })(<Input />)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </>
        )
    }
}

export default Form.create()(UserEditModal)
