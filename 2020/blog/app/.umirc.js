
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index.jsx' },
        { path: '/404', component: '../pages/404/index.jsx' },
        { path: '/login', component: '../pages/login/page.jsx' },
        { path: '/editor', component: '../pages/editor/index.jsx' },
        // { path: '/register', component: '../pages/register/index.jsx' },
        { path: '/article', component: '../pages/article/index.jsx' },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'app',
      dll: true,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
