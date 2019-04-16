<template>
<div class="abs c-f f-18 flex-center site-select">
  <div class="t-center site-ctn">
    <!-- <div class="f-32 s-title">选择站点</div> -->
    <div v-for="item in list" :key="item.id">
      <div class="flex-center a site-item" :class="{'selected': select === item.siteId}" @click="select = item.siteId">
        <i class="icon f-18">language</i>
        <span>{{item.siteName}}</span>
      </div>
      <div class="line"></div>
    </div>
    <div><icon-btn class="next-btn" color="rgba(255, 255, 255, .8)" :disabled="!select" @click="next">arrow_forward</icon-btn></div>
  </div>
  <div v-if="setPasswordShow" class="set_password_box">
    <div class="set_password">
      <p class="set_password_title">首次登录请修改密码</p>
      <div class="set_password_input">
        <input v-model="oldPasswd" type="password" placeholder="请输入旧密码">
      </div>
      <div class="set_password_input">
        <input v-model="loginUserPwd" type="password" placeholder="请输入新密码">
      </div>
      <div class="set_password_input">
        <input v-model="loginUserPwdConfirm" type="password" placeholder="确认新密码">
      </div>
      <p style="margin: 0;line-height: 1.4;font-size: 12px;color: rgba(255,0,0,0.5);">新密码数字、字母、符号至少包含两种，密码长度最少八位!</p>
      <div class="set_password_btn">
        <span @click="setPassword">确定</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import getUserInfo from './getUserInfo'

export default {
  name: 'site-select',
  data () {
    return {
      select: null,
      list: [],
      setPasswordShow: false,
      oldPasswd: '',
      loginUserPwd: '',
      loginUserPwdConfirm: ''
    }
  },
  created () {
    getUserInfo().then(res => {
      this.list = res.sites || []
    })
    if (this.$store.state.account.firstLogin) {
      this.setPasswordShow = true
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
          this.$toast('修改成功')
          this.setPasswordShow = false
        }
      })
    },
    next () {
      if (!this.select) return
      if (localStorage.token) localStorage.siteId = this.select
      if (sessionStorage.token) sessionStorage.siteId = this.select
      this.$http.post('/cri-cms-platform/site/setting/getSetting.monitor').then(res => {
        sessionStorage.imageratio = res.imageratio
        this.$store.commit('setWaterImg', res.watermark_path)
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="less">
.site-select{
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
    height: 270px;
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
  color: rgba(255,255,255, 0.8);
  .s-title{font-weight: 300;line-height: 1em;margin-bottom: 50px;}
  .site-ctn{width: 300px;}
  .site-item{padding: 15px;transition: opacity .2s;color: rgba(255,255,255, 0.7);
    &.selected{color: #fff;}
    .icon{margin-right: 15px;}
  }
  .line{height: 1px;background: linear-gradient(to right, rgba(255,255,255, 0), rgba(255,255,255, 0.7), rgba(255,255,255, 0));}
  .next-btn{margin-top: 30px;border: 1px solid rgba(255,255,255, 0.5);}
}
</style>
