<template>
  <div class="fit-container" v-if="userinfo">
    <div class="item">
      <div class="l">用户手机号:</div>
      <div class="r">{{userinfo.mobile | formatPhone}}</div>
    </div>
    <v-btn class="btn" type="default" plain hairline loading-type="spinner" @click="logout">退出登录</v-btn>
  </div>
</template>

<script>
import { Button } from 'vant'
import {getLogout} from 'api'

export default {
  components: {
    'v-btn': Button
  },
  data() {
    return{
      userinfo: null
    }
  },
  mounted() {
    const userinfo = this.$store.state.userInfo
    if (!userinfo) {
      return this.$router.push('/login')
    }
    this.userinfo = userinfo
  },
  methods: {
    async logout() {
      const data = await getLogout(this.$store.state.token)
      if (data) {
        this.$toast('退出登录成功')
        this.$store.commit('get_login', null)
        localStorage.removeItem('userInfo')
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fit-container{
  position: fixed;
  width: 100%;
  top:0;
  bottom:0;
  background: #fff;
}
.item{
  display: flex;
  align-items: center;
  padding: 0 size(40);
  height: size(100);
  color: #666;
  @include border('bottom');
  .l{
    width: size(300);
    text-align: left;
    font-size: size(28);
  }
  .r{
    flex: 1;
    text-align: right;
  }
}
.btn{
  margin-top: size(60);
}
</style>

