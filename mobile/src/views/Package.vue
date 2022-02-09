<template>
  <div>
    <Navbar namepage="แพ็คเกจ" />
    <div class="content package">
      <div class="content1">
        <div class="content2">
          <vs-input class="search" v-model="search" placeholder="ค้นหา..." />
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
              <img
                src="../assets/pet1.png"
                alt="Animo"
                class="Pic-package-dt"
              />
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
              <img
                src="../assets/pet2.png"
                alt="Animo"
                class="Pic-package-dt"
              />
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
              <img
                src="../assets/pet3.png"
                alt="Animo"
                class="Pic-package-dt"
              />
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
              <img
                src="../assets/pet4.png"
                alt="Animo"
                class="Pic-package-dt"
              />
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
::v-deep .Package-Card {
    border-radius: 10px;
}
::v-deep .bg-package {
    border-radius: 10px;
}
::v-deep .Pic-appointment-dt {
    height: 90px;
    width: 90px;
    border-radius: 10px 0px 0px 10px;
}
::v-deep .content1 {
  position: absolute;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: calc(100% - 0px);
  padding-bottom: 0px;
}
::v-deep .content {
  padding-bottom: 0px;
  display: grid;
}
::v-deep .content2 {
  padding-bottom: 0px;
  height: 100%;
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
