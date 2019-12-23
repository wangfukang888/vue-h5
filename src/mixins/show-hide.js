export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      console.log('hide')
      this.isShow = false
    }
  }
}