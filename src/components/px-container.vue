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
  position: absolute;
  width: 100%;
  top: 0;
  left:0;
  bottom: 0;
  background: #fff;   
}

</style>
