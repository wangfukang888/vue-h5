<template>
  <container ref="e_bs" :disable_scroll="false">
    <div class="steps-container">
      <div class="steps">
        <div class="step-item" v-for="(item,index) in step_list" :key="index">
          <div class="step">
            <h4 class="t" :class="{'active': currentIndex == index}">
              {{item}}
              <span class="icon-r" v-if="index < 2">
                <div class="sj"></div>
              </span>
            </h4>
          </div> 
        </div>
      </div>
    </div> 
    <div class="component" :class="{hidden: is_hidden}">
      <component :is="currentView" @go_ative="go_ative" @hidden="page_hidden"></component>
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
      is_hidden: true,
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
    },
    page_hidden(is_hidden) {
      // 容器样式处理
      this.is_hidden = !is_hidden
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
  background: #2BA69F;
  .steps{
    padding: size(40) size(15);
    display: flex;
    .step-item{
      flex:1;
      align-items: center;
      margin-right: 16%;
      &:last-child{
        margin-right: 0;
      }
      .step{
        display: flex;
      }
      .icon-r{
        position: absolute;
        display: block;
        width: size(80);
        left: 110%;
        top:42%;
        height: size(4);
        background: #1CC1B8;  
        .sj{
          position: relative;
          &:after{
            position: absolute;
            content: '';
            right:-1%;
            margin-top: -9%;
            width:0;
            height:0;
            border-top:size(10) solid transparent;
            border-bottom:size(10) solid transparent;
            border-left:size(10) solid #1CC1B8;
          }     
        }
      } 
      .t{ 
        position: relative;
        width: size(160);
        height: size(60);
        line-height: size(60);
        font-size: size(26);
        text-align: center;
        color: #1F8781; 
        &.active{
          border: size(1) solid #00EBDD;
          color: #00EBDD;
          border-radius: size(12);
        }
      }
    }
  }
}
.component{
  position: fixed;
  width: 100%;
  top: size(150);
  bottom: 0;
  z-index: 3;
  background: #fff;
  border-radius: size(60) size(60) 0 0;
  &.hidden{
    overflow: hidden;
  }
}
</style>


