<template>
  <container>
    <div class="repair">
      <nav-bar :title="text"></nav-bar>
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
import navBar from 'com/nav-bar'
import VGrid from 'com/grid-icon'

export default {
  data() {
    return {
      text: "修车有问题",
      grid_list: [
        {
          title: "社区",
          desc: "汽修问题线上问",
          list: [
            {
              icon: "",
              text: "我要提问"
            },
            {
              icon: "",
              text: "专家答疑"
            },
            {
              icon: "",
              text: "远程诊断"
            }
          ]
        },
        {
          title: "工作台",
          desc: "技师维修辅助工具大全",
          list: [
            {
              icon: "",
              text: "维修案例"
            },
            {
              icon: "",
              text: "维修资料"
            },
            {
              icon: "",
              text: "故障指引"
            },
            {
              icon: "",
              text: "车架号查询"
            },
            {
              icon: "",
              text: "英文查询"
            },
            {
              icon: "",
              text: "故障码查询"
            },
            {
              icon: "",
              text: "配件查询"
            },
            {
              icon: "",
              text: "维修课堂"
            }
          ]
        }
      ]
    };
  },
  components: {
    navBar,
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


