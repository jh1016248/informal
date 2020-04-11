import { Form, Icon, Input, Button, notification } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { router } from 'umi'
import Link from 'umi/link';
const FormItem = Form.Item;
const bg = require("../../assets/1.jpg");

function Login(props) {
    function submit() {
        props.form.validateFields((err, values) => {
            if (!err) {
                props.dispatch({
                    type: 'users/login',
                    payload: values
                }).then(res => {
                    if(res.code === 200) {
                        notification.success({
                            message: '登录成功',
                        });
                        router.replace('/')
                    }
                    else {
                        notification.error({
                            message: `登录失败,${res.message}`,
                        });
                    }
                })
            }
        })
    }
    const { getFieldDecorator } = props.form;
    return (
        <>
            <div>
                <div className="background" style={{ backgroundImage: `url(${bg})` }}></div>
                <div className={styles.login}>
                    <div className={styles.avatar}>
                        <img src={require('../../assets/avatar/avatar.png')} alt="头像" />
                    </div>
                    <div style={{ width: '50%' }}>
                        <p className="text-c">欢迎归来</p>
                        <div className="mb10"></div>
                        <Form onSubmit={submit} className="login-form">
                            <FormItem>
                                {
                                    getFieldDecorator('account', {
                                        rules: [{ required: true, message: '请输入账号' }],
                                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码' }],
                                    })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)
                                }
                            </FormItem>
                        </Form>
                        <div className="mb10"></div>
                        <div className="text-r">
                            {/* <a to="/register" style={{ marginRight: '10px' }}>注册</a> */}
                            {/* <Link to="/register" style={{ marginRight: '10px' }}>注册</Link> */}
                            <Button type="primary" htmlType="submit" size="large" onClick={submit}>登录</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default connect()(Form.create()(Login));