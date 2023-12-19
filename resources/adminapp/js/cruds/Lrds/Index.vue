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
              List <strong> Realisasi Dana {{bu}}</strong>
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
import FpdActions from '@components/Datatables/FpdActions'
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
    const urlParams = new URLSearchParams(window.location.search);
    const idFromURL = urlParams.get('id');
    return {
      columns: [
        {
          title: 'cruds.fpd.fields.dept',
          field: 'dept.code',
          thComp: TranslatedHeader,
          tdComp: DatatableSingle,
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
          field: 'total_amount_label',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'Realisasi',
          field: 'total_real_amount_label',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'cruds.fpd.fields.name',
          field: 'name',
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
          title: 'global.actions',
          thComp: TranslatedHeader,
          tdComp: FpdActions,
          visible: true,
          thClass: 'text-right',
          tdClass: 'text-right td-actions',
          colStyle: 'width: 150px;'
        }
      ],
      query: { sort: 'id', order: 'desc', limit: 100, s: '', id: null },
      xprops: {
        module: 'LrdsIndex',
        route: 'lrds',
        permission_prefix: 'fpd_'
      }
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('LrdsIndex', ['data', 'total', 'loading', 'bu']),
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
    ...mapActions('LrdsIndex', ['fetchIndexData', 'setQuery', 'resetState'])
  }
}
</script>