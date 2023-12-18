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
                <strong>{{ $t('cruds.dompet.title_singular') }}</strong>
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
                      'is-filled': entry.bu_id !== null,
                      'is-focused': activeField == 'bu'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.dompet.fields.bu')
                    }}</label>
                    <v-select
                      name="bu"
                      label="name"
                      :key="'bu-field'"
                      :value="entry.bu_id"
                      :options="lists.bu"
                      :reduce="entry => entry.id"
                      @input="updateBu"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.date,
                      'is-focused': activeField == 'date'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.dompet.fields.date') 
                    }} *</label>
                    <vue-monthly-picker
                      input-class="form-control"
                      :value="entry.date_label"
                      @input="updateDate"
                      :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                      date-format="MMM yyyy">                      
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
                      $t('cruds.dompet.fields.amount')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.amount"
                      @input="updateAmount"
                      @focus="focusField('amount')"
                      @blur="clearFocus"
                      required
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
    ...mapGetters('DompetSingle', ['entry', 'loading', 'lists'])
  },
  mounted() {
    this.fetchCreateData()
  },
  beforeDestroy() {
    this.resetState()
  },
  methods: {
    ...mapActions('DompetSingle', [
      'storeData',
      'resetState',
      'setAmount',
      'setDate',
      'setBu',
      'fetchCreateData'
    ]),
    updateAmount(e) {
      this.setAmount(e.target.value)
    },
    updateDate(value) {
      this.setDate(value)
    },
    updateBu(value) {
      this.setBu(value)
    },
    submitForm() {
      this.storeData()
        .then(() => {
          this.$router.push({ name: 'dompet.index' })
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