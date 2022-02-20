<template>
  <div>
    <Navbar namepage="ANIMO" />
    <div class="content">
      <div class="content-profile">
        <div class="profile-content">
          <div class="edit-image-box1">
            <div class="edit-image-box">
              <div class="edit-image" @click="toggleShow">แก้ไข</div>
            </div>
          </div>

          <img
            :src="this.baseurl+this.currentUser.profile.avatar"
            alt="Animo"
            class="profile-client"
            @click="toggleShow"
          />
        </div>
        <h2 class="name-profile">
          {{ currentUser.profile.firstName }} {{ currentUser.profile.lastName }}
        </h2>
        <div class="content-detail">
          <div class="TextDT">
            <font
              >อีเมลล์ : <b>{{ currentUser.email }}</b></font
            >
          </div>
          <div class="TextDT">
            <font
              >เบอร์โทร : <b>{{ currentUser.profile.contact }}</b></font
            >
          </div>
          <div class="TextDT">
            <font
              >ที่อยู่ :
              <b>
                {{ currentUser.profile.address.detail }}
                {{ currentUser.profile.address.subdistrict }}
                {{ currentUser.profile.address.district }}
                {{ currentUser.profile.address.province }}
                {{ currentUser.profile.address.postalCode }}</b
              ></font
            >
          </div>
        </div>
      </div>
      <div>
        <my-upload
          field="img"
          v-model="show"
          url="/upload"
          :langExt="langExt"
          :noSquare="true"
          :noCircle="true"
          :noRotate="false"
          img-format="png"
        ></my-upload>
      </div>

      <div class="footer-button">
          <div class="button-home" @click="goToMypet()">
            <h4><font-awesome-icon icon="home"/></h4>
          </div>
        <div class="button-addpet home" @click="goToEditProfile()">
          <h4>แก้ไขข้อมูล</h4>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import myUpload from "vue-image-crop-upload/upload-2.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Mypet",
  components: {
    Navbar,
    "my-upload": myUpload,
  },
  data() {
    return {
      search: "",
      active: false,
      value: "",
      show: false,
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
      params: {
        token: "123456798",
        name: "avatar",
      },
      headers: {
        smail: "*_~",
      },
      imgDataUrl: "", // the datebase64 url of created image
      baseurl: 'http://localhost:4000/api/',
    };
  },
  methods: {
    ...mapActions(["fetchCurrentUser"]),
    goToMypet() {
      this.$router.push('/mobile/mypet'); 
    },
    goToEditProfile() {
      this.$router.push('/mobile/editprofile'); 
    },
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
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
    ...mapGetters(["currentUser"]),
  },
  created() {
    this.fetchCurrentUser();
    //this.openLoading();
  },
};
</script>
<style scoped>
@import url("../assets/css/style.css");

.edit-image-box1 {
  width: 100%;
  height: 160px;
  display: inline-grid;
  grid: auto / auto;
  position: absolute;
  z-index: 2;
  transform: translateY(-50%);
  overflow: hidden;
}
.edit-image-box {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  z-index: 2;
  overflow: hidden;
}
.edit-image {
  width: 100%;
  height: 40px;
  z-index: 2;
  color: #ffffff;
  background: #696969;
  opacity: 70%;
  transform: translateY(330%);
}

.home {
  background: rgb(99, 201, 164);
  background: linear-gradient(
    149deg,
    rgba(99, 201, 164, 1) 14%,
    rgba(99, 180, 201, 1) 100%
  );
}
.button-home {
  padding: 10px;
  width: 60px;
  color: #ffffff;
  border-radius: 20px;
  font-size: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  background: rgb(99, 201, 164);
}
.name-profile {
  font-size: 35px;
  font-weight: 500;
  color: #696969;
  margin-top: -60px;
}
.profile-client {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  transform: translateY(-50%);
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
}
.profile-content {
  background: #ffffff;
  height: 100%;
  margin-top: 140px;
}
.content-profile {
  background: rgb(99, 201, 164);
  background: linear-gradient(
    149deg,
    rgba(99, 201, 164, 1) 14%,
    rgba(99, 128, 201, 1) 100%
  );
  height: 150px;
}
::v-deep .footer-button {
  display: grid;
  grid: auto / 20% 80%;
  justify-items: center;
}
::v-deep .content-detail {
  text-align: left;
  font-size: 20px;
  width: 95%;
}
::v-deep .content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
