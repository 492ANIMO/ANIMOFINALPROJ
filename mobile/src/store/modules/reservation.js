const state = {
  reservation: {
  },
  selectedPet: {
  },
  selectedDate: {
    date: '',
    time: ''
  },
}

const getters = {
  reservation: (state) => state.reservation,
  selectedPet: (state) => state.selectedPet,
  selectedDate: (state) => state.selectedDate,
}

const actions = {
  async setReservation({commit}, data){
    commit('setReservation', data)
  },
  async setPet({commit}, data){
    commit('setPet', data)
  },
  async setDate({commit}, data){
    commit('setDate', data)
  },
}

const mutations = {
  setReservation: (state, reservation) => (state.reservation = reservation),
  setPet: (state, pet) => (state.selectedPet = pet),
  setDate: (state, date) => (state.selectedDate = date),
}

export default{
  state,
  getters,
  actions,
  mutations
}