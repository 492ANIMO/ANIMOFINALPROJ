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
            <router-link to="/mobile/mypet"><li><a><font-awesome-icon class="iconR" icon="paw"/>สัตว์เลี้ยง</a></li></router-link>
            <router-link to="/mobile/package"><li><a><font-awesome-icon class="iconR" icon="syringe"/>แพ็คเกจ</a></li></router-link>
            <router-link to="/mobile/history"><li><a><font-awesome-icon class="iconR" icon="clock"/>ประวัติการรักษา</a></li></router-link>
            <router-link to="/mobile/appointment"><li><a><font-awesome-icon class="iconR" icon="clipboard-list"/>การนัดหมาย</a></li></router-link>
            <router-link to="/mobile/annoucement"><li><a><font-awesome-icon class="iconR" icon="newspaper"/>ข่าวสาร</a></li></router-link>
          </div>
          
          <div>
            <li @click="logout()"><font-awesome-icon class="iconR" icon="power-off"/>ออกจากระบบ</li>  
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
    logout
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
