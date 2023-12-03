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
              <strong>{{ $t('cruds.additional-limit.title') }} Limit COA {{this.selected_bu.code}}</strong>
            </h4>
            <div class="card-body">
              <p style="color:black">
                Daftar Penambahan Limit pada COA {{this.selected_bu.code}}
              </p>
            </div>
          </div>
          <div class="card-body">
            <router-link
              class="btn btn-sm btn-primary"
              v-if="$can('bu_dept_site_create')"
              :to="{ name: xprops.route + '.create' }"
            >
              <i class="material-icons">
                add
              </i>
              {{ $t('global.add') }}
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
import BuDeptSiteActions from '@components/Datatables/BuDeptSiteActions'
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
          title: 'cruds.additional-limit.fields.date',
          field: 'date',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'cruds.additional-limit.fields.coa_code',
          field: 'coa.code',
          thComp: TranslatedHeader,
          tdComp: DatatableSingle,
          sortable: true
        },
        {
          title: 'cruds.additional-limit.fields.coa_name',
          field: 'coa.name',
          thComp: TranslatedHeader,
          tdComp: DatatableSingle,
          sortable: true
        },
        {
          title: 'cruds.additional-limit.fields.amount',
          field: 'amount',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'cruds.additional-limit.fields.ket',
          field: 'ket',
          thComp: TranslatedHeader,
          sortable: true
        },
        // {
        //   title: 'global.actions',
        //   thComp: TranslatedHeader,
        //   tdComp: BuDeptSiteActions,
        //   visible: true,
        //   thClass: 'text-right',
        //   tdClass: 'text-right td-actions',
        //   colStyle: 'width: 150px;'
        // }
      ],
      query: { sort: 'date', order: 'desc', limit: 100, s: '', bu_id: null },
      xprops: {
        module: 'AdditionalLimitsIndex',
        route: 'additional-limits',
        permission_prefix: 'additional-limit_'
      }
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('AdditionalLimitsIndex', ['data', 'total', 'loading']),
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
    this.query.bu_id = this.selected_bu.id;
  },
  watch: {
    selected_bu(newSelectedBu) {
      // React to changes in selected_bu
      this.query.bu_id = newSelectedBu.id;
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
    ...mapActions('AdditionalLimitsIndex', ['fetchIndexData', 'setQuery', 'resetState'])
  }
}
</script>