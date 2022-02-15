import axios from "axios";

const state = {
  currentUser: {
    profile:{
      address:{}
    }
  }
}

const getters = {
  currentUser: (state) => state.currentUser
}

const actions = {
  async fetchCurrentUser({commit}){
    const token = localStorage.getItem('jwt');
    console.log(`token: ${token}`);
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + token
    };

    const baseUrl = 'http://localhost:4000/api/users/me/';
    const response = await axios.get(baseUrl, {headers});
    console.log(response.data.user);
    commit('setCurrentUser', response.data.user);
  },


}
const mutations = {
  setCurrentUser: (state, currentUser) => (state.currentUser = currentUser)
}

export default{
  state,
  getters,
  actions,
  mutations
}