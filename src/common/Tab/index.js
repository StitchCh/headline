import Tab from './Tab.vue'
import TabItem from './TabItem.vue'

Tab.install = function (Vue) {
  Vue.component(Tab.name, Tab)
  Vue.component(TabItem.name, TabItem)
}

export default Tab
