<template>
  <div style="max-height: 100%; position: fixed; top: 0;left: 0;overflow: auto;width: 100%;">
    <div class="article-editor">
      <!--<div class="relative">-->
      <!--<textarea @blur="titleChange" v-model="title" class="title title_title" type="text" placeholder="请输入标题" :style="{ color: titleColor }"></textarea>-->
      <!--&lt;!&ndash;<input v-model="title" class="title" type="text" placeholder="请输入标题" :style="{ color: titleColor }">&ndash;&gt;-->
      <!--<div style="position: absolute;right: 20px;top: 28px;">-->
      <!--<button class="title-colorpicker-btn" @click="titleColorBoxShow = !titleColorBoxShow" :style="{ background: titleColor }"></button>-->
      <!--<bubble v-if="titleColorBoxShow" @close="titleColorBoxShow = false">-->
      <!--<div class="title-color-list">-->
      <!--<button class="title-colorpicker-btn" style="background: #000000;" @click="changeTitleColor('#000000')"></button>-->
      <!--<button class="title-colorpicker-btn" style="background: #F44336;" @click="changeTitleColor('#F44336')"></button>-->
      <!--<button class="title-colorpicker-btn" style="background: #FF9800;" @click="changeTitleColor('#FF9800')"></button>-->
      <!--<button class="title-colorpicker-btn" style="background: #FFEB3B;" @click="changeTitleColor('#FFEB3B')"></button>-->
      <!--<button class="title-colorpicker-btn" style="background: #4CAF50;" @click="changeTitleColor('#4CAF50')"></button>-->
      <!--<button class="title-colorpicker-btn" style="background: #00BCD4;" @click="changeTitleColor('#00BCD4')"></button>-->
      <!--<button class="title-colorpicker-btn" style="background: #2196F3;" @click="changeTitleColor('#2196F3')"></button>-->
      <!--<button class="title-colorpicker-btn" style="background: #9C27B0;" @click="changeTitleColor('#9C27B0')"></button>-->
      <!--</div>-->
      <!--</bubble>-->
      <!--</div>-->
      <!--</div>-->
      <!--<quill-editor v-model="content" ref="editor" :options="options" @change="getKeyGenerate"/>-->


      <div>
        <vue-ueditor-wrap v-model="content" ref="editor" :config="config" :destroy="true" @ready="ready"/>
      </div>

      <div>
        <div>
          共：{{allLength}}
        </div>
        <input type="text" v-model="startNumber">
        到
        <input type="text" v-model="end">
        <btn @click="start">开始</btn>
      </div>
      <div>
         站点： <input type="text" v-model="siteId">
      </div>
      <div>ids:</div>
      <textarea  v-model="liststr">


    </textarea>

      <!--<layer v-if="ui.imageSelectorShow" title="选择图片"  width="800px" class="tc_box">-->
      <!--<div class="layer-text relative" style="height: 800px;">-->
      <!--<media-photos select-mode ref="mediaPhotos"></media-photos>-->
      <!--</div>-->
      <!--<div class="layer-btns">-->
      <!--<btn flat @click="ui.imageSelectorShow = false">取消</btn>-->
      <!--<btn flat color="#008eff" @click="insertImage">选择</btn>-->
      <!--</div>-->
      <!--</layer>-->

      <!--<layer v-if="ui.videoSelectorShow" title="选择视频"  width="800px" class="tc_box">-->
      <!--<div class="layer-text relative" style="height: 800px;">-->
      <!--<media-videos select-mode ref="mediaVideos"></media-videos>-->
      <!--</div>-->
      <!--<div class="layer-btns">-->
      <!--<btn flat @click="ui.videoSelectorShow = false">取消</btn>-->
      <!--<btn flat color="#008eff" @click="insertVideo">选择</btn>-->
      <!--</div>-->
      <!--</layer>-->

      <!--<layer v-if="ui.audioSelectorShow" title="选择音频"  width="800px" class="tc_box">-->
      <!--<div class="layer-text relative" style="height: 800px;">-->
      <!--<media-audios select-mode ref="mediaAudios"></media-audios>-->
      <!--</div>-->
      <!--<div class="layer-btns">-->
      <!--<btn flat @click="ui.audioSelectorShow = false">取消</btn>-->
      <!--<btn flat color="#008eff" @click="insertAudio">选择</btn>-->
      <!--</div>-->
      <!--</layer>-->
    </div>
  </div>
</template>

