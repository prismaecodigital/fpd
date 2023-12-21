function initialState() {
    return {
      entry: {
        id: null,
        code: '',
        name: '',
        code_voucher: '',
        code_voucher_lrd: '',
        transact_type: null,
        klasifikasi: null,
        bu_id: null,
        bu: [],
        dept_id: null,
        user_id: null,
        status: null,
        req_date: '',
        processed_date: '',
        ket: '',
        lampiran: [],
        bukti_transfer: [],
        created_at: '',
        updated_at: '',
        status_histories: [],
        approve: null,
        authUserId: null,
        total_amount: '',
        total_amount_label: '',
        validation:[],
        total_source_amount: '',
        total_real_amount: '',
        total_real_amount_label: '',
        items: [
          {
            id: null,
            account : null,
            amount : '',
            amount_label : '',
            real_amount : '',
            real_amount_label : '',
            site_id: null,
            ket: '',
            source_amount: '',
            source_amount_label: 0,
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
  
  const route = 'fpd-processes'
  
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
    setReqDate({ commit, state }, value) {
      commit('setReqDate', value)
      state.entry.items.forEach(function(item, index) {
        if(state.entry.date !== '' && item.account !== null) {
          let params = {source_date: state.entry.req_date, source_coa_id: item.account.id}
          axios
          .get('account/getMaxAmount', { params: params })
          .then(response => {
            commit('setSourceAmount', {index, value : response.data.source_amount})
          })
          .catch(error => {
            message = error.response.data.message || error.message
          })
        }
      });
    },
    setProcessedDate({ commit }, value) {
      commit('setProcessedDate', value)
    },
    setKet({ commit }, value) {
      commit('setKet', value)
    },
    setName({ commit }, value) {
      commit('setName', value)
    },
    insertLampiranFile({ commit }, file) {
      commit('insertLampiranFile', file)
    },
    removeLampiranFile({ commit }, file) {
      commit('removeLampiranFile', file)
    },
    insertBuktiTransferFile({ commit }, file) {
      commit('insertBuktiTransferFile', file)
    },
    removeBuktiTransferFile({ commit }, file) {
      commit('removeBuktiTransferFile', file)
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
    setItemAccount({commit, state}, {index, value}) {
      commit('setItemAccount', {index, value})
      if(state.entry.date !== '' && state.entry.items[index].account !== null) {
        let params = {source_date: state.entry.req_date, source_coa_id: state.entry.items[index].account.id}
        axios
        .get('account/getMaxAmount', { params: params })
        .then(response => {
          commit('setSourceAmount', {index, value : response.data.source_amount})
        })
        .catch(error => {
          message = error.response.data.message || error.message
        })
      }
    },
    setItemAmount({commit}, {index, val}) {
      commit('setItemAmount', {index, val})
      commit('setValidation')
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
    fetchEditData({ commit, state, dispatch }, id) {
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
          'tanggal'     : moment(entry.status_histories[0].created_at).format('DD MMMM YYYY, HH:mm'),
          'user'        : entry.user.name,
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
          'status'      : 'Mengetahui Finance Manager',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '3',
          'status'      : 'Menunggu Penjadwalan Finance',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '4',
          'status'      : 'Menunggu Proses Finance',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '5',
          'status'      : 'Confirm, Menunggu Realisasi oleh User',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '6',
          'status'      : 'Realisasi, Menunggu Persetujuan Leader',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '7',
          'status'      : 'Realisasi, Menunggu Proses Finance',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '8',
          'status'      : 'Konfirmasi Selisih oleh User',
          'proses'      : '',
          'tanggal'     : '',
          'user'        : 'user'
        },
        {
          'status_val'  : '9',
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
            state.timelineData[entry.status_histories.length].tanggal = ''
            state.timelineData[entry.status_histories.length].user = ''
            state.timelineData[entry.status_histories.length].proses = 'selesai'
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

      // let totalSourceAmount = 0
      // const uniqueAccounts = new Set();
    
      // state.entry.items.forEach(item => {
      //   if (!uniqueAccounts.has(item.account.id)) {
      //     totalSourceAmount += item.source_amount;
      //     uniqueAccounts.add(item.account.id);
      //   }
      // });

      // state.entry.total_source_amount = totalSourceAmount

      const validation = [];
      const accountSums = {};
    
      state.entry.items.forEach(item => {
        const accountId = item.account.id; // Updated to access id from account object
        if (!accountSums[accountId]) {
          accountSums[accountId] = {
            amount: 0,
            source_amount: item.source_amount,
            projection_lock: item.account.projection_lock
          };
        }
        accountSums[accountId].amount += parseFloat(item.amount);
      });
    
      for (const [accountId, data] of Object.entries(accountSums)) {
        validation.push(data);
      }

      state.entry.validation = validation

      console.log(state.entry.validation)
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
    setName(state, value) {
      state.entry.name = value
    },
    insertLampiranFile(state, file) {
      state.entry.lampiran.push(file)
    },
    removeLampiranFile(state, file) {
      state.entry.lampiran = state.entry.lampiran.filter(item => {
        return item.id !== file.id
      })
    },
    insertBuktiTransferFile(state, file) {
      state.entry.bukti_transfer.push(file)
    },
    removeBuktiTransferFile(state, file) {
      state.entry.bukti_transfer = state.entry.bukti_transfer.filter(item => {
        return item.id !== file.id
      })
    },
    addItem(state) {
      state.entry.items.push({
        id: null,
        account : null,
        amount : '',
        amount_label : '',
        real_amount : '',
        real_amount_label : '',
        ket : '',
        site_id: null,
        ket: '',
        source_amount: '',
        source_amount_label: '',
      });
    },
    deleteItem(state, index) {
      state.entry.items.splice(index, 1);
    },
    setItems(state, value) {
      state.entry.items = value
    },
    setItemAccount(state, {index, value}) {
      state.entry.items[index].account = value
      console.log(state.entry.items[index].account)
    },
    setItemAmount(state, {index, val}) {
      const parsedValue = parseFloat(val.replace(/\./g, '').replace(',', '.'));
      state.entry.items[index].amount = parsedValue
      state.entry.items[index].amount_label = parsedValue.toLocaleString('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
      state.entry.total_amount = state.entry.items.reduce((total, item) => {
        return total + Number(item.amount);
      }, 0);
      state.entry.total_amount_label = state.entry.total_amount.toLocaleString('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    },
    setItemRealAmount(state, {index, val}) {
      
      if(val !== '') {
        console.log('ok')
        state.entry.total_real_amount = parseInt(state.entry.total_real_amount) - parseInt(state.entry.items[index].real_amount) + parseInt(val)
        state.entry.total_real_amount_label = state.entry.total_real_amount.toLocaleString('de-DE', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 2
                                              });
      }
      state.entry.items[index].real_amount = val
      
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
      console.log(state.entry.approve)
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
    setSourceAmount(state, {index, value}) {
      state.entry.items[index].source_amount = value
      state.entry.items[index].source_amount_label = value.toLocaleString('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    },
    setValidation(state) {
      const validation = [];
      const accountSums = {};
    
      state.entry.items.forEach(item => {
        const accountId = item.account.id;
        if (!accountSums[accountId]) {
          accountSums[accountId] = {
            amount: 0,
            source_amount: item.source_amount,
            projection_lock: item.account.projection_lock
          };
        }
        accountSums[accountId].amount +=  parseFloat(item.amount);
      });
    
      for (const [accountId, data] of Object.entries(accountSums)) {
        validation.push(data);
      }

      state.entry.validation = validation
      console.log(state.entry.validation)
    }
  }
  
  export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
  }