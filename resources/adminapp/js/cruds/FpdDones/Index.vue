<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-header-primary card-header-icon">
            <div class="card-icon">
              <i class="material-icons">assignment</i>
            </div>
            <h4 class="card-title">
              {{ $t('global.table') }}
              <strong>{{ $t('cruds.fpd.title') }}</strong>
            </h4>
          </div>
          <div class="card-body">
            <button
              type="button"
              class="btn btn-default"
              @click="fetchIndexData"
              :disabled="loading"
              :class="{ disabled: loading }"
            >
              <i class="material-icons" :class="{ 'fa-spin': loading }">
                refresh
              </i>
              {{ $t('global.refresh') }}
            </button>
            <button v-if="$can('finance')" class="btn btn-success" @click="logCheckedValues">Buat Jurnal</button>
          </div>
          
          <!-- Modal -->
          <div class="card-body row">

            <b-modal ref="modal-1" title="Buat Jurnal" @ok="submit">
              <div class="modal-body row">
                <div class="col-lg-3">Akun Debit</div>
                <div class="col">Akun dari Dana (FPD)</div>
                
              </div>
              <div class="modal-body row">
                <div class="col-lg-3">Akun Kredit</div>
                <div class="col">
                    <v-select
                      name="credit_account"
                      label="name"
                      :key="'account-field'"
                      :value="params.credit_account"
                      @input="updateCredit"
                      :options="lists.accounts"
                      :reduce="account => account.id"
                    >
                      <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!params.credit_account"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                </div>
                
              </div>
            </b-modal>

          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="table-overlay" v-show="loading">
                  <div class="table-overlay-container">
                    <material-spinner></material-spinner>
                    <span>Loading...</span>
                  </div>
                </div>
                <datatable
                  :columns="columns"
                  :data="data"
                  :total="total"
                  :query="query"
                  :xprops="xprops"
                  :HeaderSettings="false"
                  :pageSizeOptions="[10, 25, 50, 100]"
                >
                  <global-search :query="query" class="pull-left" />
                  <header-settings :columns="columns" class="pull-right" />
                </datatable>
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
import FpdDoneActions from '@components/Datatables/FpdDoneActions'
import TranslatedHeader from '@components/Datatables/TranslatedHeader'
import HeaderSettings from '@components/Datatables/HeaderSettings'
import GlobalSearch from '@components/Datatables/GlobalSearch'
import DatatableSingle from '@components/Datatables/DatatableSingle'
import DatatableEnum from '@components/Datatables/DatatableEnum'
import DatatableCheckbox from '../../components/Datatables/DatatableCheckbox.vue'
import BuDeptSingle from '../../components/Datatables/BuDeptSingle.vue'

export default {
  components: {
    GlobalSearch,
    HeaderSettings
  },
  data() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const idFromURL = urlParams.get('id');
    return {
      fpds: [],
      columns: [
        {
          title: '',
          field: 'selected',
          thComp: '',
          tdComp: DatatableCheckbox,
          sortable: false
        },
        {
          title: 'cruds.fpd.fields.code',
          field: 'code',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'cruds.fpd.fields.code_voucher',
          field: 'code_voucher',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'cruds.fpd.fields.dept',
          field: 'bu.dept',
          thComp: TranslatedHeader,
          tdComp: BuDeptSingle,
          sortable: true
        },
        {
          title: 'cruds.fpd.fields.user',
          field: 'user.name',
          thComp: TranslatedHeader,
          tdComp: DatatableSingle,
          sortable: true
        },
        {
          title: 'cruds.fpd.fields.status',
          field: 'status',
          thComp: TranslatedHeader,
          sortable: true,
          tdComp: DatatableEnum
        },
        {
          title: 'cruds.fpd.fields.req_date',
          field: 'req_date',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'cruds.fpd.fields.amount',
          field: 'total_amount',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'Jurnal',
          field: 'journaled',
          thComp: TranslatedHeader,
          sortable: true,
          tdComp: DatatableEnum
        },
        {
          title: 'global.actions',
          thComp: TranslatedHeader,
          tdComp: FpdDoneActions,
          visible: true,
          thClass: 'text-right',
          tdClass: 'text-right td-actions',
          colStyle: 'width: 150px;'
        }
      ],
      query: { sort: 'id', order: 'desc', limit: 100, s: '', id: idFromURL },
      xprops: {
        module: 'FpdDonesIndex',
        route: 'fpd-dones',
        permission_prefix: 'fpd_'
      }
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('FpdDonesIndex', ['data', 'total', 'loading', 'lists', 'params'])
  },
  watch: {
    query: {
      handler(query) {
        this.setQuery(query)
        this.fetchIndexData()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('FpdDonesIndex', ['fetchIndexData', 'setQuery', 'resetState', 'setFpds','setCredit', 'saveJournal']),
    logCheckedValues() {
      this.fpds = this.data.filter(row => row.selected).map(row => row.id);
      if(this.fpds.length > 0) {
        this.setFpds(this.fpds)
        this.$refs['modal-1'].show()
      } else {
        this.$eventHub.$emit('no-check')
      }
      
    },
    updateCredit(value) {
      this.setCredit(value)
    },
    submit(bvModalEvent) {
        this.saveJournal()
        .then(() => {
          this.$router.push({ name: 'fpd-dones.index', query: {id: this.idFromURL} })
          this.$eventHub.$emit('create-success')
        })
        .catch(error => {
          this.status = 'failed'
          _.delay(() => {
            this.status = ''
          }, 3000)
        })
    },
  }
}
</script>