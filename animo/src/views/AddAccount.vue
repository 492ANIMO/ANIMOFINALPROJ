<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <vs-button
          color="#6b9bce"
          @click="active3 = !active3"
          class="BTadd BT2"
        >
          <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มบัญชี
        </vs-button>

        <h2>
          <font-awesome-icon class="icon" icon="user" />บัญชีทั้งหมด
        </h2>

        <div class="line">
          <h3><font-awesome-icon class="icon" icon="search" />ค้นหา</h3>
          <vs-input v-model="search" placeholder="ค้นหา..." />
        </div>

        <h4 class="list">รายการทั้งหมด {{ staffs.length }} รายการ</h4>
        <template>
          <div class="center examplex">
            <vs-table striped>
              <template #thead>
                <vs-tr>
                  <vs-th> ชื่อบัญชี </vs-th>
                  <vs-th> อีเมลล์ </vs-th>
                  <vs-th> ตำแหน่ง </vs-th>
                  <vs-th> จัดการข้อมูล </vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr :key="i" v-for="(data, i) in staffs" :data="data">
                  <vs-td> {{ data.profile.firstName + ' ' + data.profile.lastName }} </vs-td>
                  <vs-td> {{ data.email }} </vs-td>
                  <vs-td> {{ data.profile.position }} </vs-td>
                  <vs-td>
                    <vs-button
                      color="#ca7676"
                      @click=" deleteStaff(data._id), (active = !active)"
                      class="BT1"
                      style="width: 70px"
                    >
                      ลบ<font-awesome-icon
                        class="iconBTl"
                        style="font-size: 10px"
                        icon="trash-alt"
                      />
                    </vs-button>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </template>
      </div>

      <vs-dialog width="80%" scroll v-model="active3">
        <template #header>
          <h2>เพิ่มบัญชี</h2>
        </template>

        <vs-row>
          <vs-row>
          <vs-col w="6">
            <div class="InputPop">
              <vs-input
                label="ชื่อ"
                v-model="value"
                placeholder="ชื่อ"
              />
            </div>
          </vs-col>
          <vs-col w="6">
            <div class="InputPop">
              <vs-input
                label="นามสกุล"
                placeholder="นามสกุล"
                v-model="value"
              >
              </vs-input>
            </div>
          </vs-col>
        </vs-row><br><br><br>
        
          <vs-col w="6">
            <div class="InputPop">
              <vs-input
                label="ชื่อผู้ใช้"
                v-model="staff.firstName"
                placeholder="ชื่อผู้ใช้..."
              />
            </div>
          </vs-col>
          <vs-col w="6">
            <div class="InputSL">
              <vs-select
                label="ตำแหน่ง"
                placeholder="ตำแหน่ง"
                v-model="staff.position"
                class="type"
              >
                <vs-option label="สตาฟ" value="staff"> สตาฟ </vs-option>
                <vs-option label="แอดมิน" value="admin"> แอดมิน </vs-option>
                <vs-option label="สัตวแพทย์" value="vet"> สัตวแพทย์ </vs-option>
              </vs-select>
            </div>
          </vs-col>
        </vs-row><div class="space"></div>

        <vs-row>
          <vs-col w="6">
            <div class="InputPop">
              <vs-input
                label="อีเมลล์"
                v-model="staff.email"
                placeholder="อีเมลล์"
              />
            </div>
          </vs-col>
          <vs-col w="6">
            <div class="InputPop">
              <vs-input
                label="รหัสผ่าน"
                placeholder="รหัสผ่าน"
                v-model="staff.password"
              >
              </vs-input>
            </div>
          </vs-col>
        </vs-row>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              class="BT3"
              color="#71cf9d"
              @click="(active3 = !active3), createStaffUser()"
              style="float: right; width: 80px"
            >
              เพิ่มบัญญชี </vs-button
            ><br /><br />
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/NavbarAdmin.vue";
import NavbarSide from "@/components/NavbarSideAdmin.vue";
import axios from "axios";
import mixins from "../mixins.js";

export default {
  name: "AddVaccine",
  components: {
    Navbar,
    NavbarSide,
  },
  mixins: [mixins],
  data: () => ({
    active: false,
    active1: false,
    active3: false,
    value: "",
    search: "",

    treatments: [],
    treatment: {
      name: "",
      type: "",
      petType: "",
      age: "",
      detail: "",
    },
    petType: ["สุนัข", "แมว", "สัตว์ฟันแทะ", "อื่นๆ"],
    staffs: [],
    staff:{
      firstName: '',
      lastName: 'animo',
      email: '',
      position: '',
      password: '',
      role: 'staff'
    }
  }),
  created() {
    this.fetchPetType();
    this.fetchStaff();
  },
  methods: {
    fetchPetType() {
      let baseURL = "http://localhost:4000/api/pets/petType";
      axios
        .get(baseURL)
        .then((res) => {
          this.petType = res.data.petTypes;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchStaff() {
      let baseURL = "http://localhost:4000/api/users/staff";
      axios
        .get(baseURL)
        .then((res) => {
          this.staffs = res.data.user;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
 
    createStaffUser() {
      let baseURL = "http://localhost:4000/api/users/";

      axios
        .post(baseURL, this.staff)
        .then((res) => {
          this.staff = {
            firstName: '',
            lastName: 'animo',
            email: '',
            position: '',
            password: '',
            role: 'staff'
          }
          console.log(res.data);
          this.fetchStaff();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteStaff(id) {
      let baseURL = "http://localhost:4000/api/users/staff/";
      console.log(`id: ${id}`);

      axios
        .delete(baseURL + id, id)
        .then((res) => {
          console.log(res.data);

          this.fetchStaff();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
@import url("../assets/css/style.css");

.container-box {
  display: grid;
  grid: auto / 45% 43% 12%;
  padding: 30px 0px 0px 40px;
}
.HeadInput {
  font-size: 14.25px;
  color: #696969;
  font-weight: 400;
  margin: 0px;
  margin-top: 8px;
  margin-bottom: 2px;
}
.TArea {
  margin-left: 10px;
  width: 680px;
  background: #f4f7f8;
  padding: 12px;
  border-radius: 10px;
  border: none;
  color: #696969;
  font-family: kanit;
  resize: none;
  transition: 0.3s all;
}
.TArea:focus-visible {
  outline: none;
  padding-left: 17px;
  background: #f0f3f4;
}
.TArea::placeholder {
  color: #afb7be;
  font-size: 13px;
}
::v-deep .InputLast .vs-input-content {
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
::v-deep .DateFilter .vs-input {
  width: 200px;
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
  width: 33%;
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
