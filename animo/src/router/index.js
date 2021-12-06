import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../views/Clients.vue')
  },
  {
    path: '/package',
    name: 'Package',
    component: () => import('../views/Package.vue')
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: () => import('../views/Reservation.vue')
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: () => import('../views/Appointment.vue')
  },
  {
    path: '/annoucement',
    name: 'Annoucement',
    component: () => import('../views/Annoucement.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
