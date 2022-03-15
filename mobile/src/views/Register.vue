<template>
  <div>
    <div class="bar-register" @click="goTologin()">
      <router-link to=""
        ><h4><font-awesome-icon class="iconR" icon="chevron-left" /></h4
      ></router-link>
      <h4>ANIMO</h4>
    </div>
    <div class="content">
      <div>
        <h2 class="Head-text">ลงทะเบียนผู้ใช้</h2>
        <div class="content1">
          <div class="content-input">
            <vs-input
              label="ชื่อจริง"
              v-model="registerForm.firstName"
              placeholder="ชื่อจริง"
            />
          </div>

          <div class="content-input">
            <vs-input
              label="นามสกุล"
              v-model="registerForm.lastName"
              placeholder="นามสกุล"
            />
          </div>

          <div class="content-input">
            <vs-input
              v-model="registerForm.email"
              label="อีเมลล์"
              placeholder="animo@example.com"
            >
              <template
                v-if="!validEmail && registerForm.email !== ''"
                #message-danger
              >
                อีเมลล์ไม่ถูกต้อง
              </template>
            </vs-input>
          </div>

          <div class="content-input">
            <vs-input
              label="เบอร์โทร"
              v-model="registerForm.contact"
              placeholder="เบอร์โทร"
            />
          </div>

          <div class="content-input">
            <vs-input
              label="รหัสผ่าน"
              type="password"
              v-model="registerForm.password"
              placeholder="รหัสผ่าน"
            />
          </div>

          <div class="content-input">
            <vs-input
              label="ยืนยันรหัสผ่าน"
              type="password"
              v-model="registerForm.confirmPassword"
              placeholder="ยืนยันรหัสผ่าน"
            />
          </div>
   

          <div class="content-input">
            <vs-input
              label="ที่อยู่"
              v-model="registerForm.address.detail"
              placeholder="ถนน ซอย บ้านเลขที่"
            />
          </div>

          <div class="content-input">
            <span class="sp3">{{registerForm.address.province}}</span>
            <vs-select
              class="select-grid"
              label="จังหวัด"
              placeholder="จังหวัด"
              v-model="registerForm.address.province"
              @change="fetchDistrict(registerForm.address.province)"
            >
              <vs-option
                v-for="(data, i) in addressDropdown.provinces" 
                :key="i"
                :label="data.province" 
                :value="data.province"> 
                {{ data.province }} 
              </vs-option>
            </vs-select>
          </div>

          <div class="content-input grid">
            <span class="sp1">{{registerForm.address.subdistrict}}</span>
            <span class="sp2">{{registerForm.address.district}}</span>
            <vs-select
              class="select-grid"
              label="อำเภอ"
              placeholder="อำเภอ"
              v-model="registerForm.address.district"
              @change="fetchSubDistrict({
                province:registerForm.address.province,
                district:registerForm.address.district})"
            >
              <vs-option 
                v-for="(data, i) in addressDropdown.districts" 
                :key="i"
                :label="data" 
                :value="data"> 
                {{ data }} 
              </vs-option>
            </vs-select>
            
            <vs-select
              class="input-grid1"
              label="ตำบล"
              placeholder="ตำบล"
              v-model="registerForm.address.subdistrict"
            >
              <vs-option 
                v-for="(data, i) in addressDropdown.subdistricts" 
                :key="i"
                :label="data" 
                :value="data"> 
                {{ data }} 
              </vs-option>
            </vs-select>
          </div>

          <div class="content-input alone">
            <vs-input
              class="input-alone"
              label="รหัสไปรษณีย์"
              v-model="registerForm.address.postalCode"
              placeholder="รหัสไปรษณีย์"
            />
          </div>
        </div>
      </div><br><br>
      <div class="footer-button">
        <div class="button-addpet register-color" @click="createClientUser()">
          <h4>ลงทะเบียน</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      search: "",
      value: "",
      value1: "",
      valueEmail: "",
      active: false,
    };
  },
  validations: {
    registerForm: {
      firstName: { required },
    },
  },
  created() {
    //this.openLoading();
    this.fetchProvince();
    if(localStorage.getItem("jwt")){
        this.$router.push({name:'Mypet'})
    }

  },
  computed: {
    ...mapGetters(["registerForm", 'addressDropdown', ]),

    validEmail() {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        this.registerForm.email
      );
    },
  },
  methods: {
    ...mapActions(["createClientUser", 'fetchProvince', 'fetchDistrict', 'fetchSubDistrict']),
    goTomypet() {
      this.$router.push('/mobile/mypet'); 
    },
    goTologin() {
      this.$router.push('/'); 
    },
    openLoading() {
      const loading = this.$vs.loading({
        text: "กำลังโหลด...",
        color: "#43ccb4",
        type: "scale",
        scale: "1.2",
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
  },

};
</script>
<style scoped>
@import url("../assets/css/style.css");
.sp1 {
  color: #696969;
  position: absolute;
  z-index: 2;
  margin-top: 9px;
  margin-left: 12px;
  font-size: 16px;
  font-weight: 400;
  max-height: 25px;
  overflow: hidden;
  max-width: calc(50vw - 80px);
  left: calc(50vw + 2px);
}
.sp2 {
  color: #696969;
  position: absolute;
  z-index: 2;
  margin-top: 9px;
  margin-left: 12px;
  font-size: 16px;
  font-weight: 400;
  max-height: 25px;
  overflow: hidden;
  max-width: calc(50vw - 80px);
}
.sp3 {
  color: #696969;
  position: absolute;
  z-index: 2;
  margin-top: 9px;
  margin-left: 12px;
  font-size: 16px;
  font-weight: 400;
  max-height: 25px;
  overflow: hidden;
  max-width: calc(50vw - 80px);
  left: 30px;
}
.register-color {
  background: rgb(123, 198, 204);
  background: linear-gradient(
    135deg,
    rgba(123, 198, 204, 1) 0%,
    rgba(131, 179, 216, 1) 100%
  );
}
.bar-register {
  height: 80px;
  width: calc(100vw - 8px);
  display: grid;
  grid: auto / 10px auto 10px;
  text-align: center;
  align-items: center;
  background: rgb(77, 192, 141);
  background: linear-gradient(
    135deg,
    rgba(77, 192, 141, 1) 0%,
    rgba(96, 147, 193, 1) 100%
  );
  position: sticky;
}
.bar-register h4 {
  color: #ffffff;
  font-size: 30px;
  font-weight: 500;
  margin: 20px;
  margin-top: 10px;
}
::v-deep .vs-input-content + .vs-input__message {
  text-align: left;
}
::v-deep .Head-text {
  font-size: 30px;
  position: sticky;
  top: 0px;
  z-index: 2;
  background: #ffffff;
}
::v-deep .content {
  overflow: scroll;
}
::v-deep .footer-button {
  z-index: 2;
}
::v-deep .bar {
  background: rgb(133, 209, 220);
  background: linear-gradient(
    145deg,
    rgba(133, 209, 220, 1) 14%,
    rgba(131, 184, 222, 1) 100%
  );
  position: fixed !important;
}
::v-deep .content {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 70px);
  overflow: auto;
  width: calc(100vw - 8px);
}
::v-deep .content1 {
  padding: 30px;
  text-align: center;
  overflow: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  display: grid;
  flex-direction: column;
}
::v-deep .line1 {
  background: #ffffff;
}
::v-deep .line2 {
  background: #ffffff;
}
::v-deep .rightNav {
  color: #ffffff;
}
::v-deep .Logo1 {
  filter: invert(1);
  opacity: 100%;
}
::v-deep .HeadPage {
  color: #ffffff;
}
::v-deep .vs-input {
  width: 100%;
  border-radius: 10px;
}
::v-deep .vs-dialog {
  width: 80%;
  min-width: 80%;
}
::v-deep .vs-dialog__header {
  padding: 0px;
}
::v-deep .vs-dialog__content {
  margin-top: -50px;
  padding: 0px;
  border-radius: 20px;
}
::v-deep .vs-input__label--label {
  color: #696969;
  font-size: 18px !important;
  margin-left: -10px;
}
::v-deep .vs-input__label {
  font-size: 15px;
}
::v-deep .vs-select__label--label {
  color: #696969;
  font-size: 18px;
  margin-left: -5px;
  margin-bottom: 12px;
  z-index: 1;
}
::v-deep .vs-select__input {
  width: 100%;
  border-radius: 10px;
  padding: 7px 13px 7px 10px;
  z-index: 1;
}
::v-deep .vs-select {
  z-index: 1;
}
::v-deep .vs-select__input:hover {
  transform: translate(0, 0px) !important;
}
::v-deep .vs-select__input:focus {
  transform: translate(0, 0px) !important;
}
</style>
