import Vue from 'vue'

Vue.filter('test', value => {
  return value
})

Vue.filter('filesize', value => {
  let val = parseInt(value)
  if (!val) return '0 B'
  if (val < 1024) return val + ' B'
  if (val >= 1024 && val < 1048576) return (val / 1024).toFixed(1) + ' KB'
  if (val >= 1048576 && val < 1073741824) return (val / 1048576).toFixed(1) + ' MB'
  return (val / 1073741824).toFixed(1) + ' GB'
})

Vue.filter('time', value => {
  let val = parseInt(value / 1000)
  let h = parseInt(val / 3600) + ''
  val %= 3600
  let m = parseInt(val / 60) + ''
  let s = parseInt(val % 60) + ''
  if (h.length < 2) h = '0' + h
  if (m.length < 2) m = '0' + m
  if (s.length < 2) s = '0' + s
  return `${h} : ${m} : ${s}`
})
