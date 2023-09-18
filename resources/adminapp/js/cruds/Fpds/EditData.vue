<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-primary card-header-icon">
              <div class="card-icon">
                <i class="material-icons">add</i>
              </div>
              <h4 class="card-title">
                <strong><b>Detail Pengajuan Dana</b></strong>
              </h4>
            </div>
            <div class="card-body">
              <back-button></back-button>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <div class="row" v-if="entry.code !== ''">
                <div class="col">
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.code,
                      'is-focused': activeField == 'code'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.fpd.fields.code')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.code"
                      @focus="focusField('code')"
                      @blur="clearFocus"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.req_date,
                      'is-focused': activeField == 'req_date'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.fpd.fields.req_date') 
                    }} *</label>
                    <datetime-picker
                      class="form-control disabled"
                      type="text"
                      picker="date"
                      :value="entry.req_date"
                      @input="updateReqDate"
                      @focus="focusField('req_date')"
                      @blur="clearFocus"
                      required
                      disabled
                    >
                    </datetime-picker>
                  </div>
                  <div v-if="$can('finance')"
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.processed_date,
                      'is-focused': activeField == 'processed_date'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.fpd.fields.processed_date') 
                    }}</label>
                    <datetime-picker
                      class="form-control"
                      type="text"
                      picker="date"
                      :value="entry.processed_date"
                      @input="updateProcessedDate"
                      @focus="focusField('processed_date')"
                      @blur="clearFocus"
                    >
                    </datetime-picker>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.bu_id !== null,
                      'is-focused': activeField == 'bu'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.fpd.fields.bu')
                    }} *</label>
                    <v-select
                      name="bu"
                      label="name"
                      :key="'bu-field'"
                      :value="entry.bu_id"
                      :options="lists.bu"
                      :reduce="entry => entry.id"
                      @input="updateBu"
                      @search.focus="focusField('bu')"
                      @search.blur="clearFocus"
                      disabled
                    >
                      <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!entry.bu_id"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.dept_id !== null,
                      'is-focused': activeField == 'dept'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.fpd.fields.dept')
                    }} *</label>
                    <v-select
                      name="dept"
                      label="name"
                      :key="'dept-field'"
                      :value="entry.dept_id"
                      :options="lists.dept"
                      :reduce="entry => entry.id"
                      @input="updateDept"
                      
                      disabled
                    >
                    <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!entry.dept_id"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.ket,
                      'is-focused': activeField == 'ket'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.fpd.fields.ket')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.ket"
                      @input="updateKet"
                      @focus="focusField('ket')"
                      @blur="clearFocus"
                    />
                  </div>
                  <div class="form-group">
                    <label>{{ $t('cruds.fpd.fields.lampiran') }}</label>
                    <attachment
                      :route="getRoute('fpds')"
                      :collection-name="'fpd_lampiran'"
                      :media="entry.lampiran"
                      :max-file-size="10"
                      @file-uploaded="insertLampiranFile"
                      @file-removed="removeLampiranFile"
                      :max-files="10"
                    />
                  </div>
                  
                </div>
                <div class="col-md-6">
                  <div v-if="$can('finance')"
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.code_voucher,
                      'is-focused': activeField == 'code_voucher'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.fpd.fields.code_voucher')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.code_voucher"
                      @input="updateCodeVoucher"
                      @focus="focusField('code_voucher')"
                      @blur="clearFocus"
                    />
                  </div>
                  <div v-if="$can('finance') && entry.status > 4"
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.code_voucher_lrd,
                      'is-focused': activeField == 'code_voucher_lrd'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.fpd.fields.code_voucher_lrd')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.code_voucher_lrd"
                      @input="updateCodeVoucherLrd"
                      @focus="focusField('code_voucher_lrd')"
                      @blur="clearFocus"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.transact_type,
                      'is-focused': activeField == 'transact_type'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.fpd.fields.transact_type')
                    }} * </label>
                    <v-select
                      name="transact_type"
                      :key="'transact_type-field'"
                      :value="entry.transact_type"
                      :options="lists.transact_type"
                      :reduce="entry => entry.value"
                      @input="updateTransactType"
                    >
                    <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!entry.transact_type"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.klasifikasi,
                      'is-focused': activeField == 'klasifikasi'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.fpd.fields.klasifikasi')
                    }}</label>
                    <v-select
                      name="klasifikasi"
                      :key="'klasifikasi-field'"
                      :value="entry.klasifikasi"
                      :options="lists.klasifikasi"
                      :reduce="entry => entry.value"
                      @input="updateKlasifikasi"
                      
                      disabled
                    />
                  </div>

                  <div v-if="entry.status >= 5" class="form-group">
                    <label>{{ $t('cruds.fpd.fields.bukti_transfer') }}</label>
                    <attachment
                      :route="getRoute('fpds')"
                      :collection-name="'fpd_bukti_transfer'"
                      :media="entry.bukti_transfer"
                      :max-file-size="10"
                      @file-uploaded="insertBuktiTransferFile"
                      @file-removed="removeBuktiTransferFile"
                      :max-files="10"
                    />
                  </div>

                </div>
                
              </div>
              
            </div>
            <div class="card-header card-header-primary card-header-icon">
              <h4 class="card-title">
                <strong><b>Detail Dana</b></strong>
              </h4>
            </div>
            <br>
            <div class="card-body">
              <bootstrap-alert />
              <table class="table table-bordered" name="inputItem">
                <thead>
                  <th></th>
                  <th>Nama Account / COA</th>
                  <th>Amount (Nominal) </th>
                  <th v-if="entry.status >= 4">Realisasi</th>
                  <th v-if="entry.status > 4">Selisih</th>
                  <th>Site</th>
                  <th>Notes</th>
                </thead>
                <tbody v-if="$can('finance')">
                  <tr v-for="(item, k) in entry.items" :key="k">
                    <td scope="row" class="trashIconContainer">
                        <i class="fa fa-trash-o" @click="deleteRow(k)"></i>
                    </td>
                    <td>
                    <v-select
                      name="account"
                      label="name"
                      :key="'account-field'"
                      :value="item.account_id"
                      :options="lists.accounts"
                      :reduce="account => account.id"
                      @input="updateItemAccount(k, $event)"
                    >
                      <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!item.account_id"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                    </td>
                    <td>
                        Rp. <input disabled class="inputRp wrapText required" type="number" :value="item.amount" @input="updateItemAmount(k, $event)" required/>
                    </td>
                    <td v-if="entry.status >= 4">
                        Rp. <input required class="inputRp wrapText required" type="number" :value="item.real_amount" @input="updateItemRealAmount(k, $event)"/>
                    </td>
                    <td v-if="entry.status > 4">
                        <input disabled class="inputRp wrapText required" type="number" :value="parseInt(item.real_amount) - parseInt(item.amount)" required/>
                    </td>
                    <td>
                    <v-select
                      name="site"
                      label="name"
                      :key="'site-field'"
                      :value="item.site_id"
                      :options="lists.site"
                      :reduce="site => site.id"
                      @input="updateItemSite(k, $event)"
                    />
                    </td>
                    <td>
                        <input class="form-control wrapText" type="text" :value="item.ket" @input="updateItemKet(k, $event)"/>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr v-for="(item, k) in entry.items" :key="k">
                    <td scope="row" class="trashIconContainer">
                        <i class="fa fa-trash-o" @click="deleteRow(k)"></i>
                    </td>
                    <td>
                    <v-select
                      name="account"
                      label="name"
                      :key="'account-field'"
                      :value="item.account_id"
                      :options="lists.accounts"
                      :reduce="account => account.id"
                      @input="updateItemAccount(k, $event)"
                      disabled
                    >
                      <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!item.account_id"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                    </td>
                    <td>
                        <input disabled class="form-control wrapText required" type="number" :value="item.amount" @input="updateItemAmount(k, $event)" required/>
                    </td>
                    <td v-if="entry.status >= 4">
                        <input class="form-control wrapText required" type="number" :value="item.real_amount" @input="updateItemRealAmount(k, $event)" required/>
                    </td>
                    <td v-if="entry.status > 4">
                        <input disabled class="form-control wrapText required" type="number" :value="parseInt(item.real_amount) - parseInt(item.amount)" required/>
                    </td>
                    <td>
                    <v-select disabled
                      name="site"
                      label="name"
                      :key="'site-field'"
                      :value="item.site_id"
                      :options="lists.site"
                      :reduce="site => site.id"
                      @input="updateItemSite(k, $event)"
                    />
                    </td>
                    <td>
                        <input disabled class="form-control wrapText" type="text" :value="item.ket" @input="updateItemKet(k, $event)"/>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type='button' class="btn btn-sm btn-info" @click="addNewRow">
                  <i class="fa fa-plus-circle"></i>
                  Tambah Item
              </button>
            </div>
            <div v-if="entry.status < 8 && $can(entry.status)" class="card-body">
              <div class="row">
                <div v-if="entry.status != 4 && entry.status != 3 && entry.status != 6" class="col-lg-2">
                  <button type='button' class="btn btn-primary" @click.prevent="approveData()">
                    Approve
                  </button>                  
                </div>
                <div v-if="entry.status === '6'" class="col-lg-2">
                  <button type='button' class="btn btn-primary" @click.prevent="approveData()">
                    Paid
                  </button>                  
                </div>
                <div v-if="entry.status === '3'" class="col-lg-2">
                  <button type='button' class="btn btn-primary" @click.prevent="needRealisasi()">
                    Approve
                  </button>                  
                </div>
                <div v-if="entry.status != 4" class="col-lg-2">
                  <button type='button' class="btn btn-danger" @click.prevent="rejectData()">
                    Reject
                  </button>
                </div>
                <div v-if="entry.status === '4' && $can('4')" class="col-lg-2">
                  <button type='button' class="btn btn-success" @click.prevent="approveData()">
                    Lanjutkan Proses
                  </button>
                </div>
                <div v-if="$can('finance')" class="col-lg-1">
                  <button type='button' class="btn btn-default" @click.prevent="submitForm()">
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Attachment from '@components/Attachments/Attachment'
import DatatableAttachments from '@components/Datatables/DatatableAttachments'
import Swal from 'sweetalert2'

