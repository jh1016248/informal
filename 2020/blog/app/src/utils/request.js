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
        // window.location.href = '/login';
        return 
    }
    if(response.data.code === 0 && response.data.message) {
        notification.error({
            message: '请求失败',
            description: response.data.message
        });
    }
    return response.data
}, (e) => {
    if(e.message === 'Request failed with status code 401') {        
        notification.error({
            message: '请重新登录',
        });
        // window.location.href = '/login';
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