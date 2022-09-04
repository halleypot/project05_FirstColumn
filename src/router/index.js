import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {Toast} from 'vant'

Vue.use(VueRouter)

// 导入组件 (原始方法 vs. 动态导入)
import login from '@/views/login'
const routes = [
  {path: '', redirect: '/layout/home'},
  {path: '/login', component: login},
  {path: '/layout', component: () => import('@/views/layout'), 
  children: [
    { path: 'home', component: () => import('@/views/home') }, 
    { path: 'ask', component: () => import('@/views/ask') }, 
    { path: 'video', component: () => import('@/views/video') },
    { path: 'user', component: () => import('@/views/user'), meta:{needLogin: true}, }, 
  ] },

  { path: '/user/edit', component: () => import('@/views/user/edit.vue'), meta:{needLogin: true} },
  { name: 'detail', path: '/home/detail', component: () => import('@/views/detail')},
  { path: '/home/search', component: () => import('@/views/search')}
]

const router = new VueRouter({
  routes
})

// 添加导航守卫
router.beforeEach( (to, from, next) => {
  const needLogin = to.meta.needLogin

  if(needLogin) {

    const token = store.state.myToken.token
    // token造假怎么办？
    if (token) {
      next()
    }else {
      // 跳转用next 还是 router.push
      Toast.fail('身份验收失效')
      
      next(`/login?url=${to.path}`)
    }

  }else {
    // Toast.fail('please sign up')
    next()}
})
  

export default router
