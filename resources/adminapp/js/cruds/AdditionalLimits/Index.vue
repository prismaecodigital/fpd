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
              <strong>{{ $t('cruds.additional-limit.title') }} Limit COA {{this.selected_bu ? this.selected_bu.code : ''}}</strong>
            </h4>
            <div class="card-body">
              <p style="color:black">
                Daftar Penambahan Limit. Gunakan fitur ini saat anda ingin menambahkan batas pengeluaran dana pada COA tertentu.
              </p>
            </div>
          </div>
          <div class="card-body">
            <router-link
              class="btn btn-sm btn-primary"
              v-if="$can('adjustment_create')"
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
            <button v-if="this.query.status != '1'"
              type="button"
              class="btn btn-sm btn-info"
              @click="updateStatus(['1'])"
              :disabled="loading"
              :class="{ disabled: loading }"
            >
              
              On Progress
            </button>
            <button v-if="this.query.status == '1'"
              type="button"
              class="btn btn-sm btn-info"
              @click="updateStatus(['9','99'])"
              :disabled="loading"
              :class="{ disabled: loading }"
            >
              Archive (yang sudah selesai)
            </button>
            <button v-if="this.query.status == '1'"
              type="button"
              class="btn btn-sm btn-success"
              @click="approveSelected"
              :disabled="loading"
              :class="{ disabled: loading }"
            >
              Approve Selected
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
                        <template slot="DatatableCheckboxAdj" slot-scope="props">
                          <DatatableCheckboxAdj :value="props.row.selected" />
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
import AdditionalActions from '@components/Datatables/AdditionalActions'
import TranslatedHeader from '@components/Datatables/TranslatedHeader'
import HeaderSettings from '@components/Datatables/HeaderSettings'
import GlobalSearch from '@components/Datatables/GlobalSearch'
import DatatableSingle from '@components/Datatables/DatatableSingle'
import DatatableEnum from '@components/Datatables/DatatableEnum'
import DatatableCheckboxAdj from '../../components/Datatables/DatatableCheckboxAdj.vue'

export default {
  components: {
    GlobalSearch,
    HeaderSettings
  },
  data() {
    return {
      columns: [
        {
          title: '',
          field: 'selected',
          thComp: '',
          tdComp: DatatableCheckboxAdj,
          sortable: false
        },
        {
          title: 'cruds.additional-limit.fields.dept_name',
          field: 'dept.code',
          thComp: TranslatedHeader,
          tdComp: DatatableSingle,
          sortable: true
        },
        {
          title: 'cruds.additional-limit.fields.date',
          field: 'date_label',
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
          field: 'amount_label',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'cruds.additional-limit.fields.ket',
          field: 'ket',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'Status',
          field: 'status_label',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'global.actions',
          thComp: TranslatedHeader,
          tdComp: AdditionalActions,
          visible: true,
          thClass: 'text-right',
          tdClass: 'text-right td-actions',
          colStyle: 'width: 150px;'
        }
      ],
      query: { sort: 'date', order: 'desc', limit: 100, s: '', bu_id: null, status: ['1'] },
      xprops: {
        module: 'AdditionalLimitsIndex',
        route: 'additional-limits',
        permission_prefix: 'adjustment_'
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
        if(this.query.bu_id) {
          this.fetchIndexData()
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('AdditionalLimitsIndex', ['fetchIndexData', 'setQuery', 'resetState', 'massUpdate']),
    updateStatus(k) {
      this.query.status = k
      console.log(this.query.status)
    },
    approveSelected() {
      const obj = this.data.filter(row => row.selected);
      const ids = obj.map(row => row.id);
      console.log(ids)
      if(ids.length == 0) {
        alert('tidak ada yang dipilih')
        return;
      }
      this.massUpdate(ids)
        .then(() => {
          this.fetchIndexData()
          this.$eventHub.$emit('approve-success')
        })
        .catch(error => {
          this.status = 'failed'
          _.delay(() => {
            this.status = ''
          }, 3000)
        })
    }
  }
}
</script>