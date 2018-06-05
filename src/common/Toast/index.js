import ToastComponent from './Toast.vue'
let Toast = {}
let installed = false
Toast.install = function (Vue, options) {
  if (installed) return
  Vue.prototype.$toast = function (option) {
    let opts = {text: '默认提示', type: 'default', position: 'middle'}
    if (typeof option === 'string') {
      opts = Object.assign(opts, {text: option})
    } else {
      opts = Object.assign(opts, option)
    }
    let ToastTpl = Vue.extend(ToastComponent)
    let $vm = new ToastTpl()
    let tpl = $vm.$mount().$el
    document.body.appendChild(tpl)
    $vm.show = true
    $vm.text = opts.text
    $vm.type = opts.type
    $vm.position = opts.position
    $vm.timer = setTimeout(() => {
      $vm.show = false
      setTimeout(() => {
        document.body.removeChild(tpl)
        $vm.$destroy()
      }, 500)
    }, 4000)
  }
  installed = true
}
export default Toast
