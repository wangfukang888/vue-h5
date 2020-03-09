<template>
  <div class="home"> 
    <div class="top">
      <div class="left" @click="goback('fit')"></div>
      <div class="right" @click="goback('order_list')">历史记录</div>
    </div>    
    <div class="content">  
      <div class="img" v-for="(item, index) in imgData" :key="index" v-lazy:background-image="item.url" @click="goback(item.path, $route.query.serial_no)"></div> 
    </div>  
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      text: 'golo汽修大师',
      imgData: [
        {
          url: require('img/problem1.png'),
          path: 'repair'
        },
        {
          url: require('img/problem2.png'),
          path: 'equipment'
        }
      ]
    }
  },
  methods: {
    goback(url, params) {
      this.$router.push({ name: url })
      params && sessionStorage.setItem('query_no', JSON.stringify(params))
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  top:0;
  width: 100%;
  height: size(100);
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  padding: size(20) 0 0 size(30);
  .left {
    width: size(60);
    height: size(60);
    @include bg('~img/icon-home.png');
  }
  .right {
    position: absolute;
    top: size(22);
    right: size(30);
    padding: size(10) size(20);
    border: size(1) solid #fff;
    color: #fff;
    border-radius: size(40);
  }
  img {
    display: block;
  }
}
.content {
  // 解决ios定位元素滚动的问题
  overflow: auto;
  -webkit-overflow-scrolling: touch;    
  height: 100vh;
  .img {
    height: size(750);
    background-size: 100% 100%;
  }
}
</style>
