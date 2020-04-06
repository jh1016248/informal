import axios from 'axios';

const request = axios.create();

request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.token;
    return config
})

request.interceptors.response.use(response => {
    console.log(response)
    if(response.status !== 200) {
        return {
            code: 0,
            msg: ''
        }    
    }
    
    return response.data
}, (e) => {
    console.log(e)
})

export default request;