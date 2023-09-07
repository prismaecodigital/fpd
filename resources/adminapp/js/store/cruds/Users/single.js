function initialState() {
  return {
    entry: {
      id: null,
      name: '',
      username: '',
      email: null,
      email_verified_at: '',
      password: null,
      roles: [],
      remember_token: '',
      bus: [],
      depts: [],
      created_at: '',
      updated_at: '',
      deleted_at: ''
    },
    lists: {
      roles: [],
      depts: [],
      bus: []
    },
    loading: false
  }
}

const route = 'users'

const getters = {
  entry: state => state.entry,
  lists: state => state.lists,
  loading: state => state.loading
}

const actions = {
  storeData({ commit, state, dispatch }) {
    commit('setLoading', true)
    dispatch('Alert/resetState', null, { root: true })

    return new Promise((resolve, reject) => {
      let params = objectToFormData(state.entry, {
        indices: true,
        booleansAsIntegers: true
      })
      axios
        .post(route, params)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          let message = error.response.data.message || error.message
          let errors = error.response.data.errors

          dispatch(
            'Alert/setAlert',
            { message: message, errors: errors, color: 'danger' },
            { root: true }
          )

          reject(error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    })
  },
  updateData({ commit, state, dispatch }) {
    commit('setLoading', true)
    dispatch('Alert/resetState', null, { root: true })

    return new Promise((resolve, reject) => {
      let params = objectToFormData(state.entry, {
        indices: true,
        booleansAsIntegers: true
      })
      params.set('_method', 'PUT')
      axios
        .post(`${route}/${state.entry.id}`, params)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          let message = error.response.data.message || error.message
          let errors = error.response.data.errors

          dispatch(
            'Alert/setAlert',
            { message: message, errors: errors, color: 'danger' },
            { root: true }
          )

          reject(error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    })
  },
  setName({ commit }, value) {
    commit('setName', value)
  },
  setUsername({ commit }, value) {
    commit('setUsername', value)
  },
  setEmail({ commit }, value) {
    commit('setEmail', value)
  },
  setEmailVerifiedAt({ commit }, value) {
    commit('setEmailVerifiedAt', value)
  },
  setPassword({ commit }, value) {
    commit('setPassword', value)
  },
  setRoles({ commit }, value) {
    commit('setRoles', value)
  },
  setBus({ commit, state}, value) {
    commit('setBus', value)
    if(value === 'all') {
      console.log('all')
      var bus = state.lists.bus.map(item => item.id)
    } else {
      var bus = value.map(item => item.id)
    }
    console.log(bus)
    if (bus[0] !== undefined && bus[0] !== null && bus[0] !== '') {
      axios.get('/budept', {
        params: {
            bu: bus
        }
      })
      .then(response => {
        console.log(response.data)
        commit('setListDepts', response.data)
      })
    }
  },
  setListDepts({commit}, lists) {
    commit('setListDepts', lists)
  },
  setDepts({ commit }, value) {
    commit('setDepts', value)
  },
  setRememberToken({ commit }, value) {
    commit('setRememberToken', value)
  },
  setCreatedAt({ commit }, value) {
    commit('setCreatedAt', value)
  },
  setUpdatedAt({ commit }, value) {
    commit('setUpdatedAt', value)
  },
  setDeletedAt({ commit }, value) {
    commit('setDeletedAt', value)
  },
  fetchCreateData({ commit }) {
    axios.get(`${route}/create`).then(response => {
      commit('setLists', response.data.meta)
    })
  },
  fetchEditData({ commit, dispatch }, id) {
    axios.get(`${route}/${id}/edit`).then(response => {
      commit('setEntry', response.data.data)
      commit('setLists', response.data.meta)
    })
  },
  fetchShowData({ commit, dispatch }, id) {
    axios.get(`${route}/${id}`).then(response => {
      commit('setEntry', response.data.data)
    })
  },
  resetState({ commit }) {
    commit('resetState')
  }
}

const mutations = {
  setEntry(state, entry) {
    state.entry = entry
  },
  setName(state, value) {
    state.entry.name = value
  },
  setUsername(state, value) {
    state.entry.username = value
  },
  setEmail(state, value) {
    state.entry.email = value
  },
  setEmailVerifiedAt(state, value) {
    state.entry.email_verified_at = value
  },
  setPassword(state, value) {
    state.entry.password = value
  },
  setRoles(state, value) {
    state.entry.roles = value
  },
  setBus(state, value) {
    if(value == 'all') {
      state.entry.bus = state.lists.bus
      console.log(state.entry.bus)
    }
    else {
      state.entry.bus = value
      console.log(state.entry.bus)
    }
  },
  setDepts(state, value) {
    if(value == 'all') {
      state.entry.depts = state.lists.depts
      console.log(state.entry.depts)
    }
    else {
      state.entry.depts = value
      console.log(state.entry.depts)
    }
  },
  setRememberToken(state, value) {
    state.entry.remember_token = value
  },
  setDept(state, value) {
    state.entry.dept = value
  },
  setCreatedAt(state, value) {
    state.entry.created_at = value
  },
  setUpdatedAt(state, value) {
    state.entry.updated_at = value
  },
  setDeletedAt(state, value) {
    state.entry.deleted_at = value
  },
  setLists(state, lists) {
    state.lists = lists
  },
  setListDepts(state, lists) {
    state.lists.depts = lists
    console.log(state.lists.depts)
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  resetState(state) {
    state = Object.assign(state, initialState())
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}