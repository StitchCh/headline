<template>
<div class="web-view" :class="{'on': show}">
  <div class="abs mask" v-if="show" @click="close()"></div>
  <div class="web-ctn flex-col">
    <div class="flex tool-bar">
      <icon-btn small v-tooltip:bottom="'关闭'" @click="close()">close</icon-btn>
      <input class="flex-item" disabled type="text" :value="decodeURI(toolbarUrl)">
      <!-- <icon-btn small v-tooltip:bottom="'复制链接地址'" @click="refresh()">content_copy</icon-btn> -->
      <icon-btn small v-tooltip:bottom="'新窗口\n打开'" @click="launch()">open_in_new</icon-btn>
    </div>
    <div class="flex-item relative">
      <div v-if="loading" class="abs flex-center">
        <loading/>
      </div>
      <iframe v-if="url" :src="url" frameborder="0"></iframe>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'web-view',
  data () {
    return {
      show: false,
      loading: true,
      url: '',
      toolbarUrl: ''
    }
  },
  methods: {
    open (url) {
      if (!url) return
      this.show = true
      this.loading = true
      setTimeout(() => {
        this.url = this.toolbarUrl = url || ''
        this.$nextTick(() => {
          let iframe = this.$el.querySelector('iframe')
          iframe.onload = () => {
            this.loading = false
            this.toolbarUrl = iframe.contentWindow.location.href
          }
        })
      }, 300)
    },
    close () {
      this.show = false
      setTimeout(() => {
        this.url = ''
        this.$emit('close')
      }, 300)
    },
    launch () {
      window.open(this.url)
    }
  }
}
</script>

<style lang="less">
.web-view{pointer-events: none;
  .tool-bar{padding: 5px 15px;min-height: 40px;border-bottom: 1px solid #ddd;
    button{height: 30px;}
    input{height: 24px;margin: 2px 10px;padding: 0 10px;border: 1px solid #eee;}
  }
  .mask{pointer-events: auto;}
  position: fixed;width: 100%;height: 100%;left: 0;top: 0;z-index: 100;
  .web-ctn{position: absolute;height: 100%;width: 100%;max-width: 600px;right: 0;top: 0;background: #fff;box-shadow: -5px 0 15px rgba(0, 0, 0, .2);transition: all .3s ease;pointer-events: auto;
    transform: translateX(620px)
  }
  iframe{width: 100%;height: 100%;}
  &.on{
    .web-ctn{transform: translateX(0)}
  }
}
</style>
