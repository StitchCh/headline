<template>
<div class="editor">
  <div ref="editor" :id="'editor-' + hash"></div>
  <layer v-if="image.show">
    <div class="layer-content" style="width: 300px;">
      <div class="layer-title">插入图片</div>
      <div class="list-opt" v-if="!image.type">
        <label class="flex-v-center" @click="image.type='link'"><i class="icon">link</i><span class="f-item">图片链接</span></label>
        <label type="text" :for="'editor-img-input-' + hash" class="flex-v-center"><i class="icon">image</i><span class="f-item">本地上传</span></label>
        <input type="file" accept="image/*" @change="onChooseImage" style="display:none;" :id="'editor-img-input-' + hash">
      </div>
      <div class="layer-text" v-if="image.type==='link'">
        <input-box class="flex-item" v-model="image.url" label="图片地址" hint="请输入完整的图片链接地址"></input-box>
      </div>
      <div class="layer-btns">
        <btn flat @click="hideInsertImage">取消</btn>
        <btn v-if="image.type" flat @click="insertImage" :disabled="image.type==='link' && !image.url">确定</btn>
      </div>
      <div v-if="image.loading" class="abs bg-light-rgb-8 flex-center t-center f-12">
        <div><loading/><div>上传中</div></div>
      </div>
    </div>
  </layer>
</div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import katex from 'katex'
// import 'katex/dist/katex.min.css'
// window.katex = katex

export default {
  name: 'editor',
  props: {
    placeholder: String,
    uploadImageUrl: {
      type: String,
      default: '/eversec/images/upload'
    },
    imageUrl: {
      type: String,
      default: `http://192.168.200.214:8866/eversec/images/`
    },
    value: [String, Object, Array],
    readonly: Boolean,
    container: {
      type: Array,
      default () {
        return [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code', {'list': 'ordered'}, {'list': 'bullet'}],
          ['link', 'image'],
          ['clean']
        ]
      }
    },
    theme: {
      type: String,
      default: 'snow'
    }
  },
  data () {
    return {
      // content: '<p>example content</p>',
      _content: {},
      hash: '',
      editor: null,
      image: {
        show: false,
        range: null,
        loading: false,
        type: '',
        url: ''
      }
    }
  },
  beforeDestroy () {
    this.editor = null
  },
  created () {
    this.hash = Math.random().toString(36).substr(2)
  },
  mounted () {
    let toolbarOptions = {
      handlers: {
        'image': value => {
          this.image.show = true
          // 保存当前光标的位置
          this.image.range = this.editor.getSelection()
        }
      },
      container: this.container
    }
    this.editor = new Quill('#editor-' + this.hash, {
      theme: this.theme,
      placeholder: this.placeholder,
      modules: {
        // formula: true,
        toolbar: this.readonly ? false : toolbarOptions
      }
    })
    this.editor.on('selection-change', range => {
      if (!range) {
        this.$emit('blur', this.editor)
      } else {
        this.$emit('focus', this.editor)
      }
    })

    if (this.value) this.editor.pasteHTML(this.value || '')

    if (this.readonly) this.editor.enable(false)

    this.editor.on('text-change', (delta, oldDelta, source) => {
      // if (!this.readonly) this.$emit('input', this.editor.getContents())

      let html = this.$refs.editor.children[0].innerHTML
      const quill = this.editor
      const text = this.editor.getText()
      if (html === '<p><br></p>') html = ''
      this._content = html
      this.$emit('input', this._content)
      this.$emit('change', { html, text, quill })
    })
    // 修正链接输入面板位置，避免超出被隐藏
    setTimeout(() => {
      this.$el.addEventListener('click', e => {
        let linkPanel = this.$el.querySelector('.ql-tooltip')
        if (!linkPanel) return
        let left = parseInt(linkPanel.style.left)
        if (left < 0) {
          linkPanel.style.left = '0'
        } else if (left > this.$el.clientWidth - 255) {
          linkPanel.style.left = this.$el.clientWidth - 255 + 'px'
        }
      })
    }, 100)
  },
  watch: {
    content (newVal, oldVal) {
      if (this.editor) {
        if (newVal && newVal !== this._content) {
          this._content = newVal
          this.editor.pasteHTML(newVal)
        } else if (!newVal) {
          this.editor.setText('')
        }
      }
    },
    value (newVal, oldVal) {
      if (this.editor) {
        if (newVal && newVal !== this._content) {
          this._content = newVal
          this.editor.pasteHTML(newVal)
        } else if (!newVal) {
          this.editor.setText('')
        }
      }
    },
    readonly (newVal, oldVal) {
      if (this.editor) {
        this.editor.enable(!newVal)
      }
    }
  },
  methods: {
    insertImage () {
      // console.log(this.image.range)
      if (!this.image.range) return
      if (this.image.type === 'link' && this.image.url) {
        this.editor.insertEmbed(this.image.range.index, 'image', this.image.url, 'user')
      }
      this.hideInsertImage()
    },
    hideInsertImage () {
      this.image.show = false
      setTimeout(() => {
        this.image.type = ''
        this.image.url = ''
        this.image.range = null
        this.image.loading = false
      }, 200)
    },
    onChooseImage (e) {
      this.image.loading = true
      let file = this.$el.querySelector('#editor-img-input-' + this.hash).files[0]
      let param = new FormData()
      param.append('file', file, file.name)
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      this.$http.post(this.uploadImageUrl, param, config).then(res => {
        if (!this.image.range) return
        this.editor.insertEmbed(this.image.range.index, 'image', this.imageUrl + res, 'user')
        this.hideInsertImage()
      }).catch(e => {
        this.$toast('图片上传失败')
        this.hideInsertImage()
      })
    }
  }
}
</script>

