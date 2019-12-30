<template>
  <div class="loading-container">
    <v-loading :size="size" :type="loading_type" :vertical="vertical">{{title}}</v-loading>    
  </div> 
</template>

<script>
import {Loading} from 'vant'

export default {
  components: {
    'v-loading': Loading
  },
  props: {
    size: {
      type: String,
      default: '24px'
    },
    vertical: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '加载中...'
    },
    loading_type: {
      type: String,
      default: 'spinner'
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-container{
  padding: size(200) 0;
}
</style>
