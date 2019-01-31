<template>
<div class="mobile-push-editor">
  <!--<div class="relative">-->
    <!--<input v-model="title" class="title" type="text" placeholder="请输入标题">-->
    <!--&lt;!&ndash;<div style="position: absolute;right: 20px;top: 28px;">&ndash;&gt;-->
      <!--&lt;!&ndash;<button class="title-colorpicker-btn" @click="titleColorBoxShow = !titleColorBoxShow" :style="{ background: titleColor }"></button>&ndash;&gt;-->
      <!--&lt;!&ndash;<bubble v-if="titleColorBoxShow" @close="titleColorBoxShow = false">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="title-color-list">&ndash;&gt;-->
          <!--&lt;!&ndash;<button class="title-colorpicker-btn" style="background: #000000;" @click="changeTitleColor('#000000')"></button>&ndash;&gt;-->
          <!--&lt;!&ndash;<button class="title-colorpicker-btn" style="background: #F44336;" @click="changeTitleColor('#F44336')"></button>&ndash;&gt;-->
          <!--&lt;!&ndash;<button class="title-colorpicker-btn" style="background: #FF9800;" @click="changeTitleColor('#FF9800')"></button>&ndash;&gt;-->
          <!--&lt;!&ndash;<button class="title-colorpicker-btn" style="background: #FFEB3B;" @click="changeTitleColor('#FFEB3B')"></button>&ndash;&gt;-->
          <!--&lt;!&ndash;<button class="title-colorpicker-btn" style="background: #4CAF50;" @click="changeTitleColor('#4CAF50')"></button>&ndash;&gt;-->
          <!--&lt;!&ndash;<button class="title-colorpicker-btn" style="background: #00BCD4;" @click="changeTitleColor('#00BCD4')"></button>&ndash;&gt;-->
          <!--&lt;!&ndash;<button class="title-colorpicker-btn" style="background: #2196F3;" @click="changeTitleColor('#2196F3')"></button>&ndash;&gt;-->
          <!--&lt;!&ndash;<button class="title-colorpicker-btn" style="background: #9C27B0;" @click="changeTitleColor('#9C27B0')"></button>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</bubble>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
  <!--</div>-->

  <!--<quill-editor v-model="content" ref="editor" :options="options" @change="getKeyGenerate"/>-->
  <div>
    <vue-ueditor-wrap v-model="content" ref="editor" :config="config" :destroy="true" @ready="ready"/>
  </div>

  <layer v-if="ui.imageSelectorShow" title="选择图片"  width="800px">
    <div class="layer-text relative" style="height: 800px;">
      <media-photos select-mode ref="mediaPhotos"></media-photos>
    </div>
    <div class="layer-btns">
      <btn flat @click="ui.imageSelectorShow = false">取消</btn>
      <btn flat color="#008eff" @click="insertImage">选择</btn>
    </div>
  </layer>

  <layer v-if="ui.videoSelectorShow" title="选择视频"  width="800px">
    <div class="layer-text relative" style="height: 800px;">
      <media-videos select-mode ref="mediaVideos"></media-videos>
    </div>
    <div class="layer-btns">
      <btn flat @click="ui.videoSelectorShow = false">取消</btn>
      <btn flat color="#008eff" @click="insertVideo">选择</btn>
    </div>
  </layer>

  <layer v-if="ui.audioSelectorShow" title="选择音频"  width="800px">
    <div class="layer-text relative" style="height: 800px;">
      <media-audios select-mode ref="mediaAudios"></media-audios>
    </div>
    <div class="layer-btns">
      <btn flat @click="ui.audioSelectorShow = false">取消</btn>
      <btn flat color="#008eff" @click="insertAudio">选择</btn>
    </div>
  </layer>
</div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import debounce from 'lodash/debounce'
import MediaPhotos from '../medialibrary/pages/photos'
import MediaVideos from '../medialibrary/pages/videos'
import MediaAudios from '../medialibrary/pages/audios'