<style lang="less">
.editor {
  word-break: break-all;
  // background: #000000;
  font-size: 14px;color: #444;
  .ql-snow{border: none;}
  .ql-editor{min-height: 100px;}
  .ql-formats{margin-right: 5px!important;padding: 5px 5px 5px 0;border-right: 1px solid rgba(0, 0, 0, .1);}
  .ql-formats:last-child{border: none;}
  .ql-formats button{opacity: .7;padding: 5px;width: 28px;height: 28px;border-radius: 20px;}
  .ql-formats button.ql-active{opacity: 1;background: rgba(0, 0, 0, .06);}
  .ql-formats button:hover{background: rgba(0, 0, 0, .1);}
  .ql-snow.ql-toolbar{padding: 0;border-top: 1px solid rgba(0, 0, 0, .1);position: sticky;top: -2px;background: #fff;z-index: 3;}
  .ql-snow .ql-container{font-size: 14px;}
  .ql-snow .ql-tooltip{border: none;box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);border-radius: 2px;}
  .ql-snow .ql-tooltip input[type=text]{border-width: 0 0 1px 0;padding: 3px 0;}
  .ql-snow .ql-tooltip input[type=text]:focus{border-color: #0065cc;}

  .ql-snow .ql-tooltip a.ql-remove::before,
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after,
  .ql-snow .ql-tooltip a.ql-action::after,
  .ql-snow .ql-tooltip::before,
  .ql-snow .ql-tooltip[data-mode=link]::before{
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 18px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'liga';
    transition: color .4s;
    user-select: none;
    vertical-align: middle;
  }

  .ql-snow .ql-tooltip a.ql-remove::before{content: 'format_clear';}
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after{content: 'save';}
  .ql-snow .ql-tooltip a.ql-action::after{content: 'edit'}
  .ql-snow .ql-tooltip::before{content: 'link'}
  .ql-snow .ql-tooltip[data-mode=link]::before{content: 'link';}
  .ql-snow .ql-tooltip[data-mode=formula]::before{content: 'functions'}

  .ql-bubble .ql-toolbar .ql-formats{margin: 0 5px;padding: 5px;}
  .ql-bubble .ql-editor{padding: 1px 0!important;overflow: visible;}

  // ul li{list-style-type: disc;margin: .3em 0;}
  // ol li{list-style-type: decimal;margin: .3em 0;}
  .pell {border-radius: 5px;box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);box-sizing: border-box;width: 100%; }
  .pell-content {box-sizing: border-box;min-height: 200px;outline: 0;overflow-y: auto;padding: 10px;width: 100%; }
  .pell-actionbar {background-color: #FFF;border-bottom: 1px solid rgba(10, 10, 10, 0.1);border-top-left-radius: 5px;border-top-right-radius: 5px;width: 100%; }
  .pell-button {background-color: transparent;border: none;cursor: pointer;height: 30px;outline: 0;width: 30px; font-size: 16px;color: #888;margin-right:2px;}
  .pell-button:hover{background: rgba(0, 0, 0, .06);}
  .pell-button i{font-size: 20px;}
  .list-opt{padding: 10px 0;}
  .list-opt label{padding: 5px 20px;cursor: pointer;}
  .list-opt label:hover{background: rgba(0, 0, 0, .06)}
  .list-opt .icon{margin-right: 10px;color: #888;}
}
</style>
