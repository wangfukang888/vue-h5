<template>
  <div class="order-list">
   <v-tabs v-model="active" color="#03B097" swipeable @change="tabChange">
      <v-tab :title="item" v-for="(item,index) in list" :key="index">
        <list 
          :list_data="list_data" 
          pullup
          pullDown
          :hasLoading="isloading"
          :hasNext="hasNext"
          :downText="downText"
          :isRefresh="isRefresh"
          @scrollToEnd="loadData"
          @downRefresh="downRefresh" 
          @downTouchEnd="touchEnd"
          class="list-container" 
        > 
          <v-order-list :list_data="list_data"/>
        </list>
      </v-tab>
    </v-tabs> 
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import VOrderList from 'com/order/order-list'
import {getOrderList} from 'api'
import List from 'base/list/list'

export default {
  components: {
    VOrderList,
    List,
    'v-tab': Tab,
    'v-tabs': Tabs
    
  },
  data() {
    return{
      list_data: [],
      active: 0,
      isloading: false,
      downText: '',
      isRefresh: false,
      hasNext: true,
      list: ['设备服务', '维修服务']
    }
  },
  created() {
    // 数据初始化
    this.page = 1
    this.pageSize = 6
    this.getList(1)
  },
  methods: {
    async getList(index, type) {
      this.isloading = true
      this.index = index
      const data = await getOrderList(index, this.page, this.pageSize)
      if (data instanceof Array) {
        this.isRefresh = false
        this.isloading = false
        if (data.length == 0 && this.page == 1) {
          this.hasNext = false
          return
        }
        if (type) {
          return this.list_data = data
        }
        if (data.length < this.pageSize) this.hasNext = false
        this.list_data = this.list_data.concat(data) 
      }
    },
    loadData() {
      console.log('滚动到底')
      if ( !this.hasNext ) return
      if (this.list_data.length == 0) return
      this.page++
      this.getList(this.index)
    },
    touchEnd(y) {
      const scrollY = parseInt(y)
      if (scrollY > 50) {
        this.page = 1
        this.isRefresh = true
        this.getList(this.index, 'down')
        this.hasNext = true
      } 
      this.downText = ''
    },
    downRefresh(y) {
      let scrollY = parseInt(y) 
      this.downText = '下拉刷新'
      if ( scrollY > 50) {
        this.downText = '释放即可刷新' 
      }
    },
    tabChange(i, t) {
      this.list_data = []
      this.page = 1
      this.hasNext = true
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
}
</style>

