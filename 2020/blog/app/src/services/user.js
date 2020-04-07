import request from '@/utils/request'
import CONFIG from '@/config';

export const login = ({ account, password }) => {
    return request.post(`${CONFIG.url}/user/login`, { account, password })
}
export const signup = ({ account, password }) => {
    return request.post(`${CONFIG.url}/user/signup`, { account, password  })
}

export const getUserInfo = () => {
    return request.get(`${CONFIG.url}/user/current`)
}