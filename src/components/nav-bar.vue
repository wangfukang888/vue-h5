<template>
  <div class="nav-container">
    <nav-bar
      :title="title"
      left-arrow
      fixed
      @click-left="goBack"
    >
    </nav-bar>
  </div>
</template>

<script>
export default {
  props: {
    title: {  
      type: String,
      default: ''
    } 
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }

  
}
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar .van-icon {
  color: #333; 
}
.nav-container{
  padding-bottom: size( 100);
}
</style>