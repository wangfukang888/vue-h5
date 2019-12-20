<template>
  <div class="login">
    <template v-if="isMobileForm">
      <div class="title">手机登陆</div>
      <div class="form">
        <div class="row">
          <v-field v-model="mobile" clearable placeholder="输入手机号码" class="input"/>
        </div>
        <div class="row code-wrap">
          <div class="col-1">
            <v-field v-model="code" placeholder="输入验证码" class="input"/>
          </div>
          <div class="col-2">
            <a v-if="!timer" @click="_sendCode">获取验证码</a>
            <a class="disabled" v-if="timer">重新发送({{seconds}}s)</a>
          </div>
        </div>
        <div class="btn-wrap">
          <a class="active" @click="_mobileLogin" v-if="mobileFormPass && !mobileFormSubmitting">登陆</a>
          <a class="disabled" v-if="!mobileFormPass || mobileFormSubmitting">登陆</a>
        </div>
        <div class="switch" @click="isMobileForm=!isMobileForm">密码登录</div>
      </div>
    </template>
    <template v-if="!isMobileForm">
      <div class="title">密码登录</div>
      <div class="form">
        <div class="row">
          <v-field v-model="account" clearable placeholder="请输入账号" class="input"/>
        </div>
        <div class="row code-wrap">
          <v-field type="password" v-model="password" placeholder="请输入密码" class="input"/>
        </div>
        <div class="btn-wrap">
          <a class="active" @click="_accountLogin" v-if="accountFormPass && !accountFormSubmitting">登陆</a>
          <a class="disabled" v-if="!accountFormPass || accountFormSubmitting">登陆</a>
        </div>
        <div class="switch" @click="isMobileForm=!isMobileForm">手机登录</div>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { Field } from 'vant'
// import { sendCode, mobileLogin, accountLogin } from 'api/main'
// import Cookies from 'js-cookie'
// import { config } from '@/utils/request'
export default {
  data() {
    return {
      isMobileForm: true,
      mobile: '',
      code: '',
      seconds: 60,
      timer: null,
      mobileFormSubmitting: false,
      account: '',
      password: '',
      accountFormSubmitting: false
    }
  },
  created() {
  },
  computed: {
    mobileFormPass() {
      return this.mobile && this.code
    },
    accountFormPass() {
      return this.account && this.password
    }
  },
  methods: {
    _sendCode() {
      if (!this.mobile) {
        this.$toast('手机号不能为空')
        return false
      }
      this.$showLoading()
      sendCode(this.mobile).then(res => {
        this.$hideLoading()
        this.timer = setInterval(() => {
          this.seconds--
          if (this.seconds === 0) {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
        console.log(res)
      }).catch(err => {
        this.$hideLoading()
        console.log(err)
      })
    },
    _mobileLogin() {
      if (!this.mobile) {
        this.$toast('手机号不能为空')
        return false
      }
      if (!this.code) {
        this.$toast('验证码不能为空')
        return false
      }
      this.$showLoading()
      this.mobileFormSubmitting = true
      mobileLogin(this.mobile, this.code).then(res => {
        this.$hideLoading()
        this.mobileFormSubmitting = false
        console.log(res)
        this.success(res)
      }).catch(err => {
        this.$hideLoading()
        this.mobileFormSubmitting = false
        console.log(err)
      })
    },
    _accountLogin() {
      if (!this.account) {
        this.$toast('账号不能为空')
        return false
      }
      if (!this.password) {
        this.$toast('密码不能为空')
        return false
      }
      this.$showLoading()
      this.accountFormSubmitting = true
      accountLogin(this.account, this.password).then(res => {
        this.$hideLoading()
        this.accountFormSubmitting = false
        console.log(res)
        this.success(res)
      }).catch(err => {
        this.$hideLoading()
        this.accountFormSubmitting = false
        console.log(err)
      })
    },
    success(res) {
      const token = res.data.userinfo.token
      Cookies.set('token', token)
      this.$store.commit('SET_TOKEN', token)
      config.headers['token'] = token
      this.$store.dispatch('GetUserInfo')
      if (this.$route.query.redirect) {
        this.$router.replace(this.$route.query.redirect)
      } else {
        this.$router.replace('/')
      }
    }
  },
  components: {
    vField: Field
  },
  beforeDestory() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style scoped="true" lang="scss">
  @import "css/def";
  .login {
    min-height: 100px;
    background-color: #fff;
    >.title{
      font-size: size(50);
      color: #333;
      align-items: center;
      justify-content: center;
      display: flex;
      height: size(300);
      width: 100%;
      text-align: center;
      font-weight: 800;
    }
    >.form{
      padding: 0 size(100);
      .row{
        width: 100%;
        height: size(90);
        margin-top: size(24);
        @include border('bottom');
        display: flex;
        align-items: center;  
        .input{
          line-height: 1;
          align-items: center;
          height: size(50);
          padding: 0;
          /deep/ input{
            color: #333;
            font-size: size(36);
            &::placeholder{
              color: #CCCCCC;
            }
            &:-webkit-autofill {
              box-shadow: 0 0 0px 1000px white inset;
            }
            &::placeholder{
              position: relative;
              top: size(6);
            }
          }
        }
        &.code-wrap{
          width: 100%;
          justify-content: space-between;
          .col-1{
            width: calc(100% - #{size(220)})
          }
          .col-2{
            width: size(220);
            text-align: right;
            font-size: size(30);
            color: #5B92E1;
            a{
              font-size: size(30);
              &.disabled{
                color: #CCCCCC;
              }
            }
          }
        }
      }
    }
    .btn-wrap{
      text-align: center;
      margin-top: size(90);
      a{
        display: flex;
        align-content: center;
        justify-content: center;
        height: size(90);
        line-height: size(90);
        color: #fff;
        background-color: #03B097;
        -webkit-border-radius: size(45);
        -moz-border-radius: size(45);
        border-radius: size(45);
        text-align: center;
        font-size: size(36);
        &.active:active{
          opacity: .5;
        }
        &.disabled{
          background-color: #E6E6E6;
        }
      }
    }
    .switch{
      margin-top: size(36);
      text-align: center;
      font-size: size(28);
      color: #333;
    }
  }
</style>
