<template>
  <div>
    <Navbar namepage="แพ็คเกจ" />
    <div class="content package">
      <div class="content1">
        <vs-input class="search" v-model="search" placeholder="ค้นหา..." />
        <div class="content2">

            <div class="filter-package">
                <div class="bg-filter">
                    <img src="../assets/pet1.png" alt="Animo" class="Pic-package" />
                </div>
                <h4>สุนัข</h4>
            </div>
            <div class="filter-package">
                <div class="bg-filter">
                    <img src="../assets/pet2.png" alt="Animo" class="Pic-package" />
                </div>
                <h4>แมว</h4>
            </div>
            <div class="filter-package">
                <div class="bg-filter">
                    <img src="../assets/pet3.png" alt="Animo" class="Pic-package" />
                </div>
                <h4>สัตว์ฟันแทะ</h4>
            </div>
            <div class="filter-package">
                <div class="bg-filter">
                    <img src="../assets/pet4.png" alt="Animo" class="Pic-package" />
                </div>
                <h4>อื่นๆ</h4>
            </div>

          <div class="Package-Card" @click="active = !active">
            <div class="bg-package package-yellow">
                <img src="../assets/pet1.png" alt="Animo" class="Pic-package-dt" />
            </div>
            <div class="PetDT">
              <h2>แพ็คเกจลูกสุนัข</h2>
              <div class="TextDT">
                <font>ประเภทสัตว์ : <b>แมว</b></font>
              </div>
              <div class="TextDT">
                <font>อายุ : <b>2 ปี 3 เดือน</b></font>
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

          <div class="Package-Card" @click="active = !active">
            <div class="bg-package package-orange">
                <img src="../assets/pet2.png" alt="Animo" class="Pic-package-dt" />
            </div>
            <div class="PetDT">
              <h2>แพ็คเกจลูกสุนัข</h2>
              <div class="TextDT">
                <font>ประเภทสัตว์ : <b>แมว</b></font>
              </div>
              <div class="TextDT">
                <font>อายุ : <b>2 ปี 3 เดือน</b></font>
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

          <div class="Package-Card" @click="active = !active">
            <div class="bg-package package-pink">
                <img src="../assets/pet3.png" alt="Animo" class="Pic-package-dt" />
            </div>
            <div class="PetDT">
              <h2>แพ็คเกจลูกสุนัข</h2>
              <div class="TextDT">
                <font>ประเภทสัตว์ : <b>แมว</b></font>
              </div>
              <div class="TextDT">
                <font>อายุ : <b>2 ปี 3 เดือน</b></font>
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

          <div class="Package-Card" @click="active = !active">
            <div class="bg-package package-red">
                <img src="../assets/pet4.png" alt="Animo" class="Pic-package-dt" />
            </div>
            <div class="PetDT">
              <h2>แพ็คเกจลูกสุนัข</h2>
              <div class="TextDT">
                <font>ประเภทสัตว์ : <b>แมว</b></font>
              </div>
              <div class="TextDT">
                <font>อายุ : <b>2 ปี 3 เดือน</b></font>
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <vs-dialog v-model="active">
      <template #header>
        <img src="../assets/bento.png" alt="Animo" class="PicCatDT" />
      </template>

      <div class="content-detail">
        <h2 style="font-size: 25px; color: #696969">Muji</h2>
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
          <div class="button-detail edit">แก้ไข</div>
          <div class="button-detail delete">ลบ</div>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Package",
  data() {
    return {
      search: "",
      active: false,
    };
  },
  components: {
    Navbar,
  },
};
</script>
<style scoped>
@import url("../assets/css/style.css");
.Pic-package-dt {
    height: 90px;
    width: 90px;
    border-radius: 20px 0px 0px 20px;
    filter:brightness(70%);
}
.bg-package {
    height: 90px;
    width: 90px;
    border-radius: 20px 0px 0px 20px;
}
.package-yellow {
    background: rgb(235,225,139);
    background: linear-gradient(135deg, rgba(235,225,139,1) 0%, rgba(235,202,139,1) 100%);
}
.package-orange {
    background: rgb(254,193,142);
    background: linear-gradient(135deg, rgba(254,193,142,1) 0%, rgba(255,165,136,1) 100%);
}
.package-pink {
    background: rgb(249,199,235);
background: linear-gradient(138deg, rgba(249,199,235,1) 0%, rgba(240,156,164,1) 100%);
}
.package-red {
    background: rgb(255,180,165);
    background: linear-gradient(135deg, rgba(255,180,165,1) 0%, rgba(225,116,116,1) 100%);
}
.Package-Card {
    width: 100%;
    height: 90px;
    background: #ffffff;
    margin-block: 10px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    cursor: pointer;
    text-align: left !important;
    margin-right: 10px;
}
.package {
  background: rgb(154, 221, 213);
  background: linear-gradient(
    180deg,
    rgba(154, 221, 213, 1) 0%,
    rgba(144, 202, 221, 1) 100%
  );
}
.filter-package {
    display: inline-block;

}
.filter-package h4{
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
    margin-top: 3px;
}
.Pic-package {
    width: 60px;
    height: 60px;
}
.bg-filter {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2));
    margin: 10px 10px 0px 10px;
    background: #ffffff;
}
::v-deep .PetDT h2 {
    font-weight: 500;
    font-size: 18px;
    color: #696969;
  }
::v-deep .PetDT font {
    font-size: 13px;
  }
::v-deep .TextDT {
    margin-top: -5px;
  }
::v-deep .TextDT1 {
    margin-top: -8px;
  }
::v-deep .PetDT {
    height: 90px;
    width: 100%;
    margin-left: 20px;
    display: inline-block;
    align-items: center;
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
</style>
