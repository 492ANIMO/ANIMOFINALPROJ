<template>
<div>
    <Navbar/>
    <div style="padding-top:52px">
        <NavbarSide/>
    </div>
<div class="Content1">
        <div class="Content2">
            <h2><font-awesome-icon class="icon" icon="file-medical"/>Reservation</h2>
            <div class="line"><h3>จำนวนการจองต่อวัน</h3>
              <vs-input type="number" v-model="value" placeholder="ระบุจำนวน..." />
            </div>
                <vs-table striped>
                  <template #thead>
                    <vs-tr>
                      <vs-th>ไอดี</vs-th>
                      <vs-th>ชื่อเจ้าของสัตว์</vs-th>
                      <vs-th>วันที่</vs-th>
                      <vs-th>เวลา</vs-th>
                      <vs-th>ชื่อสัตว์เลี้ยง</vs-th>
                      <vs-th>จัดการข้อมูล</vs-th>
                    </vs-tr>
                  </template>
                  <template #tbody>
                    <vs-tr
                      :key="i"
                      v-for="(data, i) in reservations"
                      :data="data"
                    >
                      <vs-td>{{ data._id }}</vs-td>
                      <vs-td>{{ data.pet.owner.name }}</vs-td>
                      <vs-td>{{ data.date }}</vs-td>
                      <vs-td>{{ data.time }}</vs-td>
                      <vs-td>{{ data.pet.name }}</vs-td>
                      <vs-td>
                        <vs-button color="#9ece6c" @click="active=!active" class="BT">
                               ยืนยัน
                        </vs-button>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
                <div class="center">
                  <vs-pagination infinite v-model="page" :length="10" />
                </div>
            </div>

                      <vs-dialog width="550px" v-model="active">
        <template #header>
          <h4>
            ยืนยัน<b>การจอง</b>
          </h4>
        </template>


        <div class="con-content">
            <br><br><br><br>
        </div>

        <template #footer>
          <div class="footer">
            <vs-button dark class="BT2" @click="active=!active">
              ยกเลิก
            </vs-button>
            <vs-button color="#71cf9d" class="BT1" @click="active=!active">
              ยืนยัน
            </vs-button>
          </div>
        </template>

      </vs-dialog>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import NavbarSide from '@/components/NavbarSide.vue'
import axios from 'axios'

export default {
  name: 'Reservation',
  components: {
    Navbar,
    NavbarSide
  },
  data:() => ({
    page : 1,
    value : '',
    active: false,
    users: [
            {
              "id": 1,
              "name": "Leanne",
              "lastname": "Graham",
              "phone": "1/1/2022",
              "time": "12:30",
              "pet": "Bobby",
            },
            {
              "id": 2,
              "name": "Ervin",
              "lastname": "Antonette",
              "phone": "1/1/2022",
              "time": "12:30",
              "pet": "Oreo",
            },
            {
              "id": 3,
              "name": "Somsri",
              "lastname": "Howell",
              "phone": "1/1/2022",
              "time": "12:30",
              "pet": "Mu Mu",
            },
            {
              "id": 4,
              "name": "Somchai",
              "lastname": "Antonette",
              "phone": "1/1/2022",
              "time": "12:30",
              "pet": "Kitty",
            }
        ],
    reservations: [],
    }),
  created(){
    this.load();
  },
  methods: {
  load() {
      let baseURL = 'http://localhost:4000/api/reservations/';

      axios.get(baseURL).then((res)=>{
        this.reservations = res.data.reservation;
        console.log(res.data);
      }).catch((error)=> {
        console.log(error);
      });
    },
  }
}
</script>
<style scoped>
h2{
  margin: 0px 0px 5px 0px;
  color: #696969;
  font-weight: 500;
}
h3{
  margin: 0px;
  color: #adadad;
  font-weight: 500;
  margin-left: 30px;
}
.line {
  display: flex;
  padding-bottom: 20px;
}
.BT{
background: rgb(157,209,103);
background: linear-gradient(45deg, rgba(157,209,103,1) 0%, rgba(99,209,157,1) 100%);
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
}
.BTadd{
  display: inline-block;
  padding: 4px 13px;
  color: #ffffff;
  border-radius: 20px;
  font-size: 14px;
  float: right;
  margin-top: 5px;
}
.iconBTr{
  padding-right: 5px;
  margin-left: -3px;
}
.iconBTl{
  padding-left: 5px;
  margin-right: -3px;
  }
::v-deep .vs-input {
  width: 120px;
  height: 35px;
}
::v-deep .vs-input-content {
  width: 350px;
  margin-left: 10px;
  margin-top: -2px;
}
::v-deep .vs-pagination-content {
  padding-top: 20px;
}
::v-deep .vs-pagination__active {
  background: #3acad2;
  box-shadow: none;
  margin-top: 20px;
}
::v-deep .vs-table__th__content {
    color: #696969;
    text-align: center;
    justify-content: center;
    font-size:15px;
    padding: 5px;
}
::v-deep .vs-table__tr {
    color: #696969;
    text-align: center;
    justify-content: center;
    font-size: 13px;
    padding: 5px;
}
::v-deep .vs-button__content {
  font-family: kanit;
}
::v-deep .vs-dialog__header {
float: left;
color: #696969;
margin-top: -20px;
font-size: 19px;
}
::v-deep .footer .vs-button {
float: right;
font-family: kanit;
}
.BT1{
background: rgb(157,209,103);
background: linear-gradient(45deg, rgba(157,209,103,1) 0%, rgba(99,209,157,1) 100%);
display: inline-block;
color: #ffffff;
border-radius: 20px;
font-size: 13px;
font-weight: 500;
margin-bottom: 15px;
--vs-button-padding: 5px 20px;
}
.BT2{
background: rgb(130,140,146);
background: linear-gradient(45deg, rgba(130,140,146,1) 0%, rgba(106,106,106,1) 100%);
display: inline-block;
color: #ffffff;
border-radius: 20px;
font-size: 13px;
font-weight: 500;
margin-bottom: 15px;
--vs-button-padding: 5px 20px;
}
::v-deep .vs-table__td {
  padding: 5px 12px;
}
</style>