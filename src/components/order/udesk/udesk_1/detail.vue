<template>
  <div>
    <div class="g-order-info info"> 
      <div class="item">
        <div class="l">服务类型:</div>
        <div class="r">返厂维修</div>
      </div>
      <div class="item" v-if="info.fcwx_sn">
        <div class="l">主机序列号：</div>
        <div class="r">{{info.fcwx_sn}}</div>
      </div>
      <div class="item" v-if="info.fcwx_model">
        <div class="l">产品型号：</div>
        <div class="r">{{info.fcwx_model}}</div>
      </div>
      <div class="item">
        <div class="l">返厂记录：</div>
        <div class="r">
          <v-btn round type="info" :disabled="dis_btn" :loading="b_loading" color="#2BA69F" loading-text="查询中..." size="small" @click="query(info.fcwx_sn)">查询</v-btn>
        </div>
      </div>
    </div>
    <div class="content" v-if="list.repairInfoList">
      <div class="hd">
        维修记录:
      </div>
      <v-steps :active="active" direction="vertical" active-color="#2BA69F">
        <v-step v-for="(item, index) in list.repairInfoList" :key="index">
          <h4>{{item.noteTypeMeaning}}</h4>
          <p>{{item.lastUpdateDate}}</p>
        </v-step>
      </v-steps>
    </div>
    <div class="content" v-if="list.expressInfoList">
      <div class="hd">
        物流记录:  <span>{{list.expressInfoList ? '' : '暂无记录'}}</span>
      </div>
      <v-steps :active="active" direction="vertical" active-color="#2BA69F">
        <v-step v-for="(item, index) in list.expressInfoList" :key="index">
          <h4>内件品名： {{item['内件品名']}}</h4>
          <p>'物流单号： '{{item['快递单号']}}</p>
          <p>物流公司：{{item['快递公司']}}</p>
        </v-step>
      </v-steps>
    </div>
  </div>
</template>

<script>
import { Switch, Button, Step, Steps } from 'vant'
import {queryFactory} from 'api'

export default {
  props: {
    info: Object
  },
  data() {
    return{
      checked: false,
      active: 0,
      b_loading: false,
      list: new Object()
    }
  },
  components: {
    'v-switch': Switch,
    'v-btn': Button,  
    'v-steps': Steps,
    'v-step': Step, 
  },
  computed: {
    dis_btn() {
      return !!(this.list.repairInfoList || this.list.expressInfoList)
    }
  },
  methods: {
    async query(no) {
      this.b_loading = true
      const data = await queryFactory(no || 2)    
      if (data && (data.repairInfoList || data.expressInfoList) ) {
        this.list = data
      } else{
        this.$toast('暂无数据')
      }  
      this.b_loading = false
    }
  }
  
}
</script>

<style lang="scss" scoped>
.info {
  padding: 0;
  /deep/ .van-switch{
    font-size: size(40);
  }
  .item{
    display: flex;
    align-items: center;
    .l{
      width: size(300);
      font-size: size(26);
    }
    .r{
      display: flex;
    } 
  }
}
.x{
  height: size(20);
  background: #ccc;
}
.content{
  padding-top: size(20);
  @include border('top');
  margin-top: size(20);
  .hd{
    line-height: size(40);
    color: #818181;
    span{
      padding-left: size(20);
      font-size: size(20);
    }
  }
}

</style>
