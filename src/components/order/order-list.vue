<template>
  <div class="list-section">
    <template v-if="list_data.length">
      <div class="item" v-for="(item,index) in list_data" :key="index" @click="goDetail(item.order_no)">
        <div class="hd">
          <div class="name">订单编号：<b>{{item.order_no}}</b></div>
          <div class="status" :class="status(item.serviceStatus)">{{item.serviceStatus}}</div>
        </div>
        <div class="content">
          <div class="g-order-info info">
            <div class="item">
              <div class="l">服务类型:</div>
              <div class="r">{{item.serviceType}}</div>
            </div>
            <div class="item">
              <div class="l">设备名称:</div>
              <div class="r">{{item.deviceName}}</div>
            </div>
            <div class="item">
              <div class="l">设备型号:</div>
              <div class="r">{{item.deviceModel}}</div>
            </div>
            <div class="item">
              <div class="l">服务地址:</div>
              <div class="r">{{item.serviceAddr}}</div>
            </div>
            <div class="item">
              <div class="l">发布日期:</div>
              <div class="r">{{item.publishTime}}</div>
            </div>
          </div>
        </div>
        <div class="fd">
          <div class="l"></div>
          <div class="r">安装费： <b>¥{{item.devicePrice.toFixed(2)}}</b></div>
        </div>
      </div>
      <!-- <div class="loading" v-if="!hasNext">
        <van-loading size="24px">加载中...</van-loading>    
      </div>
      <div class="no-data" v-else>没有更多数据了～</div> -->
    </template>
  </div>
</template>

<script>
export default {
  props: {
    list_data: {
      type: Array,
      default: [],
      textStatus: ''
    }
  },
  mounted() {

  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: 'order_detail',
        params: {
          id
        }
      })
    },
    status(num) {
      switch(num) {
        case '待服务':
          return 'status-wait'
        break;
        case '服务中':
          return 'status-give'
        break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list-section{
  .no-data{
    padding-bottom: size(10);
    height: size(60);
    line-height: size(50);
    font-size: size(24);
    color:#888;
  }
  .loading{
    @extend .no-data; 
  }
  .item{
    background: #fff;
    margin-bottom: size(20);
    .hd{
      height: size(80);
      line-height: size(80);
      display: flex;
      text-align: left;
      font-size: size(26);
      align-items: center;
      padding: 0 size(40);
      border-bottom: 1px solid #eee;
      .name{
        flex: 1;
        font-size: size(24);
        b{
          font-size: size(26);
        }
      }
      .status{
        width: size(100);
        color: #03B097;
        text-align: right;
        &.status-wait{
          color: #FA6400;
        }
        &.status-give{
          color: #d05392;
        }
      }
    }
    .fd{
      border-top: 1px solid #eee;
      display: flex;
      text-align: right;
      height: size(80);
      line-height: size(80);
      .l{
        flex: 1;
      }
      .r{
        font-size: size(26);
        padding-right: size(40);
        b{
          color: #E31436;
          font-size: size(30);
        }
      }
    }
    .content{
      padding: 0 size(20);
    }
  }
}
</style>

