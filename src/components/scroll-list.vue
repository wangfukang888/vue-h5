<template>
  <div class="scroll-container" ref="scroll">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    data: Number,
    pullup: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    data(val) {
      if(val) {
        this.refresh()
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
    }, 20)
    this.$nextTick(() => {
      
    })
  },
  methods: {
    // 滚动初始化
    initScroll() {
      let scroll = this.$refs.scroll
      this.scroll = new BScroll(scroll, {
        click: true,
        scrollbar: { // 设置滚动条
          fade: true 
        }
      })
      if (this.pullup) {
        this.scroll.on('scrollEnd', (pos) => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    scrollTop() {
      this.scroll && this.scroll.scrollTo(0, 0)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      console.log('更新')
    },
    destroy() {
      this.scroll && this.scroll.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container{
  /deep/ .bscroll-vertical-scrollbar{
    width: 4px !important;
  }
}
</style>
