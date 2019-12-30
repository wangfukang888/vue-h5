<template>
  <div class="partner-container">
    <div class="header">
      <div class="item" @click="$refs.sel.show()">
        <div class="info">
          {{partner_data.address}}
          <div class="icon">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="item">
        <div class="info">
          {{partner_data.info_type}}
          <!-- <div class="icon">
            <van-icon name="arrow" />
          </div> -->
        </div>
      </div>
    </div>
    <scroll-list class="list-wrap"  :list_data="list_data" ref="list_p">
      <info-list :list_data="list_data" @select="selectInfo"/>
      <div class="loading" v-if="isloading">
        <loading vertical />
      </div> 
      <div class="no_data" v-if="is_no_data">暂无数据</div>  
    </scroll-list>
    <div class="footer">
      <div class="btn-prev active" @click="goback">
        <span class="icon">
          <van-icon name="arrow-left" />
        </span>
      </div>  
      <div class="btn-next" :class="{active: is_partner}" @click="goActive">下一步
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
import VCity from 'base/city/city'
import InfoList from 'com/partner/info-list'
import { Picker , Popup} from 'vant'
import { getPartner } from 'api'

export default {
  data() {
    return {
      addr: [],
      show_picker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      partner_data: {
        address: '',
        info_type: '举升机'
      },
      info_item: null,
      is_no_data: false,
      isloading: false,
      list_data: [],
      show_type: false
    };
  },
  components: {
    VCity,
    InfoList,
    'v-picker': Picker,
    'v-pop': Popup
  },
  computed: {
    is_partner() {
      return this.info_item
    }
  },
  mounted() {
    const p_data = this.$store.state.install_info
    if (p_data) {
      this.partner_data.address = p_data.address
      this.partner_data.info_type = p_data.select_info.device_name
      this.getPartnerList()
    }
  },
  methods: {
    async getPartnerList() {
      this.isloading = true
      this.is_no_data = false
      const p_str = this.partner_data.address.split('-')
      const data = await getPartner(p_str[0], p_str[1])
      if (data) {
        this.isloading = false
        if (data.length == 0) return this.is_no_data = true
        this.list_data = data
      }
    },
    getCity(arr) {
      this.list_data = []
      this.partner_data.address = arr.join('-')
      this.getPartnerList()
    },
    goActive() {
      if (!this.info_item) return this.$toast('请选择合伙人')
      // 上一页数据合并
      const assign_obj = Object.assign(this.$store.state.install_info, {partner_info : this.info_item})
      this.$emit("go_ative", 2, 'release')
      // 储存数据
      this.$store.commit('install_info', assign_obj)
    },
    goback() { //返回上一页
      this.$emit("go_ative", 0, 'info')
    },
    selectInfo(item) {
      console.log(item)
      this.info_item = item
    },
    onConfirm() {

    }
  }
};
</script>

<style lang="scss" scoped>
.partner-container {
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
      margin-right: 10%;
      &:last-child{ 
        margin-right: 0;
      }
      .info{
        // width: size(200);  
        position: relative;
        padding-right: size(40);
        @include txt-overflow(1);
      }
      div{
        display: inline-block;
        &.icon{
          position: absolute;
          top:size(1);
          right: 0;
          margin-top: size(2);
          vertical-align: middle;
          margin-left: size(10);
          font-size: size(20);
        }
      }
    }
  }
  .list-wrap{
    position: absolute;
    width: 100%;
    top:size(100);
    bottom: size(200);
    padding: size(0) size(60);
    overflow: hidden;
    .no_data{
      padding: size(200) 0;
      color: #ccc;
    }
  }
  .footer{
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: size(200);
    .btn-next{
      position: relative;
      border-radius: size(30);
      width: size(300);
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
    .btn-prev{
      @extend .btn-next;
      width: size(110);
      margin-right: size(20);
    }
  }
  
}
</style>

