<template>
  <scroll-list class="info-container">
    <div class="main">
      <div class="btn-select">选择设备</div>
      <div class="desc">
        <div class="title">基本资料</div>
        <div class="det">
          <van-cell-group>
            <van-field v-model="value" placeholder="请输入用户名" />
            <van-field v-model="form_data.phone" placeholder="请输入手机号" />
          </van-cell-group>
        </div>
      </div>
      <div class="l-r">
        <div class="desc">
          <div class="title">安装日期</div>
          <div class="det">
            <van-cell-group>
              <van-field v-model="value" placeholder="请选择安装日期" readonly right-icon="arrow" @click="getDate" />
            </van-cell-group>
          </div>
        </div>
         <div class="desc">
          <div class="title">所在地区</div>
          <div class="det">
            <van-cell-group>
              <van-field v-model="value" placeholder="请选择地址" readonly right-icon="arrow"/>
            </van-cell-group>
          </div>
        </div>
      </div>
      <div class="desc">
        <div class="title">详细地址</div>
        <div class="det">
          <van-cell-group>
            <van-field v-model="value" placeholder="请填写详细地址" />
          </van-cell-group>
        </div>
      </div>
      <div class="desc">
        <div class="title">备注</div>
        <div class="det">
          <van-cell-group>
            <van-field type="textarea" v-model="value" placeholder="备注信息" />
          </van-cell-group>
        </div>
      </div>
      <div class="btn-next active" @click="goActive">下一步
        <span class="icon">
          <van-icon name="arrow" />
        </span>
      </div>
    </div> 
    <!-- <div class="picker">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
      />
    </div> -->
  </scroll-list>
</template>

<script>
import scrollList from "com/scroll-list";

export default {
  data() {
    return {
      form_data: {},
      currentDate: new Date()
    };
  },
  components: {
    scrollList
  },
  methods: {
    getDate() {
      console.log(this.form_data.phone);
    },
    getAddress() {},
    goActive() {
      this.$emit("go_ative", 1, 'partner');
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

