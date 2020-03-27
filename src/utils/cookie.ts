let Cookie = {
  get(name: string) {
    let arr, reg = new RegExp("(^| )" + name + "=([^]*)(|$)")
    if (arr = document.cookie.match(reg))
    return (arr[2])
    else
    return null
  },
  set(c_name : string, value: string, expiredays: number) {
    let exdate: any = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : "expires=" + exdate.toGMTString())
  },
  del(name: string) {
    let exp: any = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = this.get(name)
    if (cval != null)
    document.cookie = name + "=" + cval + "expires=" + exp.toGMTString()
  }
}

export default Cookie


