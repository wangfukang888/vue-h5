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
  return req.post('/apis/api/Inter/queryDevice', { 
    deviceSn,
    lan: 'cn'
  })  
}

//历史记录
export function getOrderList(service_type, page, size=5) {
  return req.post('/apis/api/Inter/serviceOrderList', { 
    service_type,
    page,
    size
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
  return req.post('/apis/indexapp/Diagnosis/userCancelOrder', { 
    task_id
  })
}

//发布订单
export function getReleaseOrder(data) {
  return req.post('/apis/indexapp/Diagnosis/createDevice', data)
}

//发送验证码
export function getCode(mobile, event='mobilelogin') {
  return req.get('/apis/indexapp/Sms/send', { 
    params: {
      mobile,
      event
    }
  })
}

//验证码登录
export function mobileLogin(mobile, captcha) {
  return req.post('/apis/api/User/mobilelogin', { 
    mobile,
    captcha
  })
}

//支付
export function pay(order_no, pay_type=1) {
  return req.get('/apis/indexapp/Diagnosis/paymentAct', { 
    params: {
      order_no,
      pay_type
    }
  })
}

//上传图片
export function uploadImg(file) {
  return req.post('/apis/indexapp/Uploader/upload', file, {
    headers: {'Content-Type': 'multipart/form-data'} 
  })
}

//发起申诉
export function getAppeal(task_id, apply_img, content) {
  return req.post('/apis/indexapp/Diagnosis/explain', { 
    task_id,
    apply_img,
    content
  })
}

//申诉详情
export function appealDetail(task_id) {
  return req.post('/apis/api/Inter/applyDetail', {     
    task_id
  })
}

//确认服务
export function confirmService(task_id) {
  return req.post('/apis/indexapp/Diagnosis/confirmService', {     
    task_id
  })
}