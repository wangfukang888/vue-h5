<template>
  <div class="container">
    <!-- <n-bar :title="text" /> -->
    <slot></slot>
  </div>
</template>

<script>
import NBar from 'com/nav-bar'
export default {
  components: {
    NBar
  },
  data() {
    return{
      text: this.$store.state.nav_bar_t || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: 100%;
  background: #f1f1f1;   
}

</style>
