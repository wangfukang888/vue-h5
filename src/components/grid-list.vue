<template>
  <div class="grid-icon">
    <div class="list" v-for="(item, index) in list" :key="index">
      <div class="title" :class="'t-' + (index + 1)">
        <h2>{{item.title}}</h2>
        <span>{{item.desc}}</span>
      </div>
      <div class="icon-grid">
        <van-grid :column-num="3">
          <van-grid-item
            v-for="(value, o) in item.list"
            :key="o"
            :icon="value.icon || 'photo-o'"
            :url="value.url"
            @click="goGrid(value.url, value.path)"
            :text="value.text"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    goGrid(url, path) {
      (!url || !path) && this.$toast('暂未开通此功能')
    }
  }
};
</script>

<style scoped lang="scss">
@import "~css/def";

.list {
  .title {
    height: size(150);
    padding: size(20) size(30);
    color: #fff;
    text-align: left;
    border-radius: size(40) size(40) 0 0;
    h2 {
      margin-top: size(10);
      margin-bottom: size(20);
      font-size: size(32);
    }
    span{
      font-size: size(26);
      color: #eee;
    }
  }
  .icon-grid {
    padding: size(10) 0;
  }
  &:last-child {
    margin-bottom: size(20);
  }
}

/deep/ .van-grid-item__icon{
  font-size: size(60);
}
</style>
