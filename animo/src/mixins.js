import moment from 'moment'


export default {
 methods: {
  format_date(value){
    if (value) {
      let date = value.split("T")[0]
      // let time = value.split("T")[1]
      return moment(String(date)).format("DD/MM/YYYY")
    }
  }
 }
}