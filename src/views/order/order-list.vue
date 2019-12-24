<template>
  <div class="order-list">
   <v-tabs v-model="active" color="#03B097" swipeable @change="tabChange">
      <v-tab :title="item" v-for="(item,index) in list" :key="index">
        <scroll-list 
          :data="list_data" 
          :pullup="true" 
          @scrollToEnd="loadData" 
          class="list-container" 
        > 
          <v-order-list :list_data="list_data"/>  
        </scroll-list>
      </v-tab>
    </v-tabs> 
  </div>
</template>

<script>
import scrollList from "com/scroll-list"
import { Tab, Tabs } from 'vant';
import VOrderList from 'com/order/order-list'

export default {
  components: {
    scrollList,
    VOrderList,
    'v-tab': Tab,
    'v-tabs': Tabs
    
  },
  data() {
    return{
      list_data: 7,
      active: 0,
      isloading: true,
      list: ['设备服务', '维修服务']
    }
  },
  methods: {
    loadData() {
      console.log('滚动到底')
      this.isloading = true
    },
    tabChange(name, t) {
      // this.list_data = []
      console.log(name, t)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-list{
  position: fixed;
  top:0;
  bottom: 0;
  background: #f1f1f1;
  .list-container{
    position: fixed;
    width: 100%;
    top: size(100);
    bottom: size(1);
    overflow: hidden;
  }
}
</style>

