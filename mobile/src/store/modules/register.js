import axios from 'axios'
const addressBaseUrl = 'https://thaiaddressapi-thaikub.herokuapp.com'

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
 },
 addressDropdown:{
    provinces: [],
    districts: [],
    subdistricts: [],
 },
 
};

const getters = {
  // allAppointments: (state) => state.appointments,
  registerForm: (state) => state.form,
  editProfileForm: (state) => state.editProfileForm,
  addressDropdown: (state) => state.addressDropdown,
};

const actions = {

  async createClientUser(){
    try {
      const baseUrl = 'http://localhost:4000/api/users/client/register/';
      const response = await axios.post(baseUrl, state.form);
      console.log(response.data);
      if(response.error){
        throw new Error(response.error)
      }
    } catch (error) {
      console.log(error)
    }
  },


  async fetchProvince({commit}){
    try {
      const response = await axios.get(`${addressBaseUrl}/v1/thailand/provinces`);
      console.log(response.data.data);
      commit('setProvincesDropdown', response.data.data)
      

      if(response.error){
        throw new Error(response.error)
      }
    } catch (error) {
      console.log(error)
    }
  },

  async fetchDistrict({commit}, province){
    try {
      // if(!province) province = state.currentUser.profile.address.province;
      const response =  await axios.get(`${addressBaseUrl}/v1/thailand/provinces/${province}/district`)
      console.log(response.data.data);
      commit('setDistrictDropdown', response.data.data)

      if(response.error){
        throw new Error(response.error)
      }
    } catch (error) {
      console.log(error)
    }
  },
  
  async fetchSubDistrict({commit}, {province, district}){
    try {
      const response =  await axios.get(`${addressBaseUrl}/v1/thailand/provinces/${province}/district/${district}`)
      console.log(response.data.data);
      commit('setSubDistrictDropdown', response.data.data)

      if(response.error){
        throw new Error(response.error)
      }
    } catch (error) {
      console.log(error)
    }
  },
};
const mutations = {
  setProvincesDropdown: (state, provinces) => (state.addressDropdown.provinces = provinces ),
  setDistrictDropdown: (state, districts) => (state.addressDropdown.districts = districts ),
  setSubDistrictDropdown: (state, subdistricts) => (state.addressDropdown.subdistricts = subdistricts ),
};

export default{
  state,
  getters,
  actions,
  mutations
}