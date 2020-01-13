import { order_status } from '@/common/config'

export const order_status_type = {
  methods: {
    status(num : string) {
      let m = Number(num)
      let text = ''
      switch(m) {
        case 0:
          text = 'status-wait' 
          break;
        case 1:
          text = 'status-give'
        break;
        case 3:
          text = 'status-appeal'
        break;
        case 4:
          text = 'status-cancel'
        break;
      }
      return text
    },
    status_text(num : string) {
      let n = Number(num)
      return order_status[n]
    }
  }
}