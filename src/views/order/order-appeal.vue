<template>
  <div class="file-container">
    <div class="img-section" v-if="fileList.length">
      <div class="text">申诉图片</div>   
      <div class="file">
        <v-uploader v-model="fileList" multiple disabled :deletable="false" :max-count="fileList.length"/>
      </div> 
    </div>  
    <loading class="loading" v-else/>
    <div class="img-section desc">
      <div class="text">申诉说明</div>
      <div class="textarea">
        <v-field  
          v-model="message"
          disabled
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入相关说明"
          show-word-limit
        />
      </div>
    </div>
    <!-- <div class="btn btn-submit" @click="submit">取消申诉</div> -->
  </div>
  
</template>

<script>
import { Uploader, Field } from 'vant'
import {appealDetail} from 'api'
import {toBase64Image} from '../../utils/img64'

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
    if (this.$store.state.is_refresh) {
      this.getList()
    }   
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const data = await appealDetail(this.$route.params.id)
      let arr = []
      this.message = data.content
      data && data.img.map(v => {
        toBase64Image(v).then(data => {
          arr.push({
            file: '',
            content: data
          })
        }) 
      })   
      this.fileList = arr   
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
  .loading{
    padding: size(50) 0;
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
      // padding: size(20);
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
    background: #a7a4a4;
    height: size(80);
    width: size(400);
    line-height: size(80);
    margin: size(50) auto;
    border-radius: size(40);
    color: #fff;
  }
}
</style>

