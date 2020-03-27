<template>
  <div class="map-container">
    <div class="hd">
      <v-tabs v-model="active" @change="handleTab">
        <v-tab v-for="(item,index) in nav_list" :title="item.deviceTypeName" :key="index" />
      </v-tabs>
    </div>  
    <div class="map" id="dituContent"></div>
    <v-popup class="pop" overlay-class="overlay" :class="{no_p: !marker_list}" v-model="show_list" position="bottom">
      <div class="section">
        <template v-if="marker_list.list.length > 0 && is_data == 2">
          <div class="hd">
          <div class="l">
            <div class="title">{{marker_list.info.name}}</div>
            <div class="desc" v-if="marker_list.info.distanceUnit == 1">
              {{marker_list.info.distance}}km | {{marker_list.info.location}}
            </div>
            <div class="desc" v-if="marker_list.info.distanceUnit == 2">
              {{marker_list.info.distance}}m | {{marker_list.info.location}}
            </div>
          </div>
          <div class="r" @click="goNavigation">
            <span class="icon">去这里</span>
          </div>
        </div>
        <div class="list">
          <div class="item" v-for="(item,index) in marker_list.list" :key="index" @click="goDetail(item.tlId)">
            <div class="img">
              <img v-lazy="item.deviceUrl">   
              <div class="title">{{item.deviceName}}</div>
            </div>
            <div class="info">
              <div class="desc"><b>{{item.price}}</b> {{moneyType(item.currencyType)}}/{{d_type(item)}}</div>
            </div>
          </div>
        </div>
        </template>
        <div class="no_list" v-if="is_data == 3">
          <h4>抱歉，当前位置附近没有共享设备</h4>
          <div>我们正努力上架更多的共享设备，敬请期待</div>
        </div>
      </div>
    </v-popup>
  </div>
</template>


<script>
import { Popup, Tab, Tabs } from 'vant'
import req from 'req'

