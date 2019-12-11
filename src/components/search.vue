<template>
  <div class="search-container">
    <van-search
      ref="s_f"
      v-model="val"
      placeholder="请输入序列号"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
  data() {
    return{
      val: ''
    }
  },
  methods: {
    f() {
      this.$refs.s_f && this.$refs.s_f.querySelector('input').focus()   
    },
    onSearch() {
      this.$emit('search', this.val)
    },
    onCancel() {
      this.$emit('cancel')
    }
  }

  
}
</script>

<style lang="scss" scoped>
@import '~css/def';

/deep/ .van-nav-bar .van-icon {
  color: #333; 
}
.nav-container{
  padding-bottom: size( 100);
}
</style>