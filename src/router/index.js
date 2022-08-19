import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入组件
import login from '@/views/login'
const routes = [
  {path: '', redirect: '/login'},
  {path: '/login', component: login},
  {path: '/layout', component: () => import('@/views/layout'), 
  children: [
    {path: 'home', component: () => import('@/views/home')}, 
    {path: 'ask', component: () => import('@/views/ask')}, 
    {path: 'video', component: () => import('@/views/video')},
    {path: 'user', component: () => import('@/views/user')},
  ] }
]

const router = new VueRouter({
  routes
})

export default router
