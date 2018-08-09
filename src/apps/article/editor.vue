<template>
<div class="article-editor">
  <div class="relative">
    <input v-model="title" class="title" type="text" placeholder="请输入标题" :style="{ color: titleColor }">
    <div style="position: absolute;right: 20px;top: 28px;">
      <button class="title-colorpicker-btn" @click="titleColorBoxShow = !titleColorBoxShow" :style="{ background: titleColor }"></button>
      <bubble v-if="titleColorBoxShow" @close="titleColorBoxShow = false">
        <div class="title-color-list">
          <button class="title-colorpicker-btn" style="background: #000;" @click="changeTitleColor('#000')"></button>
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
  <quill-editor v-model="content" ref="editor" :options="options" @change="getKeyGenerate"/>
</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import debounce from 'lodash/debounce'

export default {
  name: 'article-editor',
  components: { quillEditor },
  data () {
    return {
      title: '',
      titleColorBoxShow: false,
      titleColor: '#000',
      content: '',
      options: {
        theme: 'snow',
        placeholder: '请输入内容',
        modules: {
          toolbar: {
            container: [
              [{ 'header': [2, 3, 4, false] }],
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              ['blockquote', 'code-block', 'link', 'image', 'video'],
              // [{ 'header': 1 }, { 'header': 2 }], // custom button values
              [{'list': 'ordered'}, {'list': 'bullet'}],
              // [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
              [{'indent': '-1'}, {'indent': '+1'}, {'align': []}], // outdent/indent
              // [{ 'direction': 'rtl' }], // text direction
              [{'size': ['12px', false, '15px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '34px', '36px']}],
              [{'color': []}, {'background': []}], // dropdown with defaults from theme
              ['clean'] // remove formatting button
            ]
          }
        }
      }
    }
  },
  methods: {
    getText () {
      return this.$refs.editor.quill.getText()
    },
    getKeyGenerate: debounce(function () {
      this.$emit('getKeyGenerate')
    }, 1000),
    changeTitleColor (color) {
      this.titleColor = color
      this.titleColorBoxShow = false
    }
  }
}
</script>

<style lang="less">
.article-editor{
  max-width: 900px;margin: 0 auto;padding: 10px;
  .title{font-size: 30px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 20px 15px;color: #555;
    &::-webkit-input-placeholder{color: #aaa;}
  }
  .title-colorpicker-btn {width: 25px;height: 25px;border: 1px solid transparent;margin: 3px;
    &:hover {border: 1px solid #000}
  }
  .title-color-list {width: 192px;padding: 10px;}
  .ql-toolbar.ql-snow, .ql-container.ql-snow{border: none;}
  .ql-toolbar.ql-snow{position: sticky;top: 0;border-top: 1px solid #ddd;background: #fff;z-index: 10;}
  .ql-editor{font-size: 14px;color: #555;min-height: 200px;}
  .ql-formats svg{vertical-align: top;}
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before{content: '一级标题'}
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before{content: '二级标题'}
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before{content: '三级标题'}
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before{content: '四级标题'}
  .ql-snow .ql-picker.ql-header .ql-picker-label::before, .ql-snow .ql-picker.ql-header .ql-picker-item::before{content: '正文'}

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before{content: '36px';font-size: 36px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="34px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="34px"]::before{content: '34px';font-size: 34px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before{content: '32px';font-size: 32px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="30px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="30px"]::before{content: '30px';font-size: 30px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="28px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before{content: '28px';font-size: 28px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="26px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="26px"]::before{content: '26px';font-size: 26px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before{content: '24px';font-size: 24px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="22px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="22px"]::before{content: '22px';font-size: 22px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before{content: '20px';font-size: 20px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before{content: '18px';font-size: 18px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before{content: '16px';font-size: 16px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="15px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="15px"]::before{content: '15px';font-size: 15px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before{content: '12px';font-size: 12px;}
  .ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before{content: '14px'}
  .ql-snow .ql-tooltip::before{content: '链接地址'}
  .ql-snow .ql-tooltip a.ql-action::after{content: '修改'}
  .ql-snow .ql-tooltip a.ql-remove::before{content: '删除'}
  .ql-tooltip{border-radius: 6px;}
}
</style>
