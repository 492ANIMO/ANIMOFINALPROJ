import axios from "axios";

const state = {
  imgUrl: '',
  currentUser: {
    profile:{
      address:{
        province: '',
        district: '',
        subdistrict: '',
        detail: '',
        postalCode: '',
      }
    }
  }
}

const getters = {
  currentUser: (state) => state.currentUser,
  imgUrl: (state) => state.imgUrl,
}

const actions = {
  async fetchCurrentUser({commit}){
    const token = localStorage.getItem('jwt');
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + token
    };

    const baseUrl = 'http://localhost:4000/api/users/me/';
    const response = await axios.get(baseUrl, {headers});
    // console.log(response.data.user);
    commit('setCurrentUser', response.data.user);
    commit('setOwner', response.data.user.profile._id, { root: true });

  },
  
}
const mutations = {
  setCurrentUser: (state, currentUser) => (state.currentUser = currentUser),
  setImgUrl: (state, imgUrl) => (state.currentUser = imgUrl),
}

export default{
  state,
  getters,
  actions,
  mutations
}
