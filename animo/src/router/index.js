import Vue from 'vue'
import VueRouter from 'vue-router'

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
      public: true,
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
    component: () => import('../views/AddPet.vue')
  },
  {
    path: '/Admin/addvaccine',
    name: 'AddVaccine',
    component: () => import('../views/AddVaccine.vue')
  },
  {
    path: '/Admin/addtreatment',
    name: 'AddTreatment',
    component: () => import('../views/AddTreatment.vue')
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
