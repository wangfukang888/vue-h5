<template>
  <div class="file-container" :class="{active: show}">
    <div class="header" @click="close">
      <div class="btn">关闭</div>
    </div>
    <div class="img-section">
      <div class="text">上传申诉图片</div>
      <div class="file">
        <v-uploader v-model="fileList" multiple />
      </div> 
    </div>  
    <div class="img-section desc">
      <div class="text">申诉说明</div>
      <div class="textarea">
        <v-field
          v-model="message"
          rows="3"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入相关说明"
          show-word-limit
        />
      </div>
    </div>
    <div class="btn-submit" @click="submit">确认提交</div>
  </div>
  
</template>

<script>
import { Uploader, Field } from 'vant'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'v-uploader': Uploader,
    'v-field': Field
  },
  data() {
    return{
      fileList: [],
      message: ''
    }
  },
  methods: {
    init() {
      this.fileList = []
      this.message = ''
    },
    close() {
      this.$emit('close')
      document.title = '订单详情'
    },
    submit() {
      if( this.fileList.length == 0) return this.$toast('请上传申诉图片')
      if( !this.message) return this.$toast('请填写申诉说明')
      console.log(this.fileList)
       let obj = {
        fileList: this.fileList,
        message: this.message
      }
      sessionStorage.setItem('appeal_data', JSON.stringify(obj))
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.file-container{
  position: fixed;
  width: 100%;
  top:0;
  bottom: 0;
  z-index: 99;
  overflow: auto;
  background:#f1f1f1;
  transition: all 0.4s;
  transform: translate3d(0, 100%, 0);
  &.active{
    transform: translate3d(0, 0, 0);
  }
  .header{
    height: size(100);
    line-height: size(100);
    color: #666;
    background: #c9cec9;
    @include border(bottom);
  }
  .img-section{
    margin: size(20);
    background: #fff;
    border-radius: size(20);
    .text{
      height: size(80);
      line-height: size(80);
      font-size: size(30);
      color: #666;
      margin-bottom: size(20);
      @include border('bottom');
    }
    .file{
      padding: size(20);
      /deep/ .van-uploader__wrapper{
        justify-content: center;
      }
      /deep/ .van-uploader__preview{
        margin-bottom: size(30);
      }
    }
  }
  .desc{
    margin-top: size(20);
    /deep/ .van-cell{
      background: transparent;
    }
  }
  .btn-submit{
    background: #03B097;
    height: size(80);
    width: size(400);
    line-height: size(80);
    margin: size(50) auto;
    border-radius: size(40);
    color: #fff;
  }
}
</style>

