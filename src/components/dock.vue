<template>
<div class="relative c-6 dock">
  <div class="flex-v-center" @click="show=true">
    <span>{{title || '中俄头条'}}</span>
    <i class="icon">keyboard_arrow_down</i>
  </div>
  <bubble v-if="show" align="start" @close="show=false">
    <div class="dock-ctn f-14 flex">
      <div class="app-item a" @click="$router.push('/')">
        <div class="app-icon relative" style="background:#eee;"></div>
        <div class="app-name">首页</div>
      </div>
      <div class="app-item a" v-for="(app, i) in apps" :key="i" @click="toApp(app)">
        <div class="app-icon relative" :style="{background: 'url(/static/img/'+app.icon+'.png) center / cover #eee'}">
          <div v-if="app.loading" class="abs bg-dark-rgb-3 flex-center"><loading color="#fff"/></div>
        </div>
        <div class="app-name" :class="{'on': $route.path === app.path}">{{app.name}}</div>
      </div>
    </div>
  </bubble>
</div>
</template>

<script>
import apps from '@/apps/launcher/apps'

export default {
  name: 'dock',
  props: {
    title: String
  },
  data () {
    return {
      apps: [],
      show: false
    }
  },
  mounted () {
    this.apps = apps.map(item => {
      item.loading = false
      item.show = true
      return item
    })
  },
  methods: {
    toApp (app) {
      if (app.path === this.$route.path) return
      app.loading = true
      setTimeout(() => {
        this.$router.push(app.path)
      }, 300)
    }
  }
}
</script>

<style lang="less">
.dock{
  display: inline-block;vertical-align: middle;margin: 0 10px;
  .dock-ctn{padding: 20px;flex-wrap: wrap;width: 710px;}
  .app-item{padding: 15px;text-align: center;width: 110px;}
  .app-icon{width: 80px;height: 80px;background: #eee;display: inline-block;vertical-align: middle;border-radius: 17px;border: 1px solid #eee;overflow: hidden;}
  .app-name{font-weight: 300;margin-top: 6px;display: inline-block;padding: 5px 8px;border: 1px solid transparent;border-radius: 30px;line-height: 1em;
    white-space: nowrap;
    &.on{color: #2196F3;border-color: #5cb6ff;}
  }
}
</style>
