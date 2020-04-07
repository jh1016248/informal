
import react, { useEffect, useRef, useState } from 'react'; 
import { router } from 'umi';
import { login } from '@/services/user';

export default () => {
    const pwdRef = useRef();
    const userNameRef = useRef();

    const handleLogin = () => {
        const account = userNameRef.current.value;
        const password = pwdRef.current.value;
        const formData = {
            account, password
        }

        login(formData).then(res => {
            if(res.code === 200) {
                localStorage.token = res.token;
                router.replace('/')
            }
        })
    }
    return (
        <div className="login-page">
            <div className="cell">
                <div className="label">用户名</div>
                <div className="content">
                    <input type="text"  ref={ userNameRef }/>
                </div>
            </div>
            <div className="cell">
                <div className="label">密码</div>
                <div className="content">
                    <input type="password" ref={ pwdRef }/>
                </div>
            </div>
            <div className="cell">
                <div className="label"></div>
                <div className="content">
                    <button onClick={() => { handleLogin() }}>登录</button>
                </div>
            </div>
        </div>
    )
}