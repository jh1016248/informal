import request from '@/utils/request'
import CONFIG from '@/config';

export const getComment = ( articleId ) => {
    return request.get(`${CONFIG.url}/comment/list`, { params: { articleId } })
}

export const sendComment = ({ articleId, content, replyId, replyUserId }) => {
    return request.post(`${CONFIG.url}/comment/reply`,{ id: articleId, content, replyId, replyUserId })
}

export const getReplyList = ( articleId ) => {
    return request.get(`${CONFIG.url}/comment/replyList`, { params: { articleId } })
}
