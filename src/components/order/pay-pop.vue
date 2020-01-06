<template>
  <div class="pay-pop">
  <v-overlay :show="show">
    <div class="wrapper" @click.stop>
      <div class="title">请确认微信支付是否已完成</div>
      <div class="item item-ok" @click="handlepay">已完成支付</div>
      <div class="item" @click="handlepay">支付遇到问题，或取消了支付</div>
    </div>
  </v-overlay>
  </div>
</template>

<script>
import { Overlay } from 'vant'

export default {
  components: {
    'v-overlay': Overlay
  },
  data() {
    return{
      show: false
    }
  },
  methods: {
    init() {
      console.log('打开')
      this.show = true
    },
    handlepay() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: size(500);
  background: #fff;
  border-radius: size(10);
  .title{
    height: size(120);
    line-height: size(120);
    font-size: size(26);
    @include border('bottom');
  }
  .item{
    height: size(90);
    line-height: size(90);
    font-size: size(30);
    color: #888;
    @include border('top');
    &.item-ok{
      color: #E31436;
    }
  }
}
</style>
