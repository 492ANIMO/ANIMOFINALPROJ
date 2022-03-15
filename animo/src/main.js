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
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'


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
library.add(faChartPie)
library.add(faTrashAlt)
library.add(faEdit)
library.add(faDog)
library.add(faNotesMedical)
library.add(faUser)


import Highchart from "highcharts/highcharts";
import HighchartsVue from "highcharts-vue";
import stockInit from "highcharts/modules/stock";
import Vuelidate from 'vuelidate'

stockInit(Highchart);
Vue.use(HighchartsVue);
Vue.use(Vuelidate);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


new Vue({
  router,
  Vuesax,
  render: h => h(App)
}).$mount("#app");
