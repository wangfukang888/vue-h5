<template>
  <div class="home">
    <div class="top">
      <div class="left" @click="goback('fit')"></div>
      <div class="right" @click="goback('order_list')">历史记录</div>
    </div>   
    <div class="content">    
      <div class="bg bg-r" @click="goback('reqair')"></div>  
      <div class="bg bg-e" @click="goback('equipment', $route.query.serial_no)"></div> 
    </div>  
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return{
      text: 'golo汽修大师'
    }
  },
  methods: {
    goback(url, params) {
      this.$router.push({
        name: url,
        query: {
          query_no: params
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top{
  position: fixed;
  width: 100%;
  height: size(100);
  background:rgba(0,0,0,0.5);
  z-index: 10;
  padding: size(20) 0 0 size(30);
  .left{
    width: size(60);
    height: size(60);
    @include bg('~img/icon-home.png');
  }
  .right{
    position: absolute;
    top: size(22);
    right: size(30);
    padding: size(10) size(20);
    border:size(1) solid #fff;
    color: #fff;
    border-radius: size(40);
  }
  img{
    display: block;
  }
}
.content{
  position: absolute;
  width: 100%;
  top: 0;
  overflow: auto;
  bottom: 0;
}
.bg{
  width: 100%;
  height: size(750);
  &-e{
    @include bg('~img/problem2.png');
  }
  &-r{
    @include bg('~img/problem1.png');
  }
}

</style>
