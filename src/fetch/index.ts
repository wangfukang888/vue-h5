import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import router from '../router'
import {is_production, proxy_handle} from '../common/config'
import {Toast } from 'vant'

export const OK = 0

axios.defaults.timeout = 10000

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
    if (url.indexOf('/Inter/getSerialMethod') > 0) {
      return res
    }
    if (url.indexOf('/Inter/queryDevice') > 0){
      if (res.code == 1) {
        // return res.data
        const no = res.data
        let menu_types: any =  []
        // 沙雕后台不会弄，写死
        let _str  = no && no.devicesn ? no.devicesn.substr(0,5) : 0
        if(_str == '98984') menu_types = ['产品退换货']
        return Object.assign(no || {}, {menu_types})
      } else { 
        Toast(res.msg || '获取数据失败，请刷新重试')  
        return null
      }
    }
    if (res.code != OK) {  
      Toast(res.msg || '获取数据失败，请刷新重试') 
      return null
    }  
    return res.data
  },
  err => {
    try {
      const err_code =  err.response.status
      switch (err_code) {
        case 401 :
          // 登录过期 ,2秒后跳转
          Toast('登录失效')
          localStorage.removeItem('userInfo')
          setTimeout(() => {
            router.push('/login')
          },2000)     
        break; 
        case 500 :
          Toast('服务器访问失败,请刷新后重试')
        break; 
      }
    } catch (err) {
      Toast('服务器错误或响应超时,请刷新重试')
    }
  }
)

// 请求拦截
api.interceptors.request.use(
  function (config) {
    if (is_production) config.url = proxy_handle(config.url)  
    // 注入token
    let t: any = store.state
    const headers_pro = config.headers['Content-Type'] == 'application/x-www-form-urlencoded'
    config.params.token = t.token  
    if(config.method == 'post' && headers_pro) {
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
