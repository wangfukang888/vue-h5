<template>
  <div class="select-container" :class="{active: show}">
    <!-- <div class="header">
      <div class="search">
        <form action="/">
          <van-search placeholder="请输入搜索关键词" v-model="s_val" />
        </form>
      </div>
    </div> -->
    <section>
       <div class="left-nav">
        <scroll-view class="l-scroll" ref="l_s">
          <div class="item" :class="{active: currentIndex == index}" v-for="(item,index) in nav_data" :key="index" @click="selectNav(index, item)">
            {{item.deviceTypeName}}
          </div>
        </scroll-view>
      </div>
      <div class="r-content">
        <scroll-view class="r-scroll" :list_data="list_datas">
          <div class="wrap" v-if="list_datas && list_datas.length > 0">
            <div class="item" @click="selectItem(index, item)" :class="{active: currentItem == index}" v-for="(item,index) in list_datas" :key="index">
              <div class="l-img">
                <img v-lazy="item.device_image" alt="">
              </div>
              <div class="r">
                <h4>{{item.device_name}}</h4>
                <div class="type">型号： {{item.device_model}}</div>
                <div class="price">安装费： <b>¥{{item.device_price}}</b></div>
              </div>
            </div>
          </div>
          <div class="loading" v-else>
            <loading vertical />
          </div>
        </scroll-view>
      </div>
    </section>
    <div class="btn footer" @click="close">关闭</div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    list_data: Array,
    nav_data: Array
  },
  data() {
    return{
      s_val:'',
      list_datas: [],
      currentIndex: 0,
      currentItem: -1
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    selectNav(i, item) {
      // 初始化选中索引
      const data = this.list_data
      this.currentItem = -1
      this.currentIndex = i
      this._dataInit(item)
    },
    _dataInit(item, datas) {
      let arr = []
      const data = datas ? datas : this.list_data 
      data.map(v => {
        if(v.device_type_id == item.device_type_id) {
          v.deviceRes.map( s => {
            arr.push(Object.assign(s, {
              device_type_id: item.device_type_id
            }))
          })
        }
      })
      this.list_datas = arr
    },
    selectItem(i, item) {
      this.currentItem = i
      this.$emit('selectChange', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-container{
  position: fixed;
  width: 100%;
  top:0;
  bottom: 0;
  z-index: 99;
  background:#fff;
  transition: all 0.4s;
  transform: translate3d(0, 100%, 0);
  &.active{
    transform: translate3d(0, 0, 0);
  }
  .header{
    display: flex;
    height: size(100);
    padding: 0 size(10);
    align-items: center;
    @include border('bottom');
    .search{
      width: 100%;
      /deep/ input{
        background: transparent;
      }
      /deep/ .van-search__content{
        border-radius: size(40);
      }
    }
  }
  section{
    position: fixed;
    width: 100%;
    top: size(0);
    bottom: size(100);
    display: flex;
    overflow: hidden;
    .loading{
      margin-left: -16%;
    }
    .left-nav{
      width: size(180);
      .l-scroll{
        position: absolute;
        z-index: 11;
        width: size(180);
        top:0;
        bottom: 0;
        background: #F5F6F8;
        .item{
          width: size(180);
          height: size(120);
          line-height: size(40);
          display: flex;
          font-size: size(26);
          color:#777;
          align-items: center;
          background: #F5F6F8;
          justify-content: center;
          border-bottom: size(0.5) solid #eee;
          &.active{
            background: #fff;
          }
        }
      }
    }
    .r-content{
      flex: 1;
      .r-scroll{
        position: absolute;
        width: 100%;
        top:0;
        bottom: 0;
        .wrap{
          // width: 100%;
          padding: size(26) size(30);
          .item{
            display: flex;
            width: size(510);
            align-items: center;
            background: #F5F6F8;
            margin-bottom: size(20);
            border-radius: size(10);
            padding: size(18);
            &.active{
              background: #fff;
              border:1px solid #2BA69F;
            }
            .l-img{
              width: size(120);
              background: #fff;
            }
            .r{
              flex: 1;
              padding: 0 size(20);
              text-align: left;
              h4{
                font-size: size(30);
                margin-bottom: size(12);
              }
              .type{
                font-size: size(24);
                color: #666;
                line-height: size(34);
              }
              .price{
                @extend .type;
                b{
                  font-size: size(26);
                  color: #E31436;
                }
              }
            }
          }
        }
      }
    } 
  }
  .footer{
    position: absolute;
    width: 100%;  
    height: size(100);
    bottom: 0;
    color: #fff;
    line-height: size(100);
    background: #2BA69F;
  }
}
</style>
