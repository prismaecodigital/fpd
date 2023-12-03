function initialState() {
    return {
      entry: {
        bu_id : null,
        items : [{
          id: null,
          date: '',
          date_label: '',
          cash_in_type: '',
          projection_amount: '',
          bu_id: null,
        }]
      },
      lists: {
        bu: [],
        type: []
      },
      query : {},
      loading: false
    }
  }
  
  const route = 'cash-in-projections'
  
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
    setDate({ commit }, {index, value}) {
      commit('setDate', {index, value})
    },
    setProjectionAmount({ commit }, {index, value}) {
      commit('setProjectionAmount', {index, value})
    },
    setBu({ commit }, value) {
      commit('setBu', value)
    },
    setCashInType({ commit }, {index, value}) {
      commit('setCashInType', {index, value})
    },
    setDeletedAt({ commit }, {index, value}) {
      commit('setDeletedAt', {index, value})
    },
    fetchCreateData({ commit, state }) {
      axios.get(`${route}/create`, { params: state.query }).then(response => {
        commit('setLists', response.data.meta)
        commit('setBu', response.data.meta.bu[0].id)
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
    addItem({commit}) {
      commit('addItem')
    },
    deleteItem({commit}, index) {
      commit('deleteItem', index)
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
    setBu(state, value) {
      state.entry.bu_id = value
    },
    setDate(state, {index, value}) {
      let newValue = JSON.parse(JSON.stringify(value)); // Deep clone
      state.entry.items[index].date = moment(newValue).format('DD-MM-YYYY');
      state.entry.items[index].date_label = newValue;
    },
    setProjectionAmount(state, {index, value}) {
      state.entry.items[index].projection_amount = value
    },
    setCashInType(state, {index, value}) {
      state.entry.items[index].cash_in_type = value
    },
    setDeletedAt(state, {index, value}) {
      state.entry.items[index].deleted_at = value
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    resetState(state) {
      state = Object.assign(state, initialState())
    },
    addItem(state) {
      state.entry.items.push({
        id: null,
        date: '',
        date_label: '',
        cash_in_type: '',
        projection_amount: '',
        bu_id: null,
      });
    },
    deleteItem(state, index) {
      state.entry.items.splice(index, 1);
    },
  }
  
  export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
  }