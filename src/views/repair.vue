<template>
  <container>
    <div class="repair">
      <div class="r-container">
        <div class="banner">
          <div class="btn">下载APP</div>
        </div>
        <div class="grid-m">
          <v-grid :list="grid_list"></v-grid>
        </div>
      </div>
    </div>
  </container>
</template>

<script>
import VGrid from 'com/grid-list'
import {repir_data} from '../mock/grid_data'
 
export default {
  data() {
    return {
      text: "修车有问题",
      grid_list: repir_data || []
    }
  },
  components: {
    VGrid
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.r-container {
  padding: 0 size(20);
  .banner {
    position: relative;
    width: 100%;
    height: size(420);
    background: linear-gradient(to bottom, #00314e, #02615e);
    border-radius: size(40);
    margin-bottom: size(20);
    .btn{
      position: absolute;
      right: size(120);
      bottom: size(40);
      padding: size(20) size(30);
      border-radius: size(40);
      color: #fff;
      font-size: size(26);
      border: size(1) solid #fff;
    }
  }
  /deep/ .grid-m {
    .title{
      &.t-1 {
        background: linear-gradient(to right, #04b396, #07d6c5);
      }
      &.t-2 {
        background: linear-gradient(to right, #024374, #096bb4) ;
      }
    }
  }
}
</style>


