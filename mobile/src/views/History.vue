<template>
  <div>
    <Navbar namepage="ประวัติการรักษา" />
    <div class="content history">
      <div class="content1">
        <div class="content2">
          <vs-input class="search" v-model="search" placeholder="ค้นหา..." />
        
          <div class="Package-Card"
            :key="i"
            v-for="(history, i) in $vs.getSearch(allHistories, search)"
            :data="history"
            @click="getHistoryDetail(history._id),active = !active"  >
            <div class="bg-package package-green">
              <font-awesome-icon
                class="Pic-appointment-dt"
                icon="check-circle"
              />
            </div>
            <div class="PetDT">
              <h2 v-if="history.by === 'การจอง'">
                {{ history.reservation.package.name }}
              
              </h2>
              <h2 v-if="history.by === 'นัดโดยสัตวแพทย์'">
                {{ history.type }}
              </h2>
              <div class="TextDT">
                <font
                  >วันที่ : <b>{{ format_date(history.date) }}</b></font
                >
              </div>
              <div class="TextDT">
                <font
                  >สัตว์เลี้ยง : <b>{{ history.pet.name }}</b></font
                >
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <vs-dialog v-model="active">
        <template #header>
          <h2>รายละเอียด</h2>
        </template>

        <h2 class="Head-history">ข้อมูลสัตว์</h2>
        <div class="box-package">
            <font>ชื่อสัตว์เลี้ยง : <b>{{ historyDetail.pet.name }}</b></font
            ><br />
            <font>ประเภทสัตว์ : <b>{{ historyDetail.pet.type }}</b></font
            ><br />
            <font>การนัด : <b>{{ historyDetail.status }}</b></font
            ><br />
        </div>

        <h2 v-if="historyDetail.by==='การจอง'" class="Head-history">{{ historyDetail.reservation.package.name }}</h2>
        <h2 v-else class="Head-history">{{ historyDetail.type }}</h2>

        <div class="box-package">
          <h2>วัคซีนพิษสุนัขบ้า</h2>
          <div class="box-package-dt">
            <font>เลขล็อตวัคซีน : <b>12345XAVC</b></font
            ><br />
            <font>รายละเอียด : <b>อาการปกติดี</b></font
            ><br />
          </div>
        </div>

        <div class="box-package">
          <h2>ตรวจสุขภาพ</h2>
          <div class="box-package-dt">
            <font>รายละเอียด : <b>อาการปกติดี</b></font
            ><br />
          </div>
        </div>

        <div class="box-package">
          <h2>ทำหมัน</h2>
          <div class="box-package-dt">
            <font>รายละเอียด : <b>อาการปกติดี</b></font
            ><br />
          </div>
        </div>

        <template #footer>
          <div class="footer-button-none">
            <div class="button-detail active-color" @click="active=!active">
              ปิด
            </div>
          </div>
        </template>
      </vs-dialog>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from "../components/Navbar";
import mixins from "../mixins";

export default {
  name: "History",
  mixins: [mixins],
  data() {
    return {
      search: "",
      active: false,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(["fetchMyHistories", 'getHistoryDetail']),
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
    ...mapGetters(["allHistories", 'seletedHistory', 'historyDetail']),
  },
  created() {
    this.fetchMyHistories();
    //this.openLoading();
  },
};
</script>
<style scoped>
@import url("../assets/css/style.css");
.Head-history {
  font-weight: 500;
  font-size: 19px;
  padding-top: 10px;
}
::v-deep .box-package {
  width: 100%;
  margin-top: 5px;
}
::v-deep .box-package h2{
  color: #696969;
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
  margin-right: 0px;
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
  width: 90%;
  min-width: 90%;
}
::v-deep .vs-dialog__header h2 {
  font-weight: 500;
  color: #696969;
}
::v-deep .vs-dialog__content {
  border-radius: 0px;
  background: #e8ebf5;
  padding-top: 0px !important;
  padding-bottom: 20px !important;
}
</style>
