<template>
  <div class="list-component">
    <scroll-list 
      :list_data="list_data" 
      pullup
      pullDown
      @scrollToEnd="loadData"
      @scrollDown="downRefresh" 
      @touchEnd="touchEnd"
      class="container" 
    > 
      <div class="list-section" v-if="list_data.length > 0">
        <div class="down-text" v-if="downText && !isRefresh">{{downText}}</div>
        <loading class="down-text load-down" title="刷新中..." size="14px" v-if="isRefresh"/>
        <slot /> 
        <loading class="loading" title="拼命加载中..." size="16px" v-if="hasNext"/> 
        <div class="no-data" v-else>没有更多数据了～</div>
      </div> 
      <loading vertical v-if="hasLoading"/>
      <div class="no_datas" v-if="!hasNext && list_data.length == 0">暂无数据</div>  
    </scroll-list>
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
    downText: {
      type: String,
      default: ''
    },
    pullDown: {
      type: Boolean,
      default: false
    },
    hasLoading: {
      type: Boolean,
      default: false
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
  methods: {
    loadData() {
      this.$emit('scrollToEnd')
    },
    downRefresh(y) {
      this.$emit('downRefresh', y)
    },
    touchEnd(y) {
      this.$emit('downTouchEnd', y)
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
