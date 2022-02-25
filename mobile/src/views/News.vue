<template>
  <div>
    <Navbar namepage="ANIMO" />
    <div class="content">
      <div>
        <div class="Head-text">
          <div>
            <h4>
              <font-awesome-icon
                class="iconR"
                @click="goToannoucement()"
                icon="chevron-left"
              />
            </h4>
          </div>
        </div>

        <div class="content-news">
        <div class="Head-text-box">
          <img src="../assets/bento.png" alt="Animo" class="PicCatDT" />
          <h2 class="Head-text-news">{{ annoucementDetail.title }}</h2>
        </div>

        <div class="text-box-news">
          <p v-html="annoucementDetail.body"></p>
        </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
  
    goTomypet() {
      this.$router.push("/mobile/mypet");
    },
    goToannoucement() {
      this.$router.push("/mobile/annoucement");
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
  created() {
    //this.openLoading();

  },
  computed:{
    ...mapGetters(['annoucementDetail'])
  }
};
</script>
<style scoped>
@import url("../assets/css/style.css");

.content-news {
  overflow-y: scroll;
}
.text-box-news {
  height: 100%;
  width: 100%;
  word-wrap: break-word;
  padding: 20px;
  text-align: left;
  font-size: 18px;
  color: #696969;
}
.Head-text-box {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content:flex-end;
}
.Head-text-news {
  position: absolute;
  text-align: left;
  background: rgb(105,105,105);
  background: linear-gradient(180deg, rgba(105,105,105,0) 0%, rgba(105,105,105,0.75) 100%);
  width: 100vw;
  padding: 40px 20px 20px 20px;
  color: #ffffff;
  font-size: 30px;
  word-wrap: break-word;
  font-weight: 500;
  line-height: 1;
}
.confirm-dt {
  display: grid;
  grid: auto / auto;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
}
.confirm-dt h2 {
  font-weight: 500;
  color: #696969;
}
.confirm-dt h4 {
  font-weight: 400;
  color: #a8a8a8;
}
.Pic-confirm-dt {
  color: #4ac884;
  text-align: center !important;
  width: 60px;
  height: 60px;
  justify-self: center;
}
::v-deep .PicCatDT {
  height: 200px;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 0px;
}
::v-deep .iconR {
  font-size: 32px !important;
  text-decoration: #696969;
}
::v-deep .button-detail {
  width: 120px;
  margin-right: 0px;
}
::v-deep .footer-button-none {
  display: flex;
  justify-content: center;
  width: calc(100%);
  padding: 10px;
  padding-bottom: 15px;
  margin-right: 0px;
}
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
  grid: auto / 20px;
  position: sticky;
  top: 0px;
  z-index: 2;
  background: #f2fbff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
  background: rgb(118, 204, 194);
  background: linear-gradient(
    135deg,
    rgba(118, 204, 194, 1) 0%,
    rgba(125, 189, 217, 1) 100%
  );
}
::v-deep .content {
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
::v-deep .vs-dialog__header h2 {
  font-weight: 500;
}
::v-deep .vs-dialog__content {
  background: #ffffff;
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
