import axios from 'axios'
import {is_production, proxy_handle} from '../common/config'
import {Toast} from 'vant'

const _config = {
  baseURL: '/',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

axios.interceptors.response.use(response => {
  let res = response.data
  if (res.code == 0 ) {
    return res.data
  } else {
    Toast(res.msg || '上传出现错误，请重试')
    return null
  }
}, error => {
  return Promise.reject(error)
})

axios.interceptors.request.use(
   config => {
    if (is_production) config.url = proxy_handle(config.url)    
    return config
  },
  err => {
    Toast('服务器响应超时')
    return Promise.reject(err)
  }
)

export function uploadImage(file: any) {
  const url = '/apis/indexapp/Uploader/upload'
  let fd = new FormData()
  fd.append('file', file.file)
  return axios.post(url, fd, _config)
}

