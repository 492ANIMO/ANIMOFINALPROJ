import axios from "axios"

const state = {
  reservation: {

  },
}

const getters = {
  reservation: (state) => state.reservation,
}

const actions = {
  // async fetchPackage({commit}){
  //   const baseUrl = 'http://localhost:4000/api/reservations/'
  //   const response = await axios.get(baseUrl);
  //   console.log(response.data.package);
  //   commit('setReservation', response.data.reservation)
  // }
}

const mutations = {
  setReservation: (state, reservation) => (state.reservation = reservation)
}

export default{
  state,
  getters,
  actions,
  mutations
}