<template>
  <div class="partner-container">
    <div class="header">
      <div class="item" @click="$refs.sel.show()">
        <div class="info">{{partner_data.address}}</div>
        <div class="icon">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="item" @click="show_picker = true">
        <div class="info">{{partner_data.info_type}}</div>
        <div class="icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <scroll-list class="list-wrap"  :data="list_data" ref="list_p">
      <info-list :data="7"/>
    </scroll-list>
    <div class="footer">
      <div class="btn-next active" @click="goActive">下一步
        <span class="icon">
          <van-icon name="arrow" />
        </span>
      </div>  
    </div>
    <div>
      <v-city v-model="addr" ref="sel" @input="getCity" />
      <v-pop v-model="show_picker" position="bottom">
         <v-picker
          show-toolbar
          title="安装类型"
          :columns="columns"
          @cancel="show_picker = false"
          @confirm="onConfirm"
        />
      </v-pop>
    </div>
  </div>
  
</template>

<script>
import VCity from 'com/city'
import InfoList from 'com/partner/info-list'
import scrollList from "com/scroll-list"
import { Picker , Popup} from 'vant';

export default {
  data() {
    return {
      addr: [],
      show_picker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      partner_data: {
        address: '广东省-深圳市',
        info_type: '举升机'
      },
      list_data: [],
      show_type: false
    };
  },
  components: {
    scrollList,
    VCity,
    InfoList,
    'v-picker': Picker,
    'v-pop': Popup
  },
  methods: {
    getCity(arr) {
      console.log(arr)
      this.partner_data.address = arr.join('-')
    },
    goActive() {
      this.$emit("go_ative", 2, 'release');
      this.$store.commit('install_info', [{partner_data: this.partner_data}])
    },
    onConfirm() {

    }
  }
};
</script>

<style lang="scss" scoped>
.partner-container {
  // padding: size(10) size(60);
  .header{
    position: fixed;
    width: 100%;
    top: 13.5%;
    height: size(80);
    display: flex;
    padding: size(10) size(60);
    align-items: center;
    .item{
      flex: 1;
      text-align: center;
      font-size: size(28);
      height: size(60);
      line-height: size(60);
      div{
        display: inline-block;
        &.icon{
          margin-top: size(2);
          vertical-align: middle;
          margin-left: size(10);
          font-size: size(20);
        }
      }
      // text-align: center;  
    }
  }
  .list-wrap{
    position: absolute;
    width: 100%;
    top:size(100);
    bottom: size(200);
    padding: size(0) size(60);
    overflow: hidden;
  }
  .footer{
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    background: #fff;
    // border-radius: size(30) size(30) 0 0;
    height: size(200);
    .btn-next{
      position: relative;
      margin: size(40) auto;
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
  
}
</style>

