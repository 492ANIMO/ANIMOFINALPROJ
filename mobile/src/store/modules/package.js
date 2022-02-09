import axios from "axios"

const state = {
  packages: [],
}

const getters = {
  allPackage: (state) => state.packages,
}

const actions = {
  async fetchPackage({commit}){
    const baseUrl = 'http://localhost:4000/api/packages/'
    const response = await axios.get(baseUrl);
    console.log(response.data.package);
    commit('setPackages', response.data.package)
  }
}

const mutations = {
  setPackages: (state, packages) => (state.packages = packages)
}

export default{
  state,
  getters,
  actions,
  mutations
}