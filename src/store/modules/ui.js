const state = {
  transition: '',
  showBg: true
}

const mutations = {
  SET_TRANSITION (state, transitionName) { state.transition = transitionName || 'none' },
  SET_SHOW_BG (state, showBg) { state.showBg = showBg }
}

export default { state, mutations }
