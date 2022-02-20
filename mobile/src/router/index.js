import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/mobile/mypet',
    name: 'Mypet',
    component: () => import('../views/Mypet.vue')
  },
  {
    path: '/mobile/addpet',
    name: 'Addpet',
    component: () => import('../views/Addpet.vue')
  },
  {
    path: '/mobile/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/mobile/package',
    name: 'Package',
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
    component: () => import('../views/EditProfile.vue')
  },
  {
    path: '/mobile/appointment',
    name: 'Appointment',
    component: () => import('../views/Appointment.vue')
  },
  {
    path: '/mobile/history',
    name: 'History',
    component: () => import('../views/History.vue')
  },
  {
    path: '/mobile/step0',
    name: 'Step0',
    component: () => import('../views/Step0.vue')
  },
  {
    path: '/mobile/step1',
    name: 'Step1',
    component: () => import('../views/Step1.vue')
  },
  {
    path: '/mobile/step2',
    name: 'Step2',
    component: () => import('../views/Step2.vue')
  },
  {
    path: '/mobile/step3',
    name: 'Step3',
    component: () => import('../views/Step3.vue')
  },
  {
    path: '/mobile/annoucement',
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
