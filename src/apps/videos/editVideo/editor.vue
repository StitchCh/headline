<template>
  <div class="video-editor">
    <div class="relative">
      <textarea @blur="titleChange" v-model="title" class="title title_title" type="text" placeholder="请输入标题" :style="{ color: titleColor }"></textarea>
      <div style="position: absolute;right: 20px;top: 28px;">
        <button class="title-colorpicker-btn" @click="ui.titleColorBoxShow = !ui.titleColorBoxShow" :style="{ background: titleColor }"></button>
        <bubble v-if="ui.titleColorBoxShow" @close="ui.titleColorBoxShow = false">
          <div class="title-color-list">
            <button class="title-colorpicker-btn" style="background: #000000;" @click="changeTitleColor('#000000')"></button>
            <button class="title-colorpicker-btn" style="background: #F44336;" @click="changeTitleColor('#F44336')"></button>
            <button class="title-colorpicker-btn" style="background: #FF9800;" @click="changeTitleColor('#FF9800')"></button>
            <button class="title-colorpicker-btn" style="background: #FFEB3B;" @click="changeTitleColor('#FFEB3B')"></button>
            <button class="title-colorpicker-btn" style="background: #4CAF50;" @click="changeTitleColor('#4CAF50')"></button>
            <button class="title-colorpicker-btn" style="background: #00BCD4;" @click="changeTitleColor('#00BCD4')"></button>
            <button class="title-colorpicker-btn" style="background: #2196F3;" @click="changeTitleColor('#2196F3')"></button>
            <button class="title-colorpicker-btn" style="background: #9C27B0;" @click="changeTitleColor('#9C27B0')"></button>
          </div>
        </bubble>
      </div>
    </div>
    <div class="selector">
      <div v-if="!video" class="selector-add flex-center a" @click="ui.videoSelectorShow = true">
        <i class="icon c-a" style="font-size: 80px;">video_call</i>
      </div>
      <div v-else>
        <video-player class="vjs-custom-skin"
                      ref="videoPlayer"
                      :options="playerOptions"
                      :playsinline="true"/>
        <div class="t-center" style="margin-top: 20px;">
          <btn flat color="#0299ff" @click="ui.videoSelectorShow = true">重新选择</btn>
        </div>
      </div>
    </div>

    <layer v-if="ui.videoSelectorShow" title="选择视频"  width="1000px" class="tc_box">
      <div class="layer-text relative" style="height: 800px;">
        <media-videos select-mode ref="mediaVideos" single-select></media-videos>
      </div>
      <div class="layer-btns">
        <btn flat @click="ui.videoSelectorShow = false">取消</btn>
        <btn flat color="#008eff" @click="selectVideo">选择</btn>
      </div>
    </layer>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
import MediaVideos from '../../medialibrary/pages/videos'

const ORIGIN = window.w_api

export default {
  name: 'video-editor',
  components: { videoPlayer, MediaVideos },
  data () {
    return {
      ui: {
        titleColorBoxShow: false,
        videoSelectorShow: false
      },
      playerOptions: {
        height: '495',
        language: 'zh-ch',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: '',
          src: ''
        }],
        poster: ''
      },
      title: '',
      video: null,
      titleColor: '#000000'
    }
  },
  methods: {
    titleChange () {
      if ( sessionStorage.siteId == 1002 ) {
        this.$http.post('/cri-cms-platform/article/getKeyToTitle.monitor', { doc: this.title }).then(
          res => {
            this.$emit('changeTitle', res.key.join(','))
          }
        )
      }
    },
    changeTitleColor (color) {
      this.titleColor = color
      this.ui.titleColorBoxShow = false
    },
    selectVideo () {
      this.video = this.$refs.mediaVideos.selected[0]
      this.playerOptions.sources[0].src = ORIGIN + this.video.video
      this.ui.videoSelectorShow = false
    }
  },
  watch: {
    'title' (val) {
      this.title = this.switchAngle(val)
    }
  }
}
</script>

<style lang="less">
.video-editor {max-width: 900px;margin: 0 auto;padding: 10px;
  .title{font-size: 30px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 20px 15px;color: #555;
    &::-webkit-input-placeholder{color: #aaa;}
  }
  .title-colorpicker-btn {width: 25px;height: 25px;border: 1px solid transparent;margin: 3px;
    &:hover {border: 1px solid #000000}
  }
  .title-color-list {width: 192px;padding: 10px;}
  .selector {width: 100%;min-height: 495px;
    .selector-add {width: 100%;height: 495px;background: rgba(0, 0, 0, .06);border-radius: 10px;
      &:hover {opacity: .8;}
    }
  }
  .layer-ctn {max-width: 1000px;
    .af-left{width: 280px;background: #fff;border-right: 1px solid rgba(0, 0, 0, .05);}
    .nav-item{height: 40px;border-bottom: 1px solid #eee;line-height: 1em;padding: 0 5px 0 15px;
      &.nav-item-folder{padding-left: 30px;}
      &:hover{background: rgba(0, 0, 0, .05);}
      &.on{background: #318fff;border-color: #fff;color: #fff;
        .icon-btn{color: #fff;}
      }
      input{border: none;height: 36px;background: transparent;
        &::-webkit-input-placeholder{color: #aaa;}
      }
      .nav-item-icon{margin-right: 15px;}
    }
    .search-bar input{width:150px;height: 100%;border:none;margin-left: 10px;}
    .media-group{padding: 13px 30px;
      ul{flex-wrap: wrap;}
      li{margin: 0 6px 6px 0}
    }
    .media-group-title{padding: 15px 0;}
    .media-group-title{padding: 15px 0;}
    .bubble-item{padding: 4px 15px;white-space: nowrap;cursor: pointer;}
    .bubble-item:hover{background: rgba(0, 0, 0, .1)}
    .datepicker{
      &:before{content: none;}
      input{background: transparent;border: none;padding: 0 10px;}
    }
    .datepicker-range{min-width: 200px;
      .datepicker-popup{right: 0;width: 420px;}
    }
  }
}
</style>
