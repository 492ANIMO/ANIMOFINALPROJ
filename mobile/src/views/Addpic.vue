<template>
  <div :onload="openLoading">
    <Navbar namepage="ANIMO" />
    <div class="content">
      <div>
        <h2 class="Head-text">
          <font-awesome-icon class="iconR" icon="plus" />เพิ่มรูปสัตว์เลี้ยง
        </h2>

        <div class="edit-pic-pet" @click="toggleShow">
          <font-awesome-icon class="icon-edit" icon="edit" />
          <div class="bg-blur"></div>
        </div>
        <img src="../assets/bento.png" alt="Animo" class="profile-pic" />

        <my-upload
          field="img"
          v-model="show"
          :width="300"
          :height="300"
          url="/upload"
          :params="params"
          :headers="headers"
          img-format="png"
        ></my-upload>
        <img :src="imgDataUrl" />
      </div>
      <div class="footer-button">
        <div class="button-addpet add" @click="goTomypet(), addMyPet()">
          <h4>เพิ่มสัตว์เลี้ยง</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import myUpload from "vue-image-crop-upload/upload-2.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Addpic",
  "my-upload": myUpload,
  data() {
    return {
      search: "",
      value: "",
      active: false,
      show: true,
      type: ["สุนัข", "แมว", "สัตว์ฟันแทะ", "อื่นๆ"],
      langExt: {
        hint: "อัพโหลดภาพ",
        loading: "กำลังอัพโหลด…",
        noSupported:
          "เบราเซอร์ไม่รองรับ, กรุณาใช้ IE เวอร์ชั่น 10 ขึ้นไป หรือใช้เบราเซอร์ตัวอื่น",
        success: "อัพโหลดสำเร็จ",
        fail: "อัพโหลดล้มเหลว",
        preview: "ตัวอย่าง",
        btn: {
          off: "ยกเลิก",
          close: "ปิด",
          back: "กลับ",
          save: "บันทึก",
        },
        error: {
          onlyImg: "ไฟล์ภาพเท่านั้น",
          outOfSize: "ไฟล์ใหญ่เกินกำหนด: ",
          lowestPx: "ไฟล์เล็กเกินไป. อย่างน้อยต้องมีขนาด: ",
        },
      },
    };
  },
  methods: {
    ...mapActions(["fetchCurrentUser", "addMyPet"]),
    goTomypet() {
      this.$router.push("/mobile/mypet");
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
      console.log("field: " + field);
      console.log("imgDataUrl: " + this.imgDataUrl);
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
      // console.log("imgDataUrl2: " + this.imgDataUrl);
      this.fetchCurrentUser();
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
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
  computed: {
    ...mapGetters(["currentUser", "pet", "addPetForm"]),
  },
  components: {
    Navbar,
  },
  created() {
    this.fetchCurrentUser();
    //this.openLoading();
  },
};
</script>
<style scoped>
@import url("../assets/css/style.css");
.profile-pic {
  width: 200px;
  height: 200px;
}
.icon-edit {
    color: #ffffff;
    align-self: center;
    font-size: 15px;
    z-index: 2;
  }
  .edit-pic-pet {
    position: absolute;
    left: calc(50% + 70px);
    transform: translateX(-50%);
    top: 226px;
    width: 60px;
    height: 30px;
    border-radius: 18px 0px 18px 0px;
    align-self: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  .bg-blur {
    background: #242b2e;
    width: 80px;
    height: 30px;
    position: absolute;
    filter: blur(8px);
    -webkit-filter: blur(8px);
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
::v-deep .vue-image-crop-upload .vicp-wrap {
  width: 80%;
  max-width: 300px;
  border-radius: 20px;
  height: 300px;
}
::v-deep .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area {
  border-radius: 10px;
}
::v-deep .vue-image-crop-upload .vicp-wrap .vicp-operate a {
  margin-bottom: -10px;
  margin-right: -10px;
  width: 70px;
}
</style>
