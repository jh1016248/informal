import request from '@/utils/request'
import CONFIG from '@/config';

export const getArticles = ({ size, page }) => {
    return request.get(`${CONFIG.url}/article/getArticles`, { params: { size, page } })
}
export const getArticleDetail = ({ id }) => {
    return request.get(`${CONFIG.url}/article/getArticleDetail`, { params: {id} })
}