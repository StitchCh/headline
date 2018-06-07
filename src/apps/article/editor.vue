<template>
<div class="article-editor">
  <input class="title" type="text" placeholder="请输入标题">
  <div class="art-editor-content" id="art-editor-content"></div>
</div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  name: 'article-editor',
  data () {
    return {
      // quill: null
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Quill('#art-editor-content', {
      theme: 'snow',
      placeholder: '请输入内容',
      modules: {
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block', 'link', 'image', 'video'],
            // [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}],
            // [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}, {'align': []}], // outdent/indent
            // [{ 'direction': 'rtl' }], // text direction
            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{'color': []}, {'background': []}], // dropdown with defaults from theme
            ['clean'] // remove formatting button
          ]
        }
      }
    })
  }
}
</script>

<style lang="less">
.article-editor{
  max-width: 900px;margin: 0 auto;padding: 10px;
  .title{font-size: 30px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 20px 15px;color: #555;
    &::-webkit-input-placeholder{color: #aaa;}
  }
  .ql-toolbar.ql-snow, .ql-container.ql-snow{border: none;}
  .ql-toolbar.ql-snow{position: sticky;top: 0;border-top: 1px solid #ddd;background: #fff;z-index: 10;}
  .ql-editor{font-size: 14px;color: #555;min-height: 200px;}
  .ql-formats svg{vertical-align: top;}
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before{content: '一级标题'}
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before{content: '二级标题'}
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before{content: '三级标题'}
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before{content: '四级标题'}
  .ql-snow .ql-picker.ql-header .ql-picker-label::before, .ql-snow .ql-picker.ql-header .ql-picker-item::before{content: '正文'}
  .ql-snow .ql-tooltip::before{content: '链接地址'}
  .ql-snow .ql-tooltip a.ql-action::after{content: '修改'}
  .ql-snow .ql-tooltip a.ql-remove::before{content: '删除'}
}
</style>