<script>
  import VueUeditorWrap from 'vue-ueditor-wrap'
  import debounce from 'lodash/debounce'
  import MediaPhotos from '../medialibrary/pages/photos'
  import MediaVideos from '../medialibrary/pages/videos'
  import MediaAudios from '../medialibrary/pages/audios'


  var listdata = []


  export default {
    name: 'article-editor',
    components: { VueUeditorWrap, MediaPhotos, MediaVideos, MediaAudios },
    data () {
      return {
        siteId : '1001',
        liststr: '',
        startNumber: 0,
        end: 0,
        btn: '',
        arList: [],
        allLength: 0,
        number: 0,
        sitesList: [],
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
        endn: 0,
        editor: null,
        config: {
          autoFloatEnabled: false,
          zIndex: 1,
          height: 800,
          toolbars: [
            [
              'fullscreen',
              'autotypeset',
              '|',
              'source',
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
              'selectimage',
              'imagenone', // 不浮动
              'imageleft', // 左浮动
              'imageright', // 右浮动
              '|',
              'selectvideo',
              '|',
              'selectaudio'
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
          initialFrameHeight: window.innerHeight - 400,
          serverUrl: '/cri-cms-platform/media/uploadIAU.monitor',
          imageActionName: '/cri-cms-platform/media/uploadIAU.monitor'
        }
      }
    },
    methods: {
      start () {
        let that = this
        this.startNumber = Number(this.startNumber)
        this.end = Number(this.end)

        if (this.number + this.startNumber < this.end) {

          this.$http.post('/cri-cms-platform/automatic/get.monitor', {
            siteId: this.siteId,
            id: this.arList[this.number + this.startNumber]
          }).then(res => {
            this.content = res.article.content

            setTimeout(() => {
              that.btn.click()

              setTimeout(() => {

                that.$http.post('/cri-cms-platform/automatic/update.monitor', {
                  siteId: this.siteId,
                  id: that.arList[that.number + this.startNumber],
                  content: that.editor.getContent()
                }).then(res => {
                  console.log(that.number + this.startNumber, that.end)
                  that.number = that.number + 1
                  this.start()
                })

              })
            })
          })

        }
      },
      setStyle (content) {
        this.content = content
      },
      titleChange () {
        if ( sessionStorage.siteId == 1002 ) {
          this.$http.post('/cri-cms-platform/article/getKeyToTitle.monitor', { doc: this.title }).then(
            res => {
              this.$emit('changeTitle', res.key.join(','))
            }
          )
        }
      },
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
            url: origin + v.video,
            thumb: origin + v.thumb
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
        console.log(selected)
        if (selected.length) {
          selected.forEach(item => {
            this.editor.execCommand('music', item, 'upload', true)
          })
        }
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
        this.btn = document.getElementById('edui4_button_body')
      }
    },
    mounted () {
      // this.$http.post('/cri-cms-platform/automatic/ids.monitor', {
      //   siteId: 1002
      // }).then(res => {
      //   this.arList = res.data
      //   this.allLength = res.data.length
      // })

      this.arList = listdata
      this.allLength = this.arList.length
      this.end = this.arList.length
    },
    watch: {
      'liststr' () {
        this.arList = this.liststr.split(',')
        this.allLength = this.arList.length
        this.end = this.arList.length
      }
    }
  }
</script>

<style lang="less">
  .article-editor{max-width: 900px;margin: 0 auto;padding: 10px;
    .title{
      outline: none;
      resize: none;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    .flex-v-center{
      font-size: 14px !important;
    }
    .title{font-size: 30px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 20px 15px;color: #555;padding-right: 30px;
      &::-webkit-input-placeholder{color: #aaa;}
    }
    .title-colorpicker-btn {width: 25px;height: 25px;border: 1px solid transparent;margin: 3px;
      &:hover {border: 1px solid #000000}
    }
    .title-color-list {width: 192px;padding: 10px;}
    /*.ql-toolbar.ql-snow, .ql-container.ql-snow{border: none;}*/
    /*.ql-toolbar.ql-snow{position: sticky;top: 0;border-top: 1px solid #ddd;background: #fff;z-index: 10;}*/
    /*.ql-editor{font-size: 14px;color: #555;min-height: 200px;}*/
    /*.ql-formats svg{vertical-align: top;}*/
    /*.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before{content: '一级标题'}*/
    /*.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before{content: '二级标题'}*/
    /*.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before{content: '三级标题'}*/
    /*.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before{content: '四级标题'}*/
    /*.ql-snow .ql-picker.ql-header .ql-picker-label::before, .ql-snow .ql-picker.ql-header .ql-picker-item::before{content: '正文'}*/

    /*.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before{content: '超大'}*/
    /*.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before{content: '大号'}*/
    /*.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before{content: '小号'}*/
    /*.ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before{content: '正常'}*/
    /*.ql-snow .ql-tooltip::before{content: '链接地址'}*/
    /*.ql-snow .ql-tooltip a.ql-action::after{content: '修改'}*/
    /*.ql-snow .ql-tooltip a.ql-remove::before{content: '删除'}*/
    /*.ql-tooltip{border-radius: 6px;}*/
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
