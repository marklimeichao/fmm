// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueLazyLoad from 'vue-lazyload'
import foodbg from '../static/foodbg.jpg'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import MintUI from 'mint-ui'
import JsEncrypt from 'jsencrypt/bin/jsencrypt'
import 'mint-ui/lib/style.css'
require('swiper/dist/css/swiper.css')

Vue.use(VueAwesomeSwiper)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
  error:foodbg
})
Vue.use(MintUI)
Vue.prototype.$jsEncrypt = JsEncrypt
// const context="http://101.200.166.120:8080/fanmeimei/";
const context="http://101.200.166.120:8080/fmm/";
// const context = "http://app.fmeimei.com/fmm/";
export default context

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
