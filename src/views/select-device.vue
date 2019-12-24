<template>
  <div class="select-container">
    <header>
      <div class="search">
        <form action="/">
          <van-search placeholder="请输入搜索关键词" v-model="s_val" />
        </form>
      </div>
    </header>
    <section>
      <div class="left-nav">
        <scroll-list class="l-scroll" ref="l_s">
          <div class="item" :class="{active: currentIndex == index}" v-for="(item,index) in 12" :key="index" @click="selectNav(index)">
            举升机身上
          </div>
        </scroll-list>
      </div>
      <div class="r-content">
        <scroll-list class="r-scroll">
          <div class="wrap">
            <div class="item" @click="selectItem(index)" :class="{active: currentItem == index}" v-for="(item,index) in 12" :key="index">
              <div class="l-img">

              </div>
              <div class="r">
                <h4>元珍举升机</h4>
                <div class="type">型号： CNS22343</div>
                <div class="price">安装费： <b>¥400.00</b></div>
              </div>
            </div>
          </div>
        </scroll-list>
      </div>
    </section>
  </div>
</template>

<script>
import scrollList from "com/scroll-list"

export default {
  components: {
    scrollList
  },
  data() {
    return{
      s_val: '',
      currentIndex: 1,
      currentItem: -1
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.$refs.l_s && this.$refs.l_s.refresh()
    })
  }, 
  methods: {
    selectNav(i) {
      this.currentIndex = i
    },
    selectItem(i) {
      this.currentItem = i
      let query = {          
        t: '元征举升机',
        type: 'CNS23500'         
      }
      this.$router.push('eq_install')
      this.$store.commit('select_info', query)
    }
  }
}
</script>

<style lang="scss" scoped>
header{
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
  top: size(100);
  bottom: 0;
  display: flex;
  overflow: hidden;
  .left-nav{
    width: size(180);
    .l-scroll{
      position: absolute;
      width: size(180);
      top:0;
      bottom: 0;
      background: #F5F6F8;
      .item{
        width: size(180);
        height: size(120);
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
            height: size(120);
            background: #fff;
          }
          .r{
            padding: 0 size(20);
            text-align: left;
            // display: flex;
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

</style>
