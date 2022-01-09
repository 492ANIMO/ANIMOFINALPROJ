import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import Vuesax from './plugins/vuesax'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { faSyringe } from '@fortawesome/free-solid-svg-icons'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faChartPie)
library.add(faPaw)
library.add(faSyringe)
library.add(faFileMedical)
library.add(faClipboardList)
library.add(faNewspaper)
library.add(faPowerOff)
library.add(faSearch)
library.add(faPlus)
library.add(faInfoCircle)
library.add(faAddressCard)
library.add(faEnvelope)
library.add(faPhoneSquareAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  Vuesax,
  render: h => h(App)
}).$mount('#app')
