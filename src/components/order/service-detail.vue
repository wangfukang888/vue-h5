<template>
  <div class="detail-service">
    <div class="title">服务完成情况</div>
    <div class="img">
      <div class="file">
        <v-uploader v-model="fileList" multiple disabled :deletable="false" :max-count="3"/>
      </div> 
    </div>
    <div class="message">
      <div class="l">备注:</div>
      <div class="r">加急处理安装 17:00完成</div>
    </div>
  </div>
</template>

<script>
import { Uploader, Field } from 'vant'

export default {
  components: {
    'v-uploader': Uploader
  },
  data() {
    return{
      fileList: []
    }
  }
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
