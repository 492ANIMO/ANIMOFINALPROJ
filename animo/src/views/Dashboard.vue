<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="ContentGarph">
        <div class="Content-0">
          <div class="Content-0-1">
            <h2>จำนวนสัตว์ที่เข้ารับการรักษา</h2>
            <template>
              <div id="app">
                <Chart />
              </div>
            </template>
          </div><br>
          <div class="Content-1-2">
            <h2>ผู้ใช้ใหม่วันนี้</h2>
            <h3 style="color: #2aa8cf">20</h3>
            <h2>ผู้ใช้ทั้งหมด</h2>
            <h3 style="color: #2f6dc2">200</h3>
          </div>
        </div>
        <div class="Content-1-box">
          <div class="Content-1">
            <h4 class="head-type">ประเภทสัตว์</h4>
            <template>
              <div id="app">
                <PieChart class="p-chart" />
              </div>
            </template>
          </div>
          <br />
          <div class="Content-1-1">
           <h4>การนัดหมาย</h4>
           <br>
           <div>
              <div class="g-box">
                <h5>วันนี้</h5>
                <div>
                  <h3 style="color: #2fc0a7">{{ todayAppointment }}</h3>
                </div>
              </div>
            </div>
            <div>
              <div class="g-box">
                <h5>ทั้งหมด</h5>
                <div>
                  <h3 style="color: #32a0be">{{ totalAppointment }}</h3>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div class="Content-1-1">
            <h4 class="over">การจองแพ็คเกจ</h4>
            <br>
           <div>
              <div class="g-box">
                <h5>วันนี้</h5>
                <div>
                  <h3 style="color: #8d66b8">{{ todayReservation }}</h3>
                </div>
              </div>
            </div>
            <div>
              <div class="g-box">
                <h5>ทั้งหมด</h5>
                <div>
                  <h3 style="color: #5a62c6">{{ totalReservation }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import NavbarSide from "@/components/NavbarSide.vue";
import Chart from "@/components/Chart";
import PieChart from "@/components/PieChart";
import axios from 'axios';

export default {
  name: "Dashboard",
  components: {
    Navbar,
    NavbarSide,
    Chart,
    PieChart,
  },
  data: () => ({
    todayAppointment: '0',
    totalAppointment: '0',
    todayReservation: '0',
    totalReservation: '0',
  }),
  methods: {
    getTodayAppointment(type, date){
      // DATE FORMAT : 'YYYY-MM-DD'
      if(date==='today'){ //if date = null -> today
        date = new Date().toISOString()
        date = date.split('T')[0];
      }
      if(!type||type==='') type = null

      const params = {
        type: type,
        date: date,
      }

      let baseURL = "http://localhost:4000/api/appointments/today/";
      axios
        .get(`${(baseURL)}`,{params})
        .then((res) => {
          this.todayAppointment = res.data.appointment.length
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTotalAppointment(){
      let baseURL = "http://localhost:4000/api/appointments/";
      axios
        .get(`${(baseURL)}`)
        .then((res) => {
          this.totalAppointment = res.data.appointment.length
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTotalReservation(){
      let baseURL = "http://localhost:4000/api/reservations/";
      axios
        .get(`${(baseURL)}`)
        .then((res) => {
          this.totalReservation = res.data.reservation.length
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTodayReservation(){
      let baseURL = "http://localhost:4000/api/reservations/today";
      axios
        .get(`${(baseURL)}`)
        .then((res) => {
          this.todayReservation = res.data.reservation.length
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created(){
    this.getTodayAppointment(null ,'today');
    this.getTotalAppointment();
    this.getTodayReservation();
    this.getTotalReservation();


  }
};
</script>
<style scoped>
h2 {
  margin: 0px 0px 5px 0px;
  color: #696969;
  font-weight: 500;
}
h4 {
  margin-top: -5px;
  margin-bottom: 0px;
  color: #696969;
  font-weight: 500;
  font-size: 20px;
}
.over {
  width: 200%;
}
.head-type {
  position: absolute;
  z-index: 3;
  margin-top: -10px;
}
.p-chart {
  transform: translateY(-17%);
}
.g-box {
  text-align: center;
  color: #696969;
}
.g-box h5 {
  margin: 0px;
  font-weight: 500;
  font-size: 16px;
  color: #949494;
}
.g-box h3 {
  font-size: 42px;
  margin: 5px;
}
.Content-1-box {
  display: grid;
  grid: auto / auto 20px 30% 20px 30%;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
}
.Content-1 {
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  height: 170px;
  overflow: hidden;
}
.Content-0-1 {
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 15px;
  height: 400px;
  display: grid;
}
.Content-1-1 {
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 15px;
  height: 180px;
  display: grid;
  grid: auto / 50% 50%;
}
.Content-1-2 {
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 15px;
  height: 400px;
  display: grid;
  grid: 50px auto 50px auto / auto;
  align-items: center;
}
.Content-1-2 h3 {
  font-size: 50px;
  margin: 0px;
  text-align: center;
}
.Content-0 {
  display: grid;
  grid: auto / calc(70% - 20px) 20px auto;
}
.ContentGarph {
  position: absolute;
  left: calc(20% + 30px);
  width: calc(80% - 60px);
}
::v-deep .vs-dialog__content {
  padding: 25px 30px;
}
::v-deep .vs-dialog__header {
  float: left;
  color: #696969;
  padding: 20px 0px 0px 20px;
}
</style>
