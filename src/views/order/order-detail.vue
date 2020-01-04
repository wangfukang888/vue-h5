<template>
  <div class="order-detail">
    <div class="detail-m">
      <div class="container" v-if="info">
        <div class="g-order-status hd" :class="status(info.serviceStatus)">{{info.serviceStatus}}</div>
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
            <div class="r">{{info.user_address}}</div>
          </div>
          <div class="item">
            <div class="l">发布时间:</div>
            <div class="r">{{info.user_time}}</div>
          </div>
          <div class="item" v-if="info.remark">
            <div class="l">备注：</div>
            <div class="r">{{info.remark}}</div>
          </div>
        </div>
        <div class="ft">
          <div class="l"></div>
          <div class="r">安装费： <span>¥</span> <b>{{info.devicePrice.toFixed(2) || '0.00'}}</b></div>
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
        <div class="r-btn" v-if="info">
          <v-btn v-if="info.serviceStatus == '待服务'" class="btn" :loading="btnLoading" loading-text="取消中" type="info" @click="cancelOrder(info.task_id)">取消订单</v-btn>
          <v-btn class="btn" v-if="!appeal_data" :loading="btnLoading" loading-text="取消中" type="info" @click="show_appeal">发起申诉</v-btn>
          <v-btn class="btn" v-else type="info" @click="goAppeal">申诉详情</v-btn>
          <!-- <v-btn class="btn btn-ok" :loading="btnLoading" loading-text="取消中" type="info" @click="appeal(info.task_id)">确认服务</v-btn> -->
          <div class="btn btn-p" @click="getPhone(info.servicePhone)">联系服务人</div>
        </div>   
      </div>
    </div>
    <div v-show="appeal_show">
      <v-appeal ref="appeal" :show="appeal_show" @close="appeal_show = false" @submit="appealSubmit"/>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
import InfoList from 'com/partner/info-list'
import VAppeal from 'com/order/order-appeal'
import {order_status_type} from 'mixin/order-mixin'
import {getOrderDetail, getOrderCancel} from 'api'

export default {
  mixins: [order_status_type],
  components: {
    InfoList,
    VAppeal,
    'v-btn': Button
  },
  data() {
    return{
      listdata: [],
      info: null,
      appeal_data: null,
      appeal_show: false,
      btnLoading: false
    }
  },
  activated() {
    this.appeal_show = false
    this.appeal_data = JSON.parse(sessionStorage.getItem('appeal_data')) || null
    this.getDetail()
  },
  // beforeRouteLeave(to, from, next) {
  //   console.log(to,from)
  //   if(to.name == 'order_appeal') {
  //     from.meta.keepAlive = false
  //   } else {
  //     from.meta.keepAlive = true
  //   }
  //   next()
  // },
  deactivated() {
    this.$refs.appeal && this.$refs.appeal.init()
    // sessionStorage.clear()
  },

  methods: {
    async getDetail() {
      this.info = null
      const data = await getOrderDetail(this.$route.params.id)
      if(typeof data == 'object') {
        setTimeout(() => {
          this.info = data
          this.list_info(data)      
        }, 2000);    
      }
    },
    list_info(item) {
      this.listdata = [{
        realname: item.serviceName,
        headimage: item.serviceImage,
        servicenums: item.serviceNums,
        servicescore: item.serviceScore,
        serviceaddr: item.serviceAddr
      }]
    },
    cancelOrder(id) {
      this.$dialog.confirm({
        message: '确定取消订单吗'
      }).then((() => {
        this.btnLoading = true
        getOrderCancel(id).then(data => {
          this.btnLoading = false
          if(data) this.$toast('取消成功')
        }) 
      })).catch(() => {})
    },
    show_appeal() {   
      this.appeal_show = true
      document.title = '发起申诉'
    },
    goAppeal() {
      this.$router.push({
        name: 'order_appeal',
        id: 1
      })
    },
    appealSubmit() {
      this.appeal_show = false
      this.$toast('待开发中, 仅提供模拟')
      this.appeal_data = JSON.parse(sessionStorage.getItem('appeal_data')) || null
    },
    getPhone(phone) {
      const a = document.createElement('a')
      a.href = `tel: ${phone}`
      a.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.order-detail{
  .detail-m{
    position: fixed;
    top:0;
    width: 100%;
    background: #f1f1f1;
    bottom: size(100);
    overflow: auto;
    .container{
      line-height: size(400);
    }
    .hd{
      height: size(80);
      line-height: size(80);
      background: #fff; 
      @include border('bottom');    
    }
    .ft{
      display: flex;
      text-align: right;
      align-items: center;
      background: #fff;
      font-size: size(26);
      @include border('top');
      .l{
        width: size(200);
      }
      .r{
        flex: 1;
        height: size(80);
        line-height: size(80);
        padding-right: size(60);
        // color: #818181;
        span{
          color: #E31436;
        }
        b{
          color: #E31436;
          font-size: size(32);
        }
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
      .item{
        &:last-child{
          margin-bottom: 0;
        }
      }
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
        &.btn-ok{
          @extend .btn-p;
          background: #03B097;
        }     
      }
      /deep/ .van-button--info{
        background-color: transparent;
      }
    }
  }
}
</style>

