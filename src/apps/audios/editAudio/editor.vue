<template>
  <div class="audio-editor">
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
      <div v-if="!audio" class="selector-add flex-center a" @click="ui.audioSelectorShow = true">
        <div class="relative">
          <i class="icon c-a" style="font-size: 80px;">audiotrack</i>
          <i class="icon c-a" style="font-size: 50px;position: absolute;left: -10px;top: 0;">add</i>
        </div>
      </div>
      <div v-else style="text-align: center;">
        <!--<video-player class="vjs-custom-skin"-->
                      <!--ref="videoPlayer"-->
                      <!--:options="playerOptions"-->
                      <!--:playsinline="true"/>-->
        <audio style="margin-top: 20px;" controls="controls" :src="playerOptions.sources[0].src"></audio>
        <div class="t-center" style="margin-top: 20px;">
          <btn flat color="#0299ff" @click="ui.audioSelectorShow = true">重新选择</btn>
        </div>
      </div>
    </div>

    <layer v-if="ui.audioSelectorShow" title="选择视频"  width="800px"  class="tc_box">
      <div class="layer-text relative w100h100" style="height: 800px;">
        <media-audios select-mode ref="mediaAudios" single-select/>
      </div>
      <div class="layer-btns">
        <btn flat @click="ui.audioSelectorShow = false">取消</btn>
        <btn flat color="#008eff" @click="selectAudio">选择</btn>
      </div>
    </layer>

  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
import MediaAudios from '../../medialibrary/pages/audios'

const ORIGIN = window.w_api

export default {
  name: 'audio-editor',
  components: { videoPlayer, MediaAudios },
  data () {
    return {
      ui: {
        titleColorBoxShow: false,
        audioSelectorShow: false
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
      audio: null,
      titleColor: '#000000'
    }
  },
  methods: {
    titleChange () {
      if ( sessionStorage.siteId == 1002 ) {
        this.$http.post('/cri-cms-platform/article/getKeyGenerate.monitor', { doc: this.title }).then(
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
    selectAudio () {
      this.audio = this.$refs.mediaAudios.selected[0]
      this.playerOptions.sources[0].src = ORIGIN + this.audio.audio
      this.ui.audioSelectorShow = false
    }
  }
}
</script>

<style lang="less">
.audio-editor {max-width: 900px;margin: 0 auto;padding: 10px;
  .title{font-size: 30px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 20px 15px;color: #555;
    &::-webkit-input-placeholder{color: #aaa;}
  }
  .title-colorpicker-btn {width: 25px;height: 25px;border: 1px solid transparent;margin: 3px;
    &:hover {border: 1px solid #000000}
  }
  .title-color-list {width: 192px;padding: 10px;}
  .selector {width: 100%;height: 200px;
    .selector-add {width: 100%;height: 100%;background: rgba(0, 0, 0, .06);border-radius: 10px;
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
