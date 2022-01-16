<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <vs-button color="#6b9bce" @click="active = !active" class="BTadd">
          <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มแพ็คเกจ
        </vs-button>
        <h2><font-awesome-icon class="icon" icon="syringe" />Package</h2>
        <div class="line">
          <h3><font-awesome-icon class="icon" icon="search" />ค้นหา</h3>
          <vs-input v-model="search" placeholder="search..." />
        </div>
        <h4 class="list">
          รายการทั้งหมด {{ $vs.getSearch(packages, search).length }} รายการ
        </h4>
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>ไอดีแพ็คเกจ</vs-th>
              <vs-th>ชื่อแพ็คเกจ</vs-th>
              <vs-th>รายละเอียด</vs-th>
              <vs-th>จัดการแพ็คเกจ</vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr
              :key="i"
              v-for="(data, i) in $vs.getPage(
                $vs.getSearch(packages, search),
                page,
                max
              )"
              :data="data"
            >
              <vs-td>{{ data._id }}</vs-td>
              <vs-td>{{ data.name }}</vs-td>
              <vs-td>{{ data.detail }}</vs-td>
              <vs-td>
                <vs-button
                  color="#6b9bce"
                  @click="(Detail1 = !Detail1), showPackage(data._id)"
                  class="BT"
                >
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
            :length="$vs.getLength($vs.getSearch(packages, search), max)"
          />
        </div>
      </div>

      <vs-dialog width="80%" scroll v-model="active">
        <template #header>
          <h2>เพิ่มแพ็คเกจสัตว์เลี้ยง</h2>
        </template>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="newPackage.name"
                label="ชื่อแพ็คเกจ"
                placeholder="ชื่อแพ็คเกจ"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputSL">
              <vs-select
                label="ประเภทสัตว์"
                placeholder="ประเภทสัตว์"
                v-model="newPackage.type"
              >
                <vs-option :key="i"
                  v-for="(type, i) in petType"
                  :value="type" :label="type"> {{ type }} </vs-option>
                
              </vs-select>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <div class="InputSL">
              <!-- <vs-select
                multiple
                label="รายการวัคซีน"
                placeholder="รายการวัคซีน"
                v-model="value1"
              >
                <vs-option
                  :key="i"
                  v-for="(vaccine, i) in vaccine_options"
                  :value1="vaccine._id"
                >
                  {{ vaccine.name }}
                </vs-option>
              </vs-select> -->

                <vs-select
                  multiple
                  label="รายการวัคซีน"
                  placeholder="รายการวัคซีน"
                  v-model="newPackage.vaccines"
                >
                  <vs-option :key="i"
                  v-for="(vaccine, i) in vaccine_options"
                  :value="vaccine" :label='vaccine.name' >
                    {{ vaccine.name }}
                  </vs-option>
                  
                </vs-select>
              <div>
                <vs-button
                  color="#72d2cf"
                  @click="active = !active"
                  class="BTaddData"
                >
                  <font-awesome-icon class="iconBTr" icon="plus" />เพิ่ม
                </vs-button>
              </div>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <div class="InputSL">
               <vs-select
                  multiple
                  label="รายการรักษา"
                  placeholder="รายการรักษา"
                  v-model="newPackage.treatments"
                >
                  <vs-option :key="i"
                  v-for="(treatment, i) in treatment_options"
                  :value="treatment" :label='treatment.name' >
                    {{ treatment.name }}
                  </vs-option>
                  
                </vs-select>
              <div>
                <vs-button
                  color="#72d2cf"
                  @click="active = !active"
                  class="BTaddData"
                >
                  <font-awesome-icon class="iconBTr" icon="plus" />เพิ่ม
                </vs-button>
              </div>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <div class="">
              <vs-select
                  multiple
                  label="รายการตรวจสุขภาพ"
                  placeholder="รายการตรวจสุขภาพ"
                  v-model="newPackage.healthChecks"
                >
                  <vs-option :key="i"
                  v-for="(healtCheck, i) in healthCheck_options"
                  :value="healtCheck" :label='healtCheck.name' >
                    {{ healtCheck.name }}
                  </vs-option>
                  
                </vs-select>
              <div>
                <vs-button
                  color="#72d2cf"
                  @click="active = !active"
                  class="BTaddData"
                >
                  <font-awesome-icon class="iconBTr" icon="plus" />เพิ่ม
                </vs-button>
              </div>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="newPackage.price"
                label="ราคาสุทธิ"
                placeholder="ราคาสุทธิ(บาท)"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" class="DtPg" w="12">
            <div class="InputPop">
              <vs-input
                v-model="newPackage.detail"
                label="รายละเอียด"
                placeholder="รายละเอียด"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col w="6">
            <div class="InputSL">
              <div class="TextArea">
                <h5 class="AddPG">รายการทั้งหมด</h5>
                <p :key="i" v-for="(vaccine, i) in newPackage.vaccines">
                    {{ vaccine.name }}
                </p>
                <p :key="i" v-for="(treatment, i) in newPackage.treatments">
                    {{ treatment.name }}
                </p>
                <p :key="i" v-for="(healthCheck, i) in newPackage.healthChecks">
                    {{ healthCheck.name }}
                </p>
              </div>
            </div>
          </vs-col>
        </vs-row>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              primary
              @click="(active1 = !active1), createPackage()"
              class="BT1"
              style="float: right; width: 80px"
            >
              ยืนยัน </vs-button
            ><br /><br />
          </div>
        </template>
      </vs-dialog>

      <vs-dialog width="80%" scroll v-model="Detail1">
        <template #header>
          <h2>ข้อมูลแพ็คเกจสัตว์เลี้ยง</h2>
        </template>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
              state="success"
                v-model="newPackage.name"
                label="ชื่อแพ็คเกจ"
                placeholder="ชื่อแพ็คเกจ"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputSL">
              <vs-select
              state="success"
                label="ประเภทสัตว์"
                placeholder="ประเภทสัตว์"
                v-model="newPackage.type"
              >
                <vs-option value1="1"> สนัข </vs-option>
                <vs-option value1="2"> แมว </vs-option>
                <vs-option value1="3"> นก </vs-option>
                <vs-option value1="4"> อื่นๆ </vs-option>
              </vs-select>
            </div>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col w="12">
            <div class="InputPop">
              <h4 class="HeadInput">รายการทั้งหมด</h4>
              <div class="DetailPK">
                <h4 class="DetailText">
                  รายการทั้งหมด
                </h4>
              </div>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
              state="success"
                v-model="newPackage.price"
                label="ราคาสุทธิ"
                placeholder="ราคาสุทธิ(บาท)"
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
                v-model="newPackage.detail"
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
              primary
              @click="(active1 = !active1), createPackage()"
              class="BT1"
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

