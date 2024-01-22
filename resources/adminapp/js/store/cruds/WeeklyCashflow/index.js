const set = key => (state, val) => {
  state[key] = val
}

function getDefaultState() {
    return {
        data: {
            cashIn : {},
            cashOut : {}
        },
        total: 0,
        query: {},
        loading: false
    }
  }
  
  const getters = {
    data: state => state.data,
    total: state => state.total,
    loading: state => state.loading,
    query: state => state.query
  }
  
  const actions = {
    fetchCalendarData({ commit, state }) {
      commit('setLoading', true)
      axios.get('weekly-cashflow', {params: state.query}).then(response => {
        if(state.query.bu_id !== null && state.query.startDate !== null && state.query.endDate !== null) {
          commit('setCashInData', response.data.cash_in)
          commit('setCashOutData', response.data.cash_out)
        }
        console.log(Object.keys(response.data.cash_in).length)
      }).catch(error => {
        if (error.response && error.response.status === 403) {
          alert('ANDA TIDAK PUNYA AKSES');
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
    setCashInData(state, cash_in) {
      state.data.cashIn = {};
      state.data.cashIn = cash_in;
    },
    setCashOutData(state, cash_out) {
      state.data.cashOut = {}
      state.data.cashOut = cash_out
      console.log(Object.keys(state.data.cashOut).length)
    },
    setQuery(state, query) {
      state.query = query
    },
    setLoading: set('loading'),
    resetState(state) {
        Object.assign(state, getDefaultState())
    }
  }
  
  export default {
    namespaced: true,
    state: getDefaultState,
    getters,
    actions,
    mutations
  }