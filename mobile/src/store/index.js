import Vue from 'vue'
import Vuex from 'vuex'
import myPet from './modules/myPet';
import user from './modules/user';
import petPackage from './modules/package';
import appointment from './modules/appointment';
import register from './modules/register';
import history from './modules/history';
import annoucement from './modules/annoucement';
import reservation from './modules/reservation';
import timeslot from './modules/timeslot';

// load vuex
Vue.use(Vuex)

// create store
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    myPet,
    user,
    petPackage,
    appointment,
    register,
    history,
    annoucement,
    reservation,
    timeslot,
  }
})
