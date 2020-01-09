<template>
  <div class="file-container">
    <div class="img-section">
      <div class="text">申诉图片</div>
      <div class="file">
        <div class="img" v-for="(item, index) in fileList" :key="index">
          <img v-lazy="item" alt="">
        </div>
        <!-- <v-uploader v-model="fileList" multiple disabled :deletable="false" :max-count="3"/> -->
      </div> 
    </div>  
    <div class="img-section desc">
      <div class="text">申诉说明</div>
      <div class="textarea">
        <v-field
          v-model="message"
          rows="3"
          disabled
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入相关说明"
          show-word-limit
        />
      </div>
    </div>
    <div class="btn btn-submit" @click="submit">取消申诉</div>
  </div>
  
</template>

<script>
import { Uploader, Field } from 'vant'
import {appealDetail} from 'api'

export default {
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
  activated() {
    console.log('进入缓存')
  },
  deactivated() {
    console.log('离开')
  },
  mounted() {
    // this.fileList = data.fileList
    // this.message = data.message
    this.getList()
  },
  methods: {
    async getList() {
      const data = await appealDetail(this.$route.params.id)
      let arr = []
      this.fileList = data.img
      this.message = data.content
    },
    getBase64Image(img) {
      var canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase()
      var dataURL = canvas.toDataURL("image/" + ext)
      return dataURL
    },
    init() {
      this.fileList = []
      this.message = ''
    },
    close() {
      this.$emit('close')
      document.title = '订单详情'
    },
    submit() {
      // if( this.fileList.length == 0) return this.$toast('请上传申诉图片')
      // if( !this.message) return this.$toast('请填写申诉说明')
     
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
      display: flex;
      justify-content: center;
      /deep/ .van-uploader__wrapper{
        justify-content: center;
      }
      /deep/ .van-uploader__preview{
        margin-bottom: size(30);
      }
      .img{
        width: size(200);
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
    background: rgb(114, 99, 99);
    height: size(80);
    width: size(400);
    line-height: size(80);
    margin: size(50) auto;
    border-radius: size(40);
    color: #fff;
  }
}
</style>

