<template>
  <div id="app" :class="{'showBg': $store.state.ui.showBg}">
    <div v-if="!showApp" class="abs flex-center">
      <loading :size="50" :color="$store.state.ui.showBg ? '#fff' : '#666'"/>
    </div>
    <transition :name="$store.state.ui.transition">
      <router-view v-if="showApp"/>
    </transition>
  </div>
</template>

<script>
import './assets/less/common.less'
import './assets/less/ui.less'
import './assets/less/transition.less'
import './assets/less/value.less'

import getUserInfo from './apps/login/getUserInfo'

export default {
  name: 'App',
  computed: {
    showApp () {
      let route = this.$route.name
      if (route === 'Login' || route === 'FindPassword' || route === 'ChooseSite' || route === 'mobile' || route === 'ChooseSite_mobile' || route === 'mobilePush') return true
      console.log(this.$store.state.account)
      if (this.$store.state.account.id) {
        return true
      }
    }
  },
  created () {
    getUserInfo().then().catch(e => {
      if (sessionStorage.type) {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        localStorage.removeItem('siteId')
        sessionStorage.removeItem('siteId')
        if (sessionStorage.type == 'pc') {
          this.$router.replace('/login')
        } else if (sessionStorage.type == 'mobile') {
          this.$router.replace('/mobile')
        }
      }
    })
  }
}
</script>

<style lang="less">
#app{min-width: 1000px;height: 100%;background: #f8f8f8;}
#app.showBg{background: linear-gradient(#002d70, #0097a1);}
.tc_box .w100h100{
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  border-radius: 0 !important;
}
.app-article-add-thumb .layer-ctn .layer-text{
  width: 100% !important;
}
  input{
    font-family: Microsoft Yahei !important;
  }
  textarea{
    font-family: Microsoft Yahei !important;
  }
.icon-btn{
  position: relative;
}
.distpicker-address-wrapper select{
  padding: 4px !important;
  height: auto !important;
  outline: none;
}
.article-editor{
  max-width: 80% !important;
}
.edui-editor{
  width: 100% !important;
}
.edui-editor-iframeholder{
  width: 100% !important;
}
.vjs-big-play-button{
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
  margin: auto !important;
  margin-top: auto !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: auto !important;
}
.vjs-custom-skin > .video-js .vjs-big-play-button{
  transform: translateY(300%);
}
#edui6 tr td{
  overflow: visible;
}
#ueditor_0 *{
  max-width: 100%;
}
  #edui_fixedlayer{
    min-height: 1000px;
  }
  .edui-popup-body{
    width: 480px !important;
  }
.title_title{
  outline: none;
  resize: none;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding-right: 50px !important;
}
a{
  text-decoration: none !important;
}
</style>
