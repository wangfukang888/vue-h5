<template>
  <div>
    <scroll-view class="info-container">
      <div class="main">  
        <div class="s-info" v-if="info_select_data" @click="toSelect">
            <div class="des">已选设备</div>
            <div class="name">{{info_select_data.device_name}}</div>
            <div class="type">型号：{{info_select_data.device_model}}</div>
            <div class="icon">
              <van-icon name="arrow" />
            </div>  
        </div>
        <div class="btn btn-select" v-else @click="toSelect">选择设备</div>
        <div class="desc">
          <div class="title">基本资料</div>
          <div class="det">
            <van-cell-group>
              <van-field required v-model="form_data.name" placeholder="请输入用户名" />
              <van-field required v-model="form_data.phone" placeholder="请输入手机号" />
            </van-cell-group>
          </div>
        </div>
        <div class="l-r">
          <div class="desc">
            <div class="title">安装日期</div>
            <div class="det" @click="show_time = true">
              <van-cell-group>
                <van-field required v-model="form_data.time" placeholder="请选择安装日期" readonly right-icon="arrow" />
              </van-cell-group>
            </div>
          </div>
          <div class="desc">
            <div class="title">所在地区</div>
            <div class="det">
              <van-cell-group>
                <van-field required v-model="form_data.address" placeholder="请选择地址" readonly right-icon="arrow" @click="$refs.selAddr.show()"/>
              </van-cell-group>
            </div>
          </div>
        </div>
        <div class="desc">
          <div class="title">详细地址</div>
          <div class="det">
            <van-cell-group>
              <van-field required v-model="form_data.f_address" placeholder="请填写详细地址" />
            </van-cell-group>
          </div>
        </div>
        <div class="desc">
          <div class="title">备注</div>
          <div class="det">
            <van-cell-group>
              <van-field type="textarea" v-model="form_data.remask" placeholder="备注信息" />
            </van-cell-group>
          </div>
        </div>
        <div class="btn-next needsclick" :class="{active: is_from}" @click="goActive">下一步
          <span class="icon">
            <van-icon name="arrow" />
          </span>
        </div>
      </div> 
    </scroll-view>
    <v-city v-model="addr" ref="selAddr" @input="getCityName"/>
    <v-popup v-model="show_time" position="bottom">
      <v-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择日期"
        :min-date="min_date"
        @cancel="show_time = false"
        @confirm="confirm_time"
      />
    </v-popup>
    <div>
      <select-device 
        ref="s_device"
        :list_data="list_data"
        :nav_data="nav_data"
        :show="show_select" 
        @selectChange="changeItem"  
        @close="close"
      />
    </div>
  </div>
</template>

<script>
import VCity from 'base/city/city'
import SelectDevice from 'com/eq_install/select-device'
import { DatetimePicker, Popup } from 'vant'
import {getDeviceList} from 'api'

