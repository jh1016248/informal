import request from '../utils/request';
import { PAGE_SIZE } from '../pages/users/constants';

export function fetch({ page = 1 }) {
    return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function remove(id) {
    return request(`/api/users/${id}`, {
        method: 'DELETE',
    });
}