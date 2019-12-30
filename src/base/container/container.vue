<template>
  <div class="container">
    <n-bar :title="text" v-if="show_bar"/>
    <div class="b-scroll" :class="{'p-bar': show_bar}" ref="bscroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {NavBar} from 'vant'
import BScroll from 'better-scroll'

export default {
  components: {
    'n-bar': NavBar
  },
  props: {
    disable_scroll: {
      type: Boolean,
      default: true
    },
    show_bar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return{
      text: this.$store.state.nav_bar_t || ''
    }
  },
  mounted() {
    this.disable_scroll && this.$nextTick(() => {
      let bs_dom = this.$refs.bscroll
      this.bs = new BScroll(bs_dom, {
        click: true,
        scrollbar: { // 设置滚动条
          fade: true 
        }
      })
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
  top: 0;
  bottom: 0;
  background: #f1f1f1; 
  &.p-bar{
    top: size(92);
  }
}
</style>
