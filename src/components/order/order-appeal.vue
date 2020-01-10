<template>
  <div class="file-container" :class="{active: show}">
    <div class="header" @click="close">
      <div class="btn">关闭</div>
    </div>
    <div class="img-section">
      <div class="text">上传申诉图片</div>
      <div class="file">
        <v-uploader 
          v-model="fileList" 
          :multiple="false"
          :after-read="afterRead"
          @oversize="oversize"
          :max-count="3" 
          upload-text="最多上传3张"
        />
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
    <div class="btn-t">
      <v-btn class="btn-submit btn" :loading="subLoading"  loading-text="提交中" type="info" @click="submit">确认提交</v-btn>
    </div>
  </div>
</template>

<script>
import { Uploader, Field, Button } from 'vant'
import {uploadImage} from '../../utils/upload'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'v-uploader': Uploader,
    'v-field': Field,
    'v-btn': Button
  },
  data() {
    return{
      fileList: [],
      message: '',
      loadList: [],
      subLoading: false
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
    async afterRead(file) {
      const data = await uploadImage(file)
      data && this.loadList.push(data)    
    },
    oversize() {
      this.$toast('文件大小不能超过20M')
    },
    closeloading() {
      this.subLoading = false
    },
    async submit() {
      if( this.fileList.length == 0) return this.$toast('请上传申诉图片')
      if( !this.message) return this.$toast('请填写申诉说明')
      let obj = {
        fileList: this.loadList,
        message: this.message
      }
      this.subLoading = true
      this.$emit('submit', obj)
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
    background: #e2e2e2;
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
  .btn-t{
     margin-top: size(100);
  }
  .btn-submit{
    background: #03B097;
    padding: 0 size(60);
    border-radius: size(40);
    color: #fff;
    border: 0;
  }
}
</style>