export default {
  name: 'article-editor',
  components: { VueUeditorWrap, MediaPhotos, MediaVideos, MediaAudios },
  data () {
    return {
      ui: {
        imageSelectorShow: false,
        videoSelectorShow: false,
        audioSelectorShow: false,
        index: 0
      },
      title: '',
      titleColorBoxShow: false,
      titleColor: '#000000',
      content: '',
      editor: null,
      config: {
        zIndex: 1,
        height: 800,
        toolbars: [
          [
            'fullscreen',
            'source',
            'autotypeset',
            '|',
            'undo',
            'redo',
            '|',
            'formatmatch',
            'removeformat',
            'cleardoc',
            '|',
            'link',
            'unlink',
            '|',
            // 'simpleupload',
            // 'selectimage',
            'imagenone', // 不浮动
            'imageleft', // 左浮动
            'imageright', // 右浮动
            // '|',
            // 'selectvideo',
            // '|',
            // 'selectaudio'
          ],
          [
            'paragraph',
            'justifyleft',
            'justifyright',
            'justifycenter',
            'justifyjustify',
            '|',
            'insertorderedlist',
            'insertunorderedlist',
            '|',
            'indent', // 首行缩进
            'rowspacingtop', // 段前距
            'rowspacingbottom', // 段后距
            'lineheight', // 行间距
            '|',
            'pagebreak', // 分页
            'horizontal', // 分隔线
            '|',
            'fontsize',
            'fontfamily',
            'forecolor',
            'backcolor',
            'fontborder', // 字符边框
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'spechars'
          ]
        ],
        labelMap: {
          'selectimage': '插入图片'
        },
        wordCount: false,
        autoHeightEnabled: false,
        initialFrameHeight: window.innerHeight - 250,
        serverUrl: '/cri-cms-platform/media/uploadIAU.monitor'
        // imageUrlPrefix: '/cri-cms-platform/media/uploadIAU.monitor'
      }
    }
  },
  methods: {
    getText () {
      return this.editor.getContentTxt()
      // return this.$refs.editor.quill.getText()
    },
    // getKeyGenerate: debounce(function () {
    //   this.$emit('getKeyGenerate')
    // }, 1000),
    changeTitleColor (color) {
      this.titleColor = color
      this.titleColorBoxShow = false
    },
    insertImage () {
      let selected = this.$refs.mediaPhotos.selected.map(v => {
        return {
          src: this.$refs.mediaPhotos.imgOrigin + v.filePath + v.fileName
        }
      })
      if (selected.length) this.editor.execCommand('insertimage', selected)
      this.ui.imageSelectorShow = false
    },
    insertVideo () {
      let origin = this.$refs.mediaVideos.origin
      let selected = this.$refs.mediaVideos.selected.map(v => {
        return {
          url: origin + v.video
        }
      })
      if (selected.length) this.editor.execCommand('insertvideo', selected, 'upload')
      this.ui.videoSelectorShow = false
    },
    insertAudio () {
      let origin = this.$refs.mediaAudios.origin
      let selected = this.$refs.mediaAudios.selected.map(v => {
        return {
          url: origin + v.audio
        }
      })
      if (selected.length) this.editor.execCommand('insertvideo', selected, 'upload')
      this.ui.audioSelectorShow = false
    },
    ready (UE) {
      let that = this
      this.editor = UE
      window.UE.commands['selectimage'] = {
        execCommand () {
          that.ui.imageSelectorShow = true
        }
      }
      window.UE.commands['selectvideo'] = {
        execCommand () {
          that.ui.videoSelectorShow = true
        }
      }
      window.UE.commands['selectaudio'] = {
        execCommand () {
          that.ui.audioSelectorShow = true
        }
      }
    }
  },
  watch: {
    'content': debounce(function () {
      this.$emit('getKeyGenerate')
    }, 1000)
  }
}
</script>

<style scoped>
  #edui7{
    left: 0 !important;
  }
  #edui_fixedlayer{
    position: absolute !important;
  }
  body{
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }
  #app{
    min-width: auto !important;
    padding-bottom: 50px;
  }
  textarea{
    outline: none;
    width: 100%;
    height: 60px;
    resize: none;
    padding: 6px;
    box-sizing: border-box;
  }
</style>

<style lang="less">
.mobile-push-editor{max-width: 100%;margin: 0 auto;padding: 10px;
  .flex-v-center{
    font-size: 14px !important;
  }
  .title{font-size: 15px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 10px 6px;color: #555;box-sizing: border-box;
    &::-webkit-input-placeholder{color: #aaa;}
  }
  .title-colorpicker-btn {width: 25px;height: 25px;border: 1px solid transparent;margin: 3px;
    &:hover {border: 1px solid #000000}
  }
  .title-color-list {width: 192px;padding: 10px;}
  .edui-for-selectimage .edui-icon {
    background-position: -380px 0!important;
  }
  .edui-for-selectvideo .edui-icon {
    background-position: -320px -20px!important;
  }
  .edui-for-selectaudio .edui-icon {
    background-position: -18px -40px!important;
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
