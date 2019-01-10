<template>
<div class="account c-6 flex-v-center">
  <div class="relative">
    <div class="flex-v-center a account-toggler" @click="menuShow=true">
      <span>{{$store.state.account.userName}}</span>
      <i class="icon">keyboard_arrow_down</i>
    </div>
    <bubble v-if="menuShow" class="c-6" pos="bottom" align="center" @close="menuShow=false">
      <div class="account-menu">
        <div class="menu-item t-center a" @click="setPasswordShow = true">修改密码</div>
        <div class="menu-item t-center a" @click="$router.push('/chooseSite')">切换站点</div>
        <div class="menu-item t-center a" @click="logoutShow=true;menuShow=false;">注销</div>
      </div>
    </bubble>
  </div>
  <!--<notification/>-->
  <layer v-if="logoutShow">
    <div class="layer-text flex" style="padding-top: 20px;">
      <img class="log-out-logo" src="../assets/img/login-logo.png" alt="">
      <div class="flex-item">
        <div class="b f-20">注销登录？</div>
        <div class="c-6" style="margin-top: 8px;">您确定要注销当前登录账号吗？</div>
      </div>
    </div>
    <div class="layer-btns">
      <btn flat @click="logoutShow=false">取消</btn>
      <btn flat color="#ff6143" @click="logout">注销</btn>
    </div>
  </layer>
  <div v-if="setPasswordShow" class="set_password_box" @click="setPasswordShow = false">
    <div class="set_password" @click.stop>
      <p class="set_password_title">修改密码</p>
      <div class="set_password_input">
        <input v-model="oldPasswd" type="password" placeholder="请输入旧密码">
      </div>
      <div class="set_password_input">
        <input v-model="loginUserPwd" type="password" placeholder="请输入新密码">
      </div>
      <div class="set_password_input">
        <input v-model="loginUserPwdConfirm" type="password" placeholder="确认新密码">
      </div>
      <div class="set_password_btn">
        <span @click="setPasswordShow = false">取消</span>
        <span @click="setPassword">确定</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Notification from './notification'

export default {
  name: 'account',
  components: { Notification },
  data () {
    return {
      setPasswordShow: false,
      menuShow: false,
      logoutShow: false,
      oldPasswd: '',
      loginUserPwd: '',
      loginUserPwdConfirm: ''
    }
  },
  methods: {
    setPassword () {
      if (this.loginUserPwdConfirm != this.loginUserPwd) {
        this.$toast('新密码不相符')
        return
      }
      this.$http.post('/cri-cms-platform/sysUser/updatePassWd.monitor', {
        oldPasswd: this.oldPasswd,
        loginUserPwd: this.loginUserPwd
      }).then(res => {
        if (res.success) {
          this.setPasswordShow = false
          this.logoutShow = false
          localStorage.removeItem('token')
          sessionStorage.removeItem('token')
          localStorage.removeItem('siteId')
          sessionStorage.removeItem('siteId')
          this.$store.commit('LOGOUT')
          this.$router.push({name: 'Login', params: {setPassword: true}})
        }
      })
    },
    logout () {
      this.logoutShow = false
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      localStorage.removeItem('siteId')
      sessionStorage.removeItem('siteId')
      this.$store.commit('LOGOUT')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less">
.account{
  .set_password_box{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
  }
  .set_password_title{
    margin: 0;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  .set_password_input{
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }
  .set_password_input input{
    width: 100%;
    outline: none;
    margin: 0;
    font-size: 14px;
    box-sizing: border-box;
    padding: 0 10px;
    border: 0;
  }
  .set_password_btn{
    text-align: right;
  }
  .set_password_btn span{
    margin-left: 20px;
    display: inline-block;
    cursor: pointer;
    color: #666;
  }
  .set_password_btn span:nth-child(2){
    color: #2a76d2;
  }
  .set_password{
    width: 300px;
    height: 230px;
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
  }
  .account-menu{padding: 10px 0;}
  .menu-item{padding: 5px 10px;white-space: nowrap;
    &:hover{background: #ddd;}
  }
  .log-out-logo{width: 50px;height: 50px;border: 1px solid #ddd;border-radius: 8px;margin-right: 20px;}
}
</style>
