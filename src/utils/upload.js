import axios from 'axios'
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

export function uploadImage(file) {
  const url = 'apis/indexapp/Uploader/upload'
  let fd = new FormData()
  fd.append('file', file.file)
  return axios.post(url, fd, _config)
}
