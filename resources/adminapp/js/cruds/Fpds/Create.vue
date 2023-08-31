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
                {{ $t('global.create') }}
                <strong>{{ $t('cruds.fpd.title_singular') }}</strong>
              </h4>
            </div>
            <div class="card-body">
              <back-button></back-button>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <div class="row">
                <div class="col-md-12">
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.code_voucher,
                      'is-focused': activeField == 'code_voucher'
                    }"
                  >
                    <label class="bmd-label-floating">{{
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
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.transact_type,
                      'is-focused': activeField == 'transact_type'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.fpd.fields.transact_type')
                    }}</label>
                    <v-select
                      name="transact_type"
                      :key="'transact_type-field'"
                      :value="entry.transact_type"
                      :options="lists.transact_type"
                      :reduce="entry => entry.value"
                      @input="updateTransactType"
                      @search.focus="focusField('transact_type')"
                      @search.blur="clearFocus"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.klasifikasi,
                      'is-focused': activeField == 'klasifikasi'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.fpd.fields.klasifikasi')
                    }}</label>
                    <v-select
                      name="klasifikasi"
                      :key="'klasifikasi-field'"
                      :value="entry.klasifikasi"
                      :options="lists.klasifikasi"
                      :reduce="entry => entry.value"
                      @input="updateKlasifikasi"
                      @search.focus="focusField('klasifikasi')"
                      @search.blur="clearFocus"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.bu_id !== null,
                      'is-focused': activeField == 'bu'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.fpd.fields.bu')
                    }}</label>
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
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.dept_id !== null,
                      'is-focused': activeField == 'dept'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.fpd.fields.dept')
                    }}</label>
                    <v-select
                      name="dept"
                      label="name"
                      :key="'dept-field'"
                      :value="entry.dept_id"
                      :options="lists.dept"
                      :reduce="entry => entry.id"
                      @input="updateDept"
                      @search.focus="focusField('dept')"
                      @search.blur="clearFocus"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.status,
                      'is-focused': activeField == 'status'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.fpd.fields.status')
                    }}</label>
                    <v-select
                      name="status"
                      :key="'status-field'"
                      :value="entry.status"
                      :options="lists.status"
                      :reduce="entry => entry.value"
                      @input="updateStatus"
                      @search.focus="focusField('status')"
                      @search.blur="clearFocus"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.req_date,
                      'is-focused': activeField == 'req_date'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.fpd.fields.req_date')
                    }}</label>
                    <datetime-picker
                      class="form-control"
                      type="text"
                      picker="date"
                      :value="entry.req_date"
                      @input="updateReqDate"
                      @focus="focusField('req_date')"
                      @blur="clearFocus"
                      required
                    >
                    </datetime-picker>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.ket,
                      'is-focused': activeField == 'ket'
                    }"
                  >
                    <label class="bmd-label-floating">{{
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
                </div>
              </div>
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

export default {
  data() {
    return {
      status: '',
      activeField: ''
    }
  },
  computed: {
    ...mapGetters('FpdsSingle', ['entry', 'loading', 'lists'])
  },
  mounted() {
    this.fetchCreateData()
  },
  beforeDestroy() {
    this.resetState()
  },
  methods: {
    ...mapActions('FpdsSingle', [
      'storeData',
      'resetState',
      'setCodeVoucher',
      'setTransactType',
      'setKlasifikasi',
      'setBu',
      'setDept',
      'setStatus',
      'setReqDate',
      'setKet',
      'fetchCreateData'
    ]),
    updateCodeVoucher(e) {
      this.setCodeVoucher(e.target.value)
    },
    updateTransactType(value) {
      this.setTransactType(value)
    },
    updateKlasifikasi(value) {
      this.setKlasifikasi(value)
    },
    updateBu(value) {
      this.setBu(value)
    },
    updateDept(value) {
      this.setDept(value)
    },
    updateStatus(value) {
      this.setStatus(value)
    },
    updateReqDate(e) {
      this.setReqDate(e.target.value)
    },
    updateKet(e) {
      this.setKet(e.target.value)
    },
    getRoute(name) {
      return `${axios.defaults.baseURL}${name}/media`
    },
    submitForm() {
      this.storeData()
        .then(() => {
          this.$router.push({ name: 'fpds.index' })
          this.$eventHub.$emit('create-success')
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