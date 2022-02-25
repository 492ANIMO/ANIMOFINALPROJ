<template>
  <div>
    <Navbar namepage="การนัดหมาย" />
    <div class="content appointment">
      <div class="content1">
        <div class="content2">
          <vs-input class="search" v-model="search" placeholder="ค้นหา..." />

          <div
            class="Package-Card"
            v-for="appointment in allAppointments"
            :key="appointment._id"
            @click="active = !active, getAppointmentDetail(appointment._id)"
          >
            <div class="bg-package">
              <img
                src="../assets/bento.png"
                alt="Animo"
                class="Pic-appointment-dt"
              />
            </div>
            <div class="PetDT">
              <div
                class="status"
                :class="bindAppointmentType(appointment.status)"
              >
                <h4>{{ appointment.status }}</h4>
              </div>
              <h2 v-if="appointment.by==='การจอง'">{{appointment.reservation.package.name }}</h2>
              <h2 v-else-if="appointment.status==='pending'">{{ appointment.package.name }}</h2>
              <h2 v-else>{{ appointment.type }}</h2>
              <div class="TextDT">
                <font
                  >วันที่ : <b>{{ format_date(appointment.date) + " : " }}</b>
                  <font-awesome-icon icon="clock" />
                  <b>{{ appointment.time }} น.</b>
                </font>
              </div>
              <div class="TextDT">
                <font v-if="!appointment.by">ประเภท : <b>การจอง</b></font>
                <font v-else
                  >ประเภท : <b>{{ appointment.by }}</b></font
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

        <h2 class="Head-history">ข้อมูลการนัด</h2>
        <div class="box-package">
            <font>ชื่อสัตว์เลี้ยง : <b>{{ appointmentDetail.pet.name }}</b></font
            ><br />
            <font>ประเภทสัตว์ : <b>{{ appointmentDetail.pet.type }}</b></font
            ><br />
            <font>วันที่นัด : <b>{{ format_date(appointmentDetail.date) }}</b></font
            ><br />
            <font>เวลา : <b>{{ appointmentDetail.time }}</b></font
            ><br />
            <font>สถานะ : <b>{{ appointmentDetail.status }}</b></font
            ><br />
            <font>รายละเอียด : <b>{{ appointmentDetail.detail }}</b></font
            ><br />
            <font v-if="appointmentDetail.status==='pending'">ราคา : <b class="active-text">{{ appointmentDetail.package.price }} บาท</b></font>
            <font v-else-if="appointmentDetail.by==='การจอง'">ราคา : <b class="active-text">{{ appointmentDetail.reservation.package.price }} บาท</b></font>
            <br/>
        </div>

        <div v-if="appointmentDetail.by === 'การจอง' || appointmentDetail.status === 'pending'" class="">
          <h2 class="Head-history">รายการแพ็คเกจ</h2>

          <div v-if="appointmentDetail.status === 'pending'" class="box-package">
              <font v-for="(vaccine, i) in appointmentDetail.package.vaccines" :key="i">
                <div class="dot-list"></div><b>{{ vaccine.name }}</b>
                <br/>
              </font>

              <font v-for="(treatment, i) in appointmentDetail.package.treatments" :key="i">
                <div class="dot-list"></div><b>{{ treatment.name }}</b>
                <br/>
              </font>
              
              <font v-for="(healthCheck, i) in appointmentDetail.package.healthChecks" :key="i">
                <div class="dot-list"></div><b>{{ healthCheck.name }}</b>
                <br/>
              </font>
          </div>

          <div v-else class="box-package">
              <font v-for="(vaccine, i) in appointmentDetail.reservation.package.vaccines" :key="i">
                <div class="dot-list"></div><b>{{ vaccine.name }}</b>
                <br/>
              </font>

              <font v-for="(treatment, i) in appointmentDetail.reservation.package.treatments" :key="i">
                <div class="dot-list"></div><b>{{ treatment.name }}</b>
                <br/>
              </font>
              
              <font v-for="(healthCheck, i) in appointmentDetail.reservation.package.healthChecks" :key="i">
                <div class="dot-list"></div><b>{{ healthCheck.name }}</b>
                <br/>
              </font>
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
import Navbar from "../components/Navbar";
import mixins from "../mixins";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Appointment",
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
    ...mapActions(["fetchMyAppointment", 'getAppointmentDetail']),

    bindAppointmentType: function (status) {
      if (status === "รอยืนยัน" || status === "pending") {
        return "status-1";
      } else {
        return "status-2";
      }
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
    ...mapGetters(["allAppointments", 'appointmentDetail']),
  },
  created() {
    this.fetchMyAppointment();
    //this.openLoading();
  },
};
</script>
<style scoped>
@import url("../assets/css/style.css");
.dot-list {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #808FDD;
  display: inline-block;
  margin-right: 8px;
}
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