export default {
  components: {
    'v-popup': Popup,
    'v-tab': Tab,
    'v-tabs': Tabs
  },
  data() {
    return {
      nav_list: [],
      show_list: false,
      marker_list: {
        info: {},
        list: []
      },
      is_data: 1,
      active: 0,
      markerArr: []
    }
  },
  mounted() {
    this.initMap()
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
      if (item.timeType == 1) return `${item.longTime}小时`
      if (item.timeType == 2) return `${item.longTime}天`
      if (item.timeType == 3) return `${item.longTime}月`
      if (item.timeType == 4) return `${item.longTime}年`
    },
    goDetail(id) {
      this.$router.push({
        path: '/map_detail',
        query: {
          id
        }
      })
    },
    initMap() {
      this.createMap() //创建地图
      this.setMapEvent() //设置地图事件
      this.addMapControl() //向地图添加控件
      this.addMarker() //向地图中添加marker
      this.getNav()
    },
    async getNav() {
      const data = await req.get('/maps/repair/device/getDeviceTypeList')
      const arr = [
        {
          ttId: 0,
          deviceTypeName: '全部'
        }
      ]
      data instanceof Array &&
        data.forEach(item => {
          arr.push(item)
        })
      this.nav_list = arr
    },
    async getUnit(ttId) {
      const data = await req.post('/maps/repair/device/getUnitAll', {
        ttId,
        longitude: this.slng,
        latitude: this.slat
      })
      if (data instanceof Array) {
        if (data.length == 0) return this.$toast('附近没有该共享设备')
        let { longitude, latitude, distance, distanceUnit } = data[0]
        let point = new BMap.Point(longitude, latitude) //定义一个中心点坐标
        const d = distanceUnit == 1 ? distance + 'km' : distance + 'm'
        this.$toast('设备区域距离您当前位置' + d)
        this.addMarker(data)
        this.map.centerAndZoom(point, 30)
      }
    },
    async getDeviceList(unitId) {
      const data = await req.post('/maps/repair/device/getUniDeviceList', {
        unitId
      })
      this.is_data = 1
      if (data instanceof Array) {
        if(data.length == 0) this.is_data = 3
        if (data.length > 0) this.is_data = 2
        this.list = data
      }
      this.marker_list = {
        info: this.info,
        list: this.list
      }
    },
    handleTab(i) {
      const id = this.nav_list[i].ttId
      this.getUnit(id)
    },
    createMap() {
      const geolocation = new BMap.Geolocation()
      let point
      let _this = this
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point)
            map.addOverlay(mk)
            map.panTo(r.point)
            _this.slng = r.point.lng
            _this.slat = r.point.lat
            point = new BMap.Point(r.point.lng, r.point.lat) //定义一个中心点坐标
            _this.getUnit(0)
          } else {
            console.log('failed' + this.getStatus())
          }
        },
        { enableHighAccuracy: true }
      )
      var map = new BMap.Map('dituContent') //在百度地图容器中创建一个地图
      point = new BMap.Point(114.064987, 22.667649) //定义一个中心点坐标
      map.centerAndZoom(point, 30)
      this.map = map
    },
    goNavigation() {
      // origin=起点纬度,起点经度&destination=终点纬度,终点经度&mode=driving&region=深圳&output=html
      const item = this.marker_list.info
      const url = `http://api.map.baidu.com/direction?origin=${this.slat},${
        this.slng
      }&destination=${item.latitude},${item.longitude}&mode=driving&region=${
        item.location
      }&output=html`
      window.location.href = url
    },
    setMapEvent() {
      this.map.enableDragging() //启用地图拖拽事件，默认启用(可不写)
      this.map.enableScrollWheelZoom() //启用地图滚轮放大缩小
      this.map.enableDoubleClickZoom() //启用鼠标双击放大，默认启用(可不写)
      this.map.enableKeyboard() //启用键盘上下左右键移动地图
    },
    addMapControl() {
      const geolocationControl = new BMap.GeolocationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT
      })
      let _this = this
      geolocationControl.addEventListener('locationSuccess', function(e) {
        // 定位成功事件
        var address = ''
        address += e.addressComponent.province
        address += e.addressComponent.city
        address += e.addressComponent.district
        address += e.addressComponent.street
        address += e.addressComponent.streetNumber
        _this.$toast('当前定位地址为：' + address)
      })
      geolocationControl.addEventListener('locationError', function(e) {
        // 定位失败事件
        _this.$toast(e.message)
      })
      this.map.addControl(geolocationControl)
    },
    addMarker(data) {
      const markerArr = data || []
      for (var i = 0; i < markerArr.length; i++) {
        var json = markerArr[i]
        var point = new BMap.Point(json.longitude, json.latitude)
        var iconImg = this.createIcon(json.icon)
        var marker = new BMap.Marker(point, { icon: iconImg })
        var iw = this.createInfoWindow(i, markerArr)
        this.map.addOverlay(marker)
        ;(() => {
          var index = i
          var _iw = this.createInfoWindow(i, markerArr)
          var _marker = marker
          _marker.addEventListener('click', () => {
            this.show_list = true
            _marker.openInfoWindow(_iw)
            this.info = markerArr[index]
            this.getDeviceList(markerArr[index].id)
          })
        })()
      }
    },
    deletePoint(type) {
      var allOverlay = this.map.getOverlays()
      //循坏所有点
      for (var i = 0; i < allOverlay.length; i++) {
        console.log(allOverlay[i].imei)
        if (allOverlay[i].imei == type) {
          this.map.removeOverlay(allOverlay[i])
        }
      }
    },
    createInfoWindow(i, data) {
      var json = data[i]
      var opts = {
        width: 80,
        height: 50
      }
      var iw = new BMap.InfoWindow(
        ` 
          <div class="iw_poi_title">${json.name}</div>
          <div class="iw_poi_content">${json.location}</div>
        `,
        opts
      )
      return iw
    },
    //创建一个Icon
    createIcon(json) {
      var icon = new BMap.Icon(
        require('img/map/marker.png'),
        new BMap.Size(30, 30)
      )
      return icon
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container{
  /deep/ .overlay{
    background: rgba(0,0,0,0.2);
  }
}
.hd {
  overflow-x: auto;
}
.scroll {
  width: 100vh;
  height: 7vh;
}
.scroll .item {
  padding: 0 5px;
  width: size(140);
  /* margin:0 5px; */
  margin-right: size(20);
  text-align: center;
  line-height: 7vh;
}
.map {
  width: 100%;
  position: fixed;
  height: 93vh;
  /deep/ .iw_poi_title {
    color: #e34947;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    padding-right: 13px;
    white-space: nowrap;
    margin-bottom: 5px;
  }
  /deep/ .iw_poi_content {
    font: 12px arial, sans-serif;
    overflow: visible;
    padding-top: 4px;
    white-space: -moz-pre-wrap;
    word-wrap: break-word;
  }
}
.pop {
  height: 40vh;
  padding-bottom: size(10);
  &.no_p {
    height: 12vh;
  }
  .no_list {
    padding: size(40);
    h4 {
      margin-bottom: size(10);
    }
    div {
      font-size: size(28);
    }
  }
  .hd {
    display: flex;
    align-items: center;
    padding: size(20);
    @include border('bottom');
    .l {
      flex: 1;
      text-align: left;
      color: #333;
      font-weight: bold;
      .desc {
        color: #bbb;
        height: size(30);
        line-height: size(30);
        @include txt-overflow();
        margin-top: size(15);
        font-size: size(24);
      }
    }
    .r {
      width: size(120);
      height: size(100);
      position: relative;
      .icon {
        position: absolute;
        top: 55%;
        right: 0;
        display: block;
        font-size: size(26);
        color: #bbb;
      }
      &:before {
        content: '';
        width: size(30);
        height: size(30);
        position: absolute;
        right: 20%;
        top: 10%;
        @include bg('~img/map/nagar.png');
      }
    }
  }
  .list {
    padding-left: size(20);
    .item {
      padding: size(20) 0;
      display: flex;
      align-items: center;
      @include border('bottom');
      .img {
        position: relative;
        flex: 1;
        height: size(100);
        line-height: size(100);
        img {
          width: size(100);
          height: size(100);
          background: #eee;
        }
        .title {
          position: absolute;
          left: size(120);
          text-align: left;
          top: 2%;
          @include txt-overflow();
        }
      }
      .info {
        width: 20vh;
        color: #e34947;
        align-items: center;
        padding-right: size(20);
        text-align: right;
        font-size: size(26);
        b {
          font-size: size(34);
        }
      }
    }
  }
}
</style>
