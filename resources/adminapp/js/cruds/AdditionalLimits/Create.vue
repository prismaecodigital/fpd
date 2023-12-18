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
                <strong>Tambah Limit</strong>
              </h4>
              <div class="card-body">
                <p style="color:black">
                  Gunakan fitur ini saat anda ingin menambahkan batas pengeluaran dana pada COA tertentu.
                  <br>
                  Fitur ini tidak akan mengubah nilai projection
                </p>
              </div>
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
      activeField: '',
      query: {bu_id: null}
    }
  },
  computed: {
    ...mapGetters('AdditionalLimitsSingle', ['entry', 'loading', 'lists']),
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
    ...mapActions('AdditionalLimitsSingle', [
      'storeData',
      'resetState',
      'setDate',
      'setCoa',
      'setAmount',
      'setKet',
      'fetchCreateData', 'setQuery'
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
    submitForm() {
      this.storeData()
        .then(() => {
          this.$router.push({ name: 'additional-limits.index' })
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