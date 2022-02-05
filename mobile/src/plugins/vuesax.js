import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

Vue.use(Vuesax, {
    colors: {
      primary:'#48c689',
      success:'#6bbac6',
      danger:'#dd6262',
      warning:'rgb(255, 130, 0)',
      dark:'rgb(105,105,105)',
    }
  })

export default Vuesax