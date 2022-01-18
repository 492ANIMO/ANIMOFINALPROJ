<template>
    <div id="app">
        <ul>
            <li><img src="../assets/ANIMO1.png" alt="Animo" class="Logo1"></li>
            <li><h1 class="LogoText">ANIMO</h1></li>
            <li><router-link to="/">Introduction</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
            <li class=login>
                <vs-button
                    class="Logtx"
                    border
                    color="#d4e9e7"
                    @click="active1=!active1"
                ><font-awesome-icon class="icon" icon="power-off"/>
                Log out
              </vs-button></li>
          </ul>

          <vs-dialog width="550px" v-model="active1">
        <template #header>
          <font class="font">
            ยืนยัน <b>ออกจากระบบ</b>
          </font>
        </template>


        <div class="con-content">
            <br><br><br><br>
        </div>

        <template #footer>
          <div class="footer">
            <vs-button dark class="BT2" @click="active1=!active1">
              ยกเลิก
            </vs-button>
            <vs-button color="#ca7676" class="BT1" @click="active1=!active1, logout()">
              ยืนยัน
            </vs-button>
          </div>
        </template>

      </vs-dialog>

    </div>
</template>
<script>
// import axios from 'axios';
export default {
  name: 'Navbar',
  props: {
  },
  data:() => ({
        active1: false,
    }),
  methods:{
    logout(){
      localStorage.removeItem("jwt");
      this.$router.replace('/login')
    }
  }
}

</script>
<style scoped>
.font {
  font-size: 20px;
}
.container {
position: absolute;
top: 50%;
left: 50%;
transform: translateX(-50%) translateY(-50%);
}
.content-inputs {
margin-left: 10px;
}
.loginBT {
width: 95%;
margin-left: 10;
margin-top: 15px;
}
ul {
list-style-type: none;
margin: 0;
padding: 0;
overflow: hidden;
background: rgb(70,174,156);
background: linear-gradient(45deg, rgba(70,174,156,1) 14%, rgba(99,188,201,1) 100%);
height: 52px;
position: fixed;
width: 100%;
z-index: 100;
}

li {
float: left;
}

li a {
display: block;
color: rgb(255, 255, 255);
text-align: center;
padding: 14px 20px;
text-decoration: none;
}

li a:hover:not(.active) {
background: rgb(204,233,216);
background: linear-gradient(60deg, rgba(204,233,216,0.1) 0%, rgba(173,228,228,0.1) 100%);
}

.login {
float: right;
margin-right: 20px;
padding: 0px;
margin-top: 4px;
}
::v-deep .Logtx .vs-button__content   {
--vs-button-padding: 5px;
font-family: kanit;
}
.vs-button {
background: rgb(255,255,255,0.2);
font-size: 15px;
font-weight: 600;
padding:0px 10px 0px 10px;
border-radius: 20px;
--vs-button-padding: 5px;
}
h1,h3 {
font-weight: 400;
transform: translateX(-30px);
margin: 0px;
color: #494949;
}
h3 {
margin-top: -10px;
}
h4 {
margin: 10px 0px 10px -10px;
padding-left: 5px;
font-weight: 400;
color: #696969;
}
::v-deep .vs-button--border:focus {
background: rgb(255,255,255,0.4) ;
}
.Logo1 {
width: 45px;
height: 45px;
padding: 0px 35px 0px 30px;
}
.LogoText{
color: #ffffff;
}
::v-deep .vs-dialog__header {
float: left;
color: #696969;
padding: 25px 50px;
}
::v-deep .footer .vs-button {
float: right;
font-family: kanit;
}
.BT1{
background: rgb(197,94,94);
background: linear-gradient(45deg, rgba(197,94,94,1) 0%, rgba(248,139,109,1) 100%);
display: inline-block;
color: #ffffff;
border-radius: 20px;
font-size: 13px;
font-weight: 500;
margin-bottom: 15px;
--vs-button-padding: 5px 10px;
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
--vs-button-padding: 5px 10px;
}
</style>