import Navigator from './Navigator.vue'

Navigator.install = function (Vue) {
  Vue.component(Navigator.name, Navigator)
}

export default Navigator
