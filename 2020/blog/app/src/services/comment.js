import request from '@/utils/request'
import CONFIG from '@/config';

export const getComment = ( articleId ) => {
    return request.get(`${CONFIG.url}/comment/getComment`, { params: { articleId } })
}

export const sendComment = ({ articleId, content, repliesId }) => {
    return request.post(`${CONFIG.url}/comment/sendComment`,{ articleId, content, repliesId })
}