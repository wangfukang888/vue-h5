<template>
  <div class="order-list">
   <v-tabs color="#03B097" swipeable @change="tabChange">
    <v-tab :title="item" v-for="(item,index) in nav_list" :key="index">
      <list 
        pulldown
        pullup
        :list_data="list_data" 
        :hasNext="hasNext"
        :isRefresh="isRefresh"
        @pullUpLoad="loadData"
        @pullDownRefresh="downRefresh"
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
      isRefresh: false,
      hasNext: true,
      nav_list: ['设备服务']
    }
  },
  created() {
    // 数据初始化
    this.page = 1
    this.pageSize = 6
    this.getList(1)
  },
  activated() {
    if (this.$store.state.is_refresh) {
      this.getList(this.index, 'down')
      this.$store.commit('get_refresh', false)
    }
  },
  methods: {
    async getList(index, type) {
      this.index = index
      const data = await getOrderList(index, this.page, this.pageSize)
      if (data instanceof Array) {
        this.isRefresh = false
        if (data.length == 0 && this.page == 1) return this.hasNext = false
        if (type) return this.list_data = data 
        if (data.length < this.pageSize) this.hasNext = false
        this.list_data = this.list_data.concat(data) 
        return 
      }
      // 数据返回错误，也需要关闭
      this.hasNext = false
    },
    loadData() {
      if ( !this.hasNext ) return
      if (this.list_data.length == 0) return
      this.page++
      this.getList(this.index)
    },
    downRefresh() {
      this.page = 1
      this.isRefresh = true
      this.getList(this.index, 'down')
      this.hasNext = true   
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