export default {
  data() {
    return {
      form_data: {
        address: ''
      },
      addr: [],
      list_data: [],
      nav_data: [],
      show_time: false,
      show_select: false,
      min_date: new Date(),
      info_select_data: null,
      currentDate: new Date()
    }
  },
  components: {
    SelectDevice,
    VCity,
    'v-datetime-picker': DatetimePicker,
    'v-popup': Popup
  },
  mounted() {
    const form_data = JSON.parse(localStorage.getItem('form_data'))
    if (form_data && form_data.select_info) this.info_select_data = form_data.select_info
    if (form_data) this.form_data = form_data
  },
  computed: {
    is_from() {
      const f_data = this.form_data
      return this.info_select_data && f_data.name && f_data.phone && f_data.time && f_data.address && f_data.f_address 
    }
  },
  methods: {
    confirm_time() {
      this.form_data.time = this._formatTime(this.currentDate)
      this.show_time = false
    },
    _formatTime(date) {
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = this._zero_num(month)
      day = this._zero_num(day)
      // const hour = date.getHours()
      // const minute = date.getMinutes()
      // const second = date.getSeconds()
      return `${year}-${month}-${day}`
    },
    _zero_num(num) {
      return num < 10 ? '0' + num : num
    },
    getCityName(arr) {
      this.form_data.address = arr.join('-')
    },
    async getList(id, type) {
      const cid = type ? '' : id
      const data = await getDeviceList(cid)
      const arr = []
      if (data instanceof Array) {
        const nav_arr = []
        data.map(item => {
          nav_arr.push({
            device_type_id: item.device_type_id,
            deviceTypeName: item.deviceTypeName
          })
        })
        this.nav_data = nav_arr   
        this.list_data = data
        // 初始进入
        this.list_data && this.$refs.s_device._dataInit(this.nav_data[0], this.list_data)
      } 
    },
    toSelect() {
      this.show_select = true
      this.$emit('hidden', true)
      if( this.list_data.length == 0 ) {
        this.getList()
      }
    },
    close() {
      this.show_select = false
      this.$emit('hidden', false)
    },
    changeItem(query) {
      this.info_select_data = query
      this.show_select = false
      this.$emit('hidden', false)
    },
    goActive() {
      const reg = /^[1]([3-9])[0-9]{9}$/
      if (!this.is_from) {
        return this.toast('*号项不能为空')
      }
      if (!this.form_data.phone || !reg.test(this.form_data.phone)) {
        return this.$toast('手机号不能为空或格式不正确')
      }
      this.$emit("go_ative", 1, 'partner')
      this.form_data.select_info = this.info_select_data
      localStorage.setItem('form_data', JSON.stringify(this.form_data))
      this.$store.commit('install_info', this.form_data)
    }
  }
};
</script>

<style lang="scss" scoped>
.info-container {
  position: absolute;
  top: size(60);
  bottom: 0;
  width: 100%;
  padding: size(10) size(60);
  .main{
    padding-bottom: size(10);
  }
  .btn-select{
    width: 100%;
    height:size(80);
    font-size: size(30);
    font-weight:500;
    color:rgba(43,166,159,1);
    border: size(1) solid #2BA69F;
    line-height:size(80);
    border-radius: size(30);
  }
  .s-info{
    position: relative;
    border: size(1) solid #2BA69F;
    padding: size(30) 0;
    border-radius: size(30);
    .icon{
      position: absolute; 
      right: size(20);
      top: 42%;
    }
    .des{
      color:rgba(43,166,159,1);
      font-weight:500;
      font-size: size(24);
      margin-bottom: size(20);
    }
    .name{
      color: #333;
      margin-bottom: size(10);
    }
    .type{
      font-size: size(24);
      color: #888;
    }
  }
  .l-r{
    display: flex;
    .desc{
      flex: 1;
      margin-right: size(50);
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .desc{
    width: 100%;
    margin: size(20) 0;
    // height: size(900);
    // background: #ccc;
    .title{
      height: size(50);
      line-height: size(50);
      font-size: size(30);
      color: #666;
      text-align: left;
    }
    .det{
      margin: size(20) 0;
      /deep/ .van-cell{
        margin: size(20) 0;
        background: #EBEDF0;
        border-radius: size(30);
        padding-right: size(15);
        color: #939FB2;
        input{
          background: transparent;
          padding-left: size(10);
        }
      }
    }
  }
  .btn-next{
    position: relative;
    margin: size(50) auto;
    border-radius: size(30);
    width: size(440);
    height: size(110);
    line-height: size(110);
    background: #EBEDF0;
    .icon{
      position: absolute;
      top: size(20);
      right:size(20);
      display: inline-block;
      width: size(70);
      height: size(70);
      line-height: size(80);
      padding-left: 1%;
      background: #fff;
      border-radius: 50%;
      color: #333;
      font-weight: bold;
    }
    &.active{
      background: #2BA69F;
      color: #fff;
      .icon{
        color: #2BA69F;
      }
    }
  }
}
</style>

