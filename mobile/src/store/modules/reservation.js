import axios from "axios"
import store from '../index';

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
  async createReservation(){
    try {
      const baseUrl = 'http://localhost:4000/api/reservations/';
      console.log('packageId: '+ store.getters.packageDetail._id)
      const response = await axios.post(baseUrl,{
        petId: state.selectedPet._id,
        packageId: store.getters.packageDetail._id,
        date: store.getters.form.date,
        time: store.getters.form.time,
      })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
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