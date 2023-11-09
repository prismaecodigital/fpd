const set = key => (state, val) => {
    state[key] = val
  }
  
  function initialState() {
    return {
      data: [],
      lists: {
        accounts: [],
      },
      total: 0,
      query: {},
      session: '',
      host: '',
      params: {
        fpds: [],
        credit_account : ''
      },
      file: null,
      importedData: [],
      loading: false
    }
  }
  
  const route = 'fpd-dones'
  
  const getters = {
    data: state => state.data,
    params: state => state.params,
    lists: state => state.lists,
    file: state => state.file,
    importedData: state => state.importedData,
    total: state => state.total,
    loading: state => state.loading
  }
  
  const actions = {
    fetchIndexData({ commit, state }) {
      commit('setLoading', true)
      axios
        .get(route, { params: state.query })
        .then(response => {
          commit('setData', response.data.data.data)
          commit('setTotal', response.data.data.total)
          commit('setParameters', response.data.meta)
          commit('setLists', response.data.lists)
        })
        .catch(error => {
          message = error.response.data.message || error.message
          // TODO error handling
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    destroyData({ commit, state, dispatch }, id) {
      axios
        .delete(`${route}/${id}`)
        .then(response => {
          dispatch('fetchIndexData')
        })
        .catch(error => {
          message = error.response.data.message || error.message
          // TODO error handling
        })
    },
    setQuery({ commit }, value) {
      commit('setQuery', _.cloneDeep(value))
    },
    setFpds({commit}, value) {
      commit('setFpds', value)
    },
    setCredit({commit}, value) {
      commit('setCredit', value)
    },
    setFile({commit}, value) {
      commit('setFile', value)
    },
    importFile({commit, state, dispatch}) {
      
      const formData = new FormData();
      formData.append('file', state.file)
      formData.append('bu_id', state.data[0].bu_id)
      axios.post('import-journal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        // Handle the response
        commit('setImportedData', response.data.data)
        console.log('File uploaded successfully', response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error uploading file', error);
      });
    },
    resetState({ commit }) {
      commit('resetState')
    },
    saveJournal({commit, state, dispatch}) {
      commit('setLoading', true)
      dispatch('Alert/resetState', null, { root: true })
  
      return new Promise((resolve, reject) => {
        axios
          .get('save-journal', { params: state.params })
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
    }
  }
  
  const mutations = {
    setData: set('data'),
    setLists(state, lists) {
      state.lists = lists
    },
    setParameters(state, meta) {
      state.session = meta.session
      state.host = meta.host
    },
    setFile(state, value) {
      state.file = value
      console.log(state.file)
    },
    setImportedData(state, value) {
      state.importedData = value
      console.log(state.importedData)
    },
    setTotal: set('total'),
    setQuery(state, query) {
      query.page = (query.offset + query.limit) / query.limit
      state.query = query
    },
    setLoading: set('loading'),
    resetState(state) {
      Object.assign(state, initialState())
    },
    setFpds(state, value) {
      state.params.fpds = value
    },
    setCredit(state, value) {
      state.params.credit_account = value
    }
  }
  
  export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
  }