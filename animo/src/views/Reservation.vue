<template>
<div>
    <Navbar/>
    <div style="padding-top:52px">
        <NavbarSide/>
    </div>
<div class="Content1">
        <div class="Content2">
            <h2><font-awesome-icon class="icon" icon="file-medical"/>การจอง</h2>
            <div class="line">
              <h3><font-awesome-icon class="icon" icon="search" />ค้นหา</h3>
              <vs-input v-model="search" placeholder="ค้นหา..." />
            </div>
            <h4 class="list">รายการทั้งหมด {{ $vs.getSearch(reservations, search).length }} รายการ</h4>
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
                    <vs-tr :key="i" v-for="(data, i) in $vs.getPage($vs.getSearch(reservations, search), page, max)" :data="data">
                      <vs-td>{{ data.resId }}</vs-td>
                      <vs-td>{{ data.pet.owner.firstName+" "+data.pet.owner.lastName }}</vs-td>
                      <vs-td>{{ format_date(data.date) }}</vs-td>
                      <vs-td>{{ data.time }}</vs-td>
                      <vs-td>{{ data.pet.name }}</vs-td>
                      <vs-td>
                        <vs-button color="#9ece6c" @click="active=!active, test(data._id)" class="BT">
                               ยืนยัน
                        </vs-button>
                        <vs-button color="#ca7676" @click="cancelReservation(data._id)" class="BTdel">
                               ยกเลิก
                        </vs-button>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
                <div class="center">
                  <vs-pagination infinite v-model="page" :length="$vs.getLength($vs.getSearch(reservations, search), max)" />
                </div>
            </div>

                      <vs-dialog width="550px" v-model="active">
        <template #header>
          <font class="font">
            ยืนยัน<b>การจอง</b>
          </font>
        </template>


        <div class="con-content">
            <br><br><br><br>
        </div>

        <template #footer>
          <div class="footer">
            <vs-button dark class="BT2" @click="active=!active">
              ยกเลิก
            </vs-button>
            <vs-button color="#71cf9d" class="BT1" @click="active=!active, confirmReservation(),AddNoti('bottom-right',1500,'#57c496')">
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
import mixins from '../mixins.js'

export default {
  name: 'Reservation',
  mixins: [mixins],
  components: {
    Navbar,
    NavbarSide
  },
  data:() => ({
    page: 1,
    max: 5,
    value : '',
    search: '',
    active: false,
    users: [],
    reservations: [],
    reserved: ''
    }),
  created(){
    this.load();
  },
  methods: {
    AddNoti(position = null ,duration ,color) {
          this.$vs.notification({
            color,
            duration,
            position,
            title: 'ยืนยันข้อมูลสำเร็จ',
            text: `ยืนยันรายการข้อมูลที่เลือกสำเร็จ`
          })
        },
    EditNoti(position = null ,duration ,color) {
         this.$vs.notification({
            color,
            duration,
            position,
            title: 'แก้ไขข้อมูลสำเร็จ',
            text: `แก้ไขรายการข้อมูลที่เลือกสำเร็จ`
          })
        },
    DeleteNoti(position = null ,duration ,color) {
         this.$vs.notification({
            color,
            duration,
            position,
            title: 'ลบข้อมูลสำเร็จ',
            text: `ลบรายการข้อมูลที่เลือกสำเร็จ`
          })
        },
    load() {
      let baseURL = 'http://localhost:4000/api/reservations/';

      axios.get(baseURL).then((res)=>{
        this.reservations = res.data.reservation;
        console.log(res.data);
      }).catch((error)=> {
        console.log(error);
      });
    },

    confirmReservation() {
      let baseURL = 'http://localhost:4000/api/reservations/confirm/';

      axios.patch(baseURL+this.reserved, {
        doctor: 'staff'
      }).then(() => {
        console.log(this.reserved)
        this.reserved = '';
        this.load();
      }).catch((error) => {
          console.log(error);
      });
      
    },
    cancelReservation(id) {
      let baseURL = 'http://localhost:4000/api/reservations/';
      console.log('id: '+id);
      axios.delete(baseURL+id).then((res) => {
        console.log(res)
        this.load();
      }).catch((error) => {
          console.log(error);
      });
      
    },
    test(id){
      this.reserved = id;
      console.log(this.reserved)
    }
  },
};

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
.list{
  color: #adadad;
  margin: 5px;
  font-size: 14px;
  font-weight: 500;
  float: right;
}
.font {
  font-size: 20px;
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
.BTdel{
background: rgb(197, 94, 94);
  background: linear-gradient(
    45deg,
    rgba(197, 94, 94, 1) 0%,
    rgba(248, 139, 109, 1) 100%
  );
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
::v-deep .vs-dialog__header {
  float: left;
  color: #696969;
  padding: 20px 0px 0px 20px;
}
::v-deep .vs-dialog__content {
  padding: 25px 30px;
}
::v-deep .vs-input {
  width: 350px;
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
::v-deep .vs-table_not-found td {
  color: #696969;
}
</style>