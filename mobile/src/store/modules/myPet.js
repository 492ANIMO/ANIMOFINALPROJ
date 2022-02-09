import axios from "axios";

const state = {
  mypets: [
    {
      id: 1,
      name: 'cocoa'
    },
    {
      id: 2,
      name: 'coffee'
    },
  ],
};

const getters = {
  allPets: (state) => state.mypets,
  pet: (state) => state.pet
};

const actions = {
  // asynchronous
  async fetchMyPet({commit}){
    const token = localStorage.getItem('jwt');
    console.log(`token: ${token}`);

    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + token
    };

    const baseUrl = 'http://localhost:4000/api/pets/mypet/'
    const response = await axios.get(baseUrl,{
      headers: headers
    });
    console.log(response.data.pet);
    commit('setMyPets', response.data.pet)
  },

  async addMyPet({commit}, pet){
    const baseUrl = 'http://localhost:4000/api/pets/mypet/'
    const response = await axios.post(baseUrl, pet)

    console.log(response.data.pet);
    commit('newPet', response.data.pet)
  }
  
};

const mutations = {
  // synchronous
  setMyPets: (state, mypets) => (state.mypets = mypets),
  newPet: (state, pet) => (state.pet = pet)
};

export default{
  state,
  getters,
  actions,
  mutations
}