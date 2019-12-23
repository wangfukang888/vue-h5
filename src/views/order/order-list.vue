<template>
  <div class="order-list">
   <v-tabs v-model="active" color="#03B097" swipeable>
      <v-tab :title="item" v-for="(item,index) in list" :key="index">
        <scroll-list :data="list_data" :pullup="true" @scrollToEnd="loadData" class="list-container"> 
          <div>
            <div class="list-m" v-if="true">
              <div class="item" v-for="(item,index) in list_data" :key="index">
                <div class="hd">
                  <div class="name">订单编号：<b>23444787</b></div>
                  <div class="status">已完成</div>
                </div>
                <div class="content">
                  <div class="info">
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
                      <div class="l">服务地址</div>
                      <div class="r">深圳市民治达到就是看手机</div>
                    </div>
                    <div class="item">
                      <div class="l">发布日期</div>
                      <div class="r">2019-11-28 20:45:08</div>
                    </div>
                  </div>
                </div>
                <div class="fd">
                  <div class="l"></div>
                  <div class="r">安装费： <b>¥654.00</b></div>
                </div>
              </div>
            </div>
            <div class="loading" v-if="isloading">
              <van-loading size="24px">加载中...</van-loading>
            </div>
            <!-- <div class="no-data">没有更多数据了～</div> -->
          </div>
        </scroll-list>
      </v-tab>
    </v-tabs> 
  </div>
</template>

<script>
import scrollList from "com/scroll-list"
import { Tab, Tabs } from 'vant';

export default {
  components: {
    scrollList,
    'v-tab': Tab,
    'v-tabs': Tabs
  },
  data() {
    return{
      list_data: 7,
      active: 0,
      isloading: true,
      list: ['设备服务', '维修服务']
    }
  },
  methods: {
    loadData() {
      console.log('滚动到底')
      this.isloading = true
    }
  }
}
</script>

<style lang="scss" scoped>
.order-list{
  position: fixed;
  top:0;
  bottom: 0;
  background: #f1f1f1;
  /deep/ .bscroll-vertical-scrollbar{
    width: 4px !important;
  }
  .list-container{
    position: fixed;
    width: 100%;
    top: size(100);
    bottom: 0;
    overflow: hidden;
    .no-data{
      padding-bottom: size(10);
      height: size(60);
      line-height: size(50);
      font-size: size(24);
      color:#888;
    }
    .loading{
      padding: size(20) 0;
      color:#888;
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
        padding: size(20);
        .info{ 
          .item{
            display: flex;
            line-height: size(50);
            font-size: size(26);
          }
          .l{
            width: size(150);
            margin-right: size(50);
            color: #818181;
          }
          .r{
            flex: 1;
            color: #666;
            text-align: left;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>

