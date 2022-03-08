import axios from 'axios'

const state = {
 annoucements: [],
 annoucement: {}
};

const getters = {
  allAnnoucements: (state) => state.annoucements,
  annoucementDetail: (state) => state.annoucement,
};

const actions = {
  async fetchAnnoucements({commit}){
    const baseUrl = 'http://localhost:4000/api/annoucements/';

    const response = await axios.get(baseUrl);
    console.log(response.data.annoucement);
    commit('setAnnoucements', response.data.annoucement);
  },

  async getAnnoucementDetail({commit}, id){
    try {
      const baseUrl = 'http://localhost:4000/api/annoucements/';
      const response = await axios.get(`${baseUrl}${id}`);
      console.log(response.data.annoucement);
      commit('setAnnoucementDetail', response.data.annoucement);

    } catch (error) {
      console.log(error)
    }

  },

  async filterByAnnoucementType({commit}, type){
    console.log(`type: ${type}`)
    const params = {
      type: type
    }
    const baseUrl = 'http://localhost:4000/api/annoucements/type';
    axios.get(`${(baseUrl)}`,{ params }).then((res) => {
      console.log(res)
      commit('setAnnoucements', res.data.annoucement);
    })
    .catch((error) => {
      console.log(error);
    });
  }

};
const mutations = {
  setAnnoucements: (state, annoucements) => (state.annoucements = annoucements),
  setAnnoucementDetail: (state, annoucement) => (state.annoucement = annoucement),


};

export default{
  state,
  getters,
  actions,
  mutations
}