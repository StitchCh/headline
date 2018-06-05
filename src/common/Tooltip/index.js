let Tooltip = {}

Tooltip.install = function (Vue, options) {
  Vue.directive('tooltip', {
    bind: function (el, binding) {
      if (!binding.value) return
      el.className += ' tooltip-el'
    },
    inserted: function (el, binding) {
      if (!binding.value) return
      let pos = binding.arg || 'top'
      let tip = document.createElement('span')
      tip.className = 'tooltip tooltip-' + pos
      el.setAttribute('data-tooltip', binding.value)
      el.addEventListener('mouseenter', e => {
        tip.innerText = el.getAttribute('data-tooltip')
        tip.style.opacity = '0'
        el.appendChild(tip)
        if (tip.clientWidth > 200) tip.className += ' tooltip-break'
        else tip.className = tip.className.replace(' tooltip-break', '')
        let w = tip.clientWidth
        let h = tip.clientHeight
        if (pos === 'top' || pos === 'bottom') {
          tip.style[pos] = (-h - 6) + 'px'
          tip.style.marginLeft = -w / 2 + 'px'
          tip.style.left = '50%'
        } else {
          tip.style[pos] = (-w - 6) + 'px'
          tip.style.marginTop = -h / 2 + 'px'
          tip.style.top = '50%'
        }
        setTimeout(() => {
          tip.style.opacity = '1'
        }, 10)
      })
      el.addEventListener('mouseleave', e => {
        el.removeChild(tip)
      })
    },
    update: function (el, binding) {
      el.setAttribute('data-tooltip', binding.value)
      let tip = el.querySelector('span.tooltip')
      if (tip) tip.innerText = el.getAttribute('data-tooltip')
    }
  })
}

export default Tooltip
