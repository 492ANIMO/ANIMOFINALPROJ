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
            @click="active = !active"
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
              <h2 v-if="!appointment.by">{{ appointment.package.name }}</h2>
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

          <div class="Package-Card" @click="active = !active">
            <div class="bg-package">
              <img
                src="../assets/bento.png"
                alt="Animo"
                class="Pic-appointment-dt"
              />
            </div>
            <div class="PetDT">
              <div class="status status-1">
                <h4>รอยืนยัน</h4>
              </div>
              <h2>แพ็คเกจแมวโต</h2>
              <div class="TextDT">
                <font
                  >วันที่ : <b>20/20/2022</b>
                  <font-awesome-icon icon="clock" /> <b>8.00 น</b>
                </font>
              </div>
              <div class="TextDT">
                <font>ประเภท : <b>การจอง</b></font>
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

          <div class="Package-Card" @click="active = !active">
            <div class="bg-package">
              <img
                src="../assets/muji.png"
                alt="Animo"
                class="Pic-appointment-dt"
              />
            </div>
            <div class="PetDT">
              <div class="status status-2">
                <h4>ไปตามนัด</h4>
              </div>
              <h2>แพ็คเกจลูกสุนัข</h2>
              <div class="TextDT">
                <font
                  >วันที่ : <b>20/20/2022</b>
                  <font-awesome-icon icon="clock" /> <b>8.00 น</b>
                </font>
              </div>
              <div class="TextDT">
                <font>ประเภท : <b>การจอง</b></font>
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    ...mapActions(["fetchMyAppointment"]),

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
    ...mapGetters(["allAppointments"]),
  },
  created() {
    this.fetchMyAppointment();
    //this.openLoading();
  },
};
</script>
<style scoped>
@import url("../assets/css/style.css");
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
