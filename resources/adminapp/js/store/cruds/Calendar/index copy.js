import actions from './actions'
import mutations from './mutations'


const state = {
  events: [
    { id: 10, title: 'Title 1', date: new Date() },
    { id: 20, title: 'Title 2', date: new Date() },
    { id: 30, title: 'Title 3', date: new Date() }
  ],
  weekendsVisible: true
}

const getters = {
  events: state => state.events,
  weekendsVisible: state => state.weekendsVisible
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
