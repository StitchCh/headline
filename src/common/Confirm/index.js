import ConfirmComponent from './Confirm.vue'

let Confirm = {}
let installed = false
let instance = null
Confirm.install = function (Vue, options) {
  if (installed) return
  Vue.prototype.$confirm = (opt) => {
    if (typeof opt !== 'object') {
      opt = { text: opt + '' }
    }
    let ConfirmTpl = Vue.extend(ConfirmComponent)
    let cfg = {
      data () {
        return {
          title: opt.title || '提示',
          text: opt.text || 'hello, Confirm!',
          width: opt.width || 'auto',
          color: opt.color || '#008eff',
          btns: opt.btns || ['取消', '确认'],
          className: ''
        }
      },
      methods: {
        no () {
          if (opt.no) opt.no()
          this.hide()
        },
        yes () {
          if (opt.yes) opt.yes()
          this.hide()
        },
        hide () {
          this.className = 'layer-out'
          setTimeout(() => {
            document.body.removeChild(tpl)
            this.$destroy()
            instance = null
          }, 300)
        }
      }
    }
    instance = new ConfirmTpl(cfg)
    let tpl = instance.$mount().$el
    document.body.appendChild(tpl)
  }
  installed = true
}

export default Confirm