export default {
  name: "Package",
  components: {
    Navbar,
    NavbarSide,
  },
  data: () => ({
    page: 1,
    max: 5,
    search: "",
    value: [],
    value1: [],
    active: false,
    Detail1: false,
    petType:[
      'สุนัข',
      'แมว',
      'นก',
      'อื่นๆ',
    ],
    packages: [],

    vaccine_options: [],
    treatment_options: [],
    healthCheck_options: [],

    newPackage: {
      name: "",
      type: "",
      vaccines: [],
      treatments: [],
      healthChecks: [],
      detail: "",
      price: "",
    },

    
  }),
  created() {
    this.getPackage(), this.getAllVacines();
    this.getAllTreatments();
    this.getAllHealthChecks();
  },
  methods: {
    getPackage() {
      let baseURL = "http://localhost:4000/api/packages/";

      axios
        .get(baseURL)
        .then((res) => {
          this.packages = res.data.package;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showPackage(id) {
      let baseURL = "http://localhost:4000/api/packages/";

      axios
        .get(baseURL + id)
        .then((res) => {
          this.package = res.data.package;
          console.log(this.package);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAllVacines() {
      let baseURL = "http://localhost:4000/api/vaccines/";

      axios
        .get(baseURL)
        .then((res) => {
          this.vaccine_options = res.data.vaccine;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAllTreatments() {
      let baseURL = "http://localhost:4000/api/treatments/";

      axios
        .get(baseURL)
        .then((res) => {
          this.treatment_options = res.data.treatment;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAllHealthChecks() {
      let baseURL = "http://localhost:4000/api/healthChecks/";

      axios
        .get(baseURL)
        .then((res) => {
          this.healthCheck_options = res.data.healthcheck;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createPackage() {
      let baseURL = "http://localhost:4000/api/packages/";

      axios
        .post(baseURL, this.newPackage)
        .then(() => {
         
          this.newPackage = {
            name: "",
            type: "",
            vaccines: [],
            treatments: [],
            healthChecks: [],
            detail: "",
            price: "",
          };
          this.getPackage();
        })
        .catch((error) => {
          console.log(error);
        });
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
.line {
  display: flex;
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
.BTaddData {
  background: rgb(127, 211, 193);
  background: linear-gradient(
    45deg,
    rgba(127, 211, 193, 1) 0%,
    rgba(54, 176, 201, 1) 100%
  );
  display: inherit;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  float: left;
  margin-top: -34px;
  margin-left: 270px;
  --vs-button-padding: 5px 10px;
}
.InputSL {
  margin-top: -3px;
  margin-left: 10px;
  display: block;
}
.list {
  color: #adadad;
  margin: 5px;
  font-size: 14px;
  font-weight: 500;
  float: right;
}
::v-deep .vs-input {
  width: 350px;
  height: 35px;
  font-family: kanit;
  color: #696969;
}
::v-deep .vs-select__input {
  min-height: 36px;
  max-height: 30px;
}
::v-deep .vs-input__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -20px;
  margin-top: -5px;
}
::v-deep .vs-select__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -15px;
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
button.vs-select__option {
  font-family: kanit;
  margin: 10px;
  padding: 0px;
  width: 90%;
}
::v-deep .vs-select__options__content {
  font-family: kanit;
}
::v-deep .vs-table__td {
  padding: 5px 12px;
}
::v-deep .vs-table_not-found td {
  color: #696969;
}
::v-deep .vs-select {
  width: 250px;
}
::v-deep .SLPet {
  width: 300px;
}
.vs-select__option:hover:not(:disabled) {
  margin-left: 5px;
  padding: 0px;
}
.TextArea {
  background: #f4f7f8;
  height: 165px;
  border-radius: 10px;
  width: 330px;
  margin-left: 363px;
  margin-top: -346px;
}
.AddPG {
  font-weight: 400;
  color: #73a3c0;
  padding: 10px;
}
.DetailPK {
  background: #dbe6e7;
  height: 165px;
  border-radius: 10px;
  width: 695px;
  margin-left: 10px;
}
.DetailText {
  margin: 0px;
    font-size: 13px;
    font-weight: 400;
  color: #668d91;
  padding: 10px 0px 0px 10px;
}
.HeadInput {
  font-size: 14.5px;
  color: #696969;
  font-weight: 400;
  margin: 0px;
}
::v-deep .DtPg .vs-input {
  min-width: 695px;
}
</style>
