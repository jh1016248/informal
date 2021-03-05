import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import ZgModal from '@/components/ZgModal'
import ZgTable from '@/components/ZgTable'
import ZgQuery from '@/components/ZgQuery'
import ZgForm from '@/components/ZgForm'

Vue.component('zg-modal', ZgModal)
Vue.component('zg-table', ZgTable)
Vue.component('zg-query', ZgQuery)
Vue.component('zg-form', ZgForm)

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, { size: 'medium' })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
