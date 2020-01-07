<template>
  <div class="container">
    <n-bar :title="text" v-if="show_bar"/>
    <div class="b-scroll" :class="{'p-bar': show_bar}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {NavBar} from 'vant'

export default {
  components: {
    'n-bar': NavBar
  },
  props: {
    show_bar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return{
      text: this.$store.state.nav_bar_t || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: 100%;
}
.b-scroll{
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: auto;
  background: #f1f1f1; 
  &.p-bar{
    top: size(92);
  }
}
</style>
