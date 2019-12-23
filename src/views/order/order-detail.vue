<template>
  <div class="order-detail">
    <scroll-list class="detail-m">
      <div class="container">
        <div class="hd">待服务</div>
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
            <div class="l">服务地址:</div>
            <div class="r">深圳市民治达到就是看手机</div>
          </div>
          <div class="item">
            <div class="l">备注：</div>
            <div class="r">现场安装深圳市民治达到就是看手机深圳市民治达到就是</div>
          </div>
        </div>
         <div class="name-p">
          <info-list :noclick="true" :data="1"/>
        </div>
      </div>
    </scroll-list>
    <div class="footer">
      <div class="l"></div>
      <div class="r">
        <div class="r-btn">
          <div class="btn">取消订单</div>
          <!-- <div class="btn">取消订单</div>
          <div class="btn">取消订单</div> -->
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import scrollList from "com/scroll-list"
import InfoList from 'com/partner/info-list'

export default {
  components: {
    scrollList,
    InfoList
  }
}
</script>

<style lang="scss" scoped>
.order-detail{
  .detail-m{
    position: absolute;
    top:0;
    width: 100%;
    background: #f1f1f1;
    bottom: size(100);
    .hd{
      height: size(100);
      line-height: size(100);
      background: #fff; 
      // margin-bottom: size(20);
      background: #FA6400;
      color: #fff;
    }
    .name-p{
      margin-top: size(20);
      /deep/ .list{background: #fff;}
    }
    .info{ 
      background: #fff;
      padding: size(40);
      .item{
        display: flex;
        line-height: size(70);
        font-size: size(26);
        text-align: left;
      }
      .l{
        width: size(150);
        margin-right: size(50);
        color: #818181;
      }
      .r{
        flex: 1;
        padding-right: size(20);  
        color: #333;
        font-weight: bold;
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
        justify-content: flex-end;
      }
      .btn{
        display: block;
        width: size(170);
        padding: size(15) 0;
        color: #666;
        font-size: size(26);
        border:1px solid #666;
        margin-right: size(20);
        border-radius: size(30);
        
      }
    }
  }
}
</style>

