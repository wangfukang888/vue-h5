export const order_status_type = {
  methods: {
    status(num : string) {
      switch(num) {
        case '待服务':
          return 'status-wait'
        break;
        case '服务中':
          return 'status-give'
        break;
        case '申诉中':
          return 'status-appeal'
        break;
        case '已取消':
          return 'status-cancel'
        break;
        default: return ''
      }
    }
  }
}