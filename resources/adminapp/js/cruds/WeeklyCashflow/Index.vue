<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header card-header-success card-header-icon">
                    <div class="card-icon">
                        <i class="material-icons">stacked_line_chart</i>
                    </div>
                    <h4 class="card-title">
                        Weekly Cashflow
                    </h4>
                    <br>
                    <p style="color:black">
                        Data Pemasukan dan Pengeluaran mingguan. Pilih Tanggal atau periode sesuai keinginan anda !
                    </p>
                </div>
                <div class="card-header">
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="fetchCalendarData"
                        :disabled="loading"
                        :class="{ disabled: loading }"
                        >
                        <i class="material-icons" :class="{ 'fa-spin': loading }">
                            refresh
                        </i>
                        {{ $t('global.refresh') }}
                    </button>
                    <h4 style="text-align: center"><strong><b>
                    Data Cashflow - {{this.selected_bu ? this.selected_bu.name : ''}}
                    </b></strong></h4>
                </div>

                <div class="table-overlay" v-show="loading">
                  <div class="table-overlay-container">
                    <material-spinner></material-spinner>
                    <span>Loading...</span>
                  </div>
                </div>
                <div class="card-body">
                    <div class="row justify-content-end">
                    <div class="col-auto">
                        <!-- Start Date input -->
                        <datetime-picker
                        class="form-control"
                        type="text"
                        picker="date"
                        placeHolder="From"
                        :value="query.startDate"
                        @input="updateStartDate"
                        required
                        >
                        </datetime-picker>
                    </div>
                    <div class="col-auto"> --- </div>
                    <div class="col-auto">
                        <!-- End date input -->
                        <datetime-picker
                        class="form-control"
                        type="text"
                        picker="date"
                        placeHolder="To"
                        :value="query.endDate"
                        @input="updateEndDate"
                        required
                        >
                        </datetime-picker>
                    </div>
                    </div>
                </div>
                <!-- Cash IN -->
                <div class="card-header">
                    <h4><strong><b>
                    Cashflow IN
                    </b></strong></h4>
                </div>
                <div class="card-body">
                    <!-- Isi tabel -->
                    <div v-if="Object.keys(data.cashIn).length > 1" class="table-responsive">
                        <table v-if="Object.keys(data.cashIn).length > 1" class="table table-bordered">
                            <thead>
                                <th style="background-color: #abb6ff">Partner</th>
                                <th v-for="(item, k) in data.cashIn[0]['data']" :key="k" style="background-color: #abb6ff">
                                    {{k}}
                                </th>
                            </thead>
                            <tbody>
                                <tr v-for="(item, k) in data.cashIn" :key="k">
                                    <td>
                                        <span v-if="k !== 'total'">
                                            <router-link
                                                :to="{ name: 'cash-ins.edit', params: { id: item['id'] } }"
                                                target="_blank"
                                                >
                                                {{item['partner']}}
                                            </router-link>
                                        </span>
                                        <span v-else>
                                            Total
                                        </span>
                                    </td>
                                    <td v-for="(subitem, l) in data.cashIn[0]['data']" :key="l">
                                        <span v-if="k !== 'total' && item['data'][l].length > 0">
                                                
                                            <a v-if="!item['data'][l][0]['status_paid']" style="color:red">{{item['data'][l][0]['real_amount_label']}}</a>
                                            <a v-if="item['data'][l][0]['status_paid']" style="color:black">{{item['data'][l][0]['real_amount_label']}}</a>
                                        </span>
                                        <span v-else>
                                            <a style="color:blue">{{item[l]}}</a>
                                        </span>
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else></div>
                </div>

                <!-- Cash Out -->
                <div class="card-header">
                    <h4><strong><b>
                    Cashflow OUT
                    </b></strong></h4>
                </div>
                <div class="card-body">
                    <!-- Isi tabel -->
                    <div v-if="Object.keys(data.cashOut).length > 1" class="table-responsive">
                        <table v-if="Object.keys(data.cashOut).length > 1" class="table table-bordered">
                            <thead>
                                <th style="background-color: #abb6ff">DANA</th>
                                <th v-for="(item, k) in data.cashOut[0]['data']" :key="k" style="background-color: #abb6ff">
                                    {{k}}
                                </th>
                            </thead>
                            <tbody>
                                <tr v-for="(item, k) in data.cashOut" :key="k">
                                    <td>
                                        <span v-if="k !== 'total'">
                                            <router-link v-if="item['status'] >= 5"
                                                :to="{ name: 'lrds.show', params: { id: item['id'] } }"
                                                target="_blank"
                                                >
                                                {{item['name'] ?? item['code']}}
                                            </router-link>
                                            <router-link v-if="item['status'] < 5"
                                                :to="{ name: 'fpd-processes.show', params: { id: item['id'] } }"
                                                target="_blank"
                                                >
                                                {{item['name'] ?? item['code']}}
                                            </router-link>
                                            
                                        </span>
                                        <span v-else>
                                            Total
                                        </span>
                                    </td>
                                    <td v-for="(subitem, l) in data.cashOut[0]['data']" :key="l">
                                        <span v-if="k !== 'total' && item['data'][l].length != 0">
                                            <a v-if="item['data'][l]['status'] < 5" style="color:red"> {{item['data'][l].length == 0 ? '-' : item['data'][l][0]}}</a>
                                            <a v-else style="color:black"> {{item['data'][l].length == 0 ? '-' : item['data'][l][0]}}</a>
                                           
                                        </span>
                                        <span v-else>
                                            {{item[l]}}
                                        </span>
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else></div>
                </div>
                <br>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {

  },
  data() {
    return {
      query: { bu_id: null, startDate: null, endDate: null },
    }
  },
  mounted() {
    this.query.bu_id = this.selected_bu ? this.selected_bu.id : null;
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('WeeklyCashflow', ['data','total','loading']),
    ...mapGetters('AuthBu', ['selected_bu']),
  },
  methods: {
    ...mapActions('WeeklyCashflow', ['fetchCalendarData', 'setQuery', 'resetState']),
    updateStartDate(e) {
        this.query.startDate = e.target.value
    },
    updateEndDate(e) {
        this.query.endDate = e.target.value
    }
  },
  watch: {
    selected_bu(newSelectedBu) {
      // React to changes in selected_bu
      this.query.bu_id = newSelectedBu.id;
    },
    query: {
      handler(query) {
        this.setQuery(query)
        if(query.bu_id && query.startDate && query.endDate) {
          this.fetchCalendarData()
          console.log('fetch calendar data success')
        }
      },
      deep: true
    }
  },
}
</script>