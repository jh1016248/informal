import axios from 'axios';
import { notification } from 'antd';

const request = axios.create();


request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.token;
    return config
})

request.interceptors.response.use(response => {
    if(response.status === 401) {
        notification.error({
            message: '请重新登录',
        });
        window.location.href = '/login';
        return 
    }
    if(response.status !== 200) {
        notification.error({
            message: response.message || '不知名错误',
        });
    }
    
    return response.data
}, (e) => {

    console.log(e)
    return {
        code: 0,
        data: '',
        message: '请重新登录'
    }
    return
    if(e.message === 'Request failed with status code 401') {        
        notification.error({
            message: '请重新登录',
        });
        window.location.href = '/login';
        return 
    }
    if(e.message === 'Request failed with status code 404') {
        notification.error({
            message: '服务器错误',
        });
        return {
            code: 0,
        }
    }
})

export default request;