<template>
  <div class="home">
    <div class="top">
      <div class="left">
      </div>
      <div class="right">
        历史记录
      </div>
    </div>
    <img src="~img/problem1.png" @click="goback('equipment')">
    <img src="~img/problem2.png" @click="goback('reqair')">
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
    const data = await api.get('/api/partner/index/withdrawlist',{
      params:{
        page: 1
      }
    })
    console.log(data)
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';

.top{
  height: size(100);
  background: #323d43;
  box-sizing: border-box;
  padding: size(25) 0 0 size(30);
  position: relative;
  .left{
    width: size(50);
    height: size(50);
    background: #ddd;
  }
  .right{
    position: absolute;
    top: size(25);
    right: size(30);
    padding: size(10) size(20);
    border:size(1) solid #fff;
    color: #fff;
    border-radius: size(40);
  }
}

</style>
