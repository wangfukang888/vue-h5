
export const wx_scan = (wx: any, wx_info : object) => {
  // console.log(wx_info)
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
    appId: '<%=appId%>', // 必填，公众号的唯一标识  
    timestamp: '<%=Timestamp%>', // 必填，生成签名的时间戳  
    nonceStr: '<%=noncestr%>', // 必填，生成签名的随机串  
    signature: '<%=signature%>',// 必填，签名  
    jsApiList: ['checkJsApi', 'scanQRCode'] // 微信扫一扫接口
  })
  wx.ready(function() {
    console.log('微信接口调用成功')
  })
  wx.error(function(err : any) {
    console.log(err)
  })
  wx.scanQRCode({
    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res : any) {
      var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      location.href = result;
    },
    error: function () {
      return Promise.reject()
    }
  })
}