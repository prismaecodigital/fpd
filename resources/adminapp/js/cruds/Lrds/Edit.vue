<template>
  <div class="container-fluid">
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-primary card-header-icon">
              <div class="card-icon">
                <i class="material-icons">add</i>
              </div>
              <h4 class="card-title">
                <strong><b>Edit Form Pengajuan Dana</b></strong>
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
                      class="form-control"
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
                      'is-filled': entry.realization_date,
                      'is-focused': activeField == 'realization_date'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.fpd.fields.realization_date') 
                    }}</label>
                    <datetime-picker
                      class="form-control"
                      type="text"
                      picker="date"
                      :value="entry.realization_date"
                      @input="updateRealizationDate"
                      @focus="focusField('realization_date')"
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
                      'is-filled': entry.name,
                      'is-focused': activeField == 'name'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.fpd.fields.name')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.name"
                      @input="updateName"
                      @focus="focusField('name')"
                      @blur="clearFocus"
                      disabled
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
                  <div v-if="$can('finance') && entry.status > 5"
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
                    />
                  </div>
                  <div class="form-group">
                    <label>{{ $t('cruds.fpd.fields.lampiran') }}</label>
                    <attachment
                      :route="getRoute('lrds')"
                      :collection-name="'fpd_lampiran'"
                      :media="entry.lampiran"
                      :max-file-size="30"
                      @file-uploaded="insertLampiranFile"
                      @file-removed="removeLampiranFile"
                      :max-files="30"
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
              <table class="table table-bordered table-wrap" name="inputItem">
                <thead>
                  <th></th>
                  <th>Nama Account / COA</th>
                  <th>Pengajuan</th>
                  <th v-if="entry.status > 5">Realisasi</th>
                  <th>Max</th>
                  <th>Site</th>
                  <th>Notes</th>
                </thead>
                <tbody>
                  <tr v-for="(item, k) in entry.items" :key="k">
                    <td scope="row" class="trashIconContainer">
                        <i class="fa fa-trash-o" @click="deleteRow(k)"></i>
                    </td>
                    <td>
                    <v-select
                      name="account"
                      label="name"
                      :key="'account-field'"
                      :value="item.account"
                      :options="lists.accounts"
                      @input="updateItemAccount(k, $event)"
                    >
                      <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!item.account"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                    </td>
                    <td>
                          <input
                                class="inputRp wrapText required"
                                type="text"
                                :value="item.amount_label"
                                @input="updateItemAmount(k, $event)"
                                @keypress="isNumberOrComma($event)"
                                required
                              />
                    </td>
                    <td v-if="parseInt(entry.status) > 5">
                          <input
                                class="inputRp wrapText required"
                                type="text"
                                :value="item.real_amount_label"
                                @input="updateItemRealAmount(k, $event)"
                                @keypress="isNumberOrComma($event)"
                                required
                              />
                    </td>
                    <td>{{item.source_amount_label}}</td>
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
                <tbody v-if="entry.status >= 5">
                  <tr>
                    <td></td>
                    <td>Total</td>
                    <td v-if="entry.status >= 5">{{entry.total_amount_label}}</td>
                    <td v-if="entry.status >= 5">{{entry.total_real_amount_label}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <button type='button' class="btn btn-info" @click="addNewRow">
                  <i class="fa fa-plus-circle"></i>
                  Tambah Item
              </button>
            </div>
            <div class="card-footer">
              <vue-button-spinner
                class="btn-primary"
                :status="status"
                :isLoading="loading"
                :disabled="loading"
              >
                {{ $t('global.save') }}
              </vue-button-spinner>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Attachment from '@components/Attachments/Attachment'

export default {
  components: {
    Attachment
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
    ...mapGetters('LrdsSingle', ['entry', 'loading', 'lists'])
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
    ...mapActions('LrdsSingle', [
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
      'setRealizationDate',
      'setKet',
      'setName',
      'insertLampiranFile',
      'removeLampiranFile',
      'addItem',
      'deleteItem',
      'setItems',
      'setItemAccount',
      'setItemAmount',
      'setItemRealAmount',
      'setItemSite',
      'setItemKet',
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
      this.fetchDeptAccount([])
      this.entry.items.forEach((item, index) => {
        this.setItemAccount({ index, value: '' });
      });
      // get account
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
    updateRealizationDate(e) {
      this.setRealizationDate(e.target.value)
    },
    updateKet(e) {
      this.setKet(e.target.value)
    },
    updateName(value) {
      this.setName(value)
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
        confirmButtonText: 'Yes',
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
      val = event.target.value
      this.setItemRealAmount({ index, val });
    },
    updateItemKet(index, event, val) {
      val = event.target.value
      this.setItemKet({index, val})
    },
    updateItemSite(index,value) {
      this.setItemSite({index, value})
    },
    getRoute(name) {
      return `${axios.defaults.baseURL}${name}/media`
    },
    submitForm() {
      this.updateData()
        .then(() => {
          this.$router.push({ name: 'lrds.index', query: {id: this.entry.bu_id} })
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
    },
    isNumberOrComma(event) {
      // Allow only numbers and a single comma
      const char = String.fromCharCode(event.keyCode);
      const isNumber = char >= '0' && char <= '9';
      const isComma = char === ',' && event.target.value.indexOf(',') === -1;
      if (!(isNumber || isComma)) {
        event.preventDefault();
      }
    },
  }
}
</script>