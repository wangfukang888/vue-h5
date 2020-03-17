<template>
  <div class="search-container">
    <form action="/">
      <v-search
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
import {Search} from 'vant'

export default {
  components: {
    'v-search': Search
  },
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
      this.cache_list = JSON.parse(localStorage.getItem('history_list') ) || []
      this.list_history = this._uniq(this.cache_list)
    },
    onSearch() {
      this.$emit('search', this.val, this.list_history)
    },
    search_history(val) {
      this.$emit('search', val, this.list_history)
    },
    onCancel() {    
      this.$emit('cancel')
    },
    _uniq(arr){
      for(let i=0; i<arr.length; i++){
        for(let j=i+1; j<arr.length; j++){
          if(arr[i] == arr[j]){ //第一个等同于第二个，splice方法删除第二个
            arr.splice(j,1)
            j--
          }
        }
      }
      return arr
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