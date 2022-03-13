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
  getCurrentDate(){
    const date = new Date();
    // console.log(date)
    const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
    // console.log(dateString)
    return dateString;
  }

 }
}
