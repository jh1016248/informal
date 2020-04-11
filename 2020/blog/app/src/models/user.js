import * as userServices from '../services/user';

console.log(userServices)
export default {
    namespace: 'users',
    state: {
        userInfo: {},
    },
    effects: {
        *login({ payload: values }, {put, call, select}) {
            const result = yield call(userServices.login, values);
            if(result.code !== 200) {
                return result
            }
            else {
                localStorage.setItem('token', result.data);
                yield put({
                    type: 'getUserInfo'
                })
                return result
            }
        },
        *signup({ payload: values }, {put, call, select}) {
            yield call(userServices.signup, values);
        },
        *getUserInfo({ }, {put, call, select}) {
            const userRes = yield call(userServices.getUserInfo);
            yield put({
                type: 'saveUserInfo',
                user: userRes.data
            })
        },
    },
    reducers: { 
        saveUserInfo(state, { user }) {
            console.log(state)
            console.log(user)
            return {
                ...state,
                userInfo: user
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
        }
    }
}