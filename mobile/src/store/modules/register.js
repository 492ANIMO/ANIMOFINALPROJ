import axios from 'axios'

const state = {
 appointments: [],
 form: {
   firstName: '',
   lastName: '',
   email: '',
   contact: '',
   password: '',
   confirmPassword: '',
   address:{
     province: '',
     district: '',
     subdistrict: '',
     postalCode: '',
     detail: ''
   }
 }
};

const getters = {
  // allAppointments: (state) => state.appointments,
  registerForm: (state) => state.form,
};

const actions = {

  async createClientUser(){
    const baseUrl = 'http://localhost:4000/api/users/client/register/';
    const response = await axios.post(baseUrl, state.form);
    console.log(response.data);
    // commit('setForm', response.data.appointment);
  },

};
const mutations = {
  setForm: (state, form) => (state.form = form),

};

export default{
  state,
  getters,
  actions,
  mutations
}