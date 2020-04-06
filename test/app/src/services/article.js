import request from '@/utils/request'
import CONFIG from '@/config';

export const getArticles = ({ size, page }) => {
    return request.get(`${CONFIG.url}/getArticles`, { params: { size, page } })
}
export const getArticleDetail = ({ id }) => {
    return request.get(`${CONFIG.url}/getArticleDetail`, { params: {id} })
}