const set = key => (state, val) => {
    state[key] = val
  }
  
  function initialState() {
    return {
      data: [],
      total: 0,
      queryDetailFpd: {},
      loading: false
    }
  }
    
  const getters = {
    data: state => state.data,
    total: state => state.total,
    loading: state => state.loading
  }
  
  const actions = {
    fetchDetailFpd({ commit, state }) {
      commit('setLoading', true)
      axios
        .get('detailFpd', { params: state.queryDetailFpd })
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
    setQuery({ commit }, value) {
      commit('setQuery', _.cloneDeep(value))
    },
    resetState({ commit }) {
      commit('resetState')
    }
  }
  
  const mutations = {
    setData: set('data'),
    setTotal: set('total'),
    setQuery(state, query) {
      query.page = (query.offset + query.limit) / query.limit
      state.queryDetailFpd = query
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