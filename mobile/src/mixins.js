import moment from 'moment'

export default {
 methods: {
  format_date(value){
    if (value) {
      // let date = value.split("T")[0]
      // let time = value.split("T")[1]
      return moment(String(value)).format("DD/MM/YYYY")
    }
  },
  format_date2(value){
    if (value) {
      // let date = value.split("T")[0]
      // let time = value.split("T")[1]
      return value.toISOString().split('T')[0]
    }
  },

 }
}
