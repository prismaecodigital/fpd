function initialState() {
    return {
      entry: {
        id: null,
        date : '',
        date_label : '',
        number: '',
        transaction_type: '',
        cash_in_type: '',
        amount: '',
        amount_label: '',
        total_real_amount: '',
        ket: '',
        mc_percentage: '',
        lc_percentage: '',
        mc_amount: '',
        lc_amount: '',
        status: 0,
        status_label: '',
        bu_id: null,
        partner_id: null,
        cash_in_items : [{
          id: null,
          date: '',
          ket: '',
          real_amount: '',
          real_amount_label: '',
          cash_in_id: null,
        }]
      },
      lists: {
        bu: [],
        transaction_type: [],
        cash_in_type: [],
        partner: [],
        partner_type: [],
      },
      query : {},
      loading: false
    }
  }
  
  const route = 'cash-ins'
  
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
    setNumber({ commit }, value) {
      commit('setNumber', value)
    },
    setTransactionType({ commit }, value) {
      commit('setTransactionType', value)
    },
    setCashInType({ commit }, value) {
      commit('setCashInType', value)
    },
    setAmount({commit}, value) {
      commit('setAmount', value)
    },
    setKet({commit}, value) {
      commit('setKet', value)
    },
    setMcPercentage({commit}, value) {
      commit('setMcPercentage', value)
    },
    setLcPercentage({commit}, value) {
      commit('setLcPercentage', value)
    },
    setStatus({commit}, value) {
      commit('setStatus', value)
    },
    setBu({commit}, value) {
      commit('setBu', value)
    },
    setPartner({commit}, value) {
      commit('setPartner', value)
    },
    setItemDate({commit}, {index,value}) {
      commit('setItemDate', {index,value})
    },
    setItemRealAmount({commit}, {index,value}) {
      commit('setItemRealAmount', {index,value})
    },
    setItemKet({commit}, {index,value}) {
      commit('setItemKet', {index,value})
    },
    setItemCashInId({commit}, {index, value}) {
      commit('setItemCashInId', {index, value})
    },
    setDeletedAt({ commit }, value) {
      commit('setDeletedAt', value)
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
    setDate(state, value) {
      // let newValue = JSON.parse(JSON.stringify(value)); // Deep clone
      // state.entry.date = moment(newValue).format('DD-MM-YYYY');
      // state.entry.date_label = newValue;

      state.entry.date = value
    },
    setNumber(state, value) {
      state.entry.number = value
    },
    setTransactionType(state, value) {
      state.entry.transaction_type = value
    },
    setCashInType(state, value) {
      state.entry.cash_in_type = value
      let filteredPartners =  Object.entries(state.lists.partner).filter(([key, val]) => {
        // Place your filter condition here
        return val.type === value ;
      })
    
      state.lists.partner_type = filteredPartners.length > 0 ? filteredPartners[0] : [];
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
    setMcPercentage(state, value) {
      state.entry.mc_percentage = value
    },
    setLcPercentage(state, value) {
      state.entry.lc_percentage = value
    },
    setBu(state, value) {
      state.entry.bu_id = value
    },
    setPartner(state, value) {
      state.entry.partner_id = value
    },
    setStatus(state, value) {
      state.entry.status = value
    },
    setItemDate(state, {index, value}) {
      state.entry.cash_in_items[index].date = value
      console.log(state.entry.cash_in_items[index].date)
    },
    setItemRealAmount(state, {index, value}) {
      const parsedValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
      state.entry.cash_in_items[index].real_amount = parsedValue
      state.entry.cash_in_items[index].real_amount_label = parsedValue.toLocaleString('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
      const total_real_amount = state.entry.cash_in_items.reduce((total, item) => {
        return total + Number(item.amount);
      }, 0);
      state.entry.total_real_amount = total_real_amount.toLocaleString('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    },
    setItemKet(state, {index, value}) {
      state.entry.cash_in_items[index].ket = value
    },
    setItemCashInId(state, {index, value}) {
      state.entry.cash_in_items[index].cash_in_id = value
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
    },
    addItem(state) {
      state.entry.cash_in_items.push({
        id: null,
        date: '',
        ket: '',
        real_amount: '',
        real_amount_label: '',
        cash_in_id: state.entry.id,
      });
    },
    deleteItem(state, index) {
      state.entry.cash_in_items.splice(index, 1);
    },
  }
  
  export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
  }