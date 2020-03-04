<template>
  <container ref="e_bs">
    <div class="equipment">
      <template v-if="!show_search">
        <div class="top">
          <!-- <div class="icon-code"  @click="getScan"> 
            <van-icon name="scan"/>
          </div> -->
          <div class="search">
            <div class="icon">
              <van-icon name="search" />
            </div>
            <input class="needsclick" type="text" v-model="search_val" placeholder="搜索序列号" @focus="goSearch">
          </div>
        </div>
        <loading type="spinner" v-if="is_loading" style="padding: 20px 0"/>
        <div class="search-info" v-if="search_info">
          <div class="header">
            <div class="left-img">
              <img v-lazy="search_info.deviceimage" alt="">
            </div>
            <div class="info">
              <div class="title">{{search_info.devicename}}</div>
              <div class="desc">
                <span class="dec-x">序列号 {{search_info.devicesn}}</span>
                <div class="dec-type">
                  <span class="mark">型号</span><span> {{search_info.devicemodel}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <van-grid :column-num="3" :border="false">
              <van-grid-item v-for="(item, index) in search_grid" 
                :key="index" 
                :text="item.name" 
                @click="topdf(item)"
                :icon="item.imgUrl || 'photo-o'" />
            </van-grid>
          </div>
        </div>
        <div class="grid-eq">
          <v-grid :list="grid_list" @search="goSearch"></v-grid>
        </div>
      </template>
      <template v-else>
        <v-search @cancel="cancel" @search="search" ref="f_s"></v-search>
      </template>
    </div>
  </container>
</template>

<script>
import VSearch from 'base/search/search'
import VGrid from "com/grid-list"
import {equipment_data, querydeviceimg} from '../../mock/grid_data'
import {queryDevice} from 'api'
import {SERVICE_URL} from '@/common/config'

export default {
  components: {
    VGrid,
    VSearch
  },
  data() {
    return {
      text: "设备有问题",
      search_val: '',
      pdfSrc: '',
      imgdata: querydeviceimg || [],
      is_loading: false,
      show_search: false,
      search_info: null,
      search_grid: [],
      grid_list:[]
    }
  },
  destroyed() {
    this.$refs.e_bs && this.$refs.e_bs.destroy()
  },
  mounted() {
    const query_no = JSON.parse(sessionStorage.getItem('query_no'))
    if (query_no) this.appQuery(query_no)
    this.grid_list = equipment_data
  },
  methods: {
    // 外部携带获取
    appQuery(no) {
      const history_list = JSON.parse(localStorage.getItem('history_list') )
      this.search(no, history_list)
    },
    async queryInfo(val, arrs, type) {
      const data = await queryDevice(val)
      const arr = []
      const newArr = []
      if (data instanceof Object) {
        this.search_info = data
        let files = data.deviceFile
        for (let i in files) {
          arr.push(files[i])
        }
        arr.forEach((item,i) => {
          newArr.push(Object.assign(item, {
            imgUrl: this.imgdata[i]
          }))
        })
        sessionStorage.setItem('query_no', JSON.stringify(val))
        if (type) localStorage.setItem('history_list', JSON.stringify(arrs) ) 
        this.search_grid = newArr
        this._grid_handle(data.menu_types)
      } 
      this.is_loading = false
    },
    _grid_handle(data) {
      if(!data) return
      this.grid_list = []
      equipment_data.map(v => {
        v.typeRes.map( item => {
          data.map(f => {
            if(item.name == f) {
              item.hide = true
            } 
          })  
        })
      })  
      this.$nextTick(() => {
        this.grid_list = equipment_data
      })
    },
    getScan() {
      // wx_scan(wx)
    },
    goSearch() {
      this.show_search = true
      this.$nextTick(() => {
        this.$refs.f_s && this.$refs.f_s.f()
      })   
    },
    topdf(item) {
      window.location.href = item.url
    },
    cancel() {
      this.show_search = false
    },
    search(val, arr) {
      let arrs = arr || []
      let type 
      this.show_search = false
      this.search_info = ''
      this.search_val = val
      this.is_loading = true  
      type = !arrs.includes(val)
      arrs.push(val)
      this.queryInfo(val, arrs, type)
    }
  }
};
</script>

<style lang="scss" scoped>
.top{
  width: 100%;
  background: #f1f1f1;
  height: size(100);
  padding: size(20);
  display: flex;
  .icon-code{
    width: size(50);
    margin-right: size(30);
    font-size: size(60);
  }
  .search{
    position: relative;
    flex: 1;
    width: 100%;
    height: size(60);
    .icon{
      position: absolute;
      top:size(15);
      left: size(10);
    }
    input{
      height: size(60);
      line-height: size(60);
      padding-left: size(60); 
      border-radius: size(40);
      font-size: size(26);
    }
  }
}
.search-info{
  padding: 0 size(20);
  margin-bottom: size(20);
  .header{
    display: flex;
    background: #fff;
    padding: size(30);
    padding-bottom: size(10);
    border-radius: size(40) size(40) 0 0;
    .left-img{
      width: size(150);
      height: size(150);
      border-radius: size(5);
    }
    .info{
      flex: 1;
      margin-left: size(30);
      display: flex;
      padding: size(10) 0;
      flex-direction: column;
      text-align: left;
      .title{
        margin-bottom: size(30);  
      }
      .desc{
        justify-content: flex-end;   
        color: #ccc;
        font-size: size(26);  
        .dec-type{
          margin-top: size(20);
          .mark{
            padding:size(6) size(20);
            background: #579379;
            font-size: size(24);
            border-radius: size(30);
            margin-right: size(20);
          }
        }
      }    
    }
  }
  .bottom{
    background: #fff;
  }
}
.grid-eq {
  padding: 0 size(20);
}
</style>


