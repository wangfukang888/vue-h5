<template>
  <div class="order-detail">
    <scroll-view class="detail-m">
      <div class="container" v-if="info">
        <div class="g-order-status hd">
          <div class="l">
            <div class="status-text">{{ status_text(info.taskstatus) }}</div>
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
        <div class="ft" v-if="info.devicePrice">
          <div class="l"></div>
          <div class="r">安装费： <span>¥</span> <b>{{info.devicePrice.toFixed(2) || '0.00'}}</b></div>
        </div>
        <div class="name-p">   
          <info-list :noclick="true" :list_data="listdata"/>  
          <div v-if="info.servicePhone" class="icon" @click="getPhone(info.servicePhone)">
            <van-icon name="phone" class="icon-phone"/>
          </div>
        </div>
        <service-detail v-if="info.serviceDetail" :info="info.serviceDetail"/>
      </div>  
      <loading vertical v-else/>
    </scroll-view>
    <div class="footer" :class="{hide: info && info.taskstatus == 4}">
      <div class="l"></div>
      <div class="r">
        <div class="r-btn" v-if="info">
          <v-btn v-if="info.taskstatus == 0" class="btn" :loading="btnLoading" loading-text="取消中" type="info" @click="cancelOrder(info.task_id)">取消订单</v-btn>
          <v-btn v-if="info.taskstatus == 2" class="btn" type="info" @click="show_appeal">发起申诉</v-btn>
          <v-btn v-if="info.taskstatus == 3" class="btn" type="info" @click="goAppeal(info.task_id)">申诉详情</v-btn>
          <v-btn v-if="info.taskstatus == 2 ||  info.taskstatus == 3"  class="btn btn-ok" :loading="btnLoading" loading-text="确认中" type="info" @click="confirmSuc(info.task_id)">确认完成</v-btn>
          <v-btn v-if="info.taskstatus == 6" class="btn btn-ok" type="info" @click="show_evaluate = true">{{info.rateDetail ? '查看评价' : '评价'}}</v-btn>
        </div>   
      </div>
    </div>
    <div v-show="appeal_show">
      <v-appeal ref="appeal" :show="appeal_show" @close="appeal_show = false" @submit="appealSubmit"/>
    </div>
    <v-pop class="evaluate-m" v-model="show_evaluate" round closeable position="bottom">
      <div class="hd">评价</div>
      <div class="content">
        <div class="rate">
          <div class="l">综合评价</div>
          <div class="r">
            <v-rate v-model="rate_num" color="#FD4F02" />
          </div>
        </div>
        <div class="textarea">
          <textarea v-model="textarea_val" placeholder="说点什么吧" rows="5"></textarea>
        </div>
      </div>
      <div class="ft" v-if="info && !info.rateDetail">
        <v-btn class="btn btn-ok" :loading="btnLoading" loading-text="提交中" type="info" @click="rateSubmit($route.params.id)">提交</v-btn>
      </div>
    </v-pop>
  </div>
</template>

<script>
import { Button, Popup, Rate, Toast } from 'vant'
import InfoList from 'com/partner/info-list'
import ServiceDetail from 'com/order/service-detail'
import VAppeal from 'com/order/order-appeal'
import {order_status_type} from 'mixin/order-mixin'
import {getOrderDetail, getOrderCancel, getAppeal, confirmService, getRate} from 'api'

export default {
  mixins: [order_status_type],
  components: {
    InfoList,
    VAppeal,
    ServiceDetail,
    'v-btn': Button,
    'v-rate': Rate,
    'v-pop': Popup
  },
  data() {
    return{
      listdata: [],
      info: null,
      is_cache: false,
      rate_num: 3,
      textarea_val: '',
      appeal_show: false, // 申诉
      show_evaluate: false, // 评价
      btnLoading: false
    }
  },
  activated() {
    this.appeal_show = false
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
        this.listdata = this.list_info(data)
        const rate_info = data.rateDetail
        if (rate_info) {
          this.rate_num = rate_info.ratenum
          this.textarea_val = rate_info.content
        }
        this.$store.commit('cache_data', true)   
      }
    },
    list_info(item) {
      return [{
        realname: item.serviceName,
        headimage: item.serviceImage,
        servicenums: item.serviceNums,
        servicescore: item.serviceScore,
        serviceaddr: item.serviceAddr
      }]
    },
    async rateSubmit(id) {
      if(this.textarea_val == '') return Toast('多少说一点吧')
      this.btnLoading = true
      const data = await getRate(id, this.rate_num, this.textarea_val)
      if (data) {
        this.$toast('评价成功')
        this.btnLoading = false
        this.show_evaluate = false
        this.getDetail()
      }
    },
    cancelOrder(id) {
      this.$dialog.confirm({
        message: '确定取消订单吗'
      }).then((() => {
        this.btnLoading = true
        getOrderCancel(id).then(data => {
          this.btnLoading = false
          if(data) {
            this.$toast('取消成功')
            this.refresh_data()
          }
        }) 
      })).catch(() => {})
    },
    show_appeal() {   
      this.appeal_show = true
      document.title = '发起申诉'
    },
    confirmSuc(id) {
      this.$dialog.confirm({
        message: '确定完成了服务吗'
      }).then((() => {
        this.btnLoading = true
        confirmService(id).then(data => {
          this.btnLoading = false
          if(data) {
            this.$toast('确认成功')
            this.refresh_data()
          }
        }) 
      })).catch(() => {})
    },
    goAppeal(id) {
      this.$router.push({
        name: 'order_appeal',
        params: {
          id
        }
      })
    },
    async appealSubmit(item) {
      const data = await getAppeal(this.info.task_id, item.fileList, item.message)
      if (data) {
        this.$toast('申诉提交成功')
        this.refresh_data()
        this.appeal_show = false
      } 
      this.$refs.appeal.closeloading()
    },
    refresh_data() {
      this.getDetail()
      this.$store.commit('get_refresh', true)
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
      padding-top: size(10);
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
    &.hide{
      background: #f1f1f1;
      box-shadow: 0 0 0;
    }
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
        padding: 0 size(40);
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
  .evaluate-m{
    .hd{
      height: size(100);
      line-height: size(100);
      font-weight: 500;
      @include border('bottom');
    }
    .content{
      padding:size(30) size(70);
      @include border('bottom');
      .rate{
        display: flex;
        align-items: center;
        color: #666;
        .l{
          width: size(200);
          text-align: right;
        }
        .r{
          flex: 1;
        }
      }
      .textarea{
        margin-top: size(20);
        textarea{
          background: #ECECEC;
          border-radius: size(20);
          padding: size(30);
          font-size: size(28);
          line-height: size(36);
          color: #888;
          &::placeholder{
            color: #bbb;
          }
        }
      }
    }
    .ft{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: size(20) 0;
      .btn{
        padding: 0 size(160);
        border-radius: size(20);
        &.btn-ok{
          background: #2BA69F;
          border:0;
        }
      }
    }
  }
}
</style>

