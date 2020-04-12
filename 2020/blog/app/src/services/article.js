import request from '@/utils/request'
import CONFIG from '@/config';

export const getArticles = ({ size, page, categoryId }) => {
    return request.get(`${CONFIG.url}/article/getArticles`, { params: { size, page, categoryId } })
}
export const getArticleDetail = ({ id }) => {
    return request.get(`${CONFIG.url}/article/getArticleDetail`, { params: {id} })
}
export const publishArticle = ({ content, title }) => {
    return request.post(`${CONFIG.url}/article/publishArticle`, { title, content })
}
export const deleteArticle = ({ id }) => {
    return request.post(`${CONFIG.url}/article/delete`, { id })
}