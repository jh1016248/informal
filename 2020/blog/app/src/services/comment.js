import request from '@/utils/request'
import CONFIG from '@/config';

export const getComment = ( articleId ) => {
    return request.get(`${CONFIG.url}/comment/getComment`, { params: { articleId } })
}

export const sendComment = ({ articleId, content, replyId, replyUserId, replyUserName }) => {
    return request.post(`${CONFIG.url}/comment/sendComment`,{ articleId, content, replyId, replyUserId, replyUserName })
}