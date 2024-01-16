const set = key => (state, val) => {
    state[key] = val
  }

function initialState() {
    return {
        chart : {
            cash_in_charts: {
                labels: [],
                datasets: [
                    {
                        label: 'Actual',
                        data: [],
                        fill: false,
                        borderColor: '#2554FF',
                        backgroundColor: '#2554FF',
                        borderWidth: 1,
                        tension: 0.5
                    },
                    {
                      label: 'Projection',
                      data: [],
                      fill: false,
                      borderColor: '#800000',
                      backgroundColor: '#800000',
                      borderWidth: 1,
                      tension: 0.5
                    },
                ]
            },
            cash_out_charts: {
                labels: [],
                datasets: [
                    {
                        label: 'Actual',
                        data: [],
                        fill: false,
                        borderColor: '#2554FF',
                        backgroundColor: '#2554FF',
                        borderWidth: 1,
                        tension: 0.5
                    },
                    {
                      label: 'Projection',
                      data: [],
                      fill: false,
                      borderColor: '#800000',
                      backgroundColor: '#800000',
                      borderWidth: 1,
                      tension: 0.5
                    },
                ]
            },
            coa_dept_charts: {
                labels: [],
                datasets: [
                  {
                    type: 'bar',
                    label: 'Actual',
                    data: [],
                    fill: false,
                    borderColor: '#2554FF',
                    backgroundColor: '#2554FF',
                    borderWidth: 1,
                    tension: 0.2,
                    order: 1,
                  },
                  {
                    type: 'line',
                    label: 'Projection',
                    data: [],
                    fill: false,
                    borderColor: '#800000',
                    backgroundColor: '#800000',
                    borderWidth: 1,
                    tension: 0.2,
                    order: 0,
                  },
                ]
            },
            chartOptions_cash_in: {
              legend: {
                display: true
              },
              plugins: {
                title: {
                      display: true,
                      text: 'Cashflow IN Actual & Projection',
                },
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
                title: {
                      display: true,
                      text: 'Cashflow OUT Actual & Projection',
                },
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
                title: {
                      display: true,
                      text: 'Cashflow OUT by DEPT',
                },
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
            summary: {},
        },
        lists: {
            dept: [],
        },
        query: {},
        loading: false
    }
}
  
  const getters = {
    chart: state => state.chart,
    lists: state => state.lists,
    query: state => state.query,
    loading: state => state.loading,
  }
  
  const actions = {
    fetchCharts({ commit, state }) {
      axios.get('dashboard', {params : state.query}).then(response => {
        commit('setLoading', true)
        if(state.query.startDate && state.query.endDate) {
            commit('setCashInCharts', response.data.data.dataCashIn)
            commit('setCashOutCharts', response.data.data.dataCashOut)
            
            if(state.query.dept.id) {
              commit('setCoaDeptCharts', response.data.data.dataCoaDept)
            }
        }
        if(state.query.startDateSummary && state.query.endDateSummary) {
          commit('setSummary', response.data.data.summary)
        }
        commit('setLists', response.data.meta)
      })
    },
    setQuery({ commit }, value) {
        commit('setQuery', _.cloneDeep(value))
    },
    resetState({ commit }) {
        commit('resetState')
    }
  }
  
  const mutations = {
    setLists(state, lists) {
      state.lists = lists
    },
    setCashInCharts(state, cashIn) {
      state.chart.cash_in_charts = {
          ...state.chart.cash_in_charts,
          labels: cashIn.labels,
          datasets: [
            { ...state.chart.cash_in_charts.datasets[0], data: cashIn.actual.percentage},
            { ...state.chart.cash_in_charts.datasets[1], data: cashIn.projection.percentage },
          ]
        };
          
    },
    setCashOutCharts(state, cashOut) {
      state.chart.cash_out_charts = {
          ...state.chart.cash_out_charts,
          labels: cashOut.labels,
          datasets: [
            { ...state.chart.cash_out_charts.datasets[0], data: cashOut.actual.percentage},
            { ...state.chart.cash_out_charts.datasets[1], data: cashOut.projection.percentage },
          ]
        };
    },
    setCoaDeptCharts(state, coaDept) {
      console.log(state.chart.coa_dept_charts)

      state.chart.coa_dept_charts = {
          ...state.chart.coa_dept_charts,
          labels: coaDept.labels,
          datasets: [
            { ...state.chart.coa_dept_charts.datasets[0], data: coaDept.actual.percentage},
            { ...state.chart.coa_dept_charts.datasets[1], data: coaDept.projection.percentage },
          ]
        };
        
      console.log(state.chart.coa_dept_charts)
    },
    setSummary(state, summary) {
      state.chart.summary = summary
    },
    setQuery(state, query) {
        state.query = query
      },
    setLoading: set('loading'),
    resetState(state) {
        Object.assign(state, initialState())
    }
  }
  
  export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
  }