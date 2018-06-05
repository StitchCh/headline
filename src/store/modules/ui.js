const state = { transition: '' }

const mutations = {
  SET_TRANSITION (state, transitionName) { state.transition = transitionName || 'none' }
}

export default { state, mutations }
