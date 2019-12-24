<template>
  <div class="container">
    <div class="success">
      <div class="bg"></div>
      <div class="text">发布成功，等待接单！</div>
    </div>
    <div class="footer">
      <div class="btn" @click="goBack('order_detail')">查看订单详情</div>
      <div class="btn-index" @click="goBack('home')">
        <div class="btn-a">
          <van-icon name="arrow" class="icon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack(p) {
      this.$router.push({
        name: p,
        params: {
          id: 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  position: fixed;
  top:0;
  bottom: 0;
  background: #f1f1f1;
}
.success{
  position: absolute;
  top:15%;
  left:50%;
  transform: translateX(-50%);
  .bg{
    width: size(586);
    height: size(536);
    background: #ccc;
  }
  .text{
    margin-top: size(40);
  }
}
.footer{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: size(200);
  display: flex;
  justify-content: center;
  align-items: center;
  .btn{
    background: #2BA69F;
    border-radius: size(36);
    padding: size(40) size(80);
    color: #fff;
  }
  .btn-index{
    position: relative;
    background: #2BA69F;
    width: size(118);
    border-radius: size(30);
    height: size(112);
    margin-left: size(20);
    .btn-a{
      position: absolute;
      left:50%;
      top:50%;
      width: size(68);
      height: size(62);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: 50%;
      .icon{
        font-size: size(40);
        color: #2BA69F;
      }
    }
  }
}

</style>
