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
                Proses Adjustment
              </h4>
              <p style="color: black">Gunakan fitur ini saat anda ingin menyesuaikan anggaran antar periode pada COA tertentu</p>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <div class="row">
                <div class="col-md-6">
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.source_coa_id,
                      'is-focused': activeField == 'source_coa_id'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.adjustment-period.fields.coa_name')
                    }}</label>
                    <v-select
                      name="source_coa"
                      :key="'source_coa-field'"
                      label="name"
                      :value="entry.source_coa_id"
                      :options="lists.coa"
                      :reduce="coa => coa.id"
                      @input="updateSourceCoa"                      
                    >
                    <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!entry.source_coa_id"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.source_date_label,
                      'is-focused': activeField == 'source_date'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.adjustment-period.fields.source_date')
                    }}</label>
                    <vue-monthly-picker
                      input-class="form-control"
                      placeHolder="From Period"
                      :value="entry.source_date_label"
                      @input="updateSourceDate"
                      :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                      date-format="MMM yyyy">
                    >
                    </vue-monthly-picker>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.destination_date_label,
                      'is-focused': activeField == 'destination_date'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.adjustment-period.fields.destination_date')
                    }}</label>
                    <vue-monthly-picker
                      input-class="form-control"
                      placeHolder="From Period"
                      :value="entry.destination_date_label"
                      @input="updateDestinationDate"
                      :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                      date-format="MMM yyyy">
                    >
                    </vue-monthly-picker>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.amount,
                      'is-focused': activeField == 'amount'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.adjustment-period.fields.amount')
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
                    <label class="required">{{
                      $t('cruds.adjustment-period.fields.ket')
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
                      'is-filled': entry.source_coa_id,
                      'is-focused': activeField == 'source_coa_id'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.adjustment-period.fields.coa_code')
                    }}</label>
                    <v-select
                      name="source_coa"
                      :key="'source_coa-field'"
                      label="code"
                      :value="entry.source_coa_id"
                      :options="lists.coa"
                      :reduce="coa => coa.id"
                      disabled
                    >
                    </v-select>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                  >
                  <label class="required">
                    Current Balance (= Anggaran - Actual OUT -+ Adjustment)
                  </label>
                  <input
                      class="form-control disabled"
                      type="text"
                      :value="entry.source_amount + ' (-' + entry.amount_label + ')'"
                      disabled
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                  >
                  <label class="required">
                    Current Balance (= Anggaran - Actual OUT -+ Adjustment)
                  </label>
                  <input
                      class="form-control disabled"
                      type="text"
                      :value="entry.destination_amount + ' (+' + entry.amount_label + ')'"
                      disabled
                    />
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
              <div v-if="entry.status == 1 && $can('adjustment_edit') && $can(entry.source_coa.bu.code + '-1')" class="col-auto">
                <button type='button' class="btn btn-sm btn-primary" @click.prevent="approveData()">
                    Approve
                </button>
              </div>
              <div v-if="entry.status == 1 && $can('adjustment_edit') && $can(entry.source_coa.bu.code + '-1')" class="col-auto">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BootstrapAlert from '../../components/BootstrapAlert.vue'
import { read, utils } from 'xlsx';


export default {
  components: { BootstrapAlert },
  data() {
    return {
      status: '',
      activeField: '',
    }
  },
  computed: {
    ...mapGetters('AdjustmentsPeriodSingle', ['entry', 'loading', 'lists']),
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
  beforeDestroy() {
    this.resetState()
  },
  methods: {
    ...mapActions('AdjustmentsPeriodSingle', [
      'updateData',
      'resetState',
      'setProcessedDate', 'setSourceDate', 'setDestinationDate',
      'setAmount',
      'setKet',
      'setReject',
      'setStatus',
      'setSourceCoa',
      'fetchEditData','setQuery',
    ]),
    updateSourceDate(value) {
      this.setSourceDate(value)
    },
    updateDestinationDate(value) {
      this.setDestinationDate(value)
    },
    updateAmount(e) {
      this.setAmount(e.target.value)
    },
    updateKet(e) {
      this.setKet(e.target.value)
    },
    updateSourceCoa(value) {
      this.setSourceCoa(value)
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
          this.$router.push({ name: 'adjustments-period.index' })
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