<template>
  <div class="g-order-info info"> 
    <div class="item">
      <div class="l">服务类型:</div>
      <div class="r">{{info.udeskType}}</div>
    </div>
    <!-- <div class="item" v-if="info.fcwxPhone">
      <div class="l">客户电话:</div>
      <div class="r">{{info.fcwxPhone}}</div>
    </div> -->
    <div class="item" v-if="info.fcwxModel">
      <div class="l">产品型号:</div>
      <div class="r">{{info.fcwxModel}}</div>
    </div>
    <div class="item" v-if="info.fcwxSn">
      <div class="l">主机序列号:</div>
      <div class="r">{{info.fcwxSn}}</div>
    </div>
    <!-- <div class="item" v-if="info.fcwxAccident">
      <div class="l">故障现象:</div>
      <div class="r">{{info.fcwxAccident}}</div>
    </div> -->
    <div class="item" v-if="info.fcwxAddr">
      <div class="l">客户地址:</div>
      <div class="r">{{info.fcwxAddr}}</div>
    </div>
    <div class="item">
      <div class="l">发布时间:</div>
      <div class="r">{{info.fcwxTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: new Object()
  }
}
</script>

