// 是否是生产环境
export const is_production = process.env.NODE_ENV == 'production' 

// 生产环境代理处理
export function proxy_handle(url: any) {
  const pathArr = url.split('/')
  pathArr.splice(1,1)
  return pathArr.join('/')
}

// order 状态
export const order_status : any = {
  0: '待服务',
  1: '服务中',
  2: '完成服务，待确认',
  3: '申诉中',
  4: '已取消',
  5: '待接单',
  6: '已完成'
}

//判断是否是微信浏览器
function isWeiXin() {
  let ua : any = window.navigator.userAgent.toLowerCase();
  //mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
  } else {
      return false;
  } 
}
 


