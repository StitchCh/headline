import Editor from './index.vue'

Editor.install = function (Vue) {
  Vue.component('v-quill', Editor)
}

export default Editor
