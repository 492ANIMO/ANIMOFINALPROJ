<template>
  <div>
    <Navbar namepage="ประวัติการรักษา" />
    <div class="content history">
      <div class="content1">
        <div class="content2">
          <vs-input class="search" v-model="search" placeholder="ค้นหา..." />

          <div class="Package-Card" @click="active = !active">
            <div class="bg-package package-green">
                <font-awesome-icon class="Pic-appointment-dt" icon="check-circle" />
            </div>
            <div class="PetDT">
              <h2>แพ็คเกจแมวโต</h2>
              <div class="TextDT">
                <font>วันที่ : <b>20/20/2022</b></font>
              </div>
              <div class="TextDT">
                <font>สัตว์เลี้ยง : <b>Bento</b></font>
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

          <div class="Package-Card" @click="active = !active">
            <div class="bg-package package-green">
                <font-awesome-icon class="Pic-appointment-dt" icon="check-circle" />
            </div>
            <div class="PetDT">
              <h2>แพ็คเกจแมวโต</h2>
              <div class="TextDT">
                <font>วันที่ : <b>20/20/2022</b></font>
              </div>
              <div class="TextDT">
                <font>สัตว์เลี้ยง : <b>Bento</b></font>
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

          <div class="Package-Card" @click="active = !active">
            <div class="bg-package package-red">
                <font-awesome-icon class="Pic-appointment-dt" icon="times-circle" />
            </div>
            <div class="PetDT">
              <h2>แพ็คเกจลูกสุนัข</h2>
              <div class="TextDT">
                <font>วันที่ : <b>20/20/2022</b></font>
              </div>
              <div class="TextDT">
                <font>สัตว์เลี้ยง : <b>Muji</b></font>
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
  name: "History",
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
.package-green {
    background: rgb(180,230,154);
    background: linear-gradient(135deg, rgba(180,230,154,1) 0%, rgba(124,218,160,1) 100%);
}
.history {
    background: rgb(158,184,235);
    background: linear-gradient(180deg, rgba(158,184,235,1) 0%, rgba(124,184,218,1) 100%);
}
font-awesome-icon {
    /* color: #ffffff; */
    height: 20px;
    width: 20px;
}
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
    padding: 20px;
    color: #ffffff;
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
