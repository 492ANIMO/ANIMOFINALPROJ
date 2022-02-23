import axios from 'axios'
import store from '../store/index';

export const getBookableTimes = (date) => {

  const baseURL = "http://localhost:4000/api/timeslots/";
  axios.post(baseURL,{
    'date': date
  })
  .then((res) => {
    const bookableTimes = res.data.bookableTimes;
    console.log("bookableTime");
    console.log(bookableTimes);
    store.commit('setBookableTimes', res.data.bookableTimes);
  })
  .catch((error) => {
    console.log(error);
  });


}