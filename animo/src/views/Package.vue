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
        <h2><font-awesome-icon class="icon" icon="syringe" />แพ็คเกจ</h2>
        <div class="line">
          <h3><font-awesome-icon class="icon" icon="search" />ค้นหา</h3>
          <vs-input v-model="search" placeholder="ค้นหา..." />
        </div>
        <h4 class="list">
          รายการทั้งหมด {{ $vs.getSearch(packages, search).length }} รายการ
        </h4>
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>แพ็คเกจไอดี</vs-th>
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
              <vs-td>{{ '00000'+data.pid }}</vs-td>
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
      <!-- เพิ่มแพ็คเกจสัตว์เลี้ยง -->
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
                class="textcolor"
                @blur="$v.newPackage.name.$touch()"
              >
                <template v-if="$v.newPackage.name.$error" #message-danger> 
                  <p v-if="!$v.newPackage.name.required" >กรุณากรอกชื่อแพ็คเกจ</p>
                </template>
              </vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputSL">
              <vs-select
                label="ประเภทสัตว์"
                placeholder="ประเภทสัตว์"
                v-model="newPackage.type"
                @blur="$v.newPackage.type.$touch()"
              >
                <vs-option
                  :key="i"
                  v-for="(type, i) in petType"
                  :value="type"
                  :label="type"
                >
                  {{ type }}
                </vs-option>
                <template v-if="$v.newPackage.type.$error" #message-danger> 
                  <p v-if="!$v.newPackage.type.required" >กรุณาเลือกประเภทสัตว์</p>
                </template>
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
                collapse-chips
                filter
                label="รายการวัคซีน"
                placeholder="รายการวัคซีน"
                v-model="newPackage.vaccines"
              >
                <vs-option
                  :key="i"
                  v-for="(vaccine, i) in vaccine_options"
                  :value="vaccine"
                  :label="vaccine.name"
                >
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
                collapse-chips
                filter
                label="รายการรักษา"
                placeholder="รายการรักษา"
                v-model="newPackage.treatments"
              >
                <vs-option
                  :key="i"
                  v-for="(treatment, i) in treatment_options"
                  :value="treatment"
                  :label="treatment.name"
                >
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
            <div class="InputSL">
              <vs-select
                multiple
                collapse-chips
                filter
                label="รายการตรวจสุขภาพ"
                placeholder="รายการตรวจสุขภาพ"
                v-model="newPackage.healthChecks"
              >
                <vs-option
                  :key="i"
                  v-for="(healtCheck, i) in healthCheck_options"
                  :value="healtCheck"
                  :label="healtCheck.name"
                >
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
                class="textcolor"
                @blur="$v.newPackage.price.$touch()"
              >
                <template v-if="$v.newPackage.price.$error" #message-danger> 
                  <p v-if="!$v.newPackage.price.required" >กรุณากรอกราคาของแพ็คเกจ</p>
                  <p v-if="!$v.newPackage.price.minValue" >กรุณากรอกราคาของแพ็คเกจด้วยตัวเลขตั้งแต่ 0 ขึ้นไป</p>
                </template>
              </vs-input>
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
                class="textcolor"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col w="6">
            <div class="InputSL">
              <div class="TextArea1">
                <div class="TextArea2">
                  <h4 class="AddPG">รายการทั้งหมด</h4>
                  <div class="TextArea3">
                    <h5
                     class="AddPG"
                      :key="i"
                      v-for="(vaccine, i) in newPackage.vaccines"
                    >
                      -{{ vaccine.name }}
                    </h5>
                    <h5
                      class="AddPG"
                      :key="'a'+i"
                      v-for="(treatment, i) in newPackage.treatments"
                    >
                      -{{ treatment.name }}
                    </h5>
                    <h5
                      class="AddPG"
                      :key="'b'+i"
                      v-for="(healthCheck, i) in newPackage.healthChecks"
                    >
                      -{{ healthCheck.name }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </vs-col>
        </vs-row>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              primary
              @click="(active = !active), createPackage(),AddNoti('bottom-right',1500,'#57c496')"
              class="BT1"
              style="float: right; width: 80px"
              :disabled="$v.newPackage.$invalid"
            >
              ยืนยัน </vs-button
            ><br /><br />
          </div>
        </template>
      </vs-dialog>
    <!-- ข้อมูลแพ็คเกจสัตว์เลี้ยง -->
      <vs-dialog width="80%" scroll v-model="Detail1">
        <template #header>
          <h2>ข้อมูลแพ็คเกจสัตว์เลี้ยง</h2>
        </template>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
              state="success"
                v-model="currentPackage.name"
                label="ชื่อแพ็คเกจ"
                placeholder="ชื่อแพ็คเกจ"
                @blur="$v.currentPackage.name.$touch()"
              >
                <template v-if="$v.currentPackage.name.$error" #message-danger> 
                  <p v-if="!$v.currentPackage.name.required" >กรุณากรอกชื่อแพ็คเกจ</p>
                </template>
              </vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputSL">
              <vs-select
              state="success"
                label="ประเภทสัตว์"
                placeholder="ประเภทสัตว์"
                v-model="currentPackage.type"
                @blur="$v.currentPackage.type.$touch()"
              >
                <vs-option
                  :key="i"
                  v-for="(type, i) in petType"
                  :value="type"
                  :label="type"
                >
                  {{ type }}
                </vs-option>
                <template v-if="$v.currentPackage.type.$error" #message-danger> 
                  <p v-if="!$v.currentPackage.type.required" >กรุณาเลือกประเภทสัตว์</p>
                </template>
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
                <div class="TextArea2">
                <div class="TextArea3">
                  <h5 class="AddPG" :key="i" v-for="(vaccine, i) in currentPackage.vaccines">
                    -{{ vaccine.name }}
                  </h5>
                  <h5 class="AddPG"  :key="'A'+i" v-for="(treatment, i) in currentPackage.treatments">
                      -{{ treatment.name }}
                  </h5>
                  <h5 class="AddPG" :key="'B'+i" v-for="(healthCheck, i) in currentPackage.healthChecks">
                      -{{ healthCheck.name }}
                  </h5>
                </div>
                </div>
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
                v-model="currentPackage.price"
                label="ราคาสุทธิ"
                placeholder="ราคาสุทธิ(บาท)"
                @blur="$v.currentPackage.price.$touch()"

              >
                <template v-if="$v.currentPackage.price.$error" #message-danger> 
                  <p v-if="!$v.currentPackage.price.required" >กรุณากรอกราคาของแพ็คเกจ</p>
                  <p v-if="!$v.currentPackage.price.minValue" >กรุณากรอกราคาของแพ็คเกจด้วยตัวเลขตั้งแต่ 0 ขึ้นไป</p>
                </template>
              </vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" class="DtPg" w="12">
            <div class="InputPop">
              <vs-input
              state="success"
                v-model="currentPackage.detail"
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
                  color="#ca7676"
                  @click="deleteCF=!deleteCF"
                  class="BT3"
                  style="float: right; width: 80px"
                >
                  ลบ<font-awesome-icon
                    class="iconBTl"
                    style="font-size: 10px"
                    icon="trash-alt"
                  />
                </vs-button>
            <vs-button
              color="#d78461"
              @click="(Detail1 = !Detail1), updatePackage(currentPackage._id),EditNoti('bottom-right',1500,'#da9952')"
              class="BT2"
              style="float: right; width: 80px"
              :disabled="$v.currentPackage.$invalid"
            >
              แก้ไข </vs-button
            ><br /><br />
          </div>
        </template>
      </vs-dialog>

      <vs-dialog width="550px" v-model="deleteCF">
        <template #header>
          <font class="font">
            ยืนยัน <b>การลบแพ็คเกจ</b>
          </font>
        </template>

        <div class="con-content">
            <br><br><br><br>
        </div>

        <template #footer>
          <div class="footer">
            <vs-button dark class="CF2" @click="deleteCF=!deleteCF">
              ยกเลิก
            </vs-button>
            <vs-button color="#ca7676" class="CF1" @click="(Detail1 = !Detail1),(deleteCF=!deleteCF), deletePackage(currentPackage._id),DeleteNoti('bottom-right',1500,'#c65151')">
              ยืนยัน
            </vs-button>
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
import { required, numeric, minValue } from 'vuelidate/lib/validators';

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
    deleteCF: false,
    Detail1: false,
    petType: ["สุนัข", "แมว", "นก", "อื่นๆ"],
    packages: [],

    currentPackage:{
      name:'',
      type: '',
      detail: '',
      price: 0,
      vaccines: [],
      treatments: [],
      healthChecks: [],
    },

    vaccine_options: [],
    treatment_options: [],
    healthCheck_options: [],

    newPackage: {
      name: '',
      type: '',
      vaccines: [],
      treatments: [],
      healthChecks: [],
      detail: '',
      price: ''
    },
  }),
  validations: {
    newPackage: {
      name: { required },
      type: { required },
      price: { 
        required, 
        numeric, 
        minValue: minValue(0)
      }
    },
    currentPackage: {
      name: { required },
      type: { required },
      price: { 
        required, 
        numeric, 
        minValue: minValue(0)
      }
    },
  },
  created() {
    this.getPackage(), this.getAllVacines();
    this.getAllTreatments();
    this.getAllHealthChecks();
  },
  methods: {
    AddNoti(position = null ,duration ,color) {
          this.$vs.notification({
            color,
            duration,
            position,
            title: 'เพิ่มข้อมูลสำเร็จ',
            text: `เพิ่มรายการข้อมูลที่เลือกสำเร็จ`
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
          this.currentPackage = res.data.package;
          console.log('this.currentPackage');
          console.log(this.currentPackage);
          this.getPackage();
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
            name: '',
            type: '',
            vaccines: [],
            treatments: [],
            healthChecks: [],
            detail: '',
            price: '',
          };
          this.getPackage();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatePackage(id){
      let baseURL = "http://localhost:4000/api/packages/";
       console.log('id: '+id);

      axios.patch(baseURL+id, this.currentPackage).then((res)=>{
       
        console.log(res.data);
        console.log('update เรียบร้อย');

        this.getPackage();
        
      }) .catch((error) => {
          console.log(error);
      });
      
    },
    deletePackage(id){
      let baseURL = "http://localhost:4000/api/packages/";
       console.log('id: '+id);

      axios.delete(baseURL+id, id).then((res)=>{
       
        console.log(res.data);
        console.log('ลบแพ็คเกจเรียบร้อย');

        this.getPackage();
        
      }) .catch((error) => {
          console.log(error);
      });
      
    }
  },
};
</script>
<style scoped>
.font {
  font-size: 20px;
}
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
.BT2 {
 background: rgb(215, 132, 97);
  background: linear-gradient(
    45deg,
    rgba(215, 132, 97, 1) 0%,
    rgba(215, 169, 106, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
}
.BT3 {
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
.CF1{
background: rgb(197,94,94);
background: linear-gradient(45deg, rgba(197,94,94,1) 0%, rgba(248,139,109,1) 100%);
display: inline-block;
color: #ffffff;
border-radius: 20px;
font-size: 13px;
font-weight: 500;
margin-bottom: 15px;
--vs-button-padding: 5px 20px;
}
.CF2{
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
::v-deep .textcolor .vs-input {
  width: 350px;
  height: 35px;
  font-family: kanit;
  color: #696969;
}
::v-deep .vs-input {
  width: 350px;
  height: 35px;
  font-family: kanit;
}
::v-deep .vs-select__input {
  min-height: 36px;
  max-height: 30px;
  font-family: kanit;
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
  margin: 8px;
  width: 95%;
}
::v-deep .vs-checkbox-label {
  font-size: 12px;
  margin: 0px;
  padding: 5px 5px;
}
::v-deep .vs-checkbox-con {
  width: 18px;
  height: 18px;
}
::v-deep .vs-checkbox-mask {
  width: 18px;
  height: 18px;
}
::v-deep .vs-select__chips__chip {
  font-family: kanit;
  font-size: 10px;
}
::v-deep .vs-select__chips__input {
  font-family: kanit;
}
::v-deep .vs-select__options__content {
  font-family: kanit;
  padding: 0px;
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
.vs-select__option.isMultiple:hover {
  padding: 0px !important;
}
.vs-select__option:hover {
  margin-left: 5px;
  padding: 0px;
}
.TextArea1 {
  background: #f4f7f8;
  height: 165px;
  border-radius: 10px;
  width: 330px;
  margin-left: 363px;
  margin-top: -326px;
  overflow: auto;
}
.TextArea2 {
  padding: 10px 0px 0px 10px;
}
.TextArea3 {
  padding: 0px 0px 0px 5px;
}
.AddPG {
  padding-left: 5px;
  font-weight: 400;
  color: #2c99a3;
  margin: 0px;
}
.DetailPK {
  background: #e3eaea;
  height: 165px;
  border-radius: 10px;
  width: 695px;
  margin-left: 10px;
  overflow: auto;
}
.DetailText {
  margin: 0px;
  font-size: 13px;
  font-weight: 400;
  color: #2c99a3;
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
::v-deep .vs-table__tr:first-of-type .vs-table__td:first-child {
  width: 25%;
}
::v-deep .vs-select--state-success .vs-select__input {
  background: rgba(var(--vs-success), 0.1) !important;
}
::v-deep .vs-input__message p{
  margin: 0px;
  padding-left: 10px;
}
::v-deep .vs-select__message p{
  margin: 0px;
}
</style>
