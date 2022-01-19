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

 }
}

// export default {
//  methods: {
//   format_date(value){
//     if (value) {
//       let date = value.split("T")[0]
//       let d = new Date(date).toLocaleDateString("th", {year: 'numeric', month: 'long', day: 'numeric'});
//       // console.log(typeof(date));
//       // console.log(d);

//       return d;

//     }
//   }
//  }
// }