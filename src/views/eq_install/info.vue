<template>
  <div>
    <scroll-list class="info-container">
      <div class="main">  
        <div class="s-info" v-if="info_select_data" @click="toSelect">
            <div class="des">已选设备</div>
            <div class="name">{{info_select_data.t}}</div>
            <div class="type">型号：{{info_select_data.type}}</div>
            <div class="icon">
              <van-icon name="arrow" />
            </div>  
        </div>
        <div class="btn-select" v-else @click="toSelect">选择设备</div>
        <div class="desc">
          <div class="title">基本资料</div>
          <div class="det">
            <van-cell-group>
              <van-field v-model="form_data.name" placeholder="请输入用户名" />
              <van-field v-model="form_data.phone" placeholder="请输入手机号" />
            </van-cell-group>
          </div>
        </div>
        <div class="l-r">
          <div class="desc">
            <div class="title">安装日期</div>
            <div class="det" @click="show_time = true">
              <van-cell-group>
                <van-field v-model="form_data.time" placeholder="请选择安装日期" readonly right-icon="arrow" @click="getDate" />
              </van-cell-group>
            </div>
          </div>
          <div class="desc">
            <div class="title">所在地区</div>
            <div class="det">
              <van-cell-group>
                <van-field v-model="form_data.address" placeholder="请选择地址" readonly right-icon="arrow" @click="$refs.selAddr.show()"/>
              </van-cell-group>
            </div>
          </div>
        </div>
        <div class="desc">
          <div class="title">详细地址</div>
          <div class="det">
            <van-cell-group>
              <van-field v-model="form_data.f_address" placeholder="请填写详细地址" />
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
        <div class="btn-next active" @click="goActive">下一步
          <span class="icon">
            <van-icon name="arrow" />
          </span>
        </div>
      </div> 
    </scroll-list>
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
  </div>
</template>

<script>
import VCity from 'com/city'
import scrollList from "com/scroll-list"
import { DatetimePicker, Popup } from 'vant'

export default {
  data() {
    return {
      form_data: {},
      addr: [],
      show_time: false,
      min_date: new Date(),
      info_select_data: null,
      currentDate: new Date()
    };
  },
  components: {
    scrollList,
    VCity,
    'v-datetime-picker': DatetimePicker,
    'v-popup': Popup
  },
  mounted() {
    let store_info = this.$store.state.select_info
    if (store_info) this.info_select_data = store_info

  },
  methods: {
    getDate() {
      console.log(this.form_data.phone);
    },
    confirm_time() {
      this.form_data.time = this._formatTime(this.currentDate)
      this.show_time = false
    },
    _formatTime(date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      // const hour = date.getHours()
      // const minute = date.getMinutes()
      // const second = date.getSeconds()
      return `${year}-${month}-${day}`
    },
    getCityName(arr) {
      console.log(arr)
      this.form_data.address = arr.join('-')
    },
    toSelect() {
      this.$router.push('select_device')
    },
    getAddress() {

    },
    goActive() {
      let arr = []
      this.$emit("go_ative", 1, 'partner')
      arr.push({
        form_data: this.form_data
      })
      this.$store.commit('install_info', arr)
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
        color: #939FB2;
        input{
          background: transparent;
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

