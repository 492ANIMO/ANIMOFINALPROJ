<template>
  <div>
    <Navbar namepage="ANIMO" />
    <div class="content">
      <div>
        <div class="Head-text">
          <br />
          <div class="dot active-color"><h2>1</h2></div>
          <div class="dot-line active-color"></div>
          <div class="dot active-color"><h2>2</h2></div>
          <div class="dot-line active-color"></div>
          <div class="dot active-color"><h2>3</h2></div>
          <br />
        </div>

        <div class="content1">
          <h2 class="head-step">สรุปข้อมูลการจอง</h2>

          <div class="box-package">
            <h2>วัคซีนพิษสุนัขบ้า</h2>
            <div class="box-package-dt">
              <font>ชื่อสัตว์เลี้ยง : <b>ฺBento</b></font
              ><br />
              <font>ประเภทสัตว์ : <b>แมว</b></font
              ><br />
              <font><b>รายการแพ็คเกจ</b></font
              ><br />
              <font><b>- วัคซีนพิษสุนัขบ้า</b></font
              ><br />
              <font><b>- ถ่ายพยาธิ</b></font
              ><br />
              <font>วันที่นัดหมาย : <b>20/10/2022</b></font
              ><br />
              <font>เวลา : <b>8.00 - 9.00</b></font
              ><br />
              <font>ราคาสุทธิ : <b class="active-text">1,250 บาท</b></font
              ><br />
            </div>
          </div>
        </div>
      </div>
      <div class="footer-button">
        <div class="button-addpet white-button">
          <h4>ยกเลิก</h4>
        </div>
        <div class="button-addpet add">
          <h4>ยืนยัน</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Step3",
  data() {
    return {
      search: "",
      value: "",
      active: false,
    };
  },
  components: {
    Navbar,
  },
  methods: {
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
  created() {
    //this.openLoading();
  },
};
</script>
<style scoped>
@import url("../assets/css/style.css");

::v-deep .status-package {
  position: relative;
  float: right;
  width: 70px;
  text-align: center;
  border-radius: 10px 0px 10px 0px;
  margin-top: -18px;
  background: #dde4e5;
}
::v-deep .status-package h4 {
  color: #ffffff;
  font-weight: 500;
  font-size: 14px !important;
  padding: 3px;
}
::v-deep .Head-text {
  display: grid;
  grid: auto / 20% 40px auto 40px auto 40px 20%;
  position: sticky;
  top: 0px;
  z-index: 2;
  background: #ffffff;
}
::v-deep .Package-Card {
  border-radius: 10px;
}
::v-deep .Package-Card h2 {
  font-size: 20px !important;
  padding-top: 5px;
}
::v-deep .bg-package {
  border-radius: 10px;
}
::v-deep .Pic-appointment-dt {
  height: 90px;
  width: 90px;
  border-radius: 10px 0px 0px 10px;
}
::v-deep .bar {
  background: rgb(142, 193, 231);
  background: linear-gradient(
    135deg,
    rgba(142, 193, 231, 1) 0%,
    rgba(132, 140, 206, 1) 100%
  );
}
::v-deep .content {
  background: #e8ebf5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
}
::v-deep .content1 {
  padding: 10px 15px;
  text-align: center;
}
::v-deep .content1 h2 {
  color: #696969;
  font-size: 25px;
  font-weight: 500;
  text-align: left;
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
  font-size: 18px;
  margin-left: -10px;
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
}
::v-deep .vs-select {
  z-index: 1;
}
::v-deep .footer-button {
  display: flex;
  justify-content: space-evenly;
  position: sticky;
  bottom: 0px;
  display: grid;
  grid: auto / 40% 40%;
}
</style>
