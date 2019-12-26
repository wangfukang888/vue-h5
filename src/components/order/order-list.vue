<template>
  <div class="list-section">
    <template v-if="list_data.length == 0">
      <div class="item" v-for="(item,index) in list_data" :key="index" @click="goDetail(index)">
        <div class="hd">
          <div class="name">订单编号：<b>23444787</b></div>
          <div class="status">已完成</div>
        </div>
        <div class="content">
          <div class="g-order-info info">
            <div class="item">
              <div class="l">服务类型:</div>
              <div class="r">现场安装</div>
            </div>
            <div class="item">
              <div class="l">设备名称:</div>
              <div class="r">hhjd举升机</div>
            </div>
            <div class="item">
              <div class="l">设备型号:</div>
              <div class="r">现场安装</div>
            </div>
            <div class="item">
              <div class="l">服务地址:</div>
              <div class="r">深圳市民治达到就是看手机深圳市民治达到就是看手机</div>
            </div>
            <div class="item">
              <div class="l">发布日期:</div>
              <div class="r">2019-11-28 20:45:08</div>
            </div>
          </div>
        </div>
        <div class="fd">
          <div class="l"></div>
          <div class="r">安装费： <b>¥654.00</b></div>
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
      default: []
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

