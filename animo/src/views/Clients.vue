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
          @click="(active = !active), getClients()"
          class="BTadd"
        >
          <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มข้อมูล
        </vs-button>
        <h2><font-awesome-icon class="icon" icon="paw" />ข้อมูลผู้ใช้</h2>
        <div class="line">
          <h3><font-awesome-icon class="icon" icon="search" />ค้นหา</h3>
          <vs-input v-model="search" placeholder="ค้นหา..." />
        </div>

        <h4 class="list">
          รายการทั้งหมด {{ $vs.getSearch(users, search).length }} รายการ
        </h4>
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>ไอดี</vs-th>
              <vs-th>ชื่อ - นามสกุล</vs-th>
              <vs-th>เบอร์โทรศัพท์</vs-th>
              <vs-th>จัดการข้อมูล</vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr
              :key="i"
              v-for="(data, i) in $vs.getPage(
                $vs.getSearch(users, search),
                page,
                max
              )"
              :data="data"
            >
              <vs-td>{{ data.uid }}</vs-td>
              <vs-td>{{ data.firstName + " " + data.lastName }}</vs-td>
              <vs-td>{{ data.contact }}</vs-td>
              <vs-td>
                <vs-button
                  color="#6b9bce"
                  @click="(active1 = !active1), clientDetail(data.id)"
                  class="BT"
                >
                  ดูข้อมูล
                  <font-awesome-icon
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
            :length="$vs.getLength($vs.getSearch(users, search), max)"
          />
        </div>
      </div>
      <!-- add client -->
      <vs-dialog width="80%" scroll v-model="active">
        <template #header>
          <h2>เพิ่มข้อมูลเจ้าของสัตว์เลี้ยง</h2>
        </template>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="client.firstName"
                label="ชื่อ"
                placeholder="ชื่อ"
                @blur="$v.client.firstName.$touch()"
              >
                <template v-if="$v.client.firstName.$error" #message-danger>
                  <p v-if="!$v.client.firstName.required">กรุณากรอกชื่อ</p>
                </template>
              </vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="client.lastName"
                label="นามสกุล"
                placeholder="นามสกุล"
                @blur="$v.client.lastName.$touch()"
              >
                <template v-if="$v.client.lastName.$error" #message-danger>
                  <p v-if="!$v.client.lastName.required">กรุณากรอกนามสกุล</p>
                </template>
              </vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="client.contact"
                label="เบอร์โทร"
                placeholder="เบอร์โทร"
                @blur="$v.client.contact.$touch()"
              >
                <template v-if="$v.client.contact.$error" #message-danger>
                  <p v-if="!$v.client.contact.required">
                    กรุณากรอกเบอร์มือถือด้วยเลข 10 หลัก
                  </p>
                  <p
                    v-if="
                      !$v.client.contact.numeric ||
                      !$v.client.contact.minLengthValue ||
                      !$v.client.contact.maxLengthValue
                    "
                  >
                    เบอร์มือถือต้องประกอบด้วยเลข 10 หลัก
                  </p>
                  <!-- <p v-if="!$v.client.contact.required">กรุณากรอกเบอร์โทรศัพท์</p> -->
                </template>
              </vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="client.email"
                label="อีเมลล์"
                placeholder="อีเมลล์"
                :class="{ error: $v.client.email.$error }"
                @blur="$v.client.email.$touch()"
              >
                <template v-if="$v.client.email.$error" #message-danger>
                  <p v-if="!$v.client.email.required">กรุณากรอกอีเมลล์</p>
                  <p v-if="!$v.client.email.email">
                    กรุณากรอกอีเมลล์ให้ถูกต้อง
                  </p>
                </template>
              </vs-input>
              <!-- 
             <div v-if="$v.client.email.$error">
                <p v-if="!$v.client.email.required" class="errorMessage">กรุณากรอกอีเมลล์</p>
             </div> -->
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="client.address.detail"
                label="ที่อยู่"
                placeholder="บ้านเลขที่, หมู่ที่, ซอย, ถนน"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col w="6">
            <div class="InputSL">
              <vs-select
                label="จังหวัด"
                placeholder="เลือกจังหวัด"
                v-model="client.address.province"
                class="type"
              >
                <vs-option
                  :key="i"
                  v-for="(data, i) in selectProvince"
                  :value="data.province"
                  :label="data.province"
                >
                  {{ data.province }}
                </vs-option>
              </vs-select>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col class="InputSM" w="2">
            <div class="InputSL">
              <div class="InputPop">
                <span>{{ client.address.district }}</span>
                <vs-select
                  class="small"
                  placeholder="เลือกอำเภอ"
                  label="อำเภอ"
                  v-model="client.address.district"
                >
                  <vs-option
                    :key="j"
                    v-for="(data, j) in selectDistrict"
                    :value="data"
                    :label="data"
                  >
                    {{ data }}
                  </vs-option>
                </vs-select>
              </div>
            </div>
          </vs-col>
          <div class="space"></div>

          <vs-col class="InputSL" w="2">
            <div class="InputPop">
              <span>{{client.address.subdistrict}}</span>
              <vs-select
                label="ตำบล"
                placeholder="เลือกตำบล"
                v-model="client.address.subdistrict"
                class="small"
              >
                <vs-option
                  :key="i"
                  v-for="(data, i) in selectSubDistrict"
                  :value="data"
                  :label="data"
                >
                  {{ data }}
                </vs-option>
              </vs-select>
            </div>
          </vs-col>
          <div class="space" style="width: 50px"></div>

          <vs-col class="InputSM" w="2">
            <div class="InputPop">
              <vs-input
                v-model="client.address.postalCode"
                label="รหัสไปรษณีย์"
                placeholder="รหัสไปรษณีย์"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>

        <vs-row>
          <p v-if="$v.$anyError" class="errorMessage" style="float: left">
            กรุณากรอกข้อมูลให้ครบถ้วน
          </p>
        </vs-row>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              primary
              @click="
                (active = !active),
                  createClient(),
                  AddNoti('bottom-right', 1500, '#57c496')
              "
              class="BT1"
              style="float: right; width: 80px"
              :disabled="$v.$invalid"
            >
              ยืนยัน
            </vs-button>
            <br /><br />
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
import {
  required,
  email,
  numeric,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { getProvince, getDistrict, getSubDistrict } from "../services/address";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    NavbarSide,
  },
  data: () => ({
    page: 1,
    max: 5,
    value: "",
    active: false,
    active1: false,
    search: "",
    tests: [],
    users: [],
    selectProvince: [],
    selectDistrict: [],
    selectSubDistrict: [],
    client: {
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      address: {
        province: "",
        district: "",
        subdistrict: "",
        postalCode: "",
        detail: "",
      },
      role: "client",
      avatar: "",
      uid: "",
    },
  }),
  validations: {
    client: {
      email: {
        required,
        email,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      contact: {
        required,
        numeric,
        minLengthValue: minLength(10),
        maxLengthValue: maxLength(10),
      },
    },
  },
  created() {
    this.getClients();
    this.loadData();
  },
  methods: {
    AddNoti(position = null, duration, color) {
      this.$vs.notification({
        color,
        duration,
        position,
        title: "เพิ่มข้อมูลสำเร็จ",
        text: `เพิ่มรายการข้อมูลที่เลือกสำเร็จ`,
      });
    },

    loadData() {
      getProvince()
        .then((res) => {
          this.selectProvince = res.data.data;
          console.log(this.selectProvince);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onChangeProvince() {
      getDistrict(this.client.address.province)
        .then((res) => {
          console.log(res);
          this.selectDistrict = res.data.data;
          console.log(this.selectDistrict);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onChangeDistrict() {
      console.log(`selected: ${this.client.address.district}`);
      getSubDistrict(this.client.address.province, this.client.address.district)
        .then((res) => {
          console.log(res);
          this.selectSubDistrict = res.data.data;
          console.log(this.selectSubDistrict);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getClients() {
      let baseURL = "http://localhost:4000/api/clients/";
      axios
        .get(baseURL)
        .then((res) => {
          this.users = res.data.client;
          this.client = {
            firstName: "",
            lastName: "",
            contact: "",
            email: "",
            address: {
              province: "",
              district: "",
              subdistrict: "",
              postalCode: "",
              detail: "",
            },
            role: "client",
            avatar: "",
          };
          this.clientCount = res.data.count;
          console.log(res.data);
          console.log("number of data: " + this.clientCount);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createClient() {
      let baseURL = "http://localhost:4000/api/clients/";
      axios
        .post(baseURL, this.client)
        .then(() => {
          this.getClients();
          console.log(this.client);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateClient(client) {
      let baseURL = "http://localhost:4000/api/clients/";
      console.log("client: " + client.id);
      axios
        .patch(baseURL + client.id, {
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          contact: client.contact,
          address: client.address,
        })
        .then(() => {
          this.client = {
            firstName: "",
            lastName: "",
            contact: "",
            email: "",
            address: {
              province: "",
              district: "",
              subdistrict: "",
              postalCode: "",
              detail: "",
            },
            role: "client",
            avatar: "",
          };
          this.getClients();
          console.log(client);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clientDetail(id) {
      if (id) {
        this.$router.push({
          name: "Profile",
          params: {
            client_id: id,
          },
        });

        console.log("profile: " + id);
      }
    },
  },

  watch: {
    "client.address.province": function () {
      getDistrict(this.client.address.province)
        .then((res) => {
          this.selectDistrict = res.data.data;
          console.log(this.selectDistrict);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    "client.address.district": function () {
      console.log(`selected: ${this.client.address.district}`);
      getSubDistrict(this.client.address.province, this.client.address.district)
        .then((res) => {
          this.selectSubDistrict = res.data.data;
          console.log(this.selectSubDistrict);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/style.css");
a {
  color: rgb(255, 255, 255);
  text-decoration: none;
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
.list {
  color: #adadad;
  margin: 5px;
  font-size: 14px;
  font-weight: 500;
  float: right;
}
.InputSL span {
  color: #696969;
  position: absolute;
  z-index: 2;
  margin-top: 9px;
  margin-left: 12px;
  font-size: 12.5px;
  font-weight: 400;
  max-height: 25px;
  overflow: hidden;
  max-width: calc(100%-5px);
}
::v-deep .vs-select__input:hover {
  transform: translate(0, 0px) !important;
}
::v-deep .vs-select__input:focus {
  transform: translate(0, 0px) !important;
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
::v-deep .vs-input__message p {
  margin: 0px;
  padding-left: 10px;
}
::v-deep .vs-select__message p {
  margin: 0px;
}
::v-deep .vs-select__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -15px;
  margin-top: -5px;
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
::v-deep .small .vs-select {
  width: 145px;
}
.vs-select__option.isMultiple:hover {
  padding: 0px !important;
}
.vs-select__option:hover {
  margin-left: 5px;
  padding: 0px;
}
</style>
