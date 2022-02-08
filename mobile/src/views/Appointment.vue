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
  name: "Appointment",
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
