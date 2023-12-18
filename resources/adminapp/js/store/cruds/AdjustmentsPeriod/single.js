function initialState() {
    return {
      entry: {
        id: null,
        type: 1,
        processed_date: '',
        processed_date_label: '',
        source_date: '',
        source_date_label: '',
        destination_date: '',
        destination_date_label: '',
        amount: '',
        source_coa_id: '',
        source_amount: '',
        destination_coa_id: '',
        destination_amount: '',
        status: '1',
        user_id: null,
        approve: null,
        reject: null,
      },
      lists: {
        coa: []
      },
      query: {},
      loading: false
    }
  }
  
  const route = 'adjustments-period'
  
  const getters = {
    entry: state => state.entry,
    query: state => state.query,
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
    setDate({ commit }, value) {
      commit('setDate', value)
    },
    setProcessedDate({ commit }, value) {
      commit('setProcessedDate', value)
    },
    setSourceDate({ commit, state }, value) {
      commit('setSourceDate', value)
      if(state.entry.source_date !== '' && state.entry.source_coa_id !== '') {
        axios
        .get('account/getBalance', { params: state.entry })
        .then(response => {
          commit('setSourceAmount', response.data.source_amount)
        })
        .catch(error => {
          message = error.response.data.message || error.message
        })
      }
    },
    setDestinationDate({ commit, state }, value) {
      commit('setDestinationDate', value)
      if(state.entry.destination_date !== '' && state.entry.source_coa_id !== '') {
        axios
        .get('account/getBalance', { params: state.entry })
        .then(response => {
          commit('setDestinationAmount', response.data.destination_amount)
        })
        .catch(error => {
          message = error.response.data.message || error.message
        })
      }
    },
    setAmount({ commit }, value) {
      commit('setAmount', value)
    },
    setSourceCoa({ commit, state }, value) {
      commit('setSourceCoa', value)
      if(state.entry.source_date !== '' || state.entry.source_coa_id !== '') {
        axios
        .get('account/getBalance', { params: state.entry })
        .then(response => {
          commit('setSourceAmount', response.data.source_amount)
          commit('setDestinationAmount', response.data.destination_amount)
        })
        .catch(error => {
          message = error.response.data.message || error.message
        })
      }
    },
    // setSourceCoaAmount({ commit }, value) {
    //   commit('setSourceCoaAmount', value)
    // },
    setDestinationCoa({ commit }, value) {
      commit('setDestinationCoa', value)
    },
    // setDestinationCoaAmount({ commit }, value) {
    //   commit('setDestinationCoaAmount', value)
    // },
    setKet({ commit }, value) {
      commit('setKet', value)
    },
    setStatus({ commit }, value) {
      commit('setStatus', value)
    },
    setReject({ commit }, value) {
      commit('setReject', value)
    },
    setUser({ commit }, value) {
      commit('setUser', value)
    },
    fetchCreateData({ commit, state }) {
      axios.get(`${route}/create`, {params : state.query}).then(response => {
        commit('setLists', response.data.meta)
      })
    },
    fetchEditData({ commit, state, dispatch }, id) {
      axios.get(`${route}/${id}/edit`).then(response => {
        commit('setEntry', response.data.data)
        commit('setLists', response.data.meta)
        axios.get('account/getBalance', { params: state.entry }).then(response2 => {
          commit('setSourceAmount', response2.data.source_amount)
          commit('setDestinationAmount', response2.data.destination_amount)
        })
      })

    },
    fetchShowData({ commit, dispatch }, id) {
      axios.get(`${route}/${id}`).then(response => {
        commit('setEntry', response.data.data)
      })
    },
    resetState({ commit }) {
      commit('resetState')
    },
    setQuery({ commit }, value) {
      commit('setQuery', _.cloneDeep(value))
    }
  }
  
  const mutations = {
    setEntry(state, entry) {
      state.entry = entry
      console.log(state.entry)
    },
    setQuery(state, query) {
      state.query = query
    },
    setDate(state, value) {
      let newValue = JSON.parse(JSON.stringify(value)); // Deep clone
      state.entry.date = moment(newValue).format('DD-MM-YYYY');
      state.entry.date_label = newValue;
    },
    setProcessedDate(state, value) {
      let newValue = JSON.parse(JSON.stringify(value)); // Deep clone
      state.entry.processed_date = moment(newValue).format('DD-MM-YYYY');
      state.entry.processed_date_label = newValue;
    },
    setSourceDate(state, value) {
      let newValue = JSON.parse(JSON.stringify(value)); // Deep clone
      state.entry.source_date = moment(newValue).format('DD-MM-YYYY');
      state.entry.source_date_label = newValue;
    },
    setDestinationDate(state, value) {
      let newValue = JSON.parse(JSON.stringify(value)); // Deep clone
      state.entry.destination_date = moment(newValue).format('DD-MM-YYYY');
      state.entry.destination_date_label = newValue;
    },
    setAmount(state, value) {
      state.entry.amount = value
    },
    setSourceCoa(state, value) {
      state.entry.source_coa_id = value
    },
    setSourceAmount(state, value) {
      state.entry.source_amount = value
      console.log(state.entry.source_amount)
    },
    setDestinationCoa(state, value) {
      state.entry.destination_coa_id = value
    },
    setDestinationAmount(state, value) {
      state.entry.destination_amount = value
    },
    setKet(state, value) {
      state.entry.ket = value
    },
    setStatus(state, value) {
      state.entry.status = value
    },
    setReject(state, value) {
      state.entry.reject = value
    },
    setUser(state, value) {
      state.entry.user_id = value
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