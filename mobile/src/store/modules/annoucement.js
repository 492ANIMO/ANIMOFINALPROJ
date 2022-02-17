import axios from 'axios'

const state = {
 annoucements: []
};

const getters = {
  allAnnoucements: (state) => state.annoucements,
};

const actions = {
  async fetchAnnoucements({commit}){
    const baseUrl = 'http://localhost:4000/api/annoucements/';

    const response = await axios.get(baseUrl);
    console.log(response.data.annoucement);
    commit('setAnnoucements', response.data.annoucement);
  }

};
const mutations = {
  setAnnoucements: (state, annoucements) => (state.annoucements = annoucements),

};

export default{
  state,
  getters,
  actions,
  mutations
}