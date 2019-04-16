import BtnGroup from './BtnGroup'
import BtnGroupItem from './BtnGroupItem'

BtnGroup.install = function (Vue) {
  Vue.component(BtnGroup.name, BtnGroup)
  Vue.component(BtnGroupItem.name, BtnGroupItem)
}

export default BtnGroup
