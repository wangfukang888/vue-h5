import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import router from '../router'
import {Toast } from 'vant'

export const OK = 0
axios.defaults.timeout = 100000

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

// 通用参数
const params = {
  // source_type: 'app',
  // sign: '8ea8a9b8-29de-492d-a11e-d53916ebb900'
}

const api = axios.create({
  baseURL: '/',
  params,
  headers
})

// 响应拦截
api.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code != OK) {
      Toast(res.msg || '获取数据失败，请刷新重试')  
      res.no_status = 'NO_CODE'   
      return res
    }  
    return res.data
  },
  err => {
    const err_code = err.response.status
    switch (err_code) {
      case 304:
        console.log('缓存成功')
      break;
      case 401 :
        // 登录过期 ,2秒后跳转
        Toast('登录失效')
        localStorage.clear()
        setTimeout(() => {
          router.push('/login')
        },2000)     
      break; 
      case 500 :
        Toast('服务器访问失败,请刷新后重试')
      break; 
    }
  }
)

// 请求拦截
api.interceptors.request.use(
  function (config) {
    if (config.url === '/app/user/getuserinfo') {
      // 获取用户信息的时候不能写token
    } else {
      // 注入token
      let t: any = store.state
      config.params.token = t.token
    }
    if(config.method == 'post' ) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    Toast('服务器响应超时')
    return Promise.reject(err)
  }
)

export default api
