const set = key => (state, val) => {
    state[key] = val
  }
  
  function initialState() {
    return {
      data: [],
      total: 0,
      query: {},
      bu: '',
      loading: false
    }
  }
  
  const route = 'lrds'
  
  const getters = {
    data: state => state.data,
    total: state => state.total,
    bu: state => state.bu,
    loading: state => state.loading
  }
  
  const actions = {
    fetchIndexData({ commit, state }) {
      commit('setLoading', true)
      axios
        .get(route, { params: state.query })
        .then(response => {
          commit('setData', response.data.data)
          commit('setBu', response.data.data[0].bu.code)
          commit('setTotal', response.data.total)
        })
        .catch(error => {
          message = error.response.data.message || error.message
          // TODO error handling
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    fetchCalendarData({ commit, state }) {
      commit('setLoading', true)
      axios
        .get(route, { params: state.query })
        .then(response => {
          commit('setCalendarData', response.data.data)
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
    resetState({ commit }) {
      commit('resetState')
    }
  }
  
  const mutations = {
    setData: set('data'),
    setBu: set('bu'),
    setCalendarData(state, data) {
      state.data = data;
      // You can also set the events based on 'data' here
      // For example:
      state.data = data.map(item => ({
        id: item.id,
        bu: item.bu.name,
        date: item.created_at,
        req_date: item.req_date,
      }));
      console.log(state.data)
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