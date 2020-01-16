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
          :before-delete="deleteImg"
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
import { Uploader, Field, Button, Toast } from 'vant'
import {uploadImg} from 'api'
import {compress} from '@/utils/imgHandle'
import Exif from 'exif-js'

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
      this.loadList = []
      this.message = ''
    },
    close() {
      this.$emit('close')
      document.title = '订单详情'
    },
    afterRead(file) {
      let Orientation
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file.file, function() {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      let img = new Image()
      img.src = file.content
      img.onload = () => {
        compress(img, Orientation, (file) => {
          let fd = new FormData()
          fd.append('file', file.file)
          this.getToImg(fd)
        })
      }
    },
    async getToImg(file) {
      try {
        Toast.loading({
          message: '上传中...',
          duration: 0,
          forbidClick: true
        })
        const data = await uploadImg(file)
        // 上传失败处理
        if (data) {
          this.loadList.push(data)  
        } else {
          this.fileList.pop()
        }
        Toast.clear()
      } 
      catch (error) {
        this.fileList.pop()
        Toast.clear()
        this.$toast('图片上传失败，可能原因服务器响应超时')
      }  
    },
    deleteImg(v, name) {
      this.fileList.splice(name.index, 1)
      this.loadList.splice(name.index, 1)
    },
    oversize() {
      this.$toast('文件大小不能超过20M')
    },
    closeloading() {
      this.subLoading = false
    },
    async submit() {
      if ( this.fileList.length == 0) return this.$toast('请上传申诉图片')
      if ( !this.message) return this.$toast('请填写申诉说明')    
      let obj = {
        fileList: this.loadList,
        message: this.message
      }
      this.subLoading = true
      if (this.fileList.length == this.loadList.length) {
        this.$emit('submit', obj)
      } else {
        this.$toast('请等待图片全部上传成功后，再操作...')
        this.subLoading = false
      }
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

