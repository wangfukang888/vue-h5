<template>
  <div class="order-detail">
    <div class="detail-m">
      <div class="container" v-if="info">
        <div class="g-order-status hd">
          <div class="l">
            <div class="status-text">{{info.serviceStatus}}</div>
            <div class="time">发布时间: {{info.user_time}}</div>
          </div>
          <div class="r"></div>
        </div>
        <div class="address-container">
          <div class="l">
            <div class="icon">
              <van-icon name="location" class="icon"/>
            </div>
          </div>
          <div class="r">
            <div class="address">{{info.user_address}}</div>
            <div class="user-info">{{info.username}}  {{info.telephone | formatPhone}}</div>
          </div>
        </div>
        <div class="goods-container">
          <div class="l">
            <img v-lazy="info.deviceImg" alt="">
          </div>
          <div class="r">
            <div class="name">{{info.deviceName}}</div>
            <div class="item">设备型号：{{info.deviceModel}}</div>
            <div class="item">服务类型：{{info.serviceType}}</div>
          </div>
        </div>
        <div class="remask-container" v-if="info.remask">
          <div class="l">备注：</div>
          <div class="r">{{info.remask}}</div>
        </div>
        <div class="ft">
          <div class="l"></div>
          <div class="r">安装费： <span>¥</span> <b>{{info.devicePrice.toFixed(2) || '0.00'}}</b></div>
        </div>
        <div class="name-p">   
          <info-list :noclick="true" :list_data="listdata"/>  
          <div class="icon" @click="getPhone(info.servicePhone)">
            <van-icon name="phone" class="icon-phone"/>
          </div>
        </div>
        <!-- <service-detail /> -->
      </div>  
      <loading vertical v-else/>
    </div>
    <div class="footer">
      <div class="l"></div>
      <div class="r">
        <div class="r-btn" v-if="info">
          <v-btn v-if="info.serviceStatus == '待服务'" class="btn" :loading="btnLoading" loading-text="取消中" type="info" @click="cancelOrder(info.task_id)">取消订单</v-btn>
          <v-btn v-if="info.serviceStatus == '完成服务'" class="btn" type="info" @click="show_appeal">发起申诉</v-btn>
          <v-btn v-if="info.serviceStatus == '申诉中'" class="btn" type="info" @click="goAppeal">申诉详情</v-btn>
          <v-btn class="btn btn-ok" type="info" @click="appeal(info.task_id)">确认完成</v-btn>
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
import ServiceDetail from 'com/order/service-detail'
import VAppeal from 'com/order/order-appeal'
import {order_status_type} from 'mixin/order-mixin'
import {getOrderDetail, getOrderCancel, getAppeal} from 'api'

export default {
  mixins: [order_status_type],
  components: {
    InfoList,
    VAppeal,
    ServiceDetail,
    'v-btn': Button
  },
  data() {
    return{
      listdata: [],
      info: null,
      is_cache: false,
      appeal_data: null,
      appeal_show: false,
      btnLoading: false
    }
  },
  activated() {
    this.appeal_show = false
    this.appeal_data = JSON.parse(sessionStorage.getItem('appeal_data')) || null
    // 没有缓存信息才重新请求
    if(!this.is_cache)  this.getDetail()
  },
  beforeRouteLeave(to, from, next) {
    // 清除缓存, 初始化状态
    if( to.name == 'order_list') {
      this.$store.commit('cache_data', false) 
    }
    this.is_cache = this.$store.state.is_cache_data
    next()
  },
  deactivated() {
    this.$refs.appeal && this.$refs.appeal.init() 
  },
  methods: {
    async getDetail() {
      this.info = null
      const data = await getOrderDetail(this.$route.params.id)
      if (typeof data == 'object') {     
        this.info = data
        this.list_info(data)   
        this.$store.commit('cache_data', true)   
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
    async appealSubmit(item) {
      const data = await getAppeal(this.info.task_id, item.fileList, item.message)
      if (data) this.$toast('申诉提交成功')
      this.appeal_show = false
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
    .hd{
      height: size(180);
      background:#2BA69F; 
      display: flex;
      text-align: left;
      color: #fff;
      @include border('bottom');   
      .l{
        flex: 1;
        padding: size(60) 0 0 size(60);
        .status-text{
          font-size: size(40);
          font-weight: 500;
          margin-bottom: size(20);
        }
        .time{
          font-size: size(26);
          color: #83D7D2;
        }
      } 
      .r{
        width: size(200);
      }
    }
    .address-container{
      display: flex;
      height: size(150);
      background: #fff;
      text-align: left;
      align-items: center;
      padding: size(20) size(60);
      margin-bottom: size(20);
      .l{
        width: size(60);
        .icon{
          color: #2BA69F;
        }
      }
      .r{
        flex: 1;
        .address{
          font-size: size(30);
          margin-bottom: size(20);
        }
        .user-info{
          font-size: size(26);
          color: #bbb;
        }
      }
    }
    .goods-container{
      display: flex;
      align-items: center;
      padding: size(30) size(60);
      background: #fff;
      .l{
        width: size(120);
        margin-right: size(30);
      }
      .r{
        flex: 1;
        text-align: left;
        line-height: size(32);
        .name{
          font-size: size(30);
          margin-bottom: size(18);
        }
        .item{
          font-size: size(23);
          color: #bbb;
        }
      }
    }
    .remask-container{
      display: flex;
      align-items: center;
      background: #fff;
      padding: size(20) size(60);
      color: #888;
      font-size: size(24);
      .r{
        flex: 1;
        padding-left: size(20);
        line-height: size(32);
        text-align: left;
      }
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
        color: #818181;
        b{
          color: #333;
          font-size: size(32);
        }
      }
    }
    .name-p{
      position: relative;
      margin-top: size(20);
      background: #fff;
      /deep/ .list{background: #fff;padding: size(30) size(60);}      
      .icon{
        position: absolute;
        right: 5%;
        top:30%;
        padding: size(20);
        color: #2BA69F;
        font-size: size(36);
      }   
    }
    .info{ 
      background: #fff;
      padding: size(20) size(60);
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
    box-shadow: 1px 1px 5px #ddd;
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
          background: #2BA69F;
        }     
      }
      /deep/ .van-button--info{
        background-color: transparent;
      }
    }
  }
}
</style>

