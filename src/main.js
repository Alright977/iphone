import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import * as echarts from 'echarts'
import axios from './https'
import VueAMap from 'vue-amap'
import '@/assets/css/base.css'
import '@/assets/icon/iconfont.css'
import 'vant/lib/index.css'
Vue.config.productionTip = false
Vue.use(Vant)
Vue.prototype.$echarts = echarts
axios.defaults.baseURL = 'http://company.yunhuiyilian.com:24520/CompanyWebsiteApi/WebManage/OfficialWebsite/'
axios.defaults.timeout = 8000
Vue.prototype.$axios = axios
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '76b4ae7a2c05f04a47c15714e27ab564',
  plugin: ['AMap.ToolBar', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
