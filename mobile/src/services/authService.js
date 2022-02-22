import axios from 'axios'
import Router from '../router/index';

export const login = (email, password) => {
  const baseUrl =  "http://localhost:4000/api/auth/login/";
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


//   return fetch(`${config.apiUrl}/users/authenticate`, requestOptions.post({ username, password }))
//       .then(handleResponse)
//       .then(user => {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           currentUserSubject.next(user);

//           return user;
//       });
// }