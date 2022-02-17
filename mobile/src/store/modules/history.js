import axios from 'axios'

const state = {
 histories: []
};

const getters = {
  allHistories: (state) => state.histories,
};

const actions = {
  async fetchMyHistories({commit}){
    const token = localStorage.getItem('jwt');
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + token
    };
    const baseUrl = 'http://localhost:4000/api/appointments/succeed/';

    const response = await axios.get(baseUrl,{
      headers: headers
    });
    console.log(response.data.appointment);
    commit('setMyHistories', response.data.appointment);
  }

};
const mutations = {
  setMyHistories: (state, histories) => (state.histories = histories),

};

export default{
  state,
  getters,
  actions,
  mutations
}