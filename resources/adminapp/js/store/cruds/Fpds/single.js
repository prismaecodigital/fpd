function initialState() {
    return {
      entry: {
        id: null,
        code_voucher: '',
        transact_type: null,
        klasifikasi: null,
        bu_id: null,
        dept_id: null,
        user_id: null,
        status: null,
        req_date: '',
        processed_date: '',
        ket: '',
        lampiran: [],
        created_at: '',
        updated_at: '',
        deleted_at: ''
      },
      lists: {
        transact_type: [],
        klasifikasi: [],
        bu: [],
        dept: [],
        user: [],
        status: []
      },
      loading: false
    }
  }
  
  const route = 'fpds'
  
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
    setCodeVoucher({ commit }, value) {
      commit('setCodeVoucher', value)
    },
    setTransactType({ commit }, value) {
      commit('setTransactType', value)
    },
    setKlasifikasi({ commit }, value) {
      commit('setKlasifikasi', value)
    },
    setBu({ commit }, value) {
      commit('setBu', value)
    },
    setDept({ commit }, value) {
      commit('setDept', value)
    },
    setUser({ commit }, value) {
      commit('setUser', value)
    },
    setStatus({ commit }, value) {
      commit('setStatus', value)
    },
    setReqDate({ commit }, value) {
      commit('setReqDate', value)
    },
    setProcessedDate({ commit }, value) {
      commit('setProcessedDate', value)
    },
    setKet({ commit }, value) {
      commit('setKet', value)
    },
    insertLampiranFile({ commit }, file) {
      commit('insertLampiranFile', file)
    },
    removeLampiranFile({ commit }, file) {
      commit('removeLampiranFile', file)
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
    setCodeVoucher(state, value) {
      state.entry.code_voucher = value
    },
    setTransactType(state, value) {
      state.entry.transact_type = value
    },
    setKlasifikasi(state, value) {
      state.entry.klasifikasi = value
    },
    setBu(state, value) {
      state.entry.bu_id = value
    },
    setDept(state, value) {
      state.entry.dept_id = value
    },
    setUser(state, value) {
      state.entry.user_id = value
    },
    setStatus(state, value) {
      state.entry.status = value
    },
    setReqDate(state, value) {
      state.entry.req_date = value
    },
    setProcessedDate(state, value) {
      state.entry.processed_date = value
    },
    setKet(state, value) {
      state.entry.ket = value
    },
    insertLampiranFile(state, file) {
      state.entry.lampiran.push(file)
    },
    removeLampiranFile(state, file) {
      state.entry.lampiran = state.entry.lampiran.filter(item => {
        return item.id !== file.id
      })
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