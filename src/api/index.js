import req from 'req'

//grid模块
export function getModelGridList() {
  return req.post('/apis/api/Inter/showDataList')
}

//登录
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

//订单详情
export function getOrderDetail(order_no) {
  return req.post('/apis/api/Inter/serviceOrderDetail', { 
    order_no
  })
}

//取消订单
export function getOrderCancel(task_id) {
  return req.post('/apis/indexapp/Diagnosis/cancelOrder', { 
    task_id
  })
}

//发布订单
export function getReleaseOrder(data) {
  return req.get('/apis/indexapp/Diagnosis/createDevice', { 
    params: data
  })
}

//发送验证码
export function getCode(mobile) {
  return req.get('/apis/indexapp/Sms/send', { 
    params: {
      mobile
    }
  })
}