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
              <strong>CASH IN (Kontrak/Invoice) [ {{this.selected_bu ? this.selected_bu.name : ''}} ]</strong>
            </h4>
            <p style="color: black">Data Unrealized Cash IN</p>
          </div>
          <div class="card-body">
            <router-link v-if="$can('cash_in_create')"
              class="btn btn-sm btn-primary"
              :to="{ name: xprops.route + '.create' }"
            >
              Tambah
            </router-link>
            <button
              type="button"
              class="btn btn-sm btn-default"
              @click="fetchIndexData"
              :disabled="loading"
              :class="{ disabled: loading }"
            >
              <i class="material-icons" :class="{ 'fa-spin': loading }">
                refresh
              </i>
              {{ $t('global.refresh') }}
            </button>
          </div>
          <div class="card-body">
            <div class="row justify-content-end">
              <div class="col-auto">
                  <datetime-picker
                    class="form-control"
                    type="text"
                    picker="date"
                    :value="query.startDate"
                    @input="updateStartDate"
                    placeholder= "From Period"
                  >
                </datetime-picker>
              </div>
              <div class="col-auto"> --- </div>
              <div class="col-auto">
                  <datetime-picker
                    class="form-control"
                    type="text"
                    picker="date"
                    :value="query.endDate"
                    @input="updateEndDate"
                    placeholder= "To Period"
                  >
                </datetime-picker>
              </div>
            </div>
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
import CashInActions from '@components/Datatables/CashInActions'
import TranslatedHeader from '@components/Datatables/TranslatedHeader'
import HeaderSettings from '@components/Datatables/HeaderSettings'
import GlobalSearch from '@components/Datatables/GlobalSearch'
import DatatableSingle from '@components/Datatables/DatatableSingle'
import DatatableEnum from '@components/Datatables/DatatableEnum'

export default {
  components: {
    GlobalSearch,
    HeaderSettings
  },
  data() {
    return {
      columns: [
        {
          title: 'Tanggal',
          field: 'date_label',
          thComp: TranslatedHeader,
          sortable: true,
        },
        {
          title: 'No Kontrak/Invoice',
          field: 'number',
          sortable: true
        },
        {
          title: 'Keterangan',
          field: 'ket',
          sortable: true
        },
        {
          title: 'Customer',
          field: 'partner.name',
          tdComp: DatatableSingle,
          sortable: true
        },
        {
          title: 'Nominal',
          field: 'amount',
          sortable: true,
        },
        {
          title: 'Status',
          field: 'status_label',
          sortable: true
        },
        {
          title: 'global.actions',
          thComp: TranslatedHeader,
          tdComp: CashInActions,
          visible: true,
          thClass: 'text-right',
          tdClass: 'text-right td-actions',
          colStyle: 'width: 80px;'
        }
      ],
      query: { sort: 'id', order: 'desc', limit: 100, s: '', id: null, startDate: null, endDate: null },
      xprops: {
        module: 'CashInsIndex',
        route: 'cash-ins',
        permission_prefix: 'cash-in_'
      }
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('CashInsIndex', ['data', 'total', 'loading']),
    ...mapGetters('AuthBu', ['selected_bu']),
    updatedQuery() {
      return {
        ...this.query,
        id: this.selected_bu.id,
      };
    },
  },
  mounted() {
    // Set the query.id when the component is mounted
    this.query.id = this.selected_bu ? this.selected_bu.id : null;
  },

  watch: {
    selected_bu(newSelectedBu) {
      // React to changes in selected_bu
      this.query.id = newSelectedBu.id;
    },
    query: {
      handler(query) {
        this.setQuery(query)
        this.fetchIndexData()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('CashInsIndex', ['fetchIndexData', 'setQuery', 'resetState']),
    updateStartDate(e) {
      this.query.startDate = e.target.value;
    },
    updateEndDate(e) {
      this.query.endDate =  e.target.value;
    }
  }
}
</script>