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
                <strong>{{ $t('cruds.adjustment-period.title_singular') }} {{this.selected_bu ? this.selected_bu.code : ''}}</strong>
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
                      :value="entry.amount == '' ? entry.source_amount : entry.source_amount + ' (-' + entry.amount_label + ')'"
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
                      :value="entry.amount == '' ? entry.destination_amount : entry.destination_amount + ' (+' + entry.amount_label + ')'"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <vue-button-spinner
                class="btn-sm btn-primary"
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
import BootstrapAlert from '../../components/BootstrapAlert.vue'
import { read, utils } from 'xlsx';


export default {
  components: { BootstrapAlert },
  data() {
    return {
      status: '',
      activeField: '',
      query: { bu_id: null, type: 1 },
    }
  },
  computed: {
    ...mapGetters('AdjustmentsPeriodSingle', ['entry', 'loading', 'lists']),
    ...mapGetters('AuthBu', ['selected_bu']),
    updatedQuery() {
      return {
        ...this.query,
        bu_id: this.selected_bu.id,
      };
    },
  },
  mounted() {
    // Set the query.id when the component is mounted
    this.query.bu_id = this.selected_bu ? this.selected_bu.id : null;
  },
  watch: {
    selected_bu(newSelectedBu) {
      // React to changes in selected_bu
      this.query.bu_id = newSelectedBu.id;
    },
    query: {
      handler(query) {
        this.setQuery(query)
        this.fetchCreateData()
        this.resetState()
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  methods: {
    ...mapActions('AdjustmentsPeriodSingle', [
      'storeData',
      'resetState',
      'setProcessedDate', 'setSourceDate', 'setDestinationDate',
      'setAmount',
      'setKet',
      'setSourceCoa',
      'fetchCreateData','setQuery'
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
    submitForm() {
      this.storeData()
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