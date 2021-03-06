import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt_decode from "jwt-decode";

Vue.use(VueRouter)

function guardMyRoute(to, from, next){

  if(!localStorage.getItem('jwt')){
    next({
      name: 'Login'
    });
  }

  // decode jwt token 
  const token = localStorage.getItem('jwt'); //jwt
  const decoded = jwt_decode(token);
  console.log('jwt decoded1:'+JSON.stringify(decoded));

  if(localStorage.getItem('jwt') && decoded.role==='client'){
    next(); // allow to enter route
  }
  else{
    next('/'); // go to '/login';
  }

  // if(isAuthenticated){
  //  next(); // allow to enter route
  // } 
  // else {
  //  next('/'); // go to '/login';
  // }
}

function setToken(to, from, next){
  const queryString = window.location.search;
  console.log(queryString)
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('token'); //jwt
  console.log(`token: ${token}`)

  const decoded = jwt_decode(token);
  console.log('jwt decoded2:'+JSON.stringify(decoded));
   
  var isAuthenticated = false;
  localStorage.setItem('jwt', token)
 
  if(localStorage.getItem('jwt')){
    isAuthenticated = true;
  }
  else{
    isAuthenticated= false;
  }

  if(isAuthenticated){
   next(); // allow to enter route
  } 
  else {
   next('/'); // go to '/login';
  }
}

const routes = [
  {
    path: '/mobile/google-auth',
    name: 'Mypet2',
    beforeEnter : setToken,
    component: () => import('../views/Mypet.vue')
  },
  {
    path: '/mobile/mypet',
    name: 'Mypet',
    beforeEnter : guardMyRoute,
    component: () => import('../views/Mypet.vue')
  },
  {
    path: '/mobile/addpet',
    name: 'Addpet',
    beforeEnter : guardMyRoute,
    component: () => import('../views/Addpet.vue')
  },
  {
    path: '/mobile/addpic',
    name: 'Addpic',
    beforeEnter : guardMyRoute,
    component: () => import('../views/Addpic.vue')
  },
  {
    path: '/mobile/editpet',
    name: 'Editpet',
    component: () => import('../views/Editpet.vue')
  },
  {
    path: '/mobile/profile',
    name: 'Profile',
    beforeEnter : guardMyRoute,
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/mobile/package',
    name: 'Package',
    beforeEnter : guardMyRoute,
    component: () => import('../views/Package.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/mobile/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/mobile/editprofile',
    name: 'EditProfile',
    beforeEnter : guardMyRoute,
    component: () => import('../views/EditProfile.vue')
  },
  {
    path: '/mobile/appointment',
    name: 'Appointment',
    beforeEnter : guardMyRoute,
    component: () => import('../views/Appointment.vue')
  },
  {
    path: '/mobile/history',
    name: 'History',
    beforeEnter : guardMyRoute,
    component: () => import('../views/History.vue')
  },
  {
    path: '/mobile/step0',
    name: 'Step0',
    beforeEnter : guardMyRoute,
    component: () => import('../views/Step0.vue')
  },
  {
    path: '/mobile/step1',
    name: 'Step1',
    beforeEnter : guardMyRoute,
    component: () => import('../views/Step1.vue')
  },
  {
    path: '/mobile/step2',
    name: 'Step2',
    beforeEnter : guardMyRoute,
    component: () => import('../views/Step2.vue')
  },
  {
    path: '/mobile/step3',
    name: 'Step3',
    beforeEnter : guardMyRoute,
    component: () => import('../views/Step3.vue')
  },
  {
    path: '/mobile/annoucement',
    name: 'Annoucement',
    component: () => import('../views/Annoucement.vue')
  },
  {
    path: '/mobile/news',
    name: 'News',
    component: () => import('../views/News.vue')
  },

  // the default route, when none of the above matches:
  { 
    path: '*', 
    beforeEnter : guardMyRoute,
    component: () => import('../views/Mypet.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
