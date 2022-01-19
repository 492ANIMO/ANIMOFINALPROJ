<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <vs-button color="#6b9bce" @click="active1 = !active1, getClients()" class="BTadd">
          <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มข้อมูล
        </vs-button>
        <h2>
          <font-awesome-icon class="icon" icon="clipboard-list" />Appointment
        </h2>
        <div class="line">
          <h3>วันที่นัดหมาย</h3>
          <vs-input type="date" v-model="value" />
        </div>
        <h4 class="list">รายการทั้งหมด {{ resultCount }} รายการ</h4>
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
            <vs-tr :key="i" v-for="(data, i) in appointments" :data="data">
              <vs-td>{{ data._id }}</vs-td>
              <vs-td>{{
                data.pet.owner.firstName + " " + data.pet.owner.lastName
              }}</vs-td>
              <vs-td>{{ format_date(data.date) }}</vs-td>
              <vs-td>{{ data.time }}</vs-td>
              <vs-td>{{ data.pet.name }}</vs-td>
              <vs-td>
                <vs-button color="#6b9bce" @click="active2 = !active2" class="BT">
                  ดูข้อมูล<font-awesome-icon
                    class="iconBTl"
                    style="font-size: 10px"
                    icon="info-circle"
                  />
                </vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div class="center">
          <vs-pagination
            infinite
            v-model="page"
            :length="$vs.getLength(appointments, max)"
          />
        </div>
      </div>

      <vs-dialog width="80%" scroll v-model="active1">
        <template #header>
          <h2>เพิ่มการนัดหมาย</h2>
        </template>

        <vs-row>
           <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputSL">
              <vs-select
                filter
                label="ชื่อเจ้าของสัตว์เลี้ยง"
                placeholder="ชื่อเจ้าของสัตว์เลี้ยง"
                v-model="value"
                class="type"
              >
                <vs-option label="สมศรี" value="สมศรี"> สมศรี มณีแสง </vs-option>
                <vs-option label="เมธี" value="เมธี"> เมธี หีบหงส์ </vs-option>
              </vs-select>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputSL">
              <vs-select
                label="ชื่อสัตว์เลี้ยง"
                placeholder="ชื่อสัตว์เลี้ยง"
                v-model="value"
                class="type"
              >
                <vs-option label="Bento" value="Bento"> Bento </vs-option>
                <vs-option label="Oreo" value="Oreo"> Oreo </vs-option>
              </vs-select>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>
        <vs-row>
         <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
               disabled
                v-model="value"
                label="ประเภทสัตว์"
                placeholder="ประเภทสัตว์"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                 disabled
                    v-model="value"
                    label="เพศ"
                    placeholder="เพศ"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
               <vs-col w="2">
                <div class="InputPop">
                  <vs-input
                 disabled
                    v-model="value"
                    label="น้ำหนัก"
                    placeholder="กิโลกรัม"
                    class="InputLast"
                  ></vs-input>
                </div>
              </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputSL">
              <vs-select
                filter
                label="ประเภทการนัดหมาย"
                placeholder="ประเภทการนัดหมาย"
                v-model="value"
                class="type"
              >
                <vs-option label="นัดจากการจอง" value="นัดจากการจอง"> นัดจากการจอง </vs-option>
                <vs-option label="นัดโดยแพทย์" value="นัดโดยแพทย์"> นัดโดยแพทย์ </vs-option>
              </vs-select>
            </div>
          </vs-col>
         <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                 type="date"
                    v-model="value"
                    label="วันที่นัดหมาย"
                    class="Date"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
               <vs-col w="2">
                <div class="InputPop">
                  <vs-input
               type="time"
                    v-model="value"
                    label="เวลานัดหมาย"
                    class="InputLast"
                  ></vs-input>
                </div>
              </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" class="DtPg" w="12">
                <div class="InputPop">
                  <vs-input
                    v-model="value"
                    label="รายละเอียด"
                    placeholder="รายละเอียด"
                  ></vs-input>
                </div>
              </vs-col>
        </vs-row>
        <div class="space"></div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
            class="BT1"
              color="#71cf9d"
              @click="active1 = !active1"
              style="float: right; width: 80px"
            >
              บันทึก </vs-button
            ><br /><br />
          </div>
        </template>
      </vs-dialog>

      <vs-dialog width="80%" scroll v-model="active2">
        <template #header>
          <h2>การตรวจรักษา</h2>
        </template>

        <vs-row>
           <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputSL">
              <vs-select
                filter
                state="success"
                label="ชื่อเจ้าของสัตว์เลี้ยง"
                placeholder="ชื่อเจ้าของสัตว์เลี้ยง"
                v-model="value"
                class="type"
              >
                <vs-option label="สมศรี" value="สมศรี"> สมศรี มณีแสง </vs-option>
                <vs-option label="เมธี" value="เมธี"> เมธี หีบหงส์ </vs-option>
              </vs-select>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputSL">
              <vs-select
              state="success"
                label="ชื่อสัตว์เลี้ยง"
                placeholder="ชื่อสัตว์เลี้ยง"
                v-model="value"
                class="type"
              >
                <vs-option label="Bento" value="Bento"> Bento </vs-option>
                <vs-option label="Oreo" value="Oreo"> Oreo </vs-option>
              </vs-select>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>
        <vs-row>
         <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
               disabled
               state="success"
                v-model="value"
                label="ประเภทสัตว์"
                placeholder="ประเภทสัตว์"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                 disabled
                 state="success"
                    v-model="value"
                    label="เพศ"
                    placeholder="เพศ"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
               <vs-col w="2">
                <div class="InputPop">
                  <vs-input
                 disabled
                 state="success"
                    v-model="value"
                    label="น้ำหนัก"
                    placeholder="กิโลกรัม"
                    class="InputLast"
                  ></vs-input>
                </div>
              </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputSL">
              <vs-select
                filter
                state="success"
                label="ประเภทการนัดหมาย"
                placeholder="ประเภทการนัดหมาย"
                v-model="value"
                class="type"
              >
                <vs-option label="นัดจากการจอง" value="นัดจากการจอง"> นัดจากการจอง </vs-option>
                <vs-option label="นัดโดยแพทย์" value="นัดโดยแพทย์"> นัดโดยแพทย์ </vs-option>
              </vs-select>
            </div>
          </vs-col>
         <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                  state="success"
                 type="date"
                    v-model="value"
                    label="วันที่นัดหมาย"
                    class="Date"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
               <vs-col w="2">
                <div class="InputPop">
                  <vs-input
                  state="success"
               type="time"
                    v-model="value"
                    label="เวลานัดหมาย"
                    class="InputLast"
                  ></vs-input>
                </div>
              </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" class="DtPg" w="12">
                <div class="InputPop">
                  <vs-input
                  state="success"
                    v-model="value"
                    label="รายละเอียด"
                    placeholder="รายละเอียด"
                  ></vs-input>
                </div>
              </vs-col>
        </vs-row>
        <div class="space"></div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
            class="BT1"
              color="#71cf9d"
              @click="active2 = !active2"
              style="float: right; width: 80px"
            >
              บันทึก </vs-button
            ><br /><br />
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import NavbarSide from "@/components/NavbarSide.vue";
import axios from "axios";
import mixins from "../mixins";

