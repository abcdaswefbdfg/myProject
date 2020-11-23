// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import store from './store'

import vantUI from 'vant'
Vue.use(vantUI)
import 'vant/lib/index.css'
import './assets/css/reset.css'
import './assets/css/public.css'
import './assets/js/remScale'
import './assets/font/iconfont.css'

/* eslint-disable no-new */
Vue.prototype.$imgUrl = 'http://localhost:3000'
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
