import axios from "axios";

const state = {
  mypets: [
  ],
  pet:{
  },
  petDetail: {
    age:{},
  },
  addPetForm:{
    age:{
      year: '',
      month: ''
    },
    type: '',
    breed: '',
    gender: '',
    weight: '',
    sterilization: '',
    ownerId: ''

  }
};

const getters = {
  allPets: (state) => state.mypets,
  pet: (state) => state.pet,
  petDetail: (state) => state.petDetail,
  addPetForm: (state) => state.addPetForm
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

  async addMyPet(){
    try {
      const baseUrl = 'http://localhost:4000/api/pets/'
      const response = await axios.post(baseUrl, state.addPetForm)
      
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

};

const mutations = {
  // synchronous
  setMyPets: (state, mypets) => (state.mypets = mypets),
  newPet: (state, addPetForm) => (state.pet = addPetForm),
  petDetail: (state, petDetail) => (state.petDetail = petDetail),
  setOwner: (state, owner) => (state.addPetForm.ownerId = owner)

};

export default{
  state,
  getters,
  actions,
  mutations
}