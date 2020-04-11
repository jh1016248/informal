import request from '@/utils/request'
import CONFIG from '@/config';

export const getCategoryList = () => {
    return request.get(`${CONFIG.url}/category/list`)
}