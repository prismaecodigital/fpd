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
              <strong>Data Cashflow OUT [ {{this.selected_bu ? this.selected_bu.name : ''}} ]</strong>
            </h4>
          </div>
          <div class="card-body">
            <router-link v-if="$can('projection_create')"
              class="btn btn-sm btn-primary"
              :to="{ name: xprops.route + '.create' }"
            >
              Buat Projection
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
                <vue-monthly-picker
                      input-class="form-control"
                      v-model="query.startDate"                      
                      placeHolder="From Period"
                      :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                      date-format="MMM yyyy">
                    >
                </vue-monthly-picker>
              </div>
              <div class="col-auto"> --- </div>
              <div class="col-auto">
                  <vue-monthly-picker
                      input-class="form-control"
                      placeHolder="To Period"
                      :value="query.endDate"
                      @input="updateEndDate"
                      :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                      date-format="MMM yyyy">
                    >
                    </vue-monthly-picker>
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
                        <template slot="ActualActions">
                          <ActualActions :query="query" />
                        </template>
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
import ActualActions from '@components/Datatables/ActualActions'
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
          title: 'cruds.cash-out-projection.fields.coa_code',
          field: 'coa.code',
          thComp: TranslatedHeader,
          tdComp: DatatableSingle,
          sortable: true,
        },
        {
          title: 'cruds.cash-out-projection.fields.coa_name',
          field: 'coa.name',
          thComp: TranslatedHeader,
          tdComp: DatatableSingle,
          sortable: true,
        },
        {
          title: 'cruds.cash-out-projection.fields.projection_amount',
          field: 'total_projection_amount',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'Adjustment',
          field: 'total_anggaran_after_adjustment',
          sortable: true
        },
        {
          title: 'cruds.cash-out-projection.fields.actual',
          thComp: TranslatedHeader,
          field: 'total_cash_out_actual',
          tdComp: ActualActions,
          visible: true,
          sortable: true
        },
        {
          title: 'cruds.cash-out-projection.fields.percentage',
          field: 'percentage',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'cruds.cash-out-projection.fields.dept',
          field: 'dept.code',
          thComp: TranslatedHeader,
          tdComp: DatatableSingle,
          sortable: true
        },

      ],
      query: { sort: 'dept_id', order: 'desc', limit: 100, s: '', id: null, startDate: null, endDate: null },
      xprops: {
        module: 'CashOutProjectionsIndex',
        route: 'cash-out-projections',
        permission_prefix: 'cash-out-projections_'
      }
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('CashOutProjectionsIndex', ['data', 'total', 'loading']),
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
        if(this.query.id) {
          this.fetchIndexData()
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('CashOutProjectionsIndex', ['fetchIndexData', 'setQuery', 'resetState']),
    updateEndDate(value) {
      let newValue = JSON.parse(JSON.stringify(value.add(1, 'month').subtract(1, 'second'))); // Deep clone with value + 1 month
      this.query.endDate = newValue;
    }
  }
}
</script>