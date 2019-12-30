<template>
  <div v-show="isShow">
    <div class="mask"></div>
    <div class="city-wrap">
      <div class="title border-bottom">所在地区<div class="close"><van-icon name="cross" @click="hide" /></div></div>
      <div class="col border-bottom result">
        <div class="one" :class="{blank: step < 1}">{{step>=1 ? result[0] : '请选择'}}</div>
        <div class="two" v-if="step>=1" :class="{blank: step < 2}">{{step>=2 ? result[1] : '请选择'}}</div>
        <div class="three" v-if="step>=2" :class="{blank: step < 3}">{{step>=3 ? result[2] : '请选择'}}</div>
      </div>
      <div class="list" ref="list">
        <!-- eslint-disable-next-line -->
        <div class="col border-bottom" v-for="item in maxLength" :key="item">
          <div class="one" v-if="province[item - 1]" @click="selP(province[item - 1])">{{province[item - 1].areaname}}</div>
          <div class="one" v-else></div>
          <div class="two" v-if="step>=1 && city[item - 1]" @click="selC(city[item - 1])">{{city[item - 1].areaname}}</div>
          <div class="two" v-else></div>
          <div class="three" v-if="step>=2 && area[item - 1]" @click="selA(area[item - 1])">{{area[item - 1].areaname}}</div>
          <div class="three" v-else></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import showHide from '@/mixins/show-hide'
import {getAreaInfo} from '@/api'
import area from '@/utils/area'

export default {
  mixins: [showHide],
  data() {
    return {
      step: 0,
      // 省
      province: [],
      // 市
      city: [],
      // 区
      area: [],
      // 选择的结果，省,市,区 三个元素
      result: []
    }
  },
  computed: {
    maxLength() {
      const l = Math.max(this.province.length, this.city.length)
      return Math.max(l, this.area.length)
    }
  },
  watch: {
    step(l) {
      // 主要清除数据
      this.result.length = l
    }
  },
  methods: {
    show() {
      let arr = []
      this.isShow = true
      this.step = 0
      // 要延迟这个设置才会起作用
      this.$nextTick(() => {
        this.goTop()
      })
      for ( let i in area.province_list) {
        let item = area.province_list
        arr.push({
          id: i,
          areaname: item[i]
        })
      }
      this.province = arr
    },
    selP(p) {
      this.goTop()
      this.result[0] = p.areaname
      this.step = 1
      // 检索id对应的市级元素
      const arr = []
      for( let i in area.city_list) {
        let item = area.city_list
        if( i.substring(0,2) == p.id.substring(0,2)) {
          arr.push({
            id: i,
            areaname: item[i]
          })
        }
      }
      this.city = arr
    },
    async selC(c) {
      this.goTop()
      this.result[1] = c.areaname
      this.step = 2
      this.$emit('input', this.result)
      this.hide()
      // 暂时不用
    },
    // selA(a) {
    //   this.result[2] = a
    //   this.step = 3
    //   // console.log(this.result.map(d => d.areaname))
    //   this.$emit('input', this.result.map(d => d.areaname))
    //   this.hide()
    // },
    goTop() {
      this.$refs.list.scrollTop = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.mask{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.6);
}
.city-wrap{
  background: #fff;
  min-height: 100px;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 999;
  min-height: 300px;
  .title{
    line-height: size(100);
    font-size: size(28);
    font-weight: 800;
    padding: 0 size(20);
    position: relative;
    .close{
      float: left;
      font-size: size(40);
      width: size(30);
    }
  }
  .list{
    height: size(80 * 8);
    overflow: scroll;
  }
  .col{
    line-height: size(80);
    height: size(80);
    padding: 0 size(16);
    >div{
      float: left;
      width: 33.3%;
      height: 100%;
      text-align: center;
      padding: 0 size(10);
      @include txt-overflow;
      font-size: size(28);
    }
    &.result{
      .blank{
        color: #e31436;
        position: relative;
        &:after{
          content: ' ';
          display: block;
          position: absolute;
          width: size(80);
          height: 2px;
          bottom:0;
          left: 50%;
          transform: translateX(-50%);
          background: #e31436;
        }
      }
    }
  }
  .border-bottom{
    @include border('bottom');
  }
}
</style>