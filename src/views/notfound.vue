<template>
  <container>
    <div class="not-404">
      <div class="not">
        <img src="~img/404.png" alt="">
      </div>
      <div class="btn" @click="goHome">返回首页</div>
    </div>
  </container>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.not-404{
  padding: size(50) 0 0 0;
  .not{
    img{
      width: size(400);
      margin: 0 auto;
    }
  }
  .btn{
    width: size(200);
    height: size(60);
    line-height: size(60);
    background: #2d9a58;
    margin: 0 auto;
    border-radius: size(40);
    color: #fff;
    font-size: size(26);
    margin-top: size(100);
  }
}
</style>


