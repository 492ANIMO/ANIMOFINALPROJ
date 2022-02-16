import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Mypet',
    component: () => import('../views/Mypet.vue')
  },
  {
    path: '/addpet',
    name: 'Addpet',
    component: () => import('../views/Addpet.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/package',
    name: 'Package',
    component: () => import('../views/Package.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: () => import('../views/Appointment.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue')
  },
  {
    path: '/step0',
    name: 'Step0',
    component: () => import('../views/Step0.vue')
  },
  {
    path: '/step1',
    name: 'Step1',
    component: () => import('../views/Step1.vue')
  },
  {
    path: '/step2',
    name: 'Step2',
    component: () => import('../views/Step2.vue')
  },
  {
    path: '/step3',
    name: 'Step3',
    component: () => import('../views/Step3.vue')
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
