import api from 'api'

export function getAreaInfo(id = 0) {
  return api.get('/api/address/getArea', {
    params: {
      pid: id
    }
  })
}