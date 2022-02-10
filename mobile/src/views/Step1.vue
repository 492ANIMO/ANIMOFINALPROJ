<template>
  <div>
    <Navbar namepage="ANIMO" />
    <div class="content">
      <div>
          <div class="Head-text">
              <br>
              <div class="dot active-color"><h2>1</h2></div>
              <div class="dot-line"></div>
              <div class="dot"><h2>2</h2></div>
              <div class="dot-line"></div>
              <div class="dot"><h2>3</h2></div>
              <br>
          </div>

        <div class="content1">
            <h2 class="head-step">แพ็คเกจลูกสุนัข</h2>

            <div class="box-package">
                <h2>วัคซีนพิษสุนัขบ้า</h2>
                <div class="box-package-dt">
                <font>ประเภทสัตว์ : <b>ทุกประเภท</b></font><br>
                <font>อายุมากกว่า : <b>5 เดือน</b></font><br>
                <font>รายละเอียด : <b>ฉีดปีละ 2 เข็ม โดยราคาที่จ่ายเป็นราคาสำหรับเข็มเดียว จะต้องกลับมาฉีดอีก 6 เดือนข้างหน้า</b></font><br>
                </div>
            </div>

            <div class="box-package">
                <h2>ถ่ายพยาธิ</h2>
                <div class="box-package-dt">
                <font>ประเภทสัตว์ : <b>ทุกประเภท</b></font><br>
                <font>อายุมากกว่า : <b>1 เดือน</b></font><br>
                <font>รายละเอียด : <b>งดน้ำ งดอาหาร ก่อนมา 2 ชั่วโมง</b></font><br>
                </div>
            </div>

            <div class="box-package">
                <font class="right">ราคาสุทธิ : <b class="active-text">1,250 บาท</b></font><br>
            </div>
            
        </div>

      </div>
      <div class="footer-button ">
        <div class="button-addpet active-color">
          <h4>จองแพ็คเก็จ</h4>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Step1",
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
};
</script>
<style scoped>
@import url("../assets/css/style.css");

.right {
    float: right;
}
.active-text {
    color: #808FDD !important;
    font-weight: 500;
}
.box-package-dt {
    width: 100%;
    word-wrap: break-word;
    margin-left: 10px;
}
.box-package {
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    padding: 8px 15px;
    border-radius: 10px;
    text-align: left;
    margin-top: 10px;
    white-space: initial;
    width: calc(100vw - 30px);
}

.box-package h2{
    font-size: 18px !important;
    font-weight: 500;
}
.box-package font{
    color: #c2c2c2;
    font-size: 15px;
}
.box-package b{
    color: #696969;
    font-weight: 400;
}
.active-color {
    background: #808FDD !important;
}
.dot-line {
    background: #DDE4E5;
    height: 2px;
    width: 100%;
    display: flex;
    margin: auto;
}
.dot {
    width: 40px;
    height: 40px;
    background: #DDE4E5;
    border-radius: 50%;
    text-align: center;
    align-items: center;
}
.dot h2{
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 100%;
}
::v-deep .Head-text {
    display: grid;
    grid: auto / 20% 40px auto 40px auto 40px 20%;
  position: sticky;
  top: 0px;
  z-index: 2;
  background: #ffffff;
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
  background: #E8EBF5;
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
    display: grid;
    justify-items: center;
    position: sticky;
    bottom: 0px;
}
</style>
