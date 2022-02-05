<template>
  <div>
    <Navbar namepage="ANIMO" />
    <div class="content">
      <div>
        <h2 class="Head-text">
          <font-awesome-icon class="iconR" icon="plus" />เพิ่มสัตว์เลี้ยง
        </h2>
        <div>
          <img src="../assets/bento.png" alt="Animo" class="profile-pic" />
        </div>
        <div class="content1">
          <div class="content-input">
            <vs-input
              label="ชื่อสัตว์เลี้ยง"
              v-model="value"
              placeholder="ชื่อสัตว์เลี้ยง"
            />
          </div>

          <div class="content-input grid">
            <vs-select
              class="select-grid"
              label="ประเภทสัตว์"
              placeholder="ประเภทสัตว์"
              v-model="value"
            >
              <vs-option label="แมว" value="1">
                แมว
              </vs-option>
            </vs-select>
            <vs-input
            class="input-grid1"
              label="สายพันธุ์"
              v-model="value"
              placeholder="สายพันธุ์"
            />
          </div>

          <div class="content-input grid">
            <vs-input
              class="input-grid"
              label="อายุ"
              v-model="value"
              placeholder="เดือน"
            />
            <vs-input label="" v-model="value" placeholder="ปี" />
          </div>

          <div class="content-input grid">
            <vs-select
              class="select-grid"
              label="เพศ"
              placeholder="เพศ"
              v-model="value"
            >
              <vs-option label="ผู้" value="1">
                ผู้
              </vs-option>
            </vs-select>
            <vs-input class="input-grid1" label="น้ำหนัก" v-model="value" placeholder="น้ำหนัก" />
          </div>

          <div class="content-input alone">
            <vs-select
              class="input-alone"
              label="ทำหมั้น"
              placeholder="ทำหมั้น"
              v-model="value"
            >
              <vs-option label="ทำหมันแล้ว" value="1">
                ทำหมันแล้ว
              </vs-option>
            </vs-select> 
          </div>
        </div>
      </div>
      <div class="footer-button">
        <div class="button-addpet add">
          <h4>เพิ่มสัตว์เลี้ยง</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Addpet",
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
.button-addpet {
  color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  display: inline-block;
  width: 95%;
  text-align: center;
  font-size: 20px;
  margin: 10px 0px;
  align-items: center;
}
.button-addpet h4 {
  font-weight: 500;
  display: grid;
  text-align: center;
  height: 100%;
}
.add {
  background: rgb(157, 209, 103);
  background: linear-gradient(
    45deg,
    rgba(157, 209, 103, 1) 0%,
    rgba(99, 209, 157, 1) 100%
  );
}
.footer-button {
  background: #f4f7f8;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  align-items: center;
}
.profile-pic {
  height: 140px;
  width: 140px;
  border-radius: 20px;
}
.Head-text {
  text-align: left;
  color: #696969;
  font-weight: 500;
  padding: 10px 20px;
}
.content-input {
  padding-bottom: 30px;
}
.grid {
  display: grid;
  grid: auto / auto auto;
}
.input-grid {
  padding-right: 10px;
}
.select-grid {
  min-width: 100%;
  margin-right: 20px;
}
.input-grid1 {
  padding-left: 10px;
}
.alone {
  display: grid;
  grid: auto / auto;
}
.input-alone {
  min-width: calc(50% - 5px);
  width: calc(50% - 5px);
}
::v-deep .bar {
  background: rgb(133, 209, 220);
  background: linear-gradient(
    145deg,
    rgba(133, 209, 220, 1) 14%,
    rgba(131, 184, 222, 1) 100%
  );
}
::v-deep .content {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
::v-deep .content1 {
  padding: 30px;
  text-align: center;
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
}
::v-deep .vs-select__input {
  width: 100%;
  border-radius: 10px;
  padding: 7px 13px 7px 10px;
}
</style>
