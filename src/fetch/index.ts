import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import {Toast } from 'vant';
export const OK = 200
export const SIZE = 10

axios.defaults.timeout = 100000

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

// 通用参数
const params = {
  source_type: 'app'
}

const api = axios.create({
  baseURL: '/',
  params,
  headers
})

// 响应拦截
api.interceptors.response.use(
  (response) => {
    let res = response.data
    if (res.code != 200) {
      Toast(res.msg || '')
      return res.msg
    }
    return res
  },
  err => {
    const err_code = err.response.status
    switch (err_code) {
      case 401 :
        // 登录过期 
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
