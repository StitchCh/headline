<template>
  <div class="abs bg-f flex c-6 f-14 app-gallery-edit">
    <div v-if="ui.loading" class="abs flex-center bg-f" style="z-index: 10;">
      <loading size="50"/>
    </div>
    <template v-else>
      <div class="flex-item flex-col">
        <div class="top-bar flex-v-center" style="height: 55px;padding: 0 20px;">
          <div class="a flex-v-center" @click="beforeClose">
            <icon-btn style="margin-right:10px;">arrow_back</icon-btn>
            <span class="f-18">返回</span>
          </div>
          <div class="flex-item"></div>
          <div class="flex-v-center">
            <!-- <btn big flat style="margin-right: 10px;">预览</btn> -->
            <btn big flat style="margin-right: 10px;" @click="autoSave">保存草稿</btn>
            <btn big style="margin-right: 20px;" @click="submit">保存</btn>
            <icon-btn v-tooltip:bottom="'发布选项'" @click="ui.optionShow=!ui.optionShow">menu</icon-btn>
          </div>
        </div>
        <div class="flex-item scroll-y">
          <gallery-editor @getKeyGenerate="getKeyGenerate" ref="editor"/>
        </div>
      </div>
      <gallery-option :res="res" ref="option" :style="{ width: ui.optionShow ? '320px' : '0px' }"/>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import GalleryEditor from './editor'
import GalleryOption from './options'

const from = {
  gallery: {
    getUrl: '/cri-cms-platform/gallery/get.monitor'
  },
  draft: {
    getUrl: '/cri-cms-platform/articleAutoSave/getAuto.monitor'
  }
}

export default {
  name: 'app-gallery-edit',
  components: { GalleryEditor, GalleryOption },
  props: [ 'from', 'id' ],
  data () {
    return {
      ui: {
        loading: false,
        optionShow: true,
        submited: false
      },
      res: null,
      autoSaveId: '',
      autoSaveTimer: null,
      setkey: true
    }
  },
  methods: {
    beforeClose () {
      if (this.ui.submited) {
        clearInterval(this.autoSaveTimer)
        window.opener = null
        window.close()
        // this.$router.go(-1)
        return
      }
      let that = this
      this.$confirm({
        title: '您确定要离开吗？',
        text: '未保存的内容将无法恢复。',
        btns: ['取消', '离开'],
        color: 'red',
        yes () {
          clearInterval(that.autoSaveTimer)
          window.opener = null
          //window.close()
          that.$router.go(-1)
        },
        no () {

        }
      })
    },
    getKeyGenerate () {
      if (this.id && this.$refs.option.form.abstarcts !== '') return

      if (this.setkey) {
        let doc = this.$refs.editor.allDescription
        if (doc == '') return
        if (sessionStorage.siteId == 1002) {
          this.$refs.option.form.abstarcts = doc.split('.')[0].substring(0, 128)
          this.setkey = true
        } else {
          this.$http.post('/cri-cms-platform/article/getKeyGenerate.monitor', { doc }).then(
            res => {
              this.$refs.option.form.abstarcts = res.gerenate
              this.$refs.option.form.keywords = res.key.join(',')
              this.setkey = true
            }
          )
        }
      }
      this.setkey = false

    },
    getGallery () {
      if (this.from && this.id) {
        this.ui.loading = true
        if (this.from === 'draft') this.autoSaveId = this.id
        this.$http.post(from[this.from].getUrl, {
          id: this.id,
          app: 'GALLERY'
        }).then(res => {
          this.res = res
          this.ui.loading = false
          this.$nextTick(() => {
            let { editor } = this.$refs
            editor.title = res.content.title
            editor.titleColor = res.content.titleColor
            editor.selected = res.gallery.content
          })
        }).catch(console.log)
      }
    },
    submit () {
      let url = this.id && this.from === 'gallery' ? '/cri-cms-platform/gallery/update.monitor' : '/cri-cms-platform/gallery/save.monitor'
      let { title, titleColor, selected } = this.$refs.editor
      if (!title) {
        this.$toast('请输入标题')
        return
      }
      if (!selected.length) {
        this.$toast('请选择图片')
        return
      }
      if (!this.$refs.option.form.channelIds) {
        this.$toast('请选择栏目')
        return
      }
      let content = JSON.stringify(selected.map(v => {
        return {
          description: v.description,
          attachmentId: v.id
        }
      }))
      let form = Object.assign({title, titleColor, content}, this.$refs.option.form)
      if (form.createDate) form.createDate = moment(form.createDate).format('YYYY-MM-DD HH:mm:ss')
      if (this.id) form.id = this.id

      form.isListShowPic = form.isListShowPic == 1 ? 0 : 1

      if (!form.thumb) {
        this.$toast('请选头图')
        return
      }

      this.$http.post(url, form).then(
        res => {
          this.ui.submited = true
          window.opener.location.reload()
          window.opener = null
          window.close()
          // this.$router.go(-1)
        }
      ).catch(
        res => {
          this.$toast(res || res.msg || '保存失败')
          console.log(res)
        }
      )
    },
    autoSave () {
      let { title, titleColor, selected, allDescription } = this.$refs.editor
      let content = ''
      if (selected.length) {
        content = JSON.stringify(selected.map(v => {
          return {
            description: v.description,
            attachmentId: v.id
          }
        }))
      }
      let form = Object.assign({title, titleColor, content}, this.$refs.option.form)
      form.allDescription = allDescription
      if (this.autoSaveId) form.id = this.autoSaveId
      return this.$http.post('/cri-cms-platform/articleAutoSave/saveAuto.monitor', form).then(
        res => {
          this.autoSaveId = res.autoSaveId
          this.$toast('保存成功')
        }
      ).catch(
        res => {
          this.$toast(res.msg || res || '保存失败')
        }
      )
    }
  },
  created () {
    this.autoSaveTimer = setInterval(() => {
      this.autoSave()
    }, 60000)
  },
  mounted () {
    this.getGallery()
  }
}
</script>

<style lang="less">
.app-gallery-edit{
  .gallery-options{width: 320px;padding: 20px 0;background: #f8f8f8;transition: width .3s;
    textarea, input{border: none;width: 100%;outline: none;font-size: 14px;color: #444;resize: none;background: transparent;
      &::-webkit-input-placeholder{color: #999;}
    }
  }
  .option-item{border-bottom: 1px solid rgba(0, 0, 0, .1);padding: 12px 0;}
  .add-photo-btn{background: rgba(0, 0, 0, .06);border-radius: 5px;overflow: hidden;}
  .add-other-icon{margin-right: 10px;}
  .active {color: #018be6;}
  .datepicker::before {content: none}
  .add-gallery-setting-btn:hover {color:#008eff;}
  .add-gallery-setting {padding: 0;
    li {padding-left: 20px;font-size: 16px;
      div {border-bottom: 1px solid #e1e1e1;padding: 12px 0;}
      &:last-child div{border-bottom: 0;}
      input {border: none;outline: none;font-size: 14px;color: #444;background: transparent;height: 34px;width: 60px;text-align: right;padding-right: 20px;
        &::-webkit-input-placeholder{color: #999;}
      }
    }
  }
}
</style>
