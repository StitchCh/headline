<template>
  <div class="flex-item flex-col">
    <transition name="fade" mode="out-in">
    <div v-if="loading" class="flex-item flex-center">
      <loading></loading>
    </div>
    <div v-else class="flex-item scroll-y">
      <div class="relative video-content c-6">
        <div v-if="!content || !content.id" class="abs flex-center" style="height: 400px;">
          <no-data/>
        </div>
        <div v-else class="vdo-ctn">
          <h1 class="b" :style="{ color: content.titleColor }">{{content.title}}</h1>
          <div class="f-14 c-a vdo-info flex-v-center">
            <span>{{content.createDate}}</span>
            <span>作者：{{content.author}}</span>
            <span>创建者：{{content.createUser}}</span>
            <span class="flex-item"></span>
            <img v-if="content && content.thumb" v-for="item in content.thumb" :key="item.id" :src="item.url" @click="thumbItem.url = item.url;thumbItem.show = true;" style="margin-left: 5px;height: 50px;cursor: pointer;">
          </div>
          <p class="vdo-abstarcts"><strong>[摘要]</strong>{{content.abstarcts}}</p>
          <div>
            <video-player class="vjs-custom-skin"
                          ref="videoPlayer"
                          :options="playerOptions"
                          :playsinline="true"></video-player>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <div class="af-bottombar c-6 f-14">
      <div v-if="channelIds" style="padding: 0 15px;">
        <span v-for="(channel, index) in channelNames" :key="index" v-tooltip:top="'频道：' + channel">{{index !== 0 ? '，' : ''}}{{channel}}</span>
      </div>
      <div v-if="content.keywords" style="padding: 0 15px;">
        <span v-for="(keyword, index) in content.keywords.split(',')" :key="index" v-tooltip:top="'关键词：' + keyword">{{index !== 0 ? '，' : ''}}{{keyword}}</span>
      </div>
      <div v-if="content.originalFrom" style="padding: 0 15px;">
        <span v-tooltip:top="'来源：' + content.originalFrom">{{content.originalFrom}}</span>
      </div>
      <div v-if="content.author" style="padding: 0 15px;">
        <span v-tooltip:top="'作者：' + content.author">{{content.author}}</span>
      </div>
      <div class="flex-item"></div>
      <div>
        <i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.isRecommnd }">thumb_up</i>
        <i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalPc }">computer</i>
        <i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalApp }">phone_iphone</i>
        <i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalWeb }">public</i>
      </div>
    </div>

    <transition name="fade">
      <div v-if="thumbItem.show" class="vdo-thumb-cover scroll-y" @click="thumbItem.show = false">
        <div class="flex-center" style="min-height: 100%;">
          <img :src="thumbItem.url" @click.stop>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'app-video-content',
  components: { videoPlayer },
  props: {
    id: String,
    channels: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      content: {},
      channelIds: '',
      thumbItem: {
        show: false,
        url: ''
      },
      playerOptions: {
        height: '480',
        language: 'zh-ch',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: '',
          // mp4
          src: ''
          // webm
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: ''
      },
      loading: false
    }
  },
  computed: {
    channelNames () {
      if (!this.channelIds) return []
      return this.channelIds.split(',').map(v => this.getChannel(v))
    }
  },
  methods: {
    getVideo () {
      this.loading = true
      this.$http.post('/cri-cms-platform/video/queryDetail.monitor', {
        id: this.id
      }).then(
        res => {
          this.content = res.video || {}
          if (res.video) {
            this.playerOptions.sources[0].src = res.video.video
            this.playerOptions.poster = res.video.thumb ? res.video.thumb[0].url || '' : ''
          } else {
            this.playerOptions.sources[0].src = this.playerOptions.poster = ''
          }
          this.channelIds = res.channelIds || ''
          this.loading = false
        }
      )
    },
    getChannel (id) {
      let channel = this.channels.find(v => v.id === id)
      return channel ? channel.channelName : ''
    }
  },
  created () {
    this.getVideo()
  },
  watch: {
    id () {
      this.getVideo()
    }
  }
}
</script>

<style lang="less">
.video-content {
  .vdo-ctn {max-width: 900px;margin: 0 auto;padding: 30px;}
  h1{line-height: 1.3em;font-size: 26px;}
  .vdo-info {height: 50px;
    span{margin-right: 15px;}
  }
  .vdo-abstarcts {padding: 10px 20px;font-size: 14px;background: #f3f3f3;border-radius: 8px;}
}
.vdo-thumb-cover {position: fixed;left: 0;right: 0;top: 0;bottom: 0;background: rgba(0, 0, 0, .7);z-index: 99;text-align: center;
  img {max-width: 900px;margin: 50px auto;}
}
</style>
