<template>
<div class="abs c-f flex-col app-login">
  <div class="top f-18" style="padding: 10px;">中俄头条</div>
  <div class="flex-item flex-center">
    <div class="ctn t-center">
      <div class="logo"></div>
      <div class="f-22" style="font-weight: 300;">登录中俄头条</div>
      <div class="form c-6">
        <div class="input bg-f flex-v-center" style="border-bottom: 1px solid #ddd;border-radius: 8px 8px 0 0;">
          <input class="flex-item f-16" v-model="email" type="text" placeholder="邮箱">
        </div>
        <div class="input bg-f flex-v-center relative" style="border-radius: 0 0 8px 8px;">
          <input class="flex-item f-16" v-model="password" type="password" placeholder="密码">
          <div v-if="!loading" class="login-btn a" @click="login" :class="{'disabled': (!email || !password)}">
            <i class="icon">arrow_forward</i>
          </div>
          <loading v-else size="30" style="margin-right: 10px;"/>
          <bubble v-if="error.show" @close="error.show=false" class="err-info">
            <div class="b f-14 flex-center">
              <div class="flex-item">
                <div>您输入的邮箱或者密码不正确。</div>
                <div class="f-12">忘记密码请使用密码找回功能。</div>
              </div>
              <btn flat big @click="$router.push('/findPassword')">找回密码</btn>
            </div>
          </bubble>
        </div>
      </div>
      <div class="c-f f-16"><check-box text="保持我的登录状态"></check-box></div>
      <div class="line"></div>
      <div><a class="c-f a f-14" @click="error.show=true">忘记了邮箱或密码？</a></div>
    </div>
  </div>
  <div class="bottom t-right f-14" style="padding: 10px;opacity:0.9;">Copyright © 2018 XXXXX Inc.</div>
</div>
</template>

<script>
export default {
  name: 'app-login',
  data () {
    return {
      email: '',
      password: '',
      loading: false,
      error: {
        show: false,
        message: '您输入的账号或密码不正确。'
      }
    }
  },
  methods: {
    login () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$router.push('/')
      }, 500)
    }
  }
}
</script>

<style modules lang="less">
.app-login{
  .ctn{padding-bottom: 120px;}
  .logo{display: inline-block;width: 100px;height: 100px;background: url('../../assets/img/login-logo.png') center / cover #fff;border-radius: 20px;margin-bottom: 10px;}
  .form{border-radius: 10px;width: 320px;margin: 30px 0 20px 0;
    input{margin: 0;padding: 0;border: none;height: 46px;padding: 0 15px;background: transparent;}
  }
  .login-btn{border: 1px solid #ddd;padding: 1px;margin-right: 10px;border-radius: 50%;
    &.disabled{opacity: .4;pointer-events: none;}
  }
  a.a:hover{text-decoration: underline;}
  .err-info{
    button{color: #7d5634;}
    white-space: nowrap;
    .bubble-arrow, .bubble-ctn{background: #FAE9A3;}
    .bubble-ctn{padding: 10px 10px 10px 15px;color: #7d5634;}
  }
  .line{height: 1px;background: linear-gradient(to right, rgba(255,255,255, 0), rgba(255,255,255, 0.8), rgba(255,255,255, 0));margin: 15px 0;}
  .check-box i{border-color: #ddd;}
}
</style>
