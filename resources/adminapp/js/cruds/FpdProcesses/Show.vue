<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-header-primary card-header-icon">
            <div class="card-icon">
              <i class="material-icons">remove_red_eye</i>
            </div>
            <h4 class="card-title">
              {{ $t('global.view') }} Detail
              <strong>{{ $t('cruds.fpd.title_singular') }}</strong>
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-3">
                <back-button></back-button>
              </div>
            </div>
            
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <div class="table">
                    <tbody>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.code') }}
                        </td>
                        <td>
                          {{ entry.code }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.user') }}
                        </td>
                        <td>
                          <datatable-single :row="entry" field="user.name">
                          </datatable-single>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.created_at') }}
                        </td>
                        <td>
                          {{ entry.created_at }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.name') }}
                        </td>
                        <td>
                          {{ entry.name }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.bu') }}
                        </td>
                        <td>
                          <datatable-single :row="entry" field="bu.name">
                          </datatable-single>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.dept') }}
                        </td>
                        <td>
                          <datatable-single :row="entry" field="dept.name">
                          </datatable-single>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.req_date') }}
                        </td>
                        <td>
                          {{ entry.req_date }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.processed_date') }}
                        </td>
                        <td>
                          {{ entry.processed_date ?? '-' }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.transact_type') }}
                        </td>
                        <td>
                          <datatable-enum :row="entry" field="transact_type">
                          </datatable-enum>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.klasifikasi') }}
                        </td>
                        <td>
                          <datatable-enum :row="entry" field="klasifikasi">
                          </datatable-enum>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.code_voucher') }}
                        </td>
                        <td>
                          {{ entry.code_voucher ?? '-' }}
                        </td>
                      </tr>                      
                      <tr v-if="entry.code_voucher_lrd !== ''">
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.code_voucher_lrd') }}
                        </td>
                        <td>
                          {{ entry.code_voucher_lrd ?? '-' }}
                        </td>
                      </tr>                      
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.status') }}
                        </td>
                        <td>
                          <datatable-enum :row="entry" field="status">
                          </datatable-enum>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.lampiran') }}
                        </td>
                        <td>
                          <datatable-attachments
                            :row="entry"
                            :field="'lampiran'"
                          >
                          </datatable-attachments>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.fpd.fields.bukti_transfer') }}
                        </td>
                        <td>
                          <datatable-attachments
                            :row="entry"
                            :field="'bukti_transfer'"
                          >
                          </datatable-attachments>
                        </td>
                      </tr>
                    </tbody>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <bootstrap-alert />
            <table class="table table-bordered" name="inputItem">
              <thead>
                  <th>Account</th>
                  <th>Nominal</th>
                  <th v-if="parseInt(entry.status) > 4">Realisasi Amount</th>
                  <th>Site</th>
                  <th>Notes</th>
              </thead>
              <tbody>
                <tr v-for="(item, k) in entry.items" :key="k">
                  <td>
                      {{item.account.name}}
                  </td>
                  <td>
                      {{formatCurrency(item.amount)}}
                  </td>
                  <td v-if="parseInt(entry.status) > 4">
                      {{item.real_amount}}
                  </td>
                  <td>
                      {{item.site ? item.site.name : '-'}}
                  </td>
                  <td>
                      {{item.ket}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-body">
            <h4><strong>Alur Pengajuan FPD</strong></h4>
              <timeline v-for="(item, index) in timelineData" :key="index">
                <timeline-item v-if="item.proses == 'selesai'" bg-color="green">
                  {{ item.status }}
                  <p v-if="item.tanggal">Tanggal : {{ item.tanggal }}</p>
                  <p v-if="item.user">Diproses Oleh : {{ item.user }}</p>
                </timeline-item>
                <timeline-item v-if="item.proses == 'proses'" bg-color="yellow">
                  {{ item.status }}
                  <p v-if="item.tanggal">Tanggal : {{ item.tanggal }}</p>
                </timeline-item>
                <timeline-item v-if="item.proses == ''" bg-color="red">
                  {{ item.status }}
                </timeline-item>
              </timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DatatableSingle from '@components/Datatables/DatatableSingle'
import DatatableEnum from '@components/Datatables/DatatableEnum'
import DatatableAttachments from '@components/Datatables/DatatableAttachments'
import "vue-cute-timeline/dist/index.css";

export default {
  components: {
    DatatableSingle,
    DatatableEnum,
    DatatableAttachments
  },
  data() {
    return {}
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('FpdProcessesSingle', ['entry', 'timelineData'])
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.resetState()
        this.fetchShowData(this.$route.params.id)
      }
    }
  },
  methods: {
    ...mapActions('FpdProcessesSingle', ['fetchShowData', 'resetState']),
    formatCurrency(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }
}
</script>