import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入全局样式
import '@/style/index.less'

// import vant package
import '@/utils/vant'

// import flexible plug-in
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
