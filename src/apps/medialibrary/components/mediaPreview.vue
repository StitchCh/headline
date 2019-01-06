<template>
<layer class="media-preview">
  <div class="flex">
    <div class="img-container flex-item relative" :style="{width: w+'px', height: h+'px'}">
      <transition name="fade">
        <div class="abs flex-center" v-if="type === 0 && current" style="overflow: hidden;" :key="current.id">
          <img :src="origin+current.filePath+current.fileName" :style="imgStyle">
        </div>
      </transition>
      <!--<transition name="fade">-->
        <!--<div class="abs flex-center" v-if="type === 1 && current" style="overflow: hidden;" :key="current.id">-->
          <!--<div style="width: 100%;">-->
            <!--<video-player class="vjs-custom-skin"-->
                          <!--ref="videoPlayer"-->
                          <!--:options="playerOptions"-->
                          <!--:playsinline="true"></video-player>-->
          <!--</div>-->
        <!--</div>-->
      <!--</transition>-->
      <transition name="fade">
        <div class="abs flex-center" v-if="(type === 1 || type === 2) && current" style="overflow: hidden;" :key="current.id">
          <div style="width: 100%;height: 100%;">
            <video-player class="vjs-custom-skin"
                          ref="videoPlayer"
                          :options="playerOptions"
                          :playsinline="true"></video-player>
          </div>
        </div>
      </transition>
      <div v-if="i !== 0" style="position: absolute;left: 0;top: 50%;transform: translateY(-50%);">
        <icon-btn big @click="prev()" class="img-btn img-btn-prev">keyboard_arrow_left</icon-btn>
      </div>
      <div v-if="i < list.length - 1" style="position: absolute;right: 0;top: 50%;transform: translateY(-50%);">
        <icon-btn big @click="next()" class="img-btn img-btn-next">keyboard_arrow_right</icon-btn>
      </div>
    </div>
    <div class="img-info c-6 f-14">
      <div class="t-right">
        <icon-btn small @click="$emit('close')">close</icon-btn>
      </div>
      <div class="f-18 b file-name" :title="current.alias">{{current.alias}}</div>
      <div class="flex">
        <a :href="origin + (type == 0 ? current.filePath+current.fileName : current.video || current.audio)" :download="current.alias" target="_blank">
          <icon-btn small v-tooltip:top="`下载${typeContent[type].text}`">cloud_download</icon-btn>
        </a>
        <icon-btn small v-tooltip:top="'复制链接地址'" @click="copyLink">link</icon-btn>
        <input type="text" :value="origin+current.filePath+current.fileName" ref="copyInput" readonly style="width: 1px;border: none;opacity: 0;">
        <icon-btn small v-if="type === 0" v-tooltip:top="`编辑${typeContent[type].text}`" @click="show.imageEditor = !type">edit</icon-btn>
        <icon-btn small v-tooltip:top="`删除${typeContent[type].text}`" @click="del">delete</icon-btn>
      </div>
      <!--<div class="flex" style="margin: 15px 0;">-->
        <!--<i class="icon f-20 c-a">label</i>-->
        <!--<textarea class="flex-item f-14" placeholder="输入标签，多个逗号隔开" style="height: 40px;"></textarea>-->
      <!--</div>-->
      <div class="flex-v-center info-item">
        <i class="icon f-20 c-a">insert_drive_file</i>
        <span class="flex-item">
          <span>{{current.width}}x{{current.height}}</span>
          <span style="margin-left: 15px;">{{current.filesize | filesize}}</span>
        </span>
      </div>
      <div class="flex-v-center info-item">
        <i class="icon f-20 c-a">person</i>
        <span class="flex-item">{{current.createUser}}</span>
      </div>
      <div class="flex-v-center info-item">
        <i class="icon f-20 c-a">access_time</i>
        <span class="flex-item">{{current.createDate}}</span>
      </div>
    </div>
  </div>
  <image-editor v-if="show.imageEditor" @close="show.imageEditor = false" @refresh="$emit('refresh');show.imageEditor = false;" :src="origin+current.filePath+current.fileName" :current="current"/>
</layer>
</template>

<script>
import ImageEditor from '../components/imageEditor'
import 'video.js/dist/video-js.css'
import 'video.js/dist/lang/zh-CN'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'

const ORIGIN = 'http://60.247.77.208:58088'
const typeContent = {
  0: { text: '图片' },
  1: { text: '音频' },
  2: { text: '视频' }
}

export default {
  name: 'media-preview',
  components: { ImageEditor, videoPlayer },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      typeContent,
      w: 550,
      h: 500,
      i: this.index,
      origin: ORIGIN,
      show: {
        imageEditor: false
      }
    }
  },
  computed: {
    current () {
      return this.list[this.i]
    },
    imgStyle () {
      let w = this.current.width
      let h = this.current.height
      if (w < this.w && h < this.h) {
        return { width: 'auto', height: 'auto' }
      }
      if (w / h > this.w / this.h) {
        return { width: '100%', height: 'auto' }
      } else {
        return { height: '100%', width: 'auto' }
      }
    },
    playerOptions () {
      return {
        width: '550',
        height: '500',
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: '',
          src: this.origin + (this.current.video || this.current.audio)
        }],
        poster: this.origin + this.current.thumb
      }
    }
  },
  methods: {
    prev () {
      this.i -= 1
    },
    next () {
      this.i += 1
    },
    del () {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除以下文件吗？\n${this.current.alias}`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http.post('/cri-cms-platform/media/del.monitor', {
            id: this.current.id,
            type: this.type
          }).then(res => {
            this.$emit('delected')
            this.list.splice(this.i, 1)
            if (this.i >= this.list.length) {
              this.i = this.list.length - 1
            }
          }).catch(e => {
            this.$toast(e.msg)
          })
        }
      })
    },
    copyLink () {
      this.$refs.copyInput.select()
      document.execCommand('copy')
      this.$toast('链接地址已复制')
    }
  }
}
</script>

<style lang="less">
.media-preview{
  .layer-ctn{max-width: 800px!important;}
  .img-container{width: 100%;background: #222;}
  .img-info{width: 250px;padding: 15px;}
  textarea{margin: 0;padding: 0;border: none;outline: none;background: transparent;resize: none;margin-left: 15px;}
  .info-item{margin: 10px 0;line-height: 1em;
    .icon{margin-right: 15px;}
  }
  .file-name{padding: 10px 0;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
  .img-btn{text-shadow: 2px 0 0 #fff;}
}
</style>
