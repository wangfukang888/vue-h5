<template>
  <div class="list-component">
    <scroll-view 
      :list_data="list_data" 
      :pullup="pullup"
      :pullDown="pulldown"
      @scrollToEnd="loadData"
      @scrollDown="downRefresh" 
      @touchEnd="touchEnd"
      class="container" 
    > 
      <div class="list-section" v-if="list_data.length > 0">
        <div class="down-text" v-if="downText && !isRefresh">{{downText}}</div>
        <loading class="down-text load-down" :title="pullDownText[2]" size="14px" v-if="isRefresh"/>
        <slot /> 
        <template v-if="pullup">
          <loading class="loading" title="拼命加载中..." size="16px" v-if="hasNext"/> 
          <div class="no-data" v-else>没有更多数据了～</div>
        </template>  
      </div> 
      <!-- 首次加载数据 -->
      <template v-else>
        <div class="no_datas" v-if="!hasNext && list_data.length == 0">暂无数据</div> 
        <loading vertical v-else/> 
      </template> 
    </scroll-view>
  </div>
</template>

<script>
export default {
  props: {
    list_data: {
      type: Array,
      default: []
    },
    pullup: {
      type: Boolean,
      default: false
    }, 
    pulldown: {
      type: Boolean,
      default: false
    },
    pullDownText: {
      type: Array,
      default: () => {
        return ['下拉刷新', '释放即可刷新', '刷新中...']
      }
    },
    isRefresh: {
      type: Boolean,
      default: false
    },
    hasNext: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return{
      downText: ''
    }
  },
  methods: {
    loadData() {
      this.$emit('pullUpLoad')
    },
    downRefresh(y) {
      const scrollY = parseInt(y) 
      const text = this.pullDownText
      this.downText = text[0] || '下拉刷新'
      if ( scrollY > 50) {
        this.downText = text[1] || '释放即可刷新'
      }
    },
    touchEnd(y) {
      const Y = parseInt(y) 
      if( Y > 50) {
        this.$emit('pullDownRefresh')
      }
      this.downText = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.list-component{
  .container{
    position: fixed;
    width: 100%;
    top: size(100);
    bottom: size(1);
    overflow: hidden;
    .no_datas{
      padding: size(200) 0;
      color: #ccc;
    }
  }
  .list-section{
     .no-data{
        padding-bottom: size(10);
        height: size(60);
        line-height: size(50);
        font-size: size(24);
        color:#888;
      }
    .down-text{
      font-size: size(24);
      padding-bottom: size(10);
      height: size(60);
      line-height: size(50);
      color: #ccc;
      &.load-down{
        padding: 0;
        /deep/ .van-loading__text{
          font-size: size(24);
        }
      } 
    }
    .loading{
      padding: 0;
      @extend .no-data;
    }
  }
}
</style>
