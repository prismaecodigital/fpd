function initialState() {
    return {
      entry: {
        id: null,
        date: '',
        date_label: '',
        coa_id: null,
        coa: null,
        amount: '',
        amount_label: '',
        ket: '',
        status: '1',
        approve: null,
        reject: null,
      },
      lists: {
        coa: [],
        filtered_coa: [],
        dept: [],
      },
      query: {},
      loading: false
    }
  }
  
  const route = 'additional-limits'
  
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
    setCoa({ commit }, value) {
      commit('setCoa', value)
    },
    setDept({ commit }, value) {
      commit('setDept', value)
      commit('setCoa', null)
      commit('setFilteredCoa', value)
    },
    setAmount({ commit }, value) {
      commit('setAmount', value)
    },
    setKet({ commit }, value) {
      commit('setKet', value)
    },
    setStatus({ commit }, value) {
      commit('setStatus', value)
    },
    setReject({ commit }, value) {
      commit('setReject', value)
    },
    fetchCreateData({ commit, state }) {
      axios.get(`${route}/create`, {params : state.query}).then(response => {
        commit('setLists', response.data.meta)
      }).catch(error => {
        if (error.response && error.response.status === 403) {
          alert('ANDA TIDAK PUNYA AKSES'); // or use a more sophisticated alert system
        }
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
    },
    setQuery({ commit }, value) {
      commit('setQuery', _.cloneDeep(value))
    }
  }
  
  const mutations = {
    setEntry(state, entry) {
      state.entry = entry
    },
    setQuery(state, query) {
      state.query = query
    },
    setDate(state, value) {
      let newValue = JSON.parse(JSON.stringify(value)); // Deep clone
      state.entry.date = moment(newValue).format('DD-MM-YYYY');
      state.entry.date_label = newValue;
    },
    setCoa(state, value) {
      state.entry.coa_id = value
    },
    setDept(state, value) {
      state.entry.dept_id = value
    },
    setFilteredCoa(state, value) {
      state.lists.filtered_coa = state.lists.coa.filter(item => 
        item.depts.some(dept => dept.id === value)
      );
    },
    setAmount(state, value) {
      const parsedValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
      state.entry.amount = parsedValue
      state.entry.amount_label = parsedValue.toLocaleString('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
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