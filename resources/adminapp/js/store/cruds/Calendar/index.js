const set = key => (state, val) => {
  state[key] = val
}

function initialState() {
  return {
    data: [],
    lists: {
      view: [
        {id: 'created_at', name :'Tanggal Dibuat'},
        {id: 'req_date', name :'Tanggal Dibutuhkan'},
        {id: 'processed_date', name :'Tanggal Proses Finance'},
      ],
      bu: [],
    },
    events: [],
    total: 0,
    query: {},
    loading: false
  }
}

const route = 'fpds'

const getters = {
  data: state => state.data,
  lists: state => state.lists,
  events: state => state.events,
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
        message = error.response.data.message || error.message
        // TODO error handling
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  fetchCalendarData({ commit, state }, {x, bu_id}) {
    commit('setLoading', true)
    axios
      .get(`calendar`, { params: { ...state.query, bu: bu_id } })
      .then(response => {
        let data = response.data.data.map(item => {
          // date
          if(item[x] !== null) {
            const dateComponents = item[x].split('-');
            const formattedDate = `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`;
            var theDate = new Date(formattedDate)
          }
          else {
            var theDate = '-'
          }
          // total amount
          const total_amount = item.items.reduce((accumulator, value) => {
            return accumulator + parseFloat(value.amount);
          }, 0)
          if (isNaN(total_amount)) {
            return 'NaN';
          }        
          const fixedNumber = total_amount.toFixed(0);
          const parts = fixedNumber.split('.');
          const integerPart = parts[0];
          const decimalPart = parts.length > 1 ? ',' + parts[1] : '';        
          const total_amount_fixed = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + decimalPart;

          // return data
          return {
            id: item.id,
            code: item.code,
            code_voucher: item.code_voucher,
            bu: item.bu.name,
            status: item.status,
            status_label: item.status_label,
            user: item.user.name,
            total: total_amount_fixed,
            date: theDate,
            dateStr: item[x],
            created_at : item.created_at,
            req_date: item.req_date,
            processed_date: item.processed_date ?? '-',
          }
        });
        commit('setCalendarData', data)
        commit('setListBu', response.data.meta.bu)
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
  setCalendarData(state, data) {
    state.events = data
    console.log((state.events))
  },
  setTotal: set('total'),
  setQuery(state, query) {
    query.page = (query.offset + query.limit) / query.limit
    state.query = query
  },
  setListBu(state, listBu) {
    state.lists.bu = listBu;
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