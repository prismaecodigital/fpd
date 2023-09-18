function initialState() {
    return {
      entry: {
        id: null,
        code: '',
        code_voucher: '',
        code_voucher_lrd: '',
        transact_type: null,
        klasifikasi: null,
        bu_id: null,
        dept_id: null,
        user_id: null,
        status: null,
        req_date: '',
        processed_date: '',
        ket: '',
        lampiran: [],
        created_at: '',
        updated_at: '',
        status_histories: [],
        approve: null,
        authUserId: null,
        total_amount: '',
        items: [
          {
            account_id : null,
            amount : '',
            real_amount : '',
            ket : '',
            site_id: null,
            ket: '',
            account: [],
          }
        ]
      },
      lists: {
        transact_type: [],
        klasifikasi: [],
        bu: [],
        dept: [],
        user: [],
        status: [],
        accounts: [],
        site: [],
      },
      timelineData: [],
      loading: false
    }
  }
  
  const route = 'fpd-dones'
  
  const getters = {
    entry: state => state.entry,
    lists: state => state.lists,
    loading: state => state.loading,
    timelineData: state => state.timelineData,
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
    setCodeVoucher({ commit }, value) {
      commit('setCodeVoucher', value)
    },
    setCodeVoucherLrd({ commit }, value) {
      commit('setCodeVoucherLrd', value)
    },
    setTransactType({ commit }, value) {
      commit('setTransactType', value)
    },
    setKlasifikasi({ commit }, value) {
      commit('setKlasifikasi', value)
    },
    setBu({ commit }, value) {
      commit('setBu', value)
    },
    setDept({ commit }, value) {
      commit('setDept', value)
    },
    setUser({ commit }, value) {
      commit('setUser', value)
    },
    setStatus({ commit }, value) {
      commit('setStatus', value)
    },
    setReqDate({ commit }, value) {
      commit('setReqDate', value)
    },
    setProcessedDate({ commit }, value) {
      commit('setProcessedDate', value)
    },
    setKet({ commit }, value) {
      commit('setKet', value)
    },
    insertLampiranFile({ commit }, file) {
      commit('insertLampiranFile', file)
    },
    removeLampiranFile({ commit }, file) {
      commit('removeLampiranFile', file)
    },
    addItem({commit}) {
      commit('addItem')
    },
    deleteItem({commit}, index) {
      commit('deleteItem', index)
    },
    setItems({commit}, value) {
      commit('setItems', value)
    },
    setItemAccount({commit}, {index, value}) {
      commit('setItemAccount', {index, value})
    },
    setItemAmount({commit}, {index, val}) {
      commit('setItemAmount', {index, val})
    },
    setItemRealAmount({commit}, {index, val}) {
      commit('setItemRealAmount', {index, val})
    },
    setItemSite({commit}, {index, value}) {
      commit('setItemSite', {index, value})
    },
    setItemKet({commit}, {index, val}) {
      commit('setItemKet', {index, val})
    },
    setCreatedAt({ commit }, value) {
      commit('setCreatedAt', value)
    },
    setUpdatedAt({ commit }, value) {
      commit('setUpdatedAt', value)
    },
    setDeletedAt({ commit }, value) {
      commit('setDeletedAt', value)
    },
    setApprove({ commit }, value) {
      commit('setApprove', value)
    },
    fetchCreateData({ commit }) {
      axios.get(`${route}/create`).then(response => {
        commit('setLists', response.data.meta)
      })
    },
    fetchBuDept({commit, dispatch}, value) {
      axios.get('/budept', {
        params: {
            bu: value
        }
      })
      .then(response => {
          commit('fetchBuDept', response.data)
      })
    },
    fetchBuSite({commit, dispatch}, value) {
      axios.get('/busite', {
        params: {
            bu: value
        }
      })
      .then(response => {
          commit('fetchBuSite', response.data)
      })
    },
    fetchBuAccount({commit, dispatch}, value) {
      axios.get('/buaccount', {
        params: {
            bu: value
        }
      })
      .then(response => {
          commit('fetchBuAccount', response.data)
      })
    },
    fetchDeptAccount({commit, dispatch}, value) {
      axios.get('/deptaccount', {
        params: {
            dept: value
        }
      })
      .then(response => {
          commit('fetchDeptAccount', response.data)
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
    }
  }
  
  const mutations = {
    setEntry(state, entry) {
      state.entry = entry,
      state.timelineData = [
        {
          'status_val'  : '',
          'status'      : 'Pengisian Form Pengajuan Dana (FPD)',
          'proses'      : 'selesai',
          'tanggal'     : '',
          'user'        : 'user',
        },
        {
          'status_val'  : '0',
          'status'      : 'Menunggu Persetujuan Leader',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '1',
          'status'      : 'Menunggu Persetujuan Direktur',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '2',
          'status'      : 'Menunggu Penjadwalan Finance',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '3',
          'status'      : 'Menunggu Proses Finance',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '4',
          'status'      : 'Confirm, Menunggu Realisasi oleh User',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '5',
          'status'      : 'Realisasi, Menunggu Persetujuan Leader',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '6',
          'status'      : 'Realisasi, Menunggu Proses Finance',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '7',
          'status'      : 'Konfirmasi Selisih oleh User',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '8',
          'status'      : 'Selesai',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
      ]
      if(entry.status != '99') {
        for (let y = 1; y < state.timelineData.length; y++) {
          if (entry.status_histories.hasOwnProperty(y)) {
            if (parseInt(state.timelineData[y].status_val) + 1 === parseInt(entry.status_histories[y].status)) {
              state.timelineData[y].tanggal = moment(entry.status_histories[y].created_at).format('DD MMMM YYYY, HH:mm');
              state.timelineData[y].user = entry.status_histories[y].user.name;
              state.timelineData[y].proses = 'selesai';
            }
          }
        }
        if(entry.status !== '8') {
          state.timelineData[entry.status_histories.length].tanggal = ''
          state.timelineData[entry.status_histories.length].user = ''
          state.timelineData[entry.status_histories.length].proses = 'proses'
        }
        if(entry.status === '8') {
          state.timelineData[state.timelineData.length-1].user = entry.status_histories[entry.status_histories.length-1].user.name
          state.timelineData[state.timelineData.length-1].proses = 'selesai'
        }
      }
      if(entry.status == '99') {
        entry.status_histories.forEach(function(val, index) {
          if(val.status == state.timelineData[index+1].status_val) {
            state.timelineData[index].tanggal = moment(val.created_at).format('DD MMMM YYYY, HH:mm')
            state.timelineData[index].user = val.user.name
            state.timelineData[index].proses = 'selesai'
          }
          state.timelineData[entry.status_histories.length - 1].proses = 'cancel'
        })
      }
      console.log(entry.status_histories)
      console.log(state.timelineData)

    },
    setCodeVoucher(state, value) {
      state.entry.code_voucher = value
    },
    setCodeVoucherLrd(state, value) {
      state.entry.code_voucher_lrd = value
    },
    setTransactType(state, value) {
      state.entry.transact_type = value
    },
    setKlasifikasi(state, value) {
      state.entry.klasifikasi = value
    },
    setBu(state, value) {
      state.entry.bu_id = value
    },
    setDept(state, value) {
      state.entry.dept_id = value
    },
    setUser(state, value) {
      state.entry.user_id = value
    },
    setStatus(state, value) {
      state.entry.status = value
    },
    setReqDate(state, value) {
      state.entry.req_date = value
    },
    setProcessedDate(state, value) {
      state.entry.processed_date = value
    },
    setKet(state, value) {
      state.entry.ket = value
    },
    insertLampiranFile(state, file) {
      state.entry.lampiran.push(file)
    },
    removeLampiranFile(state, file) {
      state.entry.lampiran = state.entry.lampiran.filter(item => {
        return item.id !== file.id
      })
    },
    addItem(state) {
      state.entry.items.push({
        account_id : null,
        amount : '',
        real_amount : '',
        ket : '',
        site_id: null,
        ket: '',
        account: [],
      });
    },
    deleteItem(state, index) {
      state.entry.items.splice(index, 1);
    },
    setItems(state, value) {
      state.entry.items = value
    },
    setItemAccount(state, {index, value}) {
      state.entry.items[index].account_id = value
    },
    setItemAmount(state, {index, val}) {
      state.entry.items[index].amount = val
    },
    setItemRealAmount(state, {index, val}) {
      state.entry.items[index].real_amount = val
      console.log(state.entry.items[index].real_amount)
    },
    setItemKet(state, {index, val}) {
      state.entry.items[index].ket = val
    },
    setItemSite(state, {index, value}) {
      state.entry.items[index].site_id = value
    },
    setCreatedAt(state, value) {
      state.entry.created_at = value
    },
    setUpdatedAt(state, value) {
      state.entry.updated_at = value
    },
    setDeletedAt(state, value) {
      state.entry.deleted_at = value
    },
    setApprove(state, value) {
      state.entry.approve = value
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
    fetchBuDept(state, lists) {
      state.lists.dept = lists;
    },
    fetchBuSite(state, lists) {
      state.lists.site = lists;
    },
    fetchBuAccount(state, lists) {
      state.lists.accounts = lists;
    },
    fetchDeptAccount(state, lists) {
      state.lists.accounts = lists;
    },
  }
  
  export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
  }