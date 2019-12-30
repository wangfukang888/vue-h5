<template>
  <div class="order-list">
   <v-tabs v-model="active" color="#03B097" swipeable @change="tabChange">
      <v-tab :title="item" v-for="(item,index) in list" :key="index">
        <scroll-list 
          :list_data="list_data" 
          ref="s_l"
          :pullup="true"
          @scrollToEnd="loadData" 
          class="list-container" 
        > 
          <v-order-list :list_data="list_data" :hasNext="hasNext"/>
          <loading vertical v-if="isloading"/>
          <div class="no_data" v-if="is_no_data">暂无数据</div>  
        </scroll-list>
      </v-tab>
    </v-tabs> 
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import VOrderList from 'com/order/order-list'
import {getOrderList} from 'api'

export default {
  components: {
    VOrderList,
    'v-tab': Tab,
    'v-tabs': Tabs
    
  },
  data() {
    return{
      list_data: [],
      active: 0,
      isloading: false,
      hasNext: false,
      is_no_data: false, 
      list: ['设备服务', '维修服务']
    }
  },
  created() {
    this.page = 1
    this.getList(1)
  },
  methods: {
    async getList(index) {
      this.isloading = true
      this.is_no_data = false
      const data = await getOrderList(index)
      if(data.no_status) return this.isloading = false
      if(data) {
        this.hasNext = false
        this.isloading = false
        if (data.length == 0) return this.is_no_data = true
        this.list_data = this.list_data.concat(data) 
      }
    },
    loadData() {
      console.log('滚动到底')
      this.hasNext = true
      if(this.page == 1) {
        this.hasNext = false
      }
      // this.isloading = true
      // this.list_data = this.list_data.concat(this.list_data)
    },
    tabChange(i, t) {
      this.list_data = []
      const index = i == 0 ? 1 : 2 
      this.getList(index)
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
    .no_data{
      padding: size(200) 0;
      color: #ccc;
    }
  }
}
</style>

