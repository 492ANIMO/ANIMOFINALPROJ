import axios from 'axios'

const state = {
 appointments: [],
 appointmentDetail: {
   medical: {},
   pet: {},
   reservation:{
     package:{}
   }
 }
};

const getters = {
  allAppointments: (state) => state.appointments,
  appointmentDetail: (state) => state.appointmentDetail,

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
  },

  async getAppointmentDetail({commit}, id){
    const appointmentDetail = state.appointments.find(appointment => appointment._id === id);
    commit('setAppointmentDetail', appointmentDetail);
  }

};
const mutations = {
  setMyAppointments: (state, appointments) => (state.appointments = appointments),
  setAppointmentDetail: (state, appointment) => (state.appointmentDetail = appointment),

};

export default{
  state,
  getters,
  actions,
  mutations
}