function getDefaultState() {
  return {
    bu: [],
    survey: [],
    selected_bu: null
  }
}

const getters = {
  bu: state => state.bu,
  selected_bu: state => state.selected_bu,
  survey: state => state.survey
}

const actions = {
  fetchAuthBu({ commit, state }) {
    axios.get('auth-bu', state.selected_bu).then(response => {
      commit('setListBu', response.data.data)
      commit('setBu', response.data.selected_bu)
      commit('setUserSurvey', response.data.survey)
    })
  },
  setBu({ commit}, value) {
      commit('setBu', value)
  }
}

const mutations = {
  setListBu(state, bu) {
    state.bu = bu
  },
  setBu(state, value) {
    state.selected_bu = value
  },
  setUserSurvey(state, value) {
    state.survey = value
  }
}

export default {
  namespaced: true,
  state: getDefaultState,
  getters,
  actions,
  mutations
}