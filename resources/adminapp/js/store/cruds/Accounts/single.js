function initialState() {
    return {
      entry: {
        id: null,
        code: '',
        name: '',
        bu_id: null,
        depts: [],
        parent_id: null,
        projection_lock: '',
        created_at: '',
        updated_at: '',
        deleted_at: ''
      },
      lists: {
        bu: [],
        depts: []
      },
      loading: false,
    }
  }
  
  const route = 'accounts'
  
  const getters = {
    entry: state => state.entry,
    lists: state => state.lists,
    loading: state => state.loading,
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
    setCode({ commit }, value) {
      commit('setCode', value)
    },
    setName({ commit }, value) {
      commit('setName', value)
    },
    setBu({ commit }, value) {
      commit('setBu', value)
    },
    setDept({ commit }, value) {
      commit('setDept', value)
    },
    setParent({ commit }, value) {
      commit('setParent', value)
    },
    setProjectionLock({ commit }) {
      commit('setProjectionLock')
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
    fetchCreateData({ state, commit }, idFromUrl) {
      const params = { ...state.query, id: idFromUrl};
      axios.get(`${route}/create`, { params }).then(response => {
        commit('setLists', response.data.meta)
        commit('setBu', parseInt(response.data.meta.bu_id))
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
    setCode(state, value) {
      state.entry.code = value
    },
    setName(state, value) {
      state.entry.name = value
    },
    setBu(state, value) {
      state.entry.bu_id = value
    },
    setDept(state, value) {
      if(value == 'all') {
        state.entry.depts = state.lists.depts
        console.log(state.entry.depts)
      }
      else {
        state.entry.depts = value
        console.log(state.entry.depts)
      }
    },
    setParent(state, value) {
      state.entry.parent_id = value
      console.log(state.entry.parent_id)
    },
    setProjectionLock(state, value) {
      state.entry.projection_lock = !state.entry.projection_lock
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