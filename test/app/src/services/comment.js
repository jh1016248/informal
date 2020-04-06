import request from '@/utils/request'
import CONFIG from '@/config';

export const getComment = ( articleId ) => {
    console.log(articleId)
    return request.get(`${CONFIG.url}/getComment`, { params: { articleId } })
}