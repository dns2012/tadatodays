export const state = () => ({
  mainResources: {},
})

export const getters = {
  getMainResources(state) {
    return state.mainResources
  },
}

export const mutations = {
  setMainResources(state, data) {
    state.mainResources = data
  },
}

export const actions = {
  setMainResources(context, data) {
    context.commit('setMainResources', data)
  },
}
