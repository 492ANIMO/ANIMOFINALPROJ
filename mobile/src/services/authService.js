import axios from 'axios'
import Router from '../router/index';

export const login = (email, password) => {
  const baseUrl =  "http://localhost:4000/api/auth/login/client";
    axios.post(baseUrl, {email, password}).then((res) => {
      let token = res.data.access_token;
      localStorage.setItem("jwt", token);
      console.log(res.data.access_token);
  
      if(res.data.access_token){
        Router.push({name:'Mypet'})
      }
  
    }).catch((error) => {
      console.log(error)
   });
}

export const logout = () => { 
  localStorage.removeItem("jwt");
  Router.replace('/');
}
