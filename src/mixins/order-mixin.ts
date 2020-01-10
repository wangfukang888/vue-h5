import { order_status } from '@/common/config'

export const order_status_type = {
  methods: {
    status(num : string) {
      let m = Number(num)
      switch(m) {
        case 0:
          return 'status-wait'
        break;
        case 1:
          return 'status-give'
        break;
        case 3:
          return 'status-appeal'
        break;
        case 4:
          return 'status-cancel'
        break;
        default: return ''
      }
    },
    status_text(num : string) {
      let n = Number(num)
      return order_status[n]
    }
  }
}