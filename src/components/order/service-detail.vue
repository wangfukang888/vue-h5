<template>
  <div class="detail-service">
    <div class="title">服务完成情况</div>
    <div class="img">
      <div class="file">
        <v-uploader v-model="fileList" multiple disabled :deletable="false" :max-count="fileList.length"/>
      </div> 
    </div>
    <div class="message">
      <div class="l">备注:</div>
      <div class="r">{{info.content || '无'}}</div>
    </div>
  </div>
</template>

<script>
import { Uploader, Field } from 'vant'
import {toBase64Image} from '../../utils/img64'

export default {
  components: {
    'v-uploader': Uploader
  },
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.getFile()
  },
  methods: {
    getFile() {
      const list = this.info.serviceImg
      let arr = []
      list && list.map( v => {
        toBase64Image(v).then(data => {
          arr.push({
            file: '',
            content: data
          })
        }) 
      })
      this.fileList = arr
    }
  },
  data() {
    return{
      fileList: []
    }
  },

}
</script>

<style lang="scss" scoped>
.detail-service{
  font-size: size(28);
  background: #fff;
  @include border('top');
  .title{
    height: size(90);
    text-align: left;
    line-height: size(90);
    padding-left: size(60);
  }
  .img{
    padding: size(20) size(60);
  }
  .message{
    display: flex;
    padding: size(20) size(40);
    align-items: center;
    font-size: size(24);
    color: #888;
    @include border('top');
    .l{
      width: size(100); 
      margin-right: size(20);
    }
    .r{
      flex: 1;
      line-height: size(40);
      text-align: left;
    }
  }
}
</style>
