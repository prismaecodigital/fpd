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
      bu_roles:
      [{
          bu_id : null,
          role_id : null,
          depts: [],
          list_depts: []
      }],
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
  setRoles({ commit }, {index,value}) {
    commit('setRoles', {index,value})
  },
  addItem({ commit }) {
    commit('addItem')
  },
  deleteItem({ commit }) {
    commit('deleteItem')
  },
  setBus({ commit }, {index, value}) {
    commit('setBus', {index, value})
  },
  fetchBuDept({commit, dispatch}, {index, value}) {
    axios.get('/budept-all', {
      params: {
          bu: value
      }
    })
    .then(response => {
      let lists = response.data
        commit('setListDepts', {index, lists})
    })
  },
  setListDepts({commit}, {index, lists}) {
    commit('setListDepts', {index, lists})
  },
  setDepts({ commit }, {index, value}) {
    commit('setDepts', {index, value})
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
  setRoles(state, {index,value}) {
    state.entry.bu_roles[index].role_id = value
  },
  addItem(state) {
    state.entry.bu_roles.push({
      bu_id : null,
      role_id : null,
      depts: [],
      list_depts: [],
    });
  },
  deleteItem(state, index) {
    state.entry.bu_roles.splice(index, 1);
  },
  setBus(state, {index, value}) {
      state.entry.bu_roles[index].bu_id = value
      console.log(state.entry.bu_roles[index].bu_id)
  },
  setDepts(state, {index, value}) {
    if(value == 'all') {
      state.entry.bu_roles[index].depts = state.entry.bu_roles[index].list_depts
    }
    else {
      state.entry.bu_roles[index].depts = value
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
  setListDepts(state, {index, lists}) {
    state.entry.bu_roles[index].list_depts = lists
    console.log(state.entry.bu_roles[index].list_depts)
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