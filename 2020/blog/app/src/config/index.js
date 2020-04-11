export default {
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:3030/api' : 'http://jhapi.fj-wanhe.com/api',
    customerPages: ['/login', '/register', '/editor'],
}