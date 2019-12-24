<template>
<div>
  <div class="list" :class="{'select': selelctIndex == index}" v-for="(item,index) in data" :key="index" @click="selectItem(index, item)"> 
    <div class="left">

    </div>
    <div class="right">
      <div class="info info-t">
        <div class="name">金雷雷</div>
        <div class="lip">服务合伙人</div>
      </div>
      <div class="info info-e">
        <div class="num">服务次数： <b>10次</b></div>
        <div class="score">评分： <b>5.0分</b></div>
      </div>
      <div class="info info-b">
        <div class="address">服务地区： <b>广东省-深圳市</b></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default{
  props: {
    noclick: {
      type: Boolean,
      default: false
    },
    data: Number
  },
  data() {
    return{
      selelctIndex: -1
    }
  },
  methods: {
    selectItem(idx, item) {
      if( this.noclick) {
        return
      }
      this.selelctIndex = idx
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  padding: size(30);
  display: flex;
  background: #EBEDF0;
  align-items: center;
  border-radius: size(10);
  margin-bottom: size(20);
  &.select{
    background: #fff;
    border:1px solid #2BA69F;
  }
  .left{
    width: size(120);
    height: size(120);
    background: #ccc;
    border-radius: 50%;
    margin-right: size(30);
  } 
  .right{
    flex: 1;
    .info{
      display: flex;
      line-height: size(40);
      align-items: center;
      justify-content: wrap;
      &.info-t{
        margin-bottom: size(10);
        .name{
          font-size: size(30);
          font-weight: bold;
          margin-right: size(30);
        }
        .lip{
          background: #35A1F2;
          color: #fff;
          margin-top: -0.7%;
          padding: 0 size(10);
          font-size: size(24);
          height: size(40);
          line-height: size(45);
          border-radius: size(10);
        }
      }
      &.info-e, &.info-b{
        font-size: size(24);
        color: #666;
      }
      &.info-e{
        .num{
          margin-right: size(15);
        }
      }
    }
  }
}
</style>
