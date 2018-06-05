import Btn from './Btn.vue'
import IconBtn from './IconBtn.vue'

Btn.install = function (Vue) {
  Vue.component(Btn.name, Btn)
  Vue.component(IconBtn.name, IconBtn)
}

export default Btn
