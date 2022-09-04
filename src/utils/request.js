import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant';
import router from '@/router'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})

const tokenReq = axios.create( {
  baseURL: 'http://toutiao.itheima.net'
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {

  const token = store.state.myToken.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`

  }
  return config;
}, function (error) {

  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(res => {
  // console.log(res)
  return res
}, async err => {
  // console.log(err)
  if (err.response.status === 401) {
    const refToken = store.state.myToken.refresh_token

    try {
      if (refToken) {
        const res = await tokenReq( {
           url:  '/v1_0/authorizations',
           method: 'PUT',
           headers: {
             Authorization: `Bearer ${refToken}`
           }
         })
         // console.log(res)
         store.commit('updateToken', {
           token: res.data.data.token,
           refresh_token: refToken
   
         })
         //让原axios对象request 重新发送请求 
        return request(err.config)
       }
    } catch {
      Toast.fail('有效认证已过期，请重新登录')
      router.push('/login')
      return Promise.reject(new Error("refresh_token已过期"))
    }
  }
  return Promise.reject(err)
})

export default request