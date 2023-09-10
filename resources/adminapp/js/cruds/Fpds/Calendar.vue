<template>
    <div id="app">
        <div class="calendar">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-3">
                  <v-select
                    name="bu"
                    label="name"
                    :key="'bu-field'"
                    :value="defaultBu"
                    :options="lists.bu"
                    :reduce="entry => entry.id"
                    @input="updateBu"
                    placeholder="Filter BU"
                  />
                </div>
                <div class="col-md-3">
                  <v-select
                    name="view"
                    label="name"
                    :key="'view-field'"
                    :value="defaultDate"
                    :options="lists.view"
                    :reduce="entry => entry.id"
                    @input="updateView"
                    placeholder="Filter View"
                  />
                </div>
              </div>
            </div>
            <div class="card-body">
              <full-calendar
                  class="full-calendar"
                  :options="config"
              >
                  <template #eventContent="{ event }">
                  <span v-if="parseInt(event.extendedProps.status) === 0" class="labelCalendar labelCalendar1">{{ event.extendedProps.code }}</span>
                  <span v-else-if="parseInt(event.extendedProps.status) === 1" class="labelCalendar labelCalendar1">{{ event.extendedProps.code }}</span>
                  <span v-else-if="parseInt(event.extendedProps.status) === 2" class="labelCalendar labelCalendar2">{{ event.extendedProps.code }}</span>
                  <span v-else-if="parseInt(event.extendedProps.status) === 3" class="labelCalendar labelCalendar3">{{ event.extendedProps.code }}</span>
                  <span v-else-if="parseInt(event.extendedProps.status) === 4" class="labelCalendar labelCalendar4">{{ event.extendedProps.code }}</span>
                  <span v-else-if="parseInt(event.extendedProps.status) === 5" class="labelCalendar labelCalendar5">{{ event.extendedProps.code }}</span>
                  <span v-else-if="parseInt(event.extendedProps.status) === 6" class="labelCalendar labelCalendar6">{{ event.extendedProps.code }}</span>
                  <span v-else-if="parseInt(event.extendedProps.status) === 7" class="labelCalendar labelCalendar7">{{ event.extendedProps.code }}</span>
                  <span v-else class="labelCalendar labelCalendar99">{{ event.extendedProps.code }}</span>
                  </template>
              </full-calendar>
              <div>
                <b-modal id="dateModal" centered hide-backdrop ok-only>
                  <template v-if="calendarData" #modal-title>
                    {{ calendarData.extendedProps?.code }}
                  </template>
                  <template v-else #modal-title>
                    {{ selectedDate }}
                  </template>
                  <div v-if="calendarData">
                    <div class="row">
                      <div class="col-lg-4">Dibuat tanggal </div>
                      <div class="col-lg-8">: {{calendarData.extendedProps?.created_at}}</div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4">Dibutuhkan tanggal </div>
                      <div class="col-lg-8">: {{calendarData.extendedProps?.req_date}}</div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4">Diproses tanggal </div>
                      <div class="col-lg-8">: {{calendarData.extendedProps?.processed_date ?? '-'}}</div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4">Code Voucher </div>
                      <div class="col-lg-8">: {{calendarData.extendedProps?.code_voucher ?? '-'}}</div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4">User </div>
                      <div class="col-lg-8">: {{calendarData.extendedProps?.user}}</div>
                    </div>                  
                    <div class="row">
                      <div class="col-lg-4">BU </div>
                      <div class="col-lg-8">: {{calendarData.extendedProps?.bu}}</div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4">Amount </div>
                      <div class="col-lg-8">: {{calendarData.extendedProps?.total}}</div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4">Status </div>
                      <div class="col-lg-8">: {{calendarData.extendedProps?.status_label}}</div>
                    </div>
                  </div>

                  <template v-if="calendarData" #modal-footer="{ hide }">
                    <a v-if="$can('fpd_show')" class="btn btn-sm btn-info" :href="'fpds/' + calendarData.id" target="_blank">Detail</a>
                    <a v-if="$can(calendarData.extendedProps?.status)"  class="btn btn-sm btn-success" :href="'fpds/' + calendarData.id +'/editData'" target="_blank">Proses</a>
                    <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
                      Cancel
                    </b-button>
                  </template>
                <div v-else>
                  <p>Tidak ada Data yang ditampilkan</p>
                </div>

                </b-modal>
              </div>
            </div>
          </div>
        </div>


    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'


export default {
  components: {
      FullCalendar,
  },
  data() {
    return {
      selectedDate: '',
      calendarData: '',
      defaultDate: 'created_at',
      defaultBu: '',
      query: { sort: 'id', order: 'desc', limit: 100, s: '' },
    }
  },
  mounted() {
    let x = this.defaultDate
    let bu_id = this.defaultBu
    this.fetchCalendarData({x,bu_id})
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('CalendarIndex', ['data', 'events', 'lists']),

    config () {
      return {
        ...this.configOptions,
        ...this.eventHandlers
      }
    },

    configOptions () {
      return {
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        events: this.events,
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        },
        initialView: 'dayGridMonth',
      }
    },

    eventHandlers () {
      return {
        dateClick: this.onDateClick,
        eventClick: this.onEventClick,
      }
    }
  },
  methods: {
    ...mapActions('CalendarIndex', ['fetchCalendarData', 'setQuery', 'resetState']),
    onDateClick (payload) {
      this.calendarData = ''
      this.selectedDate = this.formatDate(payload.dateStr);
      // this.$bvModal.show('dateModal')
    },
    onEventClick ({ event }) {
      this.calendarData = event;
      let dateStr = event.extendedProps.dateStr.substr(6, 4) + event.extendedProps.dateStr.substr(2, 4) + event.extendedProps.dateStr.substr(0,2)
      this.selectedDate = this.formatDate(dateStr)
      this.$bvModal.show('dateModal')
    },
    formatDate(inputDate) {
      let parts = inputDate.split('-');
      if (parts.length !== 3) {
        return 'Invalid Date';
      }
      let year = parseInt(parts[0]);
      let month = parseInt(parts[1]) - 1; // Months are zero-based
      let day = parseInt(parts[2]);
      let dateObj = new Date(year, month, day);
      if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
      }
      // Format the date as "dd-mm-yyyy"
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let formattedDate = `${String(day)} ${months[month]} ${year}`;
      return formattedDate;
    },
    updateBu(e) {
      this.defaultBu = e
      let x = this.defaultDate
      let bu_id = this.defaultBu
      this.fetchCalendarData({x,bu_id})
    },
    updateView(e) {
      this.defaultDate = e;
      let x = this.defaultDate
      let bu_id = this.defaultBu
      this.fetchCalendarData({x,bu_id})
    }
  },
}
</script>

<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html, body {
        height: 100vh;
    }

     body {
        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
        font-size: 14px;
     }
</style>

<style scoped>
    #app {
        display: flex;
        overflow: hidden;
        height: 100%;
    }

    .calendar {
        flex: 1;

        padding: 2em;
    }
    /* */
</style>
