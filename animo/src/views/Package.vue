<template>
<div>
    <Navbar/>
    <div style="padding-top:52px">
        <NavbarSide/>
    </div>
<div class="Content1">
        <div class="Content2">
          <vs-button color="#6b9bce" @click="active=!active" class="BTadd">
            <font-awesome-icon class="iconBTr" icon="plus"/>เพิ่มแพ็คเกจ
          </vs-button>
            <h2><font-awesome-icon class="icon" icon="syringe"/>Package</h2>
            <div class="line"><h3><font-awesome-icon class="icon" icon="search"/>ค้นหา</h3>
              <vs-input v-model="value" placeholder="search..." />
            </div>
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
                      v-for="(data, i) in packages"
                      :data="data"
                    >
                      <vs-td>{{ data._id }}</vs-td>
                      <vs-td>{{ data.name }}</vs-td>
                      <vs-td>{{ data.detail }}</vs-td>
                      <vs-td>
                        <vs-button color="#6b9bce" @click="active=!active, showPackage(data._id)" class="BT">
                               ดูข้อมูล<font-awesome-icon class="iconBTl" style="font-size: 10px;" icon="info-circle"/>
                        </vs-button>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
                <div class="center">
                  <vs-pagination infinite v-model="page" :length="10" />
                </div>
            </div>

            <vs-dialog width="80%" scroll v-model="active">

              <template #header>
                <h2>
                  เพิ่มแพ็คเกจสัตว์เลี้ยง
                </h2>
              </template>

                   <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                      <div class="InputPop">
                        <vs-input v-model="newPackage.name" label="ชื่อแพ็คเกจ" placeholder="ชื่อแพ็คเกจ"></vs-input>
                      </div>
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                        <div class="InputSL">
                          <vs-select label="ประเภทสัตว์" placeholder="ประเภทสัตว์" v-model="newPackage.type">
                            <vs-option value1="1">
                              สนัข
                            </vs-option>
                            <vs-option value1="2">
                              แมว
                            </vs-option>
                            <vs-option value1="3">
                              นก
                            </vs-option>
                            <vs-option value1="4">
                              อื่นๆ
                            </vs-option>
                          </vs-select>
                        </div>
                    </vs-col>
                  </vs-row><div class="space"></div>

                  <vs-row>
                    <vs-col vs-type="flex" class="InputSM" vs-justify="center" vs-align="center" w="2">
                      <div class="InputPop">
                        <vs-input type="time" v-model="value" label="เวลา"></vs-input>
                      </div>
                    </vs-col><div class="space"></div>
                    <vs-col vs-type="flex" class="InputSM" vs-justify="center" vs-align="center" w="2">
                      <div class="InputPop">
                        <vs-input type="time" v-model="time2" label="ถึง" ></vs-input>
                      </div>
                    </vs-col><div class="space"></div>
                    <vs-col vs-type="flex" class="InputSM" vs-justify="center" vs-align="center" w="2">
                      <div class="InputPop">
                        <vs-input v-model="newPackage.price" label="ราคารวม" placeholder="ราคารวม(บาท)"></vs-input>
                      </div>
                    </vs-col>
                  </vs-row><div class="space"></div>

                  <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        <div class="InputSL">
                          <vs-select label="รายการวัคซีน" placeholder="รายการวัคซีน" v-model="value1">
                            <vs-option :key="i" v-for="(vaccine, i) in vaccine_options" :value1="vaccine._id" > {{ vaccine.name }}
                            </vs-option>
                            <!-- <vs-option value1="2">
                              xxx
                            </vs-option>
                            <vs-option value1="3">
                              xxx
                            </vs-option>
                            <vs-option value1="4">
                              xxx
                            </vs-option> -->
                          </vs-select> 
                          <div>
                            <vs-button color="#72d2cf" @click="active=!active" class="BTaddData">
                              <font-awesome-icon class="iconBTr" icon="plus"/>เพิ่ม
                            </vs-button> 
                          </div>
                        </div>
                    </vs-col>
                  </vs-row><div class="space"></div>

                  <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        <div class="InputSL">
                          <vs-select label="รายการรักษา" placeholder="รายการรักษา" v-model="value1">
                             <vs-option :key="i" v-for="(data, i) in treatment_options" :value1="data._id" > {{ data.name }}
                            </vs-option>
                            <!-- <vs-option value1="2">
                              xxx
                            </vs-option>
                            <vs-option value1="3">
                              xxx
                            </vs-option>
                            <vs-option value1="4">
                              xxx
                            </vs-option> -->
                          </vs-select> 
                          <div>
                            <vs-button color="#72d2cf" @click="active=!active" class="BTaddData">
                              <font-awesome-icon class="iconBTr" icon="plus"/>เพิ่ม
                            </vs-button> 
                          </div>
                        </div>
                    </vs-col>
                  </vs-row><div class="space"></div>

                  <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        <div class="InputSL">
                          <vs-select label="รายการตรวจสุขภาพ" placeholder="รายการตรวจสุขภาพ" v-model="value1">
                            <vs-option :key="i" v-for="(data, i) in healthCheck_options" :value1="data._id" > {{ data.name }}
                            </vs-option>
                          </vs-select> 
                          <div>
                            <vs-button color="#72d2cf" @click="active=!active" class="BTaddData">
                              <font-awesome-icon class="iconBTr" icon="plus"/>เพิ่ม
                            </vs-button> 
                          </div>
                        </div>
                    </vs-col>
                  </vs-row><div class="space"></div>

                   <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                      <div class="InputPop">
                        <vs-input v-model="newPackage.detail" label="รายละเอียด" placeholder="รายละเอียด"></vs-input>
                      </div>
                    </vs-col>
                  </vs-row><div class="space"></div>

                  

              <template #footer>
                <div class="footer-dialog">
                  <vs-button primary @click="active1=!active1, createPackage()" class="BT1" style="float: right; width: 80px;">
                    ยืนยัน
                  </vs-button><br><br>
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
  name: 'Package',
  components: {
    Navbar,
    NavbarSide
  },
  data:() => ({
    page : 1,
    value: '',
    value1: '',
    time1: '',
    time2: '',
    active: false,
    packages: [],
    newPackage: {
      name: '',
      type: '',
      vaccines: [],
      treatments: [],
      healthChecks: [],
      detail: '',
      price: ''
    },
    vaccine_options: [],
    treatment_options: [],
    healthCheck_options: [],
    }),
  created(){
    this.getPackage(),
    this.getAllVacines();
    this.getAllTreatments();
    this.getAllHealthChecks();
  },
  methods: {
    getPackage() {
      let baseURL = 'http://localhost:4000/api/packages/';

      axios.get(baseURL).then((res)=>{
        this.packages = res.data.package;
        console.log(res.data);
      }).catch((error)=> {
        console.log(error);
      });
    },

    showPackage(id) {
      let baseURL = "http://localhost:4000/api/packages/";

      axios.get(baseURL+id).then((res) => {
          this.package = res.data.package;
          console.log(this.package);
      }).catch((error) => {
          console.log(error);
      });
    },

    getAllVacines(){
      let baseURL = 'http://localhost:4000/api/vaccines/';

      axios.get(baseURL).then((res)=>{
        this.vaccine_options = res.data.vaccine;
        console.log(res.data);
      }).catch((error)=> {
        console.log(error);
      });
    },

    getAllTreatments(){
      let baseURL = 'http://localhost:4000/api/treatments/';

      axios.get(baseURL).then((res)=>{
        this.treatment_options = res.data.treatment;
        console.log(res.data);
      }).catch((error)=> {
        console.log(error);
      });
    },

    getAllHealthChecks(){
      let baseURL = 'http://localhost:4000/api/healthChecks/';

      axios.get(baseURL).then((res)=>{
        this.healthCheck_options = res.data.healthcheck;
        console.log(res.data);
      }).catch((error)=> {
        console.log(error);
      });
    },

    createPackage(){
      let baseURL = 'http://localhost:4000/api/packages/';

      axios.post(baseURL, this.newPackage).then(() => {
        console.log(this.client)

        this.newPackage = {
        name: '',
        type: '',
        vaccines: [],
        treatments: [],
        healthChecks: [],
        detail: '',
        price: ''
        }
        this.getPackage();

      }).catch((error) => {
          console.log(error);
      });
    }
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
  background: rgb(94,184,204);
  background: linear-gradient(45deg, rgba(94,184,204,1) 0%, rgba(68,157,222,1) 100%);
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
}
.BT1{
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
  background: rgb(142,157,211);
  background: linear-gradient(45deg, rgba(142,157,211,1) 0%, rgba(86,164,215,1) 100%);
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  float: right;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
}
.BTaddData{
  background: rgb(127,211,193);
  background: linear-gradient(45deg, rgba(127,211,193,1) 0%, rgba(54,176,201,1) 100%);
  display: inherit;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  float: left;
  margin-top: -34px;
  margin-left: 230px;
  --vs-button-padding: 5px 10px;
}
.InputSL {
  margin-top: -3px;
  margin-left: 10px;
  display: block;
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
::v-deep .vs-dialog__content {
  padding: 25px 30px;
}
button.vs-select__option {
  font-family: kanit;
}
::v-deep .vs-table__td {
  padding: 5px 12px;
}
</style>