export default {
  name: "Appointment",
  components: {
    Navbar,
    NavbarSide,
  },
  mixins: [mixins],
  data: () => ({
    page: 1,
    max: 5,
    active: false,
    active1: false,
    active2: false,
    value: "",
    users: [],
    appointments: [],
  }),
  created() {
    this.load();
  },
  methods: {
    load() {
      let baseURL = "http://localhost:4000/api/appointments/";

      axios
        .get(baseURL)
        .then((res) => {
          this.appointments = res.data.appointment;

          console.log(this.appointments);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    resultCount() {
      return this.appointments && this.appointments.length;
    },
  },
};
</script>
<style scoped>
h2 {
  margin: 0px 0px 5px 0px;
  color: #696969;
  font-weight: 500;
}
h3 {
  margin: 0px;
  color: #adadad;
  font-weight: 500;
  margin-left: 30px;
}
.list {
  color: #adadad;
  margin: 5px;
  font-size: 14px;
  font-weight: 500;
  float: right;
}
.line {
  display: flex;
  padding-bottom: 20px;
}
.BT {
  background: rgb(94, 184, 204);
  background: linear-gradient(
    45deg,
    rgba(94, 184, 204, 1) 0%,
    rgba(68, 157, 222, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
}
.BT1 {
  background: rgb(157, 209, 103);
  background: linear-gradient(
    45deg,
    rgba(157, 209, 103, 1) 0%,
    rgba(99, 209, 157, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
}
.BTadd {
  background: rgb(142, 157, 211);
  background: linear-gradient(
    45deg,
    rgba(142, 157, 211, 1) 0%,
    rgba(86, 164, 215, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  float: right;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
}
.InputSL {
  margin-top: -3px;
  margin-left: 10px;
  display: block;
}
::v-deep .InputLast .vs-input-content  {
  max-width: 170px;
}
::v-deep .vs-input__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -20px;
  margin-top: -5px;
}
::v-deep .vs-dialog__header {
  float: left;
  color: #696969;
  padding: 20px 0px 0px 20px;
}
::v-deep .InputPop .vs-input {
  width: calc(100% - 20px);
}
::v-deep .InputSM .vs-input {
  width: 41%;
}
::v-deep .vs-input {
  width: 350px;
  height: 35px;
  font-family: kanit;
}
::v-deep .Date .vs-input {
  font-size: 11.5px;
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
  font-size: 15px;
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
::v-deep .vs-dialog__content {
  padding: 25px 30px;
}
::v-deep .vs-table__td {
  padding: 5px 12px;
}
::v-deep .vs-table_not-found td {
  color: #696969;
}
::v-deep .vs-table__tr:first-of-type .vs-table__td:first-child {
  width: 25%;
}
::v-deep .vs-select__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -15px;
  margin-top: -5px;
}
button.vs-select__option {
  font-family: kanit;
  margin: 10px;
  padding: 0px;
  margin: 8px;
  width: 95%;
  background: #ffffff;
}
::v-deep .vs-select__input {
  min-height: 36px;
  max-height: 30px;
  font-family: kanit;
  min-width: 100%;
}
::v-deep .type .vs-select {
  width: 335px;
}
button.vs-select__option {
  font-family: kanit;
  margin: 10px;
  padding: 0px;
  margin: 8px;
  width: 80% !important;
  color: #696969;
}
.vs-select__option.isMultiple:hover {
  padding: 0px !important;
}
.vs-select__option:hover {
  margin-left: 5px;
  padding: 0px;
}
::v-deep .small .vs-select {
  width: 145px;
}
::v-deep .DtPg .vs-input {
  min-width: 700px;
}
</style>
