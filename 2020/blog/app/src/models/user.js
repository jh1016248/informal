import * as userServices from '../services/user';

console.log(userServices)
export default {
    namespace: 'users',
    state: {
        userInfo: {},
    },
    reducers: {

    },
    effects: {
        *login({ payload: values }, {put, call, select}) {
            const result = yield call(userServices.login, values);
            localStorage.setItem('token', result.token);
            const userRes = yield call(userServices.getUserInfo);
            yield put({
                type: 'saveUserInfo',
                user: userRes.data
            })
        },
        *getUserInfo() {

        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
        }
    }
}