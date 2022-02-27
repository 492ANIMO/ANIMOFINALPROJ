<template>
  <div>
    <div class="bar">
      <div class="containNav">
        <div class="hamburger" @click.stop="drawer = !drawer">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line1"></div>
        </div>
          <div class="centerNav">
            <img src="../assets/ANIMO.png" alt="Animo" class="Logo1" />
          <h2 class="HeadPage">{{ namepage }}</h2>
          </div>
          <router-link to="/mobile/profile"><h2 class="rightNav"><font-awesome-icon icon="user-circle" /></h2></router-link>
      </div>
    </div>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <div class="BgNavSide">
        <ul>
          <div>
            <li @click="goTo1()"><font-awesome-icon icon="paw"/><a>สัตว์เลี้ยง</a></li>
            <li @click="goTo2()"><font-awesome-icon icon="syringe"/><a>แพ็คเกจ</a></li>
            <li @click="goTo3()"><font-awesome-icon icon="clock"/><a>ประวัติการรักษา</a></li>
            <li @click="goTo4()"><font-awesome-icon icon="clipboard-list"/><a>การนัดหมาย</a></li>
            <li @click="goTo5()"><font-awesome-icon icon="newspaper"/><a>ข่าวสาร</a></li>
          </div>
          
          <div>
            <li @click="logout()"><font-awesome-icon icon="power-off"/><a>ออกจากระบบ</a></li>  
          </div>
           
        </ul>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { logout } from '../services/authService'

export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    group: null,
    // namepage: '',
  }),
  props: [
    'namepage'
  ],
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    logout,
     goTo1() {
      this.$router.push('/mobile/mypet'); 
    },
    goTo2() {
      this.$router.push('/mobile/package'); 
    },
    goTo3() {
      this.$router.push('/mobile/history'); 
    },
    goTo4() {
      this.$router.push('/mobile/appointment'); 
    },
    goTo5() {
      this.$router.push('/mobile/annoucement'); 
    },
  }
};
</script>

<style scope>
body {
  margin: 0px;
  font-family: kanit;
}
.iconR {
  padding-right: 10px;
  padding-top: 5px;
  font-size: 30px !important;
}
router-link {
  text-decoration: none;
}
a {
  text-decoration: none;
}
ul {
    list-style-type: none;
    padding-top: 30px;
    font-size: 20px;
    color: #ffffff;
    height: 100%;
    width: 100%;
    z-index: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0px;
}
li {
    color: #ffffff;
    padding: 15px 20px;
    text-decoration: none !important;
    align-items: center;
    display: grid;
    grid: auto / 40px auto;
    align-items: center;
}
li:hover:not(.active) {
    background: rgb(204,233,216);
    background: linear-gradient(60deg, rgba(204,233,216,0.1) 0%, rgba(173,228,228,0.1) 100%);
    color: white;
}
.HeadPage {
  font-size: 25px;
  font-weight: 500;
  color: #696969;
  display: inline-block;
  transform: translateY(-5px);
}
.Logo1 {
  height: 30px;
  opacity: 70%;
  margin-top: 11px;
  display: inline-block;
  padding-right: 5px;
}
.centerNav {
  text-align: center;
}
.leftNav {
  margin-left: -10px;
  text-align: left;
}
.rightNav {
  text-align: right;
  color: #C4C4C4;
  font-size: 30px;
  margin-right: 5px;
}
.containNav {
  display: grid;
  grid: auto / auto auto auto;
  align-items: center;
  width: 100%;
  padding:10px;
}
.hamburger {
  cursor: pointer;
}
.line1 {
  background: #C4C4C4;
  width: 20px;
  height: 4px;
  border-radius: 10px;
  margin-left: 9px;
}
.line2 {
  background: #C4C4C4;
  width: 30px;
  height: 4px;
  border-radius: 10px;
  margin: 4px;
}
.bar {
  height: 80px;
  width: 100%;
  background: #ffffff;
}
.BgNavSide {
  background: #46AE9C;
  height: 100%;
  z-index: auto;
}
.v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  border-radius: 0px 30px 30px 0px;
}
.v-list-item {
  color: #ffffff !important;
}
.end li {
  float: inline-end;
}
</style>
