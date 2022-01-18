<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
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
                <vs-button color="#6b9bce" @click="active = !active" class="BT">
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

      <vs-dialog width="80%" scroll v-model="active">
        <template #header>
          <h2>การตรวจรักษา</h2>
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
            <div class="InputSL">
              <vs-select
                label="ประเภทสัตว์"
                placeholder="ประเภทสัตว์"
                v-model="value"
                class="type"
              >
                <vs-option label="สุนัข" value="สุนัข"> สุนัข </vs-option>
                <vs-option label="แมว" value="แมว"> แมว </vs-option>
              </vs-select>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="value"
                label="อีเมลล์"
                placeholder="อีเมลล์"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="value"
                label="เบอร์โทร"
                placeholder="เบอร์โทร"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="value"
                label="ที่อยู่"
                placeholder="บ้านเลขที่, หมู่ที่, ซอย, ถนน"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="value"
                label="จังหวัด"
                placeholder="จังหวัด"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col
            vs-type="flex"
            class="InputSM"
            vs-justify="center"
            vs-align="center"
            w="2"
          >
            <div class="InputPop">
              <vs-input
                v-model="value"
                label="ตำบล"
                placeholder="ตำบล"
              ></vs-input>
            </div>
          </vs-col>
          <div class="space"></div>
          <vs-col
            vs-type="flex"
            class="InputSM"
            vs-justify="center"
            vs-align="center"
            w="2"
          >
            <div class="InputPop">
              <vs-input
                v-model="value"
                label="อำเภอ"
                placeholder="อำเภอ"
              ></vs-input>
            </div>
          </vs-col>
          <div class="space"></div>
          <vs-col
            vs-type="flex"
            class="InputSM"
            vs-justify="center"
            vs-align="center"
            w="2"
          >
            <div class="InputPop">
              <vs-input
                v-model="value"
                label="รหัสไปรษณีย์"
                placeholder="รหัสไปรษณีย์"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              color="#71cf9d"
              @click="active = !active"
              style="float: right; width: 80px"
            >
              ยืนยัน </vs-button
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
.BTadd {
  display: inline-block;
  padding: 4px 13px;
  color: #ffffff;
  border-radius: 20px;
  font-size: 14px;
  float: right;
  margin-top: 5px;
}
.iconBTr {
  padding-right: 5px;
  margin-left: -3px;
}
.iconBTl {
  padding-left: 5px;
  margin-right: -3px;
}
.InputSL {
  margin-top: -3px;
  margin-left: 10px;
  display: block;
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
  color: #696969;
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
</style>
