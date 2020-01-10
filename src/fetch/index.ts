import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import router from '../router'
import {is_production, proxy_handle} from '../common/config'
import {Toast } from 'vant'

export const OK = 0
axios.defaults.timeout = 100000

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

// 通用参数
const params = {}

const api = axios.create({
  baseURL: '/',
  params,
  headers
})

// 响应拦截
api.interceptors.response.use(
  (response) => {
    const res = response.data
    const url : any = response.config.url
    // 匹配不同的接口url, 处理返回code不一样带来的差异
    const newurl = is_production ? url == '/api/Inter/queryDevice' : url == '/apis/api/Inter/queryDevice'
    if(newurl) {
      if( res.code == 1) {
        return res.data
      } else {
        Toast(res.msg || '获取数据失败，请刷新重试')
        return ''
      }  
    }
    if (res.code != OK) {
      Toast(res.msg || '获取数据失败，请刷新重试')  
      return null
    }  
    return res.data
  },
  err => {
    const err_code = err.response.status
    switch (err_code) {
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
    if (is_production) config.url = proxy_handle(config.url)    
    // 注入token
    let t: any = store.state
    config.params.token = t.token  
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
