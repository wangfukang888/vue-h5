<template>
  <div id="app">
    <transition :name="animate">
      <keep-alive v-if="is_alive">
        <router-view class="router" />
      </keep-alive>
      <router-view class="router" v-else />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      animate: "",
      is_alive: false
    };
  },
  //使用watch 监听$router的变化
  //如果to索引大于from索引,判断为前进状态,反之则为后退状态
  watch: {
    $route(to, from) {
      this.is_alive = to.meta.keepAlive;
      document.title = to.meta.title
      // to.meta.title && this.$store.commit("get_bar", to.meta.title);
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.animate = "slide-left";
      } else {
        this.animate = "slide-right";
      }
    }
  }
};
</script>

<style lang="scss">
@import "~css/app";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .router {
    position: absolute;
    left: 0;
    right: 0;
  }
}
</style>
