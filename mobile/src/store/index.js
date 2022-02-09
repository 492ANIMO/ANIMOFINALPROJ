import Vue from 'vue'
import Vuex from 'vuex'
import myPet from './modules/myPet';
import user from './modules/user';
import petPackage from './modules/package';

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
    petPackage
  }
})
