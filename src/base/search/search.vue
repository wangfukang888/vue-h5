<template>
  <div class="search-container">
    <form action="/">
      <van-search
        ref="s_f"
        v-model="val"
        :placeholder="placeholder"
        show-action
        background="#eee"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="history" v-if="list_history.length > 0">
      <div class="t">搜索历史</div>
      <div class="list">
        <div class="item" v-for="(item,index) in list_history" :key="index" @click.stop="search_history(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入序列号'
    }
  },
  data() {
    return{
      val: '',
      list_history: []
    }
  },
  methods: {
    f() {
      this.$refs.s_f && this.$refs.s_f.querySelector('input').focus()  
      this.cache_list = localStorage.getItem('history_list') && JSON.parse(localStorage.getItem('history_list') ) || []
      // 去重
      let arr =  this.cache_list.filter( (item,index) =>  this.cache_list.indexOf(item) == index )
      this.list_history = arr
    },
    onSearch() {
      this.$emit('search', this.val, this.cache_list, true)
    },
    search_history(val) {
      this.$emit('search', val, this.cache_list, false)
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
  .history{
    margin-top: size(30);
    padding: 0 size(40);
    padding-right: size(20);
    color: #888;
    .t{
      text-align: left;
      font-size: size(28);
    }
    .list{
      margin-top: size(20);
      display: flex;
      font-size: size(26);
      flex-wrap: wrap;
      .item{
        padding: 0 size(12);
        height: size(70);
        margin-right: size(20);
        margin-bottom: size(12);
        line-height: size(70);
        border-radius: size(40);
        border: size(1) solid #ccc;
      }
    }
  }
}

</style>