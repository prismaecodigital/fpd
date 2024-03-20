<template>
    <div class="container-fluid">
      <!-- <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="material-icons">language</i>
              </div>
              <h4 class="card-title">
                {{ $t('global.dashboard') }}
              </h4>
            </div>
            <br>
            <div class="card-body">
              {{ $t('global.youAreLoggedIn') }}
            </div>
            <div class="card-body">
              <a href="https://drive.google.com/drive/folders/1VWyftVKzPYCqIZJs8RGBedUcQbr32rTn?usp=drive_link" target="_blank">Link Panduan Penggunaan</a>
            </div>
            <div class="card-body">
              Jika Anda menemui kendala dalam penggunaan aplikasi, hubungi xxx
            </div>
            <div class="card-body">
              Jika Anda menemui error, tekan Ctrl+F5. Jika masih error, hubungi Digitalisasi Prisma
            </div>
          </div>
        </div>
      </div> -->
      <div v-if="$can(this.selected_bu ? this.selected_bu.code + '-graph_access' : '-')" class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="material-icons">stacked_line_chart</i>
              </div>
              <h4 class="card-title">
                Charts
              </h4>
            </div>
              <div class="card-body">
                <div class="row justify-content-end">
                  <div class="col-auto" style="width: 200px">
                    <!-- Dept -->
                    <v-select
                      name="dept"
                      label="name"
                      :key="'dept-field'"
                      :value="query.dept"
                      :options="lists.dept"
                      @input="updateDept"
                      placeholder="Dept"
                    >
                    </v-select>
                  </div>
                  <div class="col-auto">
                    <vue-monthly-picker
                          input-class="form-control"
                          :value="query.startDate"
                          @input="updateStartDate"                    
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
              <br>
              <div class="card-header">
                <h4 style="text-align: center"><strong><b>
                  Cashflow IN Actual & Projection - {{this.selected_bu ? this.selected_bu.name : ''}}
                </b></strong></h4>
              </div>
              <div class="card-body">
                <LineChartGenerator :chart-options="chartOptions_cash_in" :chart-data="chart.cash_in_charts"
                :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
              </div>
              <br>
              <div class="card-header">
                <h4 style="text-align: center"><strong><b>
                  Cashflow OUT Actual & Projection - {{this.selected_bu ? this.selected_bu.name : ''}}
                </b></strong></h4>
              </div>
              <div class="card-body">
                <LineChartGenerator :chart-options="chartOptions_cash_out" :chart-data="chart.cash_out_charts"
                :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
              </div>
              <div class="card-header">
                <h4 style="text-align: center"><strong><b>
                  Cashflow OUT by DEPT - {{this.query.dept ? this.query.dept.name : ''}}
                </b></strong></h4>
              </div>
              <div class="card-body" >
                  <Bar :chart-options="chartOptions_coa_dept" :chart-data="chart.coa_dept_charts" :dataset-id-key="datasetIdKey"
                  :css-classes="cssClasses" :styles="styles" :width="width" :style="{ height: dynamicHeight + 'px' }" />
              </div>
            </div>
          </div>
      </div>
      <div class="row" v-if="$can(this.selected_bu ? this.selected_bu.code + '-summary_access' : '-')">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="material-icons">summarize</i>
              </div>
              <h4 class="card-title">
                Summary
              </h4>
              <div class="card-body">
                <div class="row justify-content-end">
                  <div class="col-auto" style="color: black">
                    <vue-monthly-picker
                          input-class="form-control"
                          :value="query.startDateSummary"
                          @input="updateStartDateSummary"                    
                          placeHolder="From Period"
                          :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                          date-format="MMM yyyy">
                        >
                    </vue-monthly-picker>
                  </div>
                  <div class="col-auto"> --- </div>
                  <div class="col-auto" style="color: black">
                      <vue-monthly-picker
                          input-class="form-control"
                          placeHolder="To Period"
                          :value="query.endDateSummary"
                          @input="updateEndDateSummary"
                          :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                          date-format="MMM yyyy">
                        >
                        </vue-monthly-picker>
                  </div>
                </div>
              </div>
              <br>
              <div v-if="query.startDateSummary !== null && query.endDateSummary !== null" class="table-responsive">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td class="text-black">
                          <strong><b>KETERANGAN</b></strong>
                        </td>
                        <td class="text-black">
                          <strong><b>UNREALIZED</b></strong>
                        </td>
                        <td class="text-black">
                          <strong><b>REALIZED</b></strong>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          Saldo Awal
                        </td>
                        <td class="text-black">
                          {{chart.summary.saldo_awal}}
                        </td>
                        <td class="text-black">
                          {{chart.summary.saldo_awal}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          <strong><b></b></strong>
                        </td>
                        <td class="text-black">
                          
                        </td>
                        <td class="text-black">
                          
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          <strong><b>CASH IN</b></strong>
                        </td>
                        <td class="text-black">
                          
                        </td>
                        <td class="text-black">
                          
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          REVENUE
                        </td>
                        <td class="text-black">
                          {{chart.summary.rev?.unrealized}}
                        </td>
                        <td class="text-black">
                          {{chart.summary.rev?.realized}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          LOAN PRISMA
                        </td>
                        <td class="text-black">
                          {{chart.summary.loan_prisma?.unrealized}}
                        </td>
                        <td class="text-black">
                          {{chart.summary.loan_prisma?.realized}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          LOAN BANK
                        </td>
                        <td class="text-black">
                          {{chart.summary.loan_bank?.unrealized}}
                        </td>
                        <td class="text-black">
                          {{chart.summary.loan_bank?.realized}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          
                        </td>
                        <td class="text-black">
                          
                        </td>
                        <td class="text-black">
                          
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          <strong><b>CASH OUT</b></strong>
                        </td>
                        <td class="text-black">
                          
                        </td>
                        <td class="text-black">
                          
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          COGS - MATERIAL COST
                        </td>
                        <td class="text-black">
                          {{chart.summary.mc?.unrealized}}
                        </td>
                        <td class="text-black">
                          {{chart.summary.mc?.realized}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          COGS - LABOR COST
                        </td>
                        <td class="text-black">
                          {{chart.summary.lc?.unrealized}}
                        </td>
                        <td class="text-black">
                          {{chart.summary.lc?.realized}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          OPEX
                        </td>
                        <td class="text-black">
                          {{chart.summary.opex?.unrealized}}
                        </td>
                        <td class="text-black">
                          {{chart.summary.opex?.realized}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          HUTANG SUPPLIER
                        </td>
                        <td class="text-black">
                          {{chart.summary.hutang_supplier?.unrealized}}
                        </td>
                        <td class="text-black">
                          {{chart.summary.hutang_supplier?.realized}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          HUTANG NON-SUPPLIER
                        </td>
                        <td class="text-black">
                          {{chart.summary.hutang_nonsupplier?.unrealized}}
                        </td>
                        <td class="text-black">
                          {{chart.summary.hutang_nonsupplier?.realized}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          <strong><b></b></strong>
                        </td>
                        <td class="text-black">
                          
                        </td>
                        <td class="text-black">
                          
                        </td>
                      </tr>
                      <tr>
                        <td class="text-black">
                          <strong><b>SURPLUS / DEFISIT</b></strong>
                        </td>
                        <td class="text-black">
                          {{chart.summary.diff?.unrealized}}
                        </td>
                        <td class="text-black">
                          {{chart.summary.diff?.realized}}
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div>
          <b-modal id="formSurvey" centered hide-backdrop ok-only no-close-on-backdrop no-close-on-esc hide-header-close>
            <template #modal-title>
              Survey
            </template>
            <div>
              Anda belum mengisi survey. Silahkan isi survey terlebih dahulu. Hanya 1-2 menit, santai saja
            </div>
            <template #modal-footer>
              <b-button size="sm" variant="outline-secondary" @click="goToSurvey">
                      Klik di sini
              </b-button>
              <!-- <a class="btn btn-sm btn-success" :href="'https://google.com'" target="_blank">Klik disini</a> -->
            </template>
          </b-modal>
      </div>
    </div>
</template>


<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import { Bar } from 'vue-chartjs/legacy'
import { mapGetters, mapActions } from 'vuex'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement
)
export default {
  components: {
    LineChartGenerator, Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'cashIn'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      query: { bu_id: null, dept: {id: null, name: null}, startDate: null, endDate: null, startDateSummary: null, endDateSummary: null },
      chartOptions_cash_in: {
        legend: {
          display: true
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += Math.round(context.parsed.y * 100) + '%';
                return label;
              }
            }
          }
        },
        scales: {
          y: { // 'y' specifies the y-axis
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value*100 + '%'; // Formatting tick labels as percentages
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      },
      chartOptions_cash_out: {
        legend: {
          display: true
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += Math.round(context.parsed.y * 100) + '%';
                return label;
              }
            }
          }
        },
        scales: {
          y: { // 'y' specifies the y-axis
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value*100 + '%'; // Formatting tick labels as percentages
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      },
      chartOptions_coa_dept: {
        legend: {
          display: true
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += Math.round(context.parsed.x * 100) + '%';
                return label;
              }
            }
          }
        },
        indexAxis: 'y',
        scales: {
          x: { // 'y' specifies the y-axis
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value*100 + '%'; // Formatting tick labels as percentages
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('ChartIndex', ['chart', 'loading', 'lists']),
    ...mapGetters('AuthBu', ['selected_bu', 'survey']),
    updatedQuery() {
      return {
        ...this.query,
        bu_id: this.selected_bu ? this.selected_bu.id : null,
      };
    },
    dynamicHeight() {
      // Assuming each item needs 50px of height and an additional 100px for padding, axis labels, etc.
      const itemHeight = 15;
      const baseHeight = 20; // Adjust base height for chart padding, labels, etc.
      const numberOfItems = this.chart.coa_dept_charts.datasets.reduce((acc, curr) => acc + curr.data.length, 0);
      return numberOfItems * itemHeight + baseHeight;
    }
  },
  mounted() {
    // Set the query.id when the component is mounted
    this.query.bu_id = this.selected_bu ? this.selected_bu.id : null;
    
  },
  watch: {
    selected_bu(newSelectedBu) {
      // React to changes in selected_bu
      this.query.bu_id = newSelectedBu ? newSelectedBu.id : null;
    },
    query: {
      handler(query) {
        this.setQuery(query)
        this.fetchCharts()
      },
      deep: true
    },
    survey() {
      if(!this.survey.has_completed_survey) {
        this.$bvModal.show('formSurvey')
      }
    }
  },
  methods: {
    ...mapActions('ChartIndex', ['fetchCharts', 'setQuery', 'resetState', 'updateUserSurvey']),
    updateStartDate(value) {
      let newValue = JSON.parse(JSON.stringify(value.add(1, 'day')));
      this.query.startDate = newValue;
    },
    updateEndDate(value) {
      let newValue = JSON.parse(JSON.stringify(value.add(1, 'month').subtract(1, 'second'))); // Deep clone with value + 1 month
      this.query.endDate = newValue;
    },
    updateStartDateSummary(value) {
      let newValue = JSON.parse(JSON.stringify(value.add(1, 'day')));
      this.query.startDateSummary = newValue;
    },
    updateEndDateSummary(value) {
      let newValue = JSON.parse(JSON.stringify(value.add(1, 'month').subtract(1, 'second'))); // Deep clone with value + 1 month
      this.query.endDateSummary = newValue;
    },
    updateDept(value) {
      this.query.dept.id = value.id;
      this.query.dept.name = value.name;
      console.log(this.query.dept)
    },
    goToSurvey() {
      window.open(this.survey.link, '_blank');
      this.$bvModal.hide('formSurvey');
      this.updateUserSurvey();
      console.log('ok')
    }
  }
}
</script>