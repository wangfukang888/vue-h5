import axios from 'axios'
import store from '@/store'
import qs from 'qs'

export const OK = 200
export const SIZE = 10

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

// 通用参数
const params = {
  source_type: 'app'
}

export const req = axios.create({
  baseURL: '/',
  params,
  headers,
  transformRequest: [
    function (data) {
      if (data instanceof FormData) {
        return data
      }
      return qs.stringify(data)
    }
  ]
})

req.interceptors.request.use(
  function (config) {
    if (config.url === '/app/user/getuserinfo') {
      // 获取用户信息的时候不能写token
    } else {
      // 注入token
      let t: any = store.state
      config.params.token = t.token
    }
    return config
  }
)
