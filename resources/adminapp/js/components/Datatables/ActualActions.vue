<template>
  <div class="dt-action-container">

    <a
      href="#"
      @click="showDetail(row.coa_id, row.dept_id)"
      type="button"
    >
      {{ row.total_cash_out_actual }}
    </a>
       <b-modal :id="`dateModal${row.coa_id}${row.dept_id}`" centered hide-backdrop modal-class="custom-modal-width">
                  <template #modal-title>
                    Detail Actual Amount
                  </template>
                  <p style="font-size: 14px; margin-bottom: 2px">COA: {{ row.coa.name }}</p>
                  <p style="font-size: 14px; margin-bottom: 2px">Dept: {{ row.dept.name }}</p>
                  <p style="font-size: 14px; margin-bottom: 2px">Total: {{ row.total_cash_out_actual }}</p>
                    <datatable
                      :columns="columns"
                      :data="data"
                      :total="total"
                      :query="queryDetailFpd"
                      :HeaderSettings="false"
                    >
                    </datatable>
      </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TranslatedHeader from '@components/Datatables/TranslatedHeader'
import DatatableSingle from '@components/Datatables/DatatableSingle'
import ActualModalActions from '@components/Datatables/ActualModalActions'

export default {
  props: ['row', 'query'],
  data() {
    return {
      // Data...
      columns: [
        {
          title: 'cruds.fpd.fields.code',
          field: 'fpd.code',
          thComp: TranslatedHeader,
          tdComp: DatatableSingle,
        },
        {
          title: 'cruds.fpd.fields.created_at',
          field: 'created_at_label',
          thComp: TranslatedHeader,
        },
        {
          title: 'cruds.fpd.fields.amount',
          field: 'real_amount_label',
          thComp: TranslatedHeader,
        },
        {
          title: 'cruds.fpd.fields.name',
          field: 'fpd.name',
          thComp: TranslatedHeader,
          tdComp: DatatableSingle,
        },
        {
          title: 'Detail Fpd',
          tdComp: ActualModalActions,
          tdClass: 'td-actions',
        },
      ],
      queryDetailFpd: { order: 'desc', limit: 100, s: '', coa: null, dept: null, startDate: null, endDate: null },
    }
  },
  computed: {
    ...mapGetters('DetailFpdItem', ['data', 'total'])
  },
  watch: {
    queryDetailFpd: {
      handler(queryDetailFpd) {
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  methods: {
    ...mapActions('DetailFpdItem', ['fetchDetailFpd', 'setQuery', 'resetState']),
    showDetail(coa, dept) {
      this.resetState()
      this.queryDetailFpd.coa = coa;
      this.queryDetailFpd.dept = dept;
      if(this.query.startDate) {
        const startDate = this.query.startDate.format('YYYY-MM-DD')
        this.queryDetailFpd.startDate = startDate
      }
      if(this.query.endDate) {
        const endDate = this.query.endDate.substring(0,10)
        this.queryDetailFpd.endDate = endDate
      }
      this.setQuery(this.queryDetailFpd)
      this.fetchDetailFpd()
        this.$bvModal.show(`dateModal${coa}${dept}`);
    }
  }
}
</script>