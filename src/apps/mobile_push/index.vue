<template>
  <div class="bigbigbox">
    <div>
      <btn style="line-height: normal;height: 30px;padding: 0;line-height: 30px;" flat @click="$router.go(-1)">切换站点</btn>
    </div>
    <div style="width: 100%;background: #fff;">
      <div class="topbox">
        <div v-if="getend" class="option-item flex-v-center relative a" @click="ui.channelShow=!ui.channelShow">
          <span class="flex-item">{{channelNames}}</span>
          <i class="icon f-20 c-a">keyboard_arrow_down</i>
          <bubble v-if="ui.channelShow" pos="bottom" align="center" @close="ui.channelShow=false">
            <div style="padding: 10px 0;width: 280px;">
              <tree :data="ui.channels" pid-txt="channelPartentId" nameTxt="channelName" show-checkbox :checked-list.sync="channelIds"></tree>
            </div>
          </bubble>
        </div>
      </div>
      <div style="padding: 0 10px;">
        <p>标题：</p>
        <input v-model="form.title" class="title" type="text" placeholder="请输入标题">
        <p>摘要：</p>
        <textarea v-model="form.abstarcts" @change="" placeholder="摘要"></textarea>
      </div>
      <div class="option-item" style="margin: 0 10px;background: #fff;padding: 10px;">
        <div class="flex-v-center">
          <span class="flex-item" style="font-size: 14px;">是否显示头图</span>
          <switcher mode="Number" v-model="form.hasThumb"/>
        </div>
      </div>
      <div class="setimg">
        <p>封面：</p>
        <btn v-if="!thumb.id" style="line-height: normal;" flat @click="imageSelectorShow = true">选择封面</btn>
        <img v-else :src="thumb.src" alt="" @click="imageSelectorShow = true">
      </div>
      <article-editor ref="editor" @getKeyGenerate="getKeyGenerate"></article-editor>
    </div>

    <div class="btn" @click="btn">发布文章</div>

    <div class="gallery-editor tc_box">
      <layer v-if="imageSelectorShow" title="选择图片"  width="800px">
        <div class="layer-text relative" style="height: 800px;">
          <media-photos :singleSelect="true" select-mode ref="mediaPhotos"></media-photos>
        </div>
        <div class="layer-btns">
          <btn flat @click="imageSelectorShow = false">取消</btn>
          <btn flat @click="insertImage">选择</btn>
        </div>
      </layer>
    </div>
  </div>
</template>

<script>
import ArticleEditor from './editor'
import MediaPhotos from '../medialibrary/pages/photosMoble'

const from = {
  article: {
    getUrl: '/cri-cms-platform/article/get.monitor'
  },
  draft: {
    getUrl: '/cri-cms-platform/articleAutoSave/getAuto.monitor'
  }
}

export default {
  name: 'moblePush',
  components: { ArticleEditor, MediaPhotos },
  data () {
    return {
      imageSelectorShow: false,
      minh: document.documentElement.clientHeight,
      ui: {
        channelShow: false,
        channels: []
      },
      getend: false,
      thumb: {},
      form: {
        title: '',
        content: '',
        channelIds: '',
        abstarcts: '',
        hasThumb: 0,
        thumb: '',
        isOriginal: 0
      }
    }
  },
  watch: {
    'form.abstarcts' (newValue) {
      this.form.abstarcts = newValue.substring(0, 128)
    }
  },
  computed: {
    channelIds: {
      get () {
        return this.form.channelIds === '' ? [] : this.form.channelIds.split(',')
      },
      set (newValue) {
        this.form.channelIds = newValue.join(',')
      }
    },
    channelNames () {
      if (!this.channelIds.length) return '选择栏目'
      return this.channelIds.map(val => this.ui.channels.find(v => v.id === val).channelName).join('，')
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    insertImage () {
      let selected = this.$refs.mediaPhotos.selected.map(v => {
        console.log(v)
        return {
          src: this.$refs.mediaPhotos.imgOrigin + v.filePath + v.fileName,
          id: v.id
        }
      })
      if (selected.length) {
        console.log(selected)
        this.thumb = selected[0]
      }
      this.imageSelectorShow = false
    },
    btn () {
      let { content } = this.$refs.editor
      if (!this.form.title) {
        this.$toast('请输入标题')
        return
      }
      if (!content) {
        this.$toast('请输入内容')
        return
      }
      if (!this.form.channelIds) {
        this.$toast('请选择栏目')
        return
      }
      if (!this.thumb.id) {
        this.$toast('请选择封面')
        return
      }
      let othis = this
      this.$confirm({
        title: '发布确认',
        text: '您确定将文章发布到所选栏目中吗？',
        btns: ['取消', '发布'],
        color: 'red',
        yes () {
          othis.submit()
        },
        no () {

        }
      })
    },
    submit () {
      let { content } = this.$refs.editor
      let form = {...this.form}
      form.thumb = this.thumb.id
      form.content = content
      this.$http.post('/cri-cms-platform/article/mobileDispatchSave.monitor', form).then(res => {
        console.log(res)
        this.$refs.editor.resetcontent()
        this.$toast('发布成功')
        this.thumb = {}
        this.form = {
          title: '',
          content: '',
          channelIds: '',
          abstarcts: '',
          hasThumb: 0,
          thumb: '',
          isOriginal: 0
        }
      })
    },
    getChannels () {
      this.$http.post('/cri-cms-platform/article/getChannels.monitor').then(res => {
        this.ui.channels = res || []
        this.getend = true
      }).catch(e => {
        console.log(e)
      })
    },
    getKeyGenerate () {
      if (this.from || this.id) return

      let doc = this.$refs.editor.getText()
      if (!doc.trim()) return

      if (sessionStorage.siteId == 1002) {
        this.form.abstarcts = doc.split('.')[0].substring(0, 128)
      } else {
        this.$http.post('/cri-cms-platform/article/getKeyGenerate.monitor', { doc }).then(
          res => {
            this.form.abstarcts = res.gerenate
            this.form.keywords = res.key.join(',')
          }
        )
      }
    }
  },
  mounted () {
    let obox = document.getElementById('app')
    obox.style.minWidth = '0px'
    obox.style.position = 'absolute'
    obox.style.overflow = 'auto'
  }
}
</script>

<style scoped>
  .layer-btns{
    height: 40px;
  }
  .layer-btns *{
    height: 30px !important;
    line-height: 30px !important;
    color: #fff;
    margin: 5px 5px !important;
    box-sizing: content-box;
  }
  .bigbigbox{
    width: 100%;
    background: #fff;
    padding-bottom: 200px;
  }
  textarea{
    outline: none;
    width: 100%;
    height: 60px;
    resize: none;
    padding: 6px;
    box-sizing: border-box;
  }
  .title{font-size: 15px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 10px 6px;color: #555;box-sizing: border-box;
  }
  #app{
    min-width: auto !important;
  }
  .topbox{
    background: #fff;
    border-bottom: 1px solid #ddd;
    padding: 10px;
  }
  .btn{
    width: 100%;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    background: #00a0e9;
    color: #fff;
    z-index: 10;
  }
  .setimg *{
    margin: 0 auto;
    max-width: 90%;
    display: block;
    position: static !important;
  }
</style>

