<template>
  <div class="scroll-container" ref="scroll_list">
    <slot></slot>
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
    this.$nextTick(() => {
      let scroll_list = this.$refs.scroll_list
      this.scroll_list = new BScroll(scroll_list, {
        click: true,
        scrollbar: { // 设置滚动条
          fade: true 
        }
      })
      if (this.pullup) {
        this.scroll_list.on('scrollEnd', (pos) => {
          if (this.scroll_list.y <= (this.scroll_list.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
    })
  },
  methods: {
    refresh() {
      this.bs && this.bs.refresh()
    },
    destroy() {
      this.bs && this.bs.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: 100%;
  /deep/ .bscroll-vertical-scrollbar{
    width: 4px !important;
  }
}
.b-scroll{
  position: absolute;
  width: 100%;
  top: size(92);
  bottom: 0;
  // height: 100%;
  background: #f1f1f1; 
  &.no-bar{
    top: 0;
  }
}
</style>
