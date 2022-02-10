<template>
  <div class="content-page-login">
    <div>
      <div class="bg-login">
        <img src="../assets/ANIMO1.png" alt="Animo" class="Pic-login" />
        <div class="head-content-login"></div>
      </div>
      <div class="content-login">
        <div class="content-login-1">
          <h2>Hello</h2>
          <h4>เข้าสู่ระบบเพื่อเข้าใช้งาน</h4>
          <div class="content-login-2">
            <div class="input-login">
              <vs-input label="อีเมลล์" v-model="email" placeholder="อีเมลล" />
            </div>
            <div class="input-login">
              <vs-input
                type="password"
                label="รหัสผ่าน"
                v-model="password"
                placeholder="รหัสผ่าน"
              />
            </div>
            <div class="input-login">
              <div class="button-login login-color" @click="login(email, password)">
                <h3>เข้าสู่ระบบ</h3>
              </div>
            </div>

            <div class="or">
              <div class="line-or"></div>
              <h3>หรือ</h3>
              <div class="line-or"></div>
            </div>

            <div class="input-login" style="margin-top: 15px">
              <div class="button-google google-color">
                  <div class="bg-google">
                     <img src="../assets/google.png" alt="Animo" class="pic-google" />
                  </div>
                <h3 class="text-google">เข้าสู่ระบบด้วย Google</h3>
              </div>
            </div><br><br>

          </div>
        </div>
      </div>
    </div>

    <div class="footer-button">
        <h4 class="register-h4">ยังไม่มีบัญชีใช่ไหม? ลงทะเบียนเลย!</h4>
      <div class="button-register">
        <h4>ลงทะเบียนผู้ใช้</h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { authenticationService } from '../services/authService'
export default {
  name: "Login",
  data() {
    return {
      active: false,
      email: '',
      password: '',
    };
  },
  methods: {
    login(email, password){
      const baseUrl =  "http://localhost:4000/api/auth/login/";

      axios.post(baseUrl, {email, password}).then((res)=>{
        let token = res.data.access_token;
        localStorage.setItem("jwt", token);
        console.log(res.data.access_token);
        this.$router.push({name:'Mypet'})
      
      }).catch((error) => {
        console.log(error)
    });
    }
  },
  components: {},
};
</script>
<style scoped>
@import url("../assets/css/style.css");
.button-google {
  color: #ffffff;
  padding: 8px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  width: 90%;
  text-align: center;
  font-size: 20px;
  align-items: center;
  margin-top: -20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  margin: -15px auto;

}
.text-google {
  font-size: 20px;
  font-family: kanit;
  font-weight: 500;
  color: #ffffff;
  margin-left: 15px;
}
.bg-google {
    background: #ffffff;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: inline-block;
}
.pic-google {
    height: 30px;
    width: 30px;
}
.login-color {
    background: rgb(98,199,176);
    background: linear-gradient(135deg, rgba(98,199,176,1) 0%, rgba(100,185,192,1) 100%);
}
.google-color {
    background: rgb(99,152,201);
    background: linear-gradient(135deg, rgba(99,152,201,1) 0%, rgba(100,130,192,1) 100%);
}
.register-h4{
    font-family: kanit;
    color: #c2c2c2;
    font-weight: 400;
    transform: translateY(30%);
    text-align: center;
}
.button-register {
    color: #ffffff;
    background: rgb(107,199,212);
    background: linear-gradient(135deg, rgba(107,199,212,1) 0%, rgba(86,171,198,1) 100%);
    padding: 8px;
    margin-top: 0px;
    border-radius: 15px;
    display: inline-block;
    width: calc(90% - 60px);
    text-align: center;
    font-size: 20px;
    font-family: kanit;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    margin: 15px;
}
.button-register h4{
  font-family: kanit;
  font-weight: 500;
  font-size: 20px;
}
.content-page-login {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
}
.or {
  display: grid;
  grid: auto / auto 40px auto;
  align-items: center;
  margin: 5px;
}
.or h3 {
  font-family: kanit;
  font-size: 15px;
  font-weight: 400 !important;
  color: #c2c2c2;
}
.line-or {
  height: 2px;
  background: #c2c2c2;
}
.button-login {
  color: #ffffff;
  padding: 8px;
  border-radius: 15px;
  display: inline-block;
  width: 90%;
  text-align: center;
  font-size: 20px;
  align-items: center;
  margin-top: -20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
.button-login h3 {
  font-size: 20px;
  font-family: kanit;
  font-weight: 500;
  color: #ffffff;
}
.input-login {
  margin-top: 35px;
  width: 100%;
}
.content-login {
  padding: 0px 25px;
}
.content-login-1 {
  margin-top: -35px;
}
.content-login-1 h2 {
  font-size: 55px;
  font-family: kanit;
  font-weight: 600;
  color: #696969;
}
.content-login-1 h4 {
  color: #bdbdbd;
  font-family: kanit;
  font-weight: 500;
  font-size: 20px;
  margin-top: -20px;
  margin-left: 2px;
}
.content-login-2 {
  display: grid;
  padding: 0px 10px;
  text-align: center;
}
.Pic-login {
  height: 200px;
  width: 200px;
  margin: auto;
}
.bg-login {
  height: 280px;
  background: rgb(77, 193, 140);
  background: linear-gradient(
    135deg,
    rgba(77, 193, 140, 1) 0%,
    rgba(96, 148, 193, 1) 100%
  );
  display: grid;
  text-align: center;
}
.head-content-login {
  height: 100%;
  width: 100%;
  background: #ffffff;
  border-radius: 20px 20px 0px 0px;
}
::v-deep .vs-input {
  width: 100%;
  border-radius: 15px;
  font-family: kanit !important;
  margin-top: 5px;
  height: 50px;
}
::v-deep .vs-input__label {
  font-family: kanit !important;
  margin-top: 5px;
}
::v-deep .vs-input__label--label {
  color: #696969;
  font-size: 22px !important;
  margin-left: -10px;
  font-family: kanit;
}
::v-deep .vs-input__label {
  font-size: 15px;
}
::v-deep .footer-button {
    display: grid;
    justify-items: center;
    position: sticky;
    bottom: 0px;
}
</style>
