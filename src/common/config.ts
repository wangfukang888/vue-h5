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
