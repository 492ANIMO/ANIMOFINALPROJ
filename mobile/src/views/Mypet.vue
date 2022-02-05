<template>
  <div>
    <Navbar />
    <div class="content">
      <div class="content1">
        <vs-input class="search" v-model="search" placeholder="ค้นหา..." />
        <div class="content2">

          <div class="PetCard" @click="active = !active">
            <img src="../assets/bento.png" alt="Animo" class="PicCat"/>
            <div class="PetDT">
              <h2>Bento</h2>
              <font-awesome-icon class="gander" icon="mars" />
              <div class="TextDT">
                <font>ประเภทสัตว์ : <b>แมว</b></font>
              </div>
              <div class="TextDT">
                <font>อายุ : <b>2 ปี 3 เดือน</b></font>
              </div>
              <div class="TextDT">
                <font>น้ำหนัก : <b>3 กิโลกรัม</b></font>
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

          <div class="PetCard">
            <img src="../assets/muji.png" alt="Animo" class="PicCat" />
            <div class="PetDT">
              <h2>Muji</h2>
              <font-awesome-icon class="gander" icon="venus" />
              <div class="TextDT">
                <font>ประเภทสัตว์ : <b>สุนัข</b></font>
              </div>
              <div class="TextDT">
                <font>อายุ : <b>2 ปี 3 เดือน</b></font>
              </div>
              <div class="TextDT">
                <font>น้ำหนัก : <b>3 กิโลกรัม</b></font>
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

          <div class="button-add">
            <font-awesome-icon class="icon-add" icon="plus" />
          </div>
          
        </div>
      </div>
    </div>
    <vs-dialog v-model="active">

        <template #header>
          <img src="../assets/bento.png" alt="Animo" class="PicCatDT"/>
        </template>

        <div class="content-detail">

              <h2 style="font-size: 25px; color: #696969;">Muji</h2>
              <font-awesome-icon class="gander" icon="venus" />
              <div class="TextDT" style="font-size: 18px">
                <font>ประเภทสัตว์ : <b>สุนัข</b></font>
              </div>
              <div class="TextDT" style="font-size: 18px">
                <font>อายุ : <b>2 ปี 3 เดือน</b></font>
              </div>
              <div class="TextDT" style="font-size: 18px">
                <font>น้ำหนัก : <b>3 กิโลกรัม</b></font>
              </div>
              <div class="TextDT" style="font-size: 18px">
                <font>ข้อมูล : <b>ข้อมูล</b></font>
              </div>
              <div class="TextDT" style="font-size: 18px">
                <font>ข้อมูล : <b>ข้อมูล</b></font>
              </div>
              <div class="TextDT" style="font-size: 18px">
                <font>ข้อมูล : <b>ข้อมูล</b></font>
              </div>

        </div>

        <template #footer>
          <div class="footer-button">
            <div class="button-detail edit">
              แก้ไข
            </div>
            <div class="button-detail delete">
              ลบ
            </div>
          </div>
        </template>
      </vs-dialog>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Mypet",
 data() {
   return {
     search: '',
     active: false,
   }
 },
  components: {
    Navbar,
  },
};
</script>
<style scoped>
.content {
  background: rgb(133, 209, 220);
  background: linear-gradient(
    180deg,
    rgba(133, 209, 220, 1) 0%,
    rgba(130, 184, 222, 1) 100%
  );
  height: calc(100% - 70px);
  width: 100%;
  border-radius: 15px 15px 0px 0px;
  z-index: auto !important;
  margin-top: -10px;
  text-align: center;
  overflow: hidden;
  position: absolute;
}
.content1 {
  padding: 20px;
  display: grid;
  text-align: center;
}
.content2 {
  overflow-y: auto;
  overflow-x: hidden;
  height: 83.5vh;
}
.PetCard {
  width: 100%;
  height: 140px;
  background: #ffffff;
  margin-block: 10px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  cursor: pointer;
  max-width: 600px;
  text-align: left !important;
  margin-right: 10px;
}
.search {
  padding-bottom: 10px;
}
.PicCat {
  height: 140px;
  width: 140px;
  border-radius: 20px;
}
.PicCatDT {
  width: 100%;
  border-radius: 20px;
}
.PetDT {
  height: 140px;
  width: 100%;
  margin-left: 20px;
  display: inline-block;
  align-items: center;
}
.PetDT h2 {
  font-weight: 500;
  color: #696969;
  padding-top: 5px;
}
.TextDT {
  color: #AEAEAE;
  font-weight: 400;
  padding-left: 8px;
}
.TextDT b{
  color: #8b8b8b;
  font-weight: 500;
}
.TextDT1 {
  color: #63BCC9;
  font-size: 15px;
  font-weight: 400;
  float: right;
  padding-right: 15px;
}
.gander {
  color:#c2c2c2;
  position: relative;
  top: -30px;
  margin-right: 18px;
  float: right;
  font-size: 25px;
}
.button-add {
  height: 35px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px !important;
  align-items: center;
  display: grid;
  width: 100px;
  margin: auto;
}
.button-add .icon-add {
  color: #696969;
  text-align: center;
  width: 100%;
}
.footer-button {
  float: right;
  padding: 12px;
  margin-right: -20px;
}
.button-detail {
  color: #ffffff;
  border-radius: 20px;
  padding: 5px;
  display: inline-block;
  width: 80px;
  text-align: center;
  margin-right: 10px;
}
.edit {
  background: rgb(215, 132, 97);
  background: linear-gradient(
    45deg,
    rgba(215, 132, 97, 1) 0%,
    rgba(215, 169, 106, 1) 100%
  );
}
.delete {
  background: rgb(197, 94, 94);
  background: linear-gradient(
    45deg,
    rgba(197, 94, 94, 1) 0%,
    rgba(248, 139, 109, 1) 100%
  );
}
::v-deep .vs-input {
  width: 100%;
  border-radius: 20px;
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
.content-detail {
    border-radius: 20px;
    z-index: auto;
    background: #ffffff;
    padding: 10px 0px 0px 20px;
}
</style>
