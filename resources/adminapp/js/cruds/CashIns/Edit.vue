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
                <strong><b>Edit / Proses CASH IN</b></strong>
              </h4>
              
            </div>
            <div class="card-body row">
              <div class="col-auto" style="align-self: center;">Status Cash In : <strong><b>{{entry.status_label}}</b></strong></div>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <div class="row">
                <div class="col-md-6">
                    <h4><strong><b>Unrealized Cash In</b></strong></h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <!-- BU -->
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.bu_id !== null,
                      'is-focused': activeField == 'bu'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.cash-in.fields.bu')
                    }} *</label>
                    <v-select
                      name="bu"
                      label="name"
                      :key="'bu-field'"
                      :value="entry.bu_id"
                      :options="lists.bu"
                      :reduce="entry => entry.id"
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
                  <!-- Ket -->
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.ket,
                      'is-focused': activeField == 'ket'
                    }"
                  >
                    <label class="">{{ $t('cruds.cash-in.fields.ket') }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.ket"
                      @input="updateKet"
                      @focus="focusField('ket')"
                      @blur="clearFocus"
                    />
                  </div>
                  <!-- Transaction_Type -->
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.transaction_type !== null,
                      'is-focused': activeField == 'transaction_type'
                    }"
                  >
                    <label class="required">Tipe Transaksi</label>
                    <v-select
                      name="transaction_type"
                      label="label"
                      :key="'transaction_type-field'"
                      :value="entry.transaction_type"
                      :options="lists.transaction_type"
                      :reduce="entry => entry.value"
                      @input="updateTransactionType"
                    >
                      <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!entry.transaction_type"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                  </div>
                  <!-- CASH_IN_Type -->
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.cash_in_type !== null,
                      'is-focused': activeField == 'cash_in_type'
                    }"
                  >
                    <label class="required">Tipe Pemasukan</label>
                    <v-select
                      name="cash_in_type"
                      label="label"
                      :key="'cash_in_type-field'"
                      :value="entry.cash_in_type"
                      :options="lists.cash_in_type"
                      :reduce="entry => entry.value"
                      @input="updateCashInType"
                    >
                      <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!entry.cash_in_type"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                  </div>
                  <!-- Customer / Partner-->
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.partner_id !== null,
                      'is-focused': activeField == 'partner'
                    }"
                  >
                    <label class="required">Nama Pemberi Dana</label>
                    <v-select
                      name="partner"
                      label="name"
                      :key="'partner-field'"
                      :value="entry.partner_id"
                      :options="lists.partner"
                      :reduce="entry => entry.id"
                      @input="updatePartner"
                    >
                      <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!entry.partner_id"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                  </div>
                  
                </div>
                <div class="col-md-6">
                  <!-- No Kontrak/Invoice -->
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.number,
                      'is-focused': activeField == 'number'
                    }"
                  >
                    <label class="">No. Kontrak/Invoice</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.number"
                      @input="updateNumber"
                      @focus="focusField('number')"
                      @blur="clearFocus"
                    />
                  </div>
                  <!-- Tanggal Kontrak/Invoice -->
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.date,
                      'is-focused': activeField == 'date'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.cash-in.fields.date') 
                    }}</label>
                    <datetime-picker
                      class="form-control"
                      type="text"
                      picker="date"
                      :value="entry.date"
                      @input="updateDate"
                      @focus="focusField('date')"
                      @blur="clearFocus"
                    >
                    </datetime-picker>
                  </div>
                  <!-- Amount -->
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.amount,
                      'is-focused': activeField == 'amount'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.cash-in.fields.amount')
                    }}</label>
                   <input
                      class="form-control"
                      type="text"
                      :value="entry.amount_label"
                      @input="updateAmount"
                      @keypress="isNumberOrComma($event)"
                      required
                    />
                  </div>
                  <!-- MC % -->
                  <div v-if="entry.transaction_type == 1"
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.mc_percentage,
                      'is-focused': activeField == 'mc_percentage'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.cash-in.fields.mc_percentage')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.mc_percentage"
                      @input="updateMcPercentage"
                      @focus="focusField('mc_percentage')"
                      @blur="clearFocus"
                    />
                  </div>
                  <!-- LC % -->
                  <div v-if="entry.transaction_type == 1"
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.lc_percentage,
                      'is-focused': activeField == 'lc_percentage'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.cash-in.fields.lc_percentage')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.lc_percentage"
                      @input="updateLcPercentage"
                      @focus="focusField('lc_percentage')"
                      @blur="clearFocus"
                    />
                  </div>
                </div>
                
              </div>
            </div>
            <br>
            <!-- Items -->
            <div class="card-body">
              <h4 style="color: black">
                <strong><b>Realized Cash In (Pendapatan yang sudah masuk)</b></strong>
              </h4>
              <br v-if="entry.status == 0">
              <button v-if="entry.status == 0" type='button' class="btn btn-sm btn-info" @click="addNewRow">
                  <i class="fa fa-plus-circle"></i>
                  Add Payment
              </button>
            </div>
            <div v-if="entry.cash_in_items?.length > 0" class="card-body">
              <bootstrap-alert />
              <table class="table table-bordered" name="inputItem">
                <thead>
                  <th></th>
                  <th>Tanggal</th>
                  <th>Keterangan </th>
                  <th>Nominal (REALIZED)</th>
                  <th>Terbayar</th>
                </thead>
                <tbody>
                  <tr v-for="(item, k) in entry.cash_in_items" :key="k">
                    <td scope="row" class="trashIconContainer">
                        <i class="fa fa-trash-o" @click="deleteRow(k)"></i>
                    </td>
                    <td>
                       <!-- Tanggal -->
                    <datetime-picker
                      class="form-control"
                      type="text"
                      picker="date"
                      :value="item.date"
                      @input="updateItemDate(k, $event)"
                      required
                    >
                    </datetime-picker>

                    </td>
                    <!-- Keterangan -->
                    <td>
                        <input class="form-control" type="text" name="ket" :value="item.ket" @input="updateItemKet(k, $event)" required/>
                    </td>
                    <!-- Real Amount -->
                    <td>
                        <input
                          class="form-control wrapText required"
                          type="text"
                          :value="item.real_amount_label"
                          @input="updateItemRealAmount(k, $event)"
                          @keypress="isNumberOrComma($event)"
                          required
                        />
                    </td>
                    <td>
                  <input
                      type="checkbox"
                      :checked="item.status_paid" @change="updateItemStatusPaid(k)"
                    />
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
            <div class="card-footer">
              <vue-button-spinner v-if="entry.status == 0"
                class="btn-sm btn-success"
                :status="status"
                :isLoading="loading"
                :disabled="loading"
              >
                {{ $t('global.save') }}
              </vue-button-spinner>
              <div v-if="entry.status == 0" class="col-auto">
                <button type='button' class="btn btn-sm btn-primary" @click.prevent="closePayment()">
                    Close Payment
                </button>
              </div>
              <back-button class="btn-sm"></back-button>
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
    }
  },
  computed: {
    ...mapGetters('CashInsSingle', ['entry', 'loading', 'lists']),
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
    ...mapActions('CashInsSingle', [
      'updateData',
      'resetState',
      'setDate',
      'setNumber',
      'setTransactionType',
      'setCashInType',
      'setAmount',
      'setKet',
      'setBu',
      'setStatus',
      'setMcPercentage',
      'setLcPercentage',
      'setPartner', 'setQuery',
      'fetchEditData', 'addItem', 'deleteItem',
      'setItemDate', 'setItemKet', 'setItemRealAmount', 'setItemStatusPaid'
    ]),
    updateKet(e) {
      this.setKet(e.target.value)
    },
    updateTransactionType(value) {
      this.setTransactionType(value)
    },
    updateCashInType(value) {
      this.setCashInType(value)
    },
    updatePartner(value) {
      this.setPartner(value)
    },
    updateNumber(e) {
      this.setNumber(e.target.value)
    },
    updateDate(e) {
      this.setDate(e.target.value)
    },
    updateAmount(e) {
      this.setAmount(e.target.value)
    },
    updateMcPercentage(e) {
      this.setMcPercentage(e.target.value)
    },
    updateLcPercentage(e) {
      this.setLcPercentage(e.target.value)
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
    updateItemDate(index, e) {
      let value = e.target.value
      this.setItemDate({index, value})
    },
    updateItemKet(index, val) {
      this.setItemKet({index, value : val.target.value})
    },
    updateItemRealAmount(index, e) {
      this.setItemRealAmount({index, value : e.target.value})
    },
    updateItemStatusPaid(index) {
      this.setItemStatusPaid(index)
    },
    closePayment() {
      this.$swal({
        title: 'Close Payment',
        text: 'Yakin ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(result => {
        if(result.value) {
            this.setStatus(true)
            this.submitForm()
        }
      })
    },
    submitForm() {
      this.updateData()
        .then(() => {
          this.$router.push({ name: 'cash-ins.index', query: {id: this.entry.bu_id} })
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