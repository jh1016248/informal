import request from '@/utils/request'
import CONFIG from '@/config';

export const getCategoryList = () => {
    return request.get(`${CONFIG.url}/category/list`)
}

export const deleteCategory = id => {
    return request.post(`${CONFIG.url}/category/delete`, { id })
}

export const addCategory = name => {
    return request.post(`${CONFIG.url}/category/publishCategory`, { name })
}