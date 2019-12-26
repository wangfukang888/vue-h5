import req from 'req'

export function getAreaInfo(id = 0) {
  return req.get('/apis/api/address/getArea', {
    params: {
      pid: id
    }
  })
}

export function getLogin(account, password) {
  return req.post('/apis/api/User/login', { 
    account,
    password
  })
}

// 选择设备列表
export function getDeviceList(device_type_id='') {
  return req.post('/apis/api/Inter/chooseDevice', { 
    device_type_id
  })
}

// 选择合伙人
export function getPartner(provice, city) {
  return req.post('/apis/api/Inter/choosePartner', { 
    provice,
    city
  })
}

//查询序列号
export function queryDevice(deviceSn) {
  return req.post('/tp/api/Device/getInfo', { 
    deviceSn,
    lan: 'cn'
  })  
}

//历史记录
export function getOrderList(service_type) {
  return req.post('/apis/api/Inter/serviceOrderList', { 
    service_type
  })
}

//发布订单
export function getReleaseOrder(data) {
  return req.get('/apis/indexapp/Diagnosis/createDevice', { 
    params: {
      data
    }
  })
}