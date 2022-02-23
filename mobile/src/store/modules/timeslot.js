import axios from 'axios'

const state = {
  times: [],

}

const getters = {
  times: (state) => state.times,
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

  async fetchBookableTime({commit}, date){
    const baseURL = "http://localhost:4000/api/timeslots/";
      await axios.post(baseURL,{
        'date': date
      })
      .then((res) => {
        const bookableTimes = res.data.bookableTimes;
        console.log("bookableTime");
        console.log(bookableTimes);
        commit('setBookableTimes', res.data.bookableTimes);
      })
      .catch((error) => {
        console.log(error);
      });
  },
}

const mutations = {
  setBookableTimes: (state, times) => (state.times = times),

}

export default{
  state,
  getters,
  actions,
  mutations
}