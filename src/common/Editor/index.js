import Editor from './Editor.vue'

Editor.install = function (Vue) {
  Vue.component(Editor.name, Editor)
}

export default Editor
