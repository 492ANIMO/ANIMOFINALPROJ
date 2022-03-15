import axios from "axios";
import store from '../index';

const state = {
  mypets: [
  ],
  petDetail: {
    _id: '',
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
  },
  filterPet: [],
};

const getters = {
  allPets: (state) => state.mypets,
  pet: (state) => state.pet,
  petDetail: (state) => state.petDetail,
  addPetForm: (state) => state.addPetForm,
  filterPet: (state) => state.filterPet
};

const actions = {
  // asynchronous
  async fetchMyPet({commit}){
    const token = localStorage.getItem('jwt');
    // console.log(`token: ${token}`);

    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + token
    };

    const baseUrl = 'http://localhost:4000/api/pets/mypet/'
    const response = await axios.get(baseUrl,{
      headers: headers
    });
    // console.log(response.data.pet);
    commit('setMyPets', response.data.pet)
  },

  async fetchFilterPet({commit}){
    const token = localStorage.getItem('jwt');
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + token
    };
    const baseUrl = 'http://localhost:4000/api/pets/mypet/'
    
    console.log(`getter: ${store.getters.packageDetail.type}`);
    const type = store.getters.packageDetail.type

    const response = await axios.get(baseUrl+type,{
      headers: headers,
      params: { 
        type: store.getters.packageDetail.type
      } 
    });
    commit('setMyPetFilter', response.data.pet)
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
      state.petDetail = {
        _id: '',
        age:{},
      }

      state.addPetForm = {
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
      
    } catch (error) {
      console.log(error)
    }
  },

  async deleteMyPet(){
    try {
      const baseUrl = 'http://localhost:4000/api/pets/'
      axios.delete(baseUrl+state.petDetail._id).then((res)=>{
        console.log(`id: ${state.petDetail._id}`)
        console.log(res.data);
        console.log('ลบสัตว์เลี้ยงเรียบร้อย');
        state.addPetForm = {
          age: {
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

      }) .catch((error) => {
          console.log(error);
      });
 
    } catch (error) {
      console.log(error)
    }
  },

  async editMyPet(){
    try {
      const baseUrl = 'http://localhost:4000/api/pets/';
      const response = await axios.patch(baseUrl+state.petDetail._id, state.petDetail);
      console.log(`data : ${JSON.stringify(state.petDetail)}`)
      console.log(`id: ${state.petDetail._id}`)
      console.log(response.data.message);

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
  setOwner: (state, owner) => (state.addPetForm.ownerId = owner),
  setMyPetFilter: (state, pet) => (state.filterPet = pet)
};

export default{
  state,
  getters,
  actions,
  mutations
}