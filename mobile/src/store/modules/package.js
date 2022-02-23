import axios from "axios"

const state = {
  packages: [],
  packageDetail: {}
}

const getters = {
  allPackage: (state) => state.packages,
  packageDetail: (state) => state.packageDetail,
}

const actions = {
  async fetchPackage({commit}){ //fetch and save in store
    const baseUrl = 'http://localhost:4000/api/packages/'
    const response = await axios.get(baseUrl);
    console.log(response.data.package);
    commit('setPackages', response.data.package)
  },
  async getPackageDetail({commit}, id){
    const baseUrl = 'http://localhost:4000/api/packages/';
    const response = await axios.get(baseUrl+id);
    console.log(response.data.package);
    commit('setPackageDetail', response.data.package)
  },
  

}

const mutations = {
  setPackages: (state, packages) => (state.packages = packages),
  setPackageDetail: (state, packageDetail) => (state.packageDetail = packageDetail),
}

export default{
  state,
  getters,
  actions,
  mutations
}