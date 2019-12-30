<template>
  <div class="order-detail">
    <div class="detail-m">
      <div class="container" v-if="info">
        <div class="hd" :class="status(info.serviceStatus)">{{info.serviceStatus}}</div>
        <div class="g-order-info info">
          <div class="item">
            <div class="l">服务类型:</div>
            <div class="r">{{info.serviceType}}</div>
          </div>
          <div class="item">
            <div class="l">设备名称:</div>
            <div class="r">{{info.deviceName}}</div>
          </div>
          <div class="item">
            <div class="l">设备型号:</div>
            <div class="r">{{info.deviceModel}}</div>
          </div>
          <div class="item">
            <div class="l">服务地址:</div>
            <div class="r">{{info.serviceAddr.split('-').join('')}}{{info.user_address}}</div>
          </div>
          <div class="item" v-if="info.remark">
            <div class="l">备注：</div>
            <div class="r">{{info.remark}}</div>
          </div>
        </div>
         <div class="name-p">   
          <info-list :noclick="true" :list_data="listdata"/>  
        </div>
      </div>  
      <loading vertical v-else/>
    </div>
    <div class="footer">
      <div class="l"></div>
      <div class="r">
        <div class="r-btn">
          <v-btn class="btn" :loading="btnLoading" loading-text="取消中" type="info" @click="cancelOrder(info.task_id)">取消订单</v-btn>
          <div class="btn btn-p" @click="getPhone(info.servicePhone)">联系服务人</div>
        </div>   
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
import InfoList from 'com/partner/info-list'
import {getOrderDetail, getOrderCancel} from 'api'

export default {
  components: {
    InfoList,
    'v-btn': Button
  },
  data() {
    return{
      listdata: [],
      info: null,
      isloading: false,
      btnLoading: false
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const data = await getOrderDetail(this.$route.params.id)
      if(typeof data == 'object') {
        this.info = data
        this.list_info(data)       
      }
    },
    list_info(item) {
      this.listdata = [{
        realname: item.serviceName,
        headimage: item.serviceImage,
        servicenums: item.serviceNums,
        servicescore: item.serviceScore,
        serviceaddr: "广东省深圳市"
      }]
    },
    cancelOrder(id) {
      this.$dialog.confirm({
        message: '确定取消订单吗'
      }).then((() => {
        this.btnLoading = true
        getOrderCancel(id).then(data => {
          this.btnLoading = false
          if(typeof data != 'string') return this.$toast('取消成功')
        }) 
      })).catch(() => {})
    },
    getPhone(phone) {
      const a = document.createElement('a')
      a.href = `tel: ${phone}`
      a.click()
    },
    status(num) {
      switch(num) {
        case '待服务':
          return 'status-wait'
        break;
        case '服务中':
          return 'status-give'
        break;
        default: return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-detail{
  .loading{
    padding: size(300) 0;
  }
  .detail-m{
    position: fixed;
    top:0;
    width: 100%;
    background: #f1f1f1;
    bottom: size(100);
    overflow: auto;
    .hd{
      height: size(100);
      line-height: size(100);
      background: #fff; 
      background: #03B097;
      color: #fff;
      &.status-wait{
        background: #FA6400;
      }
      &.status-give{
        background: #d05392;
      }
    }
    .name-p{
      margin-top: size(20);
      /deep/ .list{background: #fff;padding: size(30) size(60);}
    }
    .info{ 
      background: #fff;
      padding: size(40) size(60);
      text-align: left;
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
    .l{
      width: size(100);
    }
    .r{
      flex: 1;
      padding: size(10) 0;
      .r-btn{
        display: flex;
        padding-right: size(15);
        flex-direction: row-reverse;
      }
      .btn{
        display: block;
        padding: 0 size(30);
        height: size(70);
        line-height: size(70);
        color: #666;
        font-size: size(26);
        border:1px solid #666;
        margin-right: size(20);
        border-radius: size(60); 
        &.btn-p{
          background: #35A1F2;
          color: #fff;
          border: 0;
        }    
      }
      /deep/ .van-button--info{
        background-color: transparent;
      }
    }
  }
}
</style>

