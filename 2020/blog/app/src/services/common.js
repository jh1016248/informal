import request from '@/utils/request'
import CONFIG from '@/config';

export const uploadFile = ( type, formData ) => {
    return request.post(`${CONFIG.url}/common/upload?type=${type}`, formData)
}