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
                <strong>Detail Request Penambahan Limit</strong>
              </h4>
            </div>
            
            <div class="card-body">
              <bootstrap-alert />
              <div class="row">
                <div class="col-md-6">
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.date,
                      'is-focused': activeField == 'date'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.additional-limit.fields.date')
                    }}</label>
                    <vue-monthly-picker
                      input-class="form-control"
                      :value="entry.date_label"
                      @input="updateDate"
                      :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                      date-format="MMM yyyy"
                      required>
                    </vue-monthly-picker>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.amount,
                      'is-focused': activeField == 'amount'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.additional-limit.fields.amount')
                    }}</label>
                  <input
                    class="form-control required"
                    type="text"
                    :value="entry.amount_label"
                    @input="updateAmount"
                    @keypress="isNumberOrComma($event)"
                    required
                  />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.ket,
                      'is-focused': activeField == 'ket'
                    }"
                  >
                    <label class="bmd-label-floating">{{
                      $t('cruds.additional-limit.fields.ket')
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
                <div class="col-md-6">
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.coa_id,
                      'is-focused': activeField == 'coa'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.additional-limit.fields.coa_name')
                    }}</label>
                    <v-select
                      name="coa"
                      label="name"
                      :key="'coa-field'"
                      :value="entry.coa_id"
                      :options="lists.coa"
                      :reduce="entry => entry.id"
                      @input="updateCoa"
                    >
                    <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!entry.coa_id"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.coa_id,
                      'is-focused': activeField == 'coa'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.additional-limit.fields.coa_code')
                    }}</label>
                    <v-select
                      name="coa"
                      label="code"
                      :key="'coa-field'"
                      :value="entry.coa_id"
                      :options="lists.coa"
                      :reduce="entry => entry.id"
                      disabled
                    >
                    </v-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div v-if="entry.status == 1 && $can('adjustment_edit')" class="col-auto">
                <button type='button' class="btn btn-sm btn-success" style="color:black" @click.prevent="submitForm()">
                    Simpan
                </button>
              </div>
              <div v-if="entry.status == 1 && $can('adjustment_edit') && $can(entry.coa ? entry.coa.bu.code + '-1' :'---')" class="col-auto">
                <button type='button' class="btn btn-sm btn-primary" @click.prevent="approveData()">
                    Approve
                </button>
              </div>
              <div v-if="entry.status == 1 && $can('adjustment_edit') && $can(entry.coa ? entry.coa.bu.code + '-1' :'---')" class="col-auto">
                <button type='button' class="btn btn-sm btn-danger" @click.prevent="rejectData()">
                    Reject
                </button>
              </div>
              <div class="col-auto">
                <back-button class="btn-sm"></back-button>
              </div>
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
      activeField: '',
      query: {bu_id: null}
    }
  },
  computed: {
    ...mapGetters('AdditionalLimitsSingle', ['entry', 'loading', 'lists'])
  },
  beforeDestroy() {
    this.resetState()
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
    ...mapActions('AdditionalLimitsSingle', [
      'storeData',
      'resetState',
      'setDate',
      'setCoa',
      'setAmount',
      'setKet', 'setStatus', 'setReject', 'updateData',
      'fetchEditData', 'setQuery'
    ]),
    updateDate(value) {
      this.setDate(value)
    },
    updateCoa(value) {
      this.setCoa(value)
    },
    updateAmount(e) {
      this.setAmount(e.target.value)
    },
    updateKet(e) {
      this.setKet(e.target.value)
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
            this.setStatus('9')
            this.submitForm()
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
            this.setStatus('99')
            let value = result.value
            this.setReject(value)
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
    submitForm() {
      this.updateData()
        .then(() => {
          this.$router.push({ name: 'additional-limits.index' })
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