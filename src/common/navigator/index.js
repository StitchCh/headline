import Navigator from './Navigator'
import NavigatorItem from './NavigatorItem'
import NavigatorItemGroup from './NavigatorItemGroup'

Navigator.install = function (Vue) {
  Vue.component(Navigator.name, Navigator)
  Vue.component(NavigatorItem.name, NavigatorItem)
  Vue.component(NavigatorItemGroup.name, NavigatorItemGroup)
}

export default { Navigator, NavigatorItem, NavigatorItemGroup }
