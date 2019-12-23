<template>
  <container ref="e_bs" :disable_scroll="false">
    <div class="steps-container">
      <div class="steps">
        <div class="step-item" v-for="(item,index) in step_list" :key="index">
          <h4 class="t" :class="{'active': currentIndex == index}">{{item}}</h4>
          <span class="icon-r" v-if="index < 2"></span>
        </div>
      </div>
    </div> 
    <div class="component">
      <component :is="currentView" @go_ative="go_ative"></component>
    </div> 
  </container>
</template>

<script>
import info from './eq_install/info'
import partner from './eq_install/partner'
import release from './eq_install/release'
import BScroll from 'better-scroll'

export default {
  data() {
    return{
      active: 0,
      currentView: 'info',
      currentIndex: 0,
      step_list: ['填写信息', '选择合伙人', '发布信息']
    }
  },
  mounted() {
    
  },
  components: {
    info,
    partner,
    release
  },
  computed: {
  },
  destroyed() {
    this.$refs.e_bs && this.$refs.e_bs.destroy()
  },
  methods: {
    go_ative(num, cpt) {
      this.currentIndex = num
      this.currentView = cpt
    }
  }
};
</script>

<style lang="scss" scoped>
.steps-container{
  position: fixed;
  top:0;
  width: 100%;
  height: size(280);
  z-index: 2;
  background: #2BA69F;
  .steps{
    padding: size(40) size(15);
    display: flex;
    .step-item{
      flex:1;
      position: relative;
      margin-right: 20%;
      .t{
        width: size(140);
        height: size(60);
        line-height: size(60);
        font-size: size(24);
        // text-align: center;  
        color: #1F8781;
        &.active{
          border: size(1) solid #00EBDD;
          color: #00EBDD;
          border-radius: size(12);
        }
      }
      .icon-r{
        position: absolute;
        display: block;
        width: size(80);
        left: size(150);
        top:42%;
        height: size(4);
        background: #1CC1B8;
      }
    }
  }
}
.component{
  position: fixed;
  width: 100%;
  top: 12%;
  bottom: 0;
  z-index: 3;
  overflow: hidden;
  background: #fff;
  border-radius: size(60) size(60) 0 0;
}
</style>


