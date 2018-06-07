<template>
<div class="abs c-f flex-col app-launcher">
  <div class="top flex-v-center">
    <span class="f-20" style="font-weight: 300;">中俄头条</span>
    <span class="flex-item"></span>
    <account/>
  </div>
  <div class="flex-item app-box scroll-y" ref="scroller">
    <ul class="app-list flex" ref="content" :style="{margin}">
      <li class="app-item t-center" v-for="(app, i) in apps" :key="i" :class="{'show': app.show}">
        <div class="app-icon relative a" @click="toApp(app)"
        :style="'background:url(/static/img/'+app.icon+'.png) center / cover #fff;'">
          <div v-if="app.loading" class="abs flex-center bg-dark-rgb-3"><loading color="#fff"/></div>
        </div>
        <div class="app-name">{{app.name}}</div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import Account from '@/components/account'
import apps from './apps'

export default {
  name: 'app-launcher',
  components: { Account },
  data () {
    return {
      apps: [],
      height: 0,
      ctnHeight: 0
    }
  },
  computed: {
    margin () {
      if (this.ctnHeight > this.height) return '50px auto'
      return (this.height - this.ctnHeight) / 2 + 'px auto'
    }
  },
  mounted () {
    this.apps = apps.map(item => {
      item.loading = item.show = false
      return item
    })
    window.addEventListener('resize', this.onResize)
    let i = 0
    function show () {
      setTimeout(() => {
        if (i >= apps.length) return
        apps[i].show = true
        i += 1
        show()
      }, 30)
    }
    this.$nextTick(() => {
      this.onResize()
      show()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
    this.apps.forEach(item => { item.loading = item.show = false })
  },
  methods: {
    onResize () {
      this.height = this.$refs.scroller.clientHeight
      this.ctnHeight = this.$refs.content.clientHeight
    },
    toApp (app) {
      app.loading = true
      setTimeout(() => {
        app.loading = false
        this.$router.push(app.path)
      }, 100)
    }
  }
}
</script>

<style lang="less">
.app-launcher{
  min-width: 1000px;
  .top{padding: 5px 10px;}
  .app-box{padding: 0 50px;}
  .app-list{flex-wrap: wrap;max-width: 1420px;box-sizing: border-box;margin: 0 auto;}
  .app-item{border: 1px solid rgba(255, 255, 255, 0);width: 14.28%;height: 250px;box-sizing: border-box;
    transform: scale(1.3);opacity: 0;transition: transform .5s, opacity .5s;
    &.show{transform: scale(1);opacity: 1;}
  }
  .app-icon{width: 130px;height: 130px;background: #fff;border-radius: 32px;margin: 12px auto;overflow: hidden;
    &:active{opacity: .8;}
  }
  .app-name{font-weight: 300;font-size: 20px;}
  .notification-toggler, .account-toggler{color: #fff;}
}
@media screen and (max-width: 1250px) {
  .app-launcher{
    .app-list{max-width: 1160px;}
    .app-item{width: 20%;}
  }
}
</style>
