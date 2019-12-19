<template>
  <div class="search-container">
    <form action="/">
      <van-search
        ref="s_f"
        v-model="val"
        placeholder="请输入序列号"
        show-action
        background="#eee"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
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
.search-container{
  /deep/ .van-nav-bar .van-icon {
    color: #333; 
  }
  /deep/ input {
    background: transparent;
  }

  /deep/ .van-search__content{
    border-radius: size(40);
  }
}
</style>