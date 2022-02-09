import axios from 'axios'

export const authenticationService = {
  login,
  logout
};


function login(email, password) {
  let baseUrl =  "http://localhost:4000/api/auth/login/";

  axios.post(baseUrl, {email, password}).then((res)=>{
    let token = res.data.access_token;
    localStorage.setItem("jwt", token);
    console.log(res.data.access_token);

    return res.data.access_token;

  }).catch((error) => {
    console.log(error)
 });
}

function logout(){
  localStorage.removeItem("jwt");
  this.$router.replace('/login')
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