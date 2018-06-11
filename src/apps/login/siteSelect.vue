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
</div>
</template>

<script>
import getUserInfo from './getUserInfo'

export default {
  name: 'site-select',
  data () {
    return {
      select: null,
      list: []
    }
  },
  created () {
    getUserInfo().then(res => {
      this.list = res.sites || []
    })
  },
  methods: {
    next () {
      if (!this.select) return
      if (localStorage.token) localStorage.siteId = this.select
      if (sessionStorage.token) sessionStorage.siteId = this.select
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.site-select{
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
