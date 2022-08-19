import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

Vue.config.productionTip = false

// import vant package
import '@/utils/vant'
// 导入全局样式
import '@/style/index.less'

// import flexible plug-in
import 'amfe-flexible'


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
