<template>
  <container>
    <div class="equipment">
      <nav-bar :title="text"></nav-bar>
      <template v-if="!show_search">
        <div class="top">
          <div class="icon-code"  @click="getScan"> 
            <van-icon name="scan"/>
          </div>
          <div class="search">
            <div class="icon">
              <van-icon name="search" />
            </div>
            <input type="text" v-model="search_val" placeholder="搜索序列号" @focus="goSearch">
          </div>
        </div>
        <div class="search-info">
          <div class="header">
            <div class="left-img"></div>
            <div class="info">
              <div class="title">喷油嘴清洗仪</div>
              <div class="desc">
                <span class="dec-x">序列号  62459005510</span>
                <div class="dec-type">
                  <span class="mark">型号</span><span>CNC6013C +</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <van-grid :column-num="3">
              <van-grid-item v-for="(item, index) in search_grid" :key="index" icon="photo-o" :text="item.text" />
            </van-grid>
          </div>
        </div>
        <div class="grid-eq">
          <v-grid :list="grid_list"></v-grid>
        </div>
      </template>
      <template v-else>
        <v-search @cancel="cancel" @search="search" ref="f_s"></v-search>
      </template>
    </div>
  </container>
</template>

<script>
import navBar from "com/nav-bar";
import VSearch from 'com/search';
import VGrid from "com/grid-icon";

export default {
  components: {
    navBar,
    VGrid,
    VSearch
  },
  data() {
    return {
      text: "设备有问题",
      search_val: '',
      show_search: false,
      search_grid: [
        {
          icon: '',
          text: '使用说明'
        },
         {
          icon: '',
          text: '快速入门'
        },
         {
          icon: '',
          text: '售后服务'
        }
      ],
      grid_list: [
        {
          title: "现场服务申请",
          desc: "举升机、四轮定位仪等上门现场服务",
          list: [
            {
              icon: "",
              text: "现场安装"
            },
            {
              icon: "",
              text: "现场培训"
            },
            {
              icon: "",
              text: "现场维修"
            }
          ]
        },
        {
          title: "设备服务申请",
          desc: "举升机、四轮定位仪等",
          list: [
            {
              icon: "",
              text: "返厂维修"
            },
            {
              icon: "",
              text: "配件需求"
            },
            {
              icon: "",
              text: "产品退换货"
            },
            {
              icon: "",
              text: "客户索赔"
            },
            {
              icon: "",
              text: "产品翻新"
            },
            {
              icon: "",
              text: "设备资料"
            }
          ]
        },
        {
          title: "投诉与建议",
          desc: "留下您宝贵的建议，力求为您提供最优质的服务",
          list: [
            {
              icon: "",
              text: "客户投诉"
            },
            {
              icon: "",
              text: "产品改善建议"
            },
            {
              icon: "",
              text: "质量问题反馈"
            }    
          ]
        }
      ]
    };
  },
  methods: {
    getScan() {
      this.$router.push('/scan')
    },
    goSearch() {
      this.show_search = true
      this.$nextTick(() => {
        this.$refs.f_s && this.$refs.f_s.f()
      })   
    },
    cancel() {
      this.show_search = false
    },
    search(val) {
      this.show_search = false
      this.search_val = val
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.top{
  width: 100%;
  background: #f1f1f1;
  height: size(100);
  padding: size(25) size(30);
  display: flex;
  .icon-code{
    width: size(50);
    background: #fff;
    margin-right: size(20);
    font-size: size(50);
  }
  .search{
    position: relative;
    flex: 1;
    width: 100%;
    .icon{
      position: absolute;
      top:size(10);
      left: size(10);
    }
    input{
      height: size(50);
      line-height: size(50);
      padding-left: size(60); 
      border-radius: size(40);
      font-size: size(26);
    }
  }
}
.search-info{
  padding: size(20) size(30);
  .header{
    display: flex;
    padding: size(15);
    .left-img{
      width: size(150);
      height: size(150);
      background: #ccc;
    }
    .info{
      flex: 1;
      margin-left: size(30);
      display: flex;
      flex-direction: column;
      text-align: left;
      .title{
        // justify-content: flex-start;
        margin-bottom: size(40);
      }
      .desc{
        justify-content: flex-end;   
        color: #ccc;
        font-size: size(26);  
        .dec-type{
          margin-top: size(20);
          .mark{
            padding:size(10) size(20);
            background: #579379;
            font-size: size(24);
            border-radius: size(30);
            margin-right: size(20);
          }
        }
      }
     
    }
  }
}
/deep/ .grid-eq {
  .title {
    &.t-1 {
      background: linear-gradient(to right, #5e2228, #90424b);
    }
    &.t-2 {
      background: linear-gradient(to right, #2f5f48, #579379);
    }
    &.t-3 {
      background: linear-gradient(to right, #024374, #096bb4) ;
    }
  }
}
</style>


