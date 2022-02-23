<template>
  <div>
    <Navbar namepage="ANIMO" />
    <div class="content">
      <div>
        <div class="Head-text">
          <h2 class="active-text">รายละเอียดแพ็คเกจ</h2>
        </div>

        <div class="content1">
          <h2 class="head-step">{{ packageDetail.name }}</h2>

          <!-- vaccines -->
          <div v-for="vaccine in packageDetail.vaccines" :key="vaccine.name" 
          >
            <div v-if="packageDetail.vaccines" class="box-package">
              <h2>วัคซีนพิษสุนัขบ้า</h2>
              <div class="box-package-dt">
                <font>ประเภทสัตว์ : <b>ทุกประเภท</b></font
                ><br />
                <font>อายุมากกว่า : <b>5 เดือน</b></font
                ><br />
                <font
                  >รายละเอียด :
                  <b
                    >ฉีดปีละ 2 เข็ม โดยราคาที่จ่ายเป็นราคาสำหรับเข็มเดียว
                    จะต้องกลับมาฉีดอีก 6 เดือนข้างหน้า</b
                  ></font
                ><br />
              </div>
            </div>
          </div>


          <!-- treatments -->
          <div v-for="treatment in packageDetail.treatments" :key="treatment.name">
            <div class="box-package">
              <h2>{{ treatment.name }}</h2>
              <div class="box-package-dt">
                <font>ประเภทสัตว์ : <b> ทุกประเภท </b></font
                ><br />
                <font>อายุมากกว่า : <b>1 เดือน</b></font
                ><br />
                <font>รายละเอียด : <b>{{ treatment.detail }}</b></font
                ><br />
              </div>
            </div>
          </div>

          <!-- healthChecks -->
          <div v-for="healthCheck in packageDetail.healthChecks" :key="healthCheck.name">
            <div class="box-package">
              <h2>{{ healthCheck.name }}</h2>
              <div class="box-package-dt">
                <font>ประเภทสัตว์ : <b> ทุกประเภท </b></font
                ><br />
                <font>อายุมากกว่า : <b>1 เดือน</b></font
                ><br />
                <font>รายละเอียด : <b>{{ healthCheck.detail }}</b></font
                ><br />
              </div>
            </div>
          </div>

          <div class="box-package">
            <font class="right"
              >ราคาสุทธิ : <b class="active-text">{{ packageDetail.price }} บาท</b></font
            ><br />
          </div>
        </div>
      </div>
      <div class="footer-button" @click="goToStep1()">
        <div class="button-addpet active-color">
          <h4>จองแพ็คเก็จ</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navbar from "../components/Navbar";

export default {
  name: "Step0",
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
    ...mapActions(['']),

    goToStep1() {
      this.$router.push('/mobile/step1'); 
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
    // this.openLoading();
  },
  computed: {
    ...mapGetters(['packageDetail']),

  }
};
</script>
<style scoped>
@import url("../assets/css/style.css");
::v-deep .active-text {
  font-size: 20px;
}
::v-deep .Head-text {
  display: grid;
  grid: auto / auto;
  text-align: center;
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
  display: grid;
  justify-items: center;
  position: sticky;
  bottom: 0px;
}
::v-deep .vs-loading {
    background: rgba(255,255,255, 1);
}
</style>