export default {
  components: {
    Swal,
    Attachment,
    DatatableAttachments
  },
  data() {
    return {
      status: '',
      activeField: '',
      date: {
        disabledDates: {
          to: new Date(new Date() - (24 * 60 * 60 * 1000))
        }
      },
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('FpdsSingle', ['entry', 'loading', 'lists'])
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.resetState()
        this.fetchEditData(this.$route.params.id)
      }
    }
  },
  methods: {
    ...mapActions('FpdsSingle', [
      'updateData',
      'resetState',
      'setCodeVoucher',
      'setCodeVoucherLrd',
      'setTransactType',
      'setKlasifikasi',
      'setBu',
      'setDept',
      'setStatus',
      'setReqDate',
      'setProcessedDate',
      'setKet',
      'insertLampiranFile',
      'removeLampiranFile',
      'insertBuktiTransferFile',
      'removeBuktiTransferFile',
      'addItem',
      'deleteItem',
      'setItems',
      'setItemAccount',
      'setItemAmount',
      'setItemRealAmount',
      'setItemSite',
      'setItemKet',
      'setApprove',
      'fetchEditData',
      'fetchBuDept',
      'fetchBuSite',
      'fetchBuAccount',
      'fetchDeptAccount'
    ]),
    updateCodeVoucher(e) {
      this.setCodeVoucher(e.target.value)
    },
    updateCodeVoucherLrd(e) {
      this.setCodeVoucherLrd(e.target.value)
    },
    updateTransactType(value) {
      this.setTransactType(value)
    },
    updateKlasifikasi(value) {
      this.setKlasifikasi(value)
    },
    updateBu(value) {
      this.setDept([])
      this.fetchDeptAccount([])
      this.entry.items.forEach((item, index) => {
        this.setItemSite({ index, value: '' });
        this.setItemAccount({ index, value: '' });
      });
      this.setBu(value)
      // get site
      this.fetchBuSite(value)
      // get depts
      this.fetchBuDept(value)
      
    },
    updateDept(value) {
      this.setDept(value)
      this.entry.items.forEach((item, index) => {
        this.setItemAccount({ index, value: '' });
      });
      // get accounts
      this.fetchDeptAccount(value)
    },
    updateStatus(value) {
      this.setStatus(value)
    },
    updateReqDate(e) {
      this.setReqDate(e.target.value)
    },
    updateProcessedDate(e) {
      this.setProcessedDate(e.target.value)
    },
    updateKet(e) {
      this.setKet(e.target.value)
    },
    addNewRow() {
        this.addItem()
    },
    deleteRow(index) {
      console.log(index)
        this.$swal({
        title: 'Hapus Item ini ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        showCloseButton: true,
      }).then(result => {
        if(result.isConfirmed) {
          this.deleteItem(index)
        }
      })
    },
    updateItemAccount(index,value) {
      this.setItemAccount({index, value})
    },
    updateItemAmount(index, event, val) {
      val = event.target.value
      this.setItemAmount({ index, val });
    },
    updateItemRealAmount(index, event, val) {
      if(event.target.value !== '') {
        val = event.target.value
      } else {
        val = 0
      }
      this.setItemRealAmount({ index, val });
    },
    updateItemKet(index, event, val) {
      val = event.target.value
      this.setItemKet({index, val})
    },
    updateItemSite(index,value) {
      this.setItemSite({index, value})
    },
    approveData() {
      this.$swal({
        title: 'Approve?',
        text: 'Yakin ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(result => {
        if(result.value) {
            let value = true
            this.setApprove(value)
            this.submitForm()
        }
      })
    },
    needRealisasi() {
     Swal.fire({
        title: 'Approve',
        text: 'Butuh Realisasi ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#0e0e0e',
        confirmButtonText: 'Ya',
        denyButtonText: 'Tidak'
      }).then(result => {
        if (result.isConfirmed) {
          // User clicked "Ya"
          let value = true
          this.setApprove(value)
          this.submitForm()
        } else if (result.isDenied) {
          let value = "2"
          this.setApprove(value)
          this.submitForm()
          // Handle the "No" action here if needed
        }
      })
    },
    rejectData() {
      this.$swal({
        title: 'Reject ?',
        text: 'Masukkan Alasan',
        input: 'text',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(result => {
        if(result.value) {
            let value = result.value
            this.setKet(value)
            let value2 = false
            this.setApprove(value2)
            this.submitForm()
        }
        else {
            this.$swal({
            icon: 'error',
            title: 'Failed',
            text: 'Masukkan Alasan'
            })
        }
      })
    },
    getRoute(name) {
      return `${axios.defaults.baseURL}${name}/media`
    },
    submitForm() {
      this.updateData()
        .then(() => {
          this.$router.push({ name: 'fpds.index', query: { id: this.entry.bu_id } })
          this.$eventHub.$emit('update-success')
        })
        .catch(error => {
          this.status = 'failed'
          _.delay(() => {
            this.status = ''
          }, 3000)
        })
    },
    focusField(name) {
      this.activeField = name
    },
    clearFocus() {
      this.activeField = ''
    }
  }
}
</script>