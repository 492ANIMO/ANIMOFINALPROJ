import axios from 'axios'

const state = {
 appointments: []
};

const getters = {
  allAppointments: (state) => state.appointments,
};

const actions = {
  async fetchMyAppointment({commit}){
    const token = localStorage.getItem('jwt');
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + token
    };
    const baseUrl = 'http://localhost:4000/api/appointments/myAppointment/';

    const response = await axios.get(baseUrl,{
      headers: headers
    });
    console.log(response.data.appointment);
    commit('setMyAppointments', response.data.appointment);
  }

};
const mutations = {
  setMyAppointments: (state, appointments) => (state.appointments = appointments),

};

export default{
  state,
  getters,
  actions,
  mutations
}