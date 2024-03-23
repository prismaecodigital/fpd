const set = key => (state, val) => {
    state[key] = val
  }
  
  function initialState() {
    return {
      data: [],
      total: 0,
      query: {},
      loading: false
    }
  }
  
  const route = 'additional-limits'
  
  const getters = {
    data: state => state.data,
    total: state => state.total,
    loading: state => state.loading
  }
  
  const actions = {
    fetchIndexData({ commit, state }) {
      commit('setLoading', true)
      axios
        .get(route, { params: state.query })
        .then(response => {
          commit('setData', response.data.data)
          commit('setTotal', response.data.total)
        })
        .catch(error => {
          if (error.response && error.response.status === 403) {
            alert('ANDA TIDAK PUNYA AKSES'); // or use a more sophisticated alert system
          }
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    massUpdate({ commit, dispatch}, ids) {
      axios
        .post('additional/massUpdate', {ids: ids})
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
    toggleSelect({commit}, row) {
      commit('toggleSelect', row)
    },
    setQuery({ commit }, value) {
      commit('setQuery', _.cloneDeep(value))
    },
    resetState({ commit }) {
      commit('resetState')
    }
  }
  
  const mutations = {
    setData: (state, data) => {
      state.data = data.map(item => ({
        ...item,
        selected: false
      }));
    },
    toggleSelect(state, row) {
      state.data[row].selected = !state.data[row].selected;
    },
    setTotal: set('total'),
    setQuery(state, query) {
      query.page = (query.offset + query.limit) / query.limit
      state.query = query
    },
    setLoading: set('loading'),
    resetState(state) {
      Object.assign(state, initialState())
    }
  }
  
  export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
  }