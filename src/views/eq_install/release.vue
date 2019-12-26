<template>
  <div class="release-container">
    <scroll-list class="release-wrap" ref="list_p">
      <div class="main" v-if="r_info">
        <div class="title">诊断详情</div>
        <div class="g-order-info info">
          <div class="item">
            <div class="l">服务类型:</div>
            <div class="r">现场安装</div>
          </div>
          <div class="item">
            <div class="l">设备名称:</div>
            <div class="r">{{r_info.select_info.device_name}}</div>
          </div>
          <div class="item">
            <div class="l">设备型号:</div>
            <div class="r">{{r_info.select_info.device_model}}</div>
          </div>
          <div class="item">
            <div class="l">服务地址</div>
            <div class="r">{{r_info.address}}{{r_info.f_address}}</div>
          </div>
          <div class="item">
            <div class="l">备注：</div>
            <div class="r">{{r_info.remask}}</div>
          </div>
        </div>
        <div class="title">合伙人详情</div>
        <info-list :noclick="true" :list_data="partener_info"/>
      </div>
    </scroll-list>
    <div class="footer" v-if="r_info">
      <div class="left">
        安装费：¥ {{r_info.select_info.device_price.toFixed(2)}}
      </div>
      <div class="r-btn">
        <v-btn color="#2BA69F" :loading="isLoading" type="info" loading-text="发布中..." @click="goRelease">立即发布</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import InfoList from 'com/partner/info-list'
import scrollList from "com/scroll-list"
import { Button } from 'vant'

export default {
  data() {
    return {
      addr: [],
      r_info: null,
      partener_info: 1,
      show_picker: false,
      show_type: false,
      isLoading: false
    };
  },
  components: {
    scrollList,
    InfoList,
    'v-btn': Button
  },
  mounted() {
    let store_data = this.$store.state.install_info
    if(store_data) {
      store_data.address = store_data.address.split('-').join('')
      this.r_info = store_data
    }
  },
  methods: {  
    getCity(arr) {
      console.log(arr)
      this.partner_data.address = arr.join('-')
    },
    goActive() {

    },
    goRelease() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$toast('发布成功')
        this.$router.push('order_ok')
      },5000)
    }
    
  }
};
</script>

<style lang="scss" scoped>
.release-container {
  // padding: size(10) size(60);
  .release-wrap{
    position: absolute;
    width: 100%;
    top:size(20);
    bottom: size(100);
    padding: size(0) size(60);
    text-align: left;
    overflow: hidden;
    .title{
      color: #202020;
      font-size: size(34);
      padding: size(40) 0;
    }
  }
  .footer{
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    background: #fff;
    display: flex;
    align-items: center;
    height: size(100);
    border-top: size(1) solid #eee;
    .left{
      flex: 1;
      color:#E31436;
      font-weight: bold;
    }
    .r-btn{
      width: size(240);
      height: 100%;
      /deep/ .van-button--normal{
        width: 100%;
      }
      /deep/ .van-button{
        border-radius: 0;
        height: 100%;
      }
    }
    
  }
  
}
</style>

