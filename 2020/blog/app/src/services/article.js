import request from '@/utils/request'
import CONFIG from '@/config';

export const getArticles = ({ size, page, categoryId }) => {
    return request.get(`${CONFIG.url}/article/list`, { params: { size, page, categoryId } })
}
export const getArticleDetail = ({ id }) => {
    return request.get(`${CONFIG.url}/article/detail`, { params: {id} })
}
export const publishArticle = (data) => {
    return request.post(`${CONFIG.url}/article/create`, data)
}
export const deleteArticle = ({ id }) => {
    return request.post(`${CONFIG.url}/article/delete`, { id })
}