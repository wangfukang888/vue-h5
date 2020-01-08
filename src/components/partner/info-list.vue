<template>
<div v-if="list_data">
  <div class="list" :class="{'select': selelctIndex == index}" v-for="(item,index) in list_data" :key="index" @click="selectItem(index, item)"> 
    <div class="left">
      <img v-lazy="item.headimage" alt="">
    </div>
    <div class="right">
      <div class="info info-t">
        <div class="name">{{item.realname}}</div>
        <div class="lip">服务合伙人</div>
      </div>
      <div class="info info-e">
        <div class="num">服务次数： <b>{{item.servicenums}}次</b></div>
        <div class="score">评分： <b>{{item.servicescore.toFixed(1)}}分</b></div>
      </div>
      <div class="info info-b">
        <div class="address">服务地区： <b>{{item.serviceaddr}}</b></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default{
  props: {
    list_data: Array,
    noclick: {
      type: Boolean,
      default: false
    }
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
      this.$emit('select', item)
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
  &:last-child{
    margin-bottom: 0;
  }
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
    overflow: hidden;
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
        color: #888;
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
