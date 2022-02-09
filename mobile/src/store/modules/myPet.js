import axios from "axios";

const state = {
  mypets: [

  ],
  pet:{
  },
  petDetail: {
    age:{},
  }
};

const getters = {
  allPets: (state) => state.mypets,
  pet: (state) => state.pet,
  petDetail: (state) => state.petDetail
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

  async fetchPetDetail({commit}, id){
    const baseUrl = 'http://localhost:4000/api/pets/';
    const response = await axios(`${baseUrl}${id}`)
    console.log(`id: ${id}`);
    console.log(response.data.pet);
    commit('petDetail', response.data.pet)
  },

  async addMyPet({commit}, pet){
    const baseUrl = 'http://localhost:4000/api/pets/mypet/'

    let response = await axios.post(baseUrl, pet)

    console.log(response.data.pet);
    commit('newPet', response.data.pet)
  }
  
};

const mutations = {
  // synchronous
  setMyPets: (state, mypets) => (state.mypets = mypets),
  newPet: (state, pet) => (state.pet = pet),
  petDetail: (state, petDetail) => (state.petDetail = petDetail)
};

export default{
  state,
  getters,
  actions,
  mutations
}