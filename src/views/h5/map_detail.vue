<template>
  <div>
    <div class="map_detail_container">
      <div class="banner">
        <img :src="info.deviceUrl">
      </div>
      <div class="section">
        <div class="t">{{info.deviceName}}</div>
        <div class="price"><b>{{info.price}}</b> {{moneyType(info.currencyType)}}/{{d_type(info)}}</div>
        <div class="m-tic">
          <h4 class="t">计价规则</h4>
          <div>起步价： ¥ {{info.price}}含30分钟</div>
          <div v-if="info.exceedMinute">超时价： ¥ {{info.exceedMinutePrice}}/{{info.exceedMinute}}分钟</div>
        </div>
        <div class="m-tic">
          <h4 class="t">使用方式</h4>
          <div v-if="info.payOrder == -1">免费</div>
          <div v-if="info.payOrder == 0">先使用再付费</div>
          <div v-if="info.payOrder == 1">先付费后使用</div>
        </div>
        <div class="m-tic">
          <h4 class="t">是否预约</h4>
          <div>{{info.isAppoint == 0 ? '无需预约' : '需要预约'}}</div>
        </div>
        <div class="m-tic">
          <h4 class="t">设备描述</h4>
          <div>{{info.remark}}</div>
        </div>   
      </div>
      <div class="fd" @click="$router.push('/download')">
        <div class="btn">使用设备</div>
      </div>
    </div>
  </div>
</template>

<script>
import req from 'req'

export default {
  data() {
    return{
      info: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
     moneyType(type) {
      let t = ''
      switch (type) {
        case 0:
          t = '元'
          break
        case 1:
          t = '欧元'
          break
        case 2:
          t = '美元'
          break
        case 3:
          t = '韩元'
          break
      }
      return t
    },
    d_type(item) {
      if (item.chooseType == 1 && item.timeType == 1) return '次'
      if (item.timeType == 0) return `${item.longTime}分钟 起`
      if (item.timeType == 1) return `${item.longTime}时`
      if (item.timeType == 2) return `${item.longTime}日`
      if (item.timeType == 3) return `${item.longTime}月`
      if (item.timeType == 4) return `${item.longTime}年`
    },
    async getDetail() {
      const data = await req.post('/maps/repair/device/getDeviceDetails', {tlId: this.$route.query.id || 122})
      if(data instanceof Object) {
        this.info = data
      }
    }
  }  
}
</script>

<style lang="scss" scoped>
.map_detail_container {
  padding-bottom: size(100);
  .banner {
    width: 100%;
    height: 40vh;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .section {
    padding: size(20);
    text-align: left;
    min-height: 53vh;
    .t {
      color: #333;
      margin-bottom: size(20);
    }
    .price {
      color: #e34947;
      font-size: size(28);
      margin-bottom: size(30);
      b {
        font-size: size(34);
      }
    }
    .m-tic {
      margin-bottom: size(20);
      > div {
        font-size: size(28);
        margin-bottom: size(8);
      }
    }
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
