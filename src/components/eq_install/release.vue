<template>
  <div class="release-container">
    <scroll-view class="release-wrap" ref="list_p">
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
            <div class="l">服务地址:</div>
            <div class="r">{{r_info.address.split('-').join('')}}{{r_info.f_address}}</div>
          </div>
          <div class="item" v-if="r_info.remark">
            <div class="l">备注：</div>
            <div class="r">{{r_info.remask}}</div>
          </div>
        </div>
        <div class="title">合伙人详情</div>
        <info-list :noclick="true" :list_data="partener_info"/>
      </div>
    </scroll-view>
    <div class="footer" v-if="r_info">
      <div class="left">
        安装费：¥ {{r_info.select_info.device_price.toFixed(2)}}
      </div>
      <div class="btn r-btn">
        <v-btn color="#2BA69F" :loading="isLoading" type="info" loading-text="发布中..." @click="goRelease">立即发布</v-btn>
      </div>
    </div>
    <pay-pop ref="pay_pop"/>
  </div>
</template>

<script>
import InfoList from 'com/partner/info-list'
import PayPop from 'com/order/pay-pop'
import { Button } from 'vant'
import {getReleaseOrder, pay} from 'api'

export default {
  data() {
    return {
      addr: [],
      r_info: null,
      partener_info: [],
      show_picker: false,
      show_type: false,
      isLoading: false
    };
  },
  components: {
    InfoList,
    PayPop,
    'v-btn': Button
  },
  mounted() {
    let store_data = this.$store.state.install_info
    if(store_data) {
      this.partener_info = [store_data.partner_info]
      this.r_info = store_data
    }
  },
  methods: {  
    release_data(type) {
      const data = this.$store.state.install_info
      const address_info = data.address.split('-')
      return {
        type,
        partner_id: data.partner_info.user_id,
        device_id: data.select_info.id,
        device_type_id: data.select_info.device_type_id,
        username: data.name,
        telephone: data.phone,
        user_time: data.time,
        user_address: data.f_address,
        remark: data.remask,
        user_province: address_info[0],
        user_city: address_info[1]
      }
    },
    async goRelease() {
      this.isLoading = true
      const data = await getReleaseOrder( this.release_data(0) )
      if(data instanceof Object) {
        this.$toast('支付发起成功，正在跳转支付...')
        window.location.href= data.url
      }
      this.isLoading = false
    }
  }
};
</script>

<style lang="scss" scoped>
.release-container {
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
      padding: size(30) 0;
    }
    .info{
      padding-top: 0;
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

