import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt_decode from "jwt-decode";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Introduction',
    component: () => import('../views/Intro.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      disableIfLoggedIn: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../views/Clients.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/package',
    name: 'Package',
    component: () => import('../views/Package.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: () => import('../views/Reservation.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: () => import('../views/Appointment.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/Admin/annoucement',
    name: 'Annoucement',
    component: () => import('../views/Annoucement.vue')
  },
  {
    path: '/Admin/addpet',
    name: 'AddPet',
    beforeEnter: roleAdmin,
    component: () => import('../views/AddPet.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Admin/addvaccine',
    name: 'AddVaccine',
    beforeEnter: roleAdmin,
    component: () => import('../views/AddVaccine.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Admin/addtreatment',
    name: 'AddTreatment',
    beforeEnter: roleAdmin,
    component: () => import('../views/AddTreatment.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Admin/addaccount',
    name: 'AddAccount',
    beforeEnter: roleAdmin,
    component: () => import('../views/AddAccount.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/:client_id',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { //?????????????????? requireAuthen ?????????????????????????????????????????? meta ???????????????????????? route
    if (localStorage.getItem("jwt") == null) {
      next({
        name: "Login" //???????????????????????? token -> ?????? login
      });
    } else {
      next(); //?????? token ???????????? -> ?????? login
    }
  } else {
    if(to.name === 'Login' && localStorage.getItem("jwt")){
      return next({path: 'Clients'})
    }
    next();
  }
});

function roleAdmin(to, from, next){
  const token = localStorage.getItem('jwt');
  console.log(`token: ${token}`)
  const decoded = jwt_decode(token);
  console.log('jwt decoded:'+JSON.stringify(decoded));

  if(localStorage.getItem('jwt') && decoded.role==='admin'){
    console.log('??????????????? admin');
    next();
  }
  else{
    console.log('???????????????????????? admin');
    next({name: 'Clients'});
    // localStorage.removeItem("jwt");
  }
}


export default router
