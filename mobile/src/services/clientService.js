import axios from "axios"
import store from '../store/index';
import Router from '../router/index';

export const editProfile = (profile, imgUrl) => {
  const baseUrl = 'http://localhost:4000/api/clients/';
  console.log(`profile: ${profile}`)
  console.log(`profile: ${JSON.stringify(profile._id)}`)

  if(imgUrl){
    profile.avatar = imgUrl
  }

  axios.patch(baseUrl+profile._id, profile).then((res) => {
    console.log(`${JSON.stringify(res.data)}`)
    store.commit('setCurrentUser', res.data.client);
  })

  Router.push('/mobile/profile')

}
export const editProfileImg = (profile, imgUrl) => {
  const baseUrl = 'http://localhost:4000/api/clients/avatar/';
  console.log(`profile: ${profile}`)
  console.log(`profile: ${JSON.stringify(profile._id)}`)

  axios.patch(baseUrl+profile._id, {
    profile,
    avatar: imgUrl
  }).then((res) => {
    console.log(`${JSON.stringify(res.data)}`)
    store.commit('setCurrentUser', res.data.client);
  })

}