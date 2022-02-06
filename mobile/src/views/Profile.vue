<template>
  <div>
    <Navbar namepage="ANIMO" />
    <div class="content">
      <div class="content-profile">
        <div class="profile-content">
          <img src="../assets/bento.png" alt="Animo" class="profile-client" />
        </div>
        <h2 class="name-profile">Yoshinori Kane</h2>
        <div class="content-detail">
          <div class="TextDT">
            <font>อีเมลล์ : <b>yoshinori@example.com</b></font>
          </div>
          <div class="TextDT">
            <font>เบอร์โทร : <b>09-99999999</b></font>
          </div>
          <div class="TextDT">
            <font>ที่อยู่ : <b>เชียงใหม่ 50200</b></font>
          </div>
        </div>
      </div>
      <div class="footer-button">
        <div class="button-home">
          <h4><font-awesome-icon icon="home" /></h4>
        </div>
        <div class="button-addpet home">
          <h4>แก้ไขข้อมูล</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Mypet",
  data() {
    return {
      search: "",
      active: false,
      value: "",
    };
  },
  components: {
    Navbar,
  },
};
</script>
<style scoped>
@import url("../assets/css/style.css");
.home {
    background: rgb(99,201,164);
    background: linear-gradient(149deg, rgba(99,201,164,1) 14%, rgba(99,180,201,1) 100%);
}
.button-home {
    padding: 10px;
    width: 60px;
    color: #ffffff;
    border-radius: 20px;
    font-size: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    background: rgb(99,201,164);
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
</style>
