<template>
  <div class="home">
    <div class="top">
      <div class="left">

      </div>
      <div class="right">
        历史记录
      </div>
    </div>
    <div class="bg bg-e" @click="goback('equipment')"></div>
    <div class="bg bg-r" @click="goback('reqair')"></div>
  </div>
</template>

<script>
import api  from 'api'

export default {
  name: 'home',
  data() {
    return{
      text: 'golo汽修大师'
    }
  },
  methods: {
    goback(url) {
      this.$router.push(url)
    }
  },
  async mounted() {
    // const data = await api.get('/api/partner/index/withdrawlist',{
    //   params:{
    //     page: 1
    //   }
    // })
    // console.log(data)
  }
}
</script>

<style lang="scss" scoped>
.top{
  height: size(100);
  background: #323d43;
  box-sizing: border-box;
  padding: size(20) 0 0 size(30);
  position: relative;
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
.bg{
  width: 100%;
  height: size(600);
  &-e{
    @include bg('~img/problem1.png');
  }
  &-r{
    height: size(700);
    @include bg('~img/problem2.png');
  }
}

</style>
