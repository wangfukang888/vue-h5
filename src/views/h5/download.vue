<template>
  <div class="map_detail_container">
    <div class="banner">
      <img src="~img/map/download.png" alt="">
    </div>
    <div class="section">
      修修吧是由元征科技研发的一款专门为用户提供共享汽修设备服务的应用。用户可以方便快捷的在修修吧里找到所需的共享设备，自助完成相关车辆的维修保养业务。
    </div>
    <div class="fd">
      <div class="btn" @click="download">立即下载</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    download() {
      if (this.detect() == 'ios') {
        location.href = 'xiuxihubaapp://'
        setTimeout(() => {
          location.href = 'https://apps.apple.com/app/id1434530730'
        }, 2000)
      } else {
        url = 'app://'
        setTimeout(() => {
          location.href = 'http://zhushou.360.cn/detail/index/soft_id/4105503'
        }, 2000)
      }
    },
    detect() {
      var equipmentType = ''
      var agent = navigator.userAgent.toLowerCase()
      var android = agent.indexOf('android')
      var iphone = agent.indexOf('iphone')
      var ipad = agent.indexOf('ipad')
      if (android != -1) {
        equipmentType = 'android'
      }
      if (iphone != -1 || ipad != -1) {
        equipmentType = 'ios'
      }
      return equipmentType
    }
  }
}
</script>

<style lang="scss" scoped>
.map_detail_container {
  padding-bottom: size(100);
  background: url('~img/map/down-bg.png');
  .banner {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .section {
    padding: size(40) size(30);
    text-align: left;
    min-height: 45vh; 
    line-height: size(50);
  }
  .fd {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 8vh;
    line-height: 8vh;
    background: #0075bf;
    color: #fff;
  }
}
</style>
