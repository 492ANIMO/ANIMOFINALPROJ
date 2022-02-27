import axios from 'axios'

const state = {
 histories: [],
 historyDetail: {
   pet: {},
   reservation: {
     package:{}
   },
   medical: {},
 },
 seletedHistory: ''
};

const getters = {
  allHistories: (state) => state.histories,
  historyDetail: (state) => state.historyDetail,
  getHistoryById: (state) => (id) => {
    return state.histories.find(history => history._id === id)
  },
  seletedHistory: (state) => state.seletedHistory,
  
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
  },

  async getHistoryDetail({commit}, id){
    const historyDetail = state.histories.find(history => history._id === id);
    // state.histories.find(history => history._id === data);
    console.log(`id : ${JSON.stringify(id)}`)
    commit('setSeletedHistory', id);
    commit('setHistoryDetail', historyDetail);

    // console.log(`eiei : ${JSON.stringify(test)}`)

  }
};

const mutations = {
  setMyHistories: (state, histories) => (state.histories = histories),
  setHistoryDetail: (state, historyDetail) => (state.historyDetail = historyDetail),
  setSeletedHistory: (state, seletedHistory) => (state.seletedHistory = seletedHistory),
};

export default{
  state,
  getters,
  actions,
  mutations
}