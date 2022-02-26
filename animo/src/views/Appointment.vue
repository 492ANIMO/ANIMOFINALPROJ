<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <vs-button
          color="#6b9bce"
          @click="(active1 = !active1), getAllClients()"
          class="BTadd"
        >
          <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มข้อมูล
        </vs-button>
        <h2>
          <font-awesome-icon class="icon" icon="clipboard-list" />การนัดหมาย
        </h2>
        <div class="line">
          <h3>วันที่นัดหมาย</h3>
          <vs-input type="date" v-model="date" class="DateFilter" />
        </div>
        <h4 class="list">
          รายการทั้งหมด {{ $vs.getSearch(appointments, date).length }} รายการ
        </h4>
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>ไอดี</vs-th>
              <vs-th>ชื่อเจ้าของสัตว์</vs-th>
              <vs-th>วันที่</vs-th>
              <vs-th>เวลา</vs-th>
              <vs-th>ชื่อสัตว์เลี้ยง</vs-th>
              <vs-th>จัดการข้อมูล</vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr
              :key="i"
              v-for="(data, i) in $vs.getPage(
                $vs.getSearch(appointments, date),
                page,
                max
              )"
              :data="data"
            >
              <vs-td>{{ data.appId }}</vs-td>
              <vs-td>{{
                data.pet.owner.firstName + " " + data.pet.owner.lastName
              }}</vs-td>
              <vs-td>{{ format_date(data.date) }}</vs-td>
              <vs-td>{{ data.time }}</vs-td>
              <vs-td>{{ data.pet.name }}</vs-td>
              <vs-td>
                <vs-button
                  color="#6b9bce"
                  @click="(active2 = !active2), getAppointment(data._id)"
                  class="BT"
                >
                  ดูข้อมูล<font-awesome-icon
                    class="iconBTl"
                    style="font-size: 10px"
                    icon="info-circle"
                  />
                </vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div class="center">
          <vs-pagination
            infinite
            v-model="page"
            :length="$vs.getLength(appointments, max)"
          />
        </div>
      </div>

      <vs-dialog width="80%" scroll v-model="active1">
        <template #header>
          <h2>เพิ่มการนัดหมาย</h2>
        </template>

        <vs-row>
          <vs-col w="6">
            <div class="InputSL">
              <vs-select
                filter
                label="ชื่อเจ้าของสัตว์เลี้ยง"
                placeholder="ชื่อเจ้าของสัตว์เลี้ยง"
                v-model="appointment.owner._id"
                class="type"
                @change="getPetByOwner()"
                @blur="$v.appointment.owner._id.$touch()"
              >
                <vs-option
                  v-for="client in clients"
                  :key="client._id"
                  :value="client._id"
                  :label="client.firstName + ' ' + client.lastName"
                >
                  {{ client.firstName + " " + client.lastName }}
                </vs-option>
                <template
                  v-if="$v.appointment.owner._id.$error"
                  #message-danger
                >
                  <p v-if="!$v.appointment.owner._id.required">
                    กรุณาเลือกชื่อเจ้าของสัตว์เลี้ยง
                  </p>
                </template>
              </vs-select>
            </div>
          </vs-col>
          <vs-col w="6">
            <div class="InputSL">
              <vs-select
                filter
                label="ชื่อสัตว์เลี้ยง"
                placeholder="ชื่อสัตว์เลี้ยง"
                v-model="appointment.pet._id"
                class="type"
                @change="getPetById()"
                @blur="$v.appointment.pet._id.$touch()"
              >
                <vs-option
                  v-for="pet in pets"
                  :key="pet._id"
                  :value="pet._id"
                  :label="pet.name"
                >
                  {{ pet.name }}
                </vs-option>
                <template v-if="$v.appointment.pet._id.$error" #message-danger>
                  <p v-if="!$v.appointment.pet._id.required">
                    กรุณาเลือกสัตว์เลี้ยง
                  </p>
                </template>
              </vs-select>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>
        <vs-row>
          <vs-col w="6">
            <div class="InputPop">
              <vs-input
                disabled
                v-model="appointment.pet.type"
                label="ประเภทสัตว์"
                placeholder="ประเภทสัตว์"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col class="InputSM" w="2">
            <div class="InputPop">
              <vs-input
                disabled
                v-model="appointment.pet.gender"
                label="เพศ"
                placeholder="เพศ"
              ></vs-input>
            </div>
          </vs-col>
          <div class="space"></div>
          <vs-col w="2">
            <div class="InputPop">
              <vs-input
                disabled
                v-model="appointment.pet.weight"
                label="น้ำหนัก"
                placeholder="กิโลกรัม"
                class="InputLast"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col w="6">
            <div class="InputPop">
              <vs-input
                disabled
                v-model="appointment.by"
                label="ประเภทการนัดหมาย"
                placeholder="ประเภทการนัดหมาย"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col class="InputSM" w="2">
            <div class="InputPop">
              <vs-input
                type="date"
                v-model="appointment.date"
                label="วันที่นัดหมาย"
                class="Date"
                @change="getBookableTimes()"
                @blur="$v.appointment.date.$touch()"
              >
                <template v-if="$v.appointment.date.$error" #message-danger>
                  <p v-if="!$v.appointment.date.required">
                    กรุณาเลือกวันที่นัดหมาย
                  </p>
                </template>
              </vs-input>
            </div>
          </vs-col>
          <div class="space"></div>
          <vs-col class="InputSL" w="2">
            <div class="small">
              <vs-select
                filter
                label="เวลานัดหมาย"
                placeholder="เวลานัดหมาย"
                v-model="appointment.time"
                @blur="$v.appointment.time.$touch()"
              >
                <vs-option
                  :key="i"
                  v-for="(data, i) in bookableTimes"
                  :value="data"
                  :label="data"
                >
                  {{ data }}
                </vs-option>
                <!-- <vs-option label="11.00" value="11.00"> 11.00 </vs-option> -->
                <template v-if="$v.appointment.time.$error" #message-danger>
                  <p v-if="!$v.appointment.time.required">
                    กรุณาเลือกเวลานัดหมาย
                  </p>
                </template>
              </vs-select>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" class="DtPg" w="12">
            <div class="InputPop">
              <vs-input
                v-model="appointment.detail"
                label="รายละเอียด"
                placeholder="รายละเอียด"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              class="BT1"
              color="#71cf9d"
              @click="
                (active1 = !active1),
                  createAppointment(),
                  AddNoti('bottom-right', 1500, '#57c496')
              "
              style="float: right; width: 80px"
              :disabled="$v.appointment.$invalid"
            >
              บันทึก </vs-button
            ><br /><br />
          </div>
        </template>
      </vs-dialog>

      <vs-dialog width="80%" scroll v-model="active2">
        <template #header>
          <h2>การตรวจรักษา</h2>
        </template>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                filter
                label="ชื่อเจ้าของสัตว์เลี้ยง"
                :placeholder="currentAppointment.pet.owner.firstName"
                v-model="value"
                class="type"
                disabled
              >
              </vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                label="ชื่อสัตว์เลี้ยง"
                :placeholder="currentAppointment.pet.name"
                v-model="value"
                disabled
              >
              </vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                disabled
                v-model="currentAppointment.pet.type"
                label="ประเภทสัตว์"
                placeholder="ประเภทสัตว์"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col class="InputSM" w="2">
            <div class="InputPop">
              <vs-input
                disabled
                v-model="currentAppointment.pet.gender"
                label="เพศ"
                placeholder="เพศ"
              ></vs-input>
            </div>
          </vs-col>
          <div class="space"></div>
          <vs-col w="2">
            <div class="InputPop">
              <vs-input
                disabled
                v-model="currentAppointment.pet.weight"
                label="น้ำหนัก"
                placeholder="กิโลกรัม"
                class="InputLast"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col w="6">
            <div class="InputPop">
              <vs-input
                disabled
                v-model="currentAppointment.by"
                label="ประเภทการนัดหมาย"
                placeholder="ประเภทการนัดหมาย"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col class="InputSM" w="2">
            <div class="InputPop">
              <vs-input
                disabled
                type="text"
                v-model="currentAppointment.date"
                label="วันที่นัดหมาย"
              ></vs-input>
            </div>
          </vs-col>
          <div class="space"></div>
          <vs-col w="2">
            <div class="InputPop">
              <vs-input
                disabled
                v-model="currentAppointment.time"
                label="เวลานัดหมาย"
                placeholder="เวลานัดหมาย"
                class="InputLast"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col w="12">
            <h4 class="HeadInput">วัคซีนพิษสุนัขบ้า ( 1234567XAB )</h4>
            <textarea class="TArea" label="รายละเอียดวัคซีน" placeholder="รายละเอียด">
              ใส่ข้อมูลลลลลล
            </textarea>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col w="12">
            <h4 class="HeadInput">ทำหมัน</h4>
            <textarea class="TArea" label="รายละเอียดการรักษา" placeholder="รายละเอียด">
              ใส่ข้อมูลลลลลล
            </textarea>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col w="12">
            <h4 class="HeadInput">ตรวจสุขภาพฟัน</h4>
            <textarea class="TArea" label="รายละเอียดการตรวจสุขภาพ" placeholder="รายละเอียด">
              ใส่ข้อมูลลลลลล
            </textarea>
          </vs-col>
        </vs-row>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              class="BT1"
              color="#71cf9d"
              @click="
                (active2 = !active2),
                  confirmAppointment(currentAppointment._id),
                  EditNoti('bottom-right', 1500, '#8fc66a')
              "
              style="float: right; width: 80px"
            >
              บันทึก </vs-button
            ><br /><br />
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import NavbarSide from "@/components/NavbarSide.vue";
import axios from "axios";
import mixins from "../mixins";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Appointment",
  components: {
    Navbar,
    NavbarSide,
  },
  mixins: [mixins],
  data: () => ({
    page: 1,
    max: 5,
    active: false,
    active1: false,
    active2: false,
    value: "",
    date: "",
    users: [],
    appointments: [],
    currentAppointment: {
      pet: {
        name: "",
        type: "",
        age: "",
        owner: {
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
        },
        weight: "",
      },
      date: "",
      time: "",
      reservation: {
        package: [
          {
            name: "",
            vaccines: "",
            treatments: "",
            healthChecks: "",
          },
        ],
      },
      by: "",
    },
    clients: [],
    client: {},
    appointment: {
      // name: '',
      owner: {
        _id: "",
        firstName: "",
        lastName: "",
      },
      petId: "",
      pet: {
        _id: "",
        name: "",
        weight: "",
        type: "",
        getder: "",
      },
      by: "นัดโดยสัตวแพทย์",
      date: "",
      time: "",
      detail: "",
    },
    pets: [],
    bookableTimes: [],

    createAppointmentForm: {
      petId: "",
      date: "",
      time: "",
      detail: "",
    },
  }),
  validations: {
    appointment: {
      owner: {
        _id: { required },
      },
      pet: {
        _id: { required },
      },
      date: { required },
      time: { required },
    },
  },
  created() {
    this.load();
    this.getAllClients();
  },

  methods: {
    AddNoti(position = null, duration, color) {
      this.$vs.notification({
        color,
        duration,
        position,
        title: "เพิ่มข้อมูลสำเร็จ",
        text: `เพิ่มรายการข้อมูลที่เลือกสำเร็จ`,
      });
    },
    EditNoti(position = null, duration, color) {
      this.$vs.notification({
        color,
        duration,
        position,
        title: "บันทึกข้อมูลสำเร็จ",
        text: `บันทึกรายการข้อมูลที่เลือกสำเร็จ`,
      });
    },
    DeleteNoti(position = null, duration, color) {
      this.$vs.notification({
        color,
        duration,
        position,
        title: "ลบข้อมูลสำเร็จ",
        text: `ลบรายการข้อมูลที่เลือกสำเร็จ`,
      });
    },
    load() {
      let baseURL = "http://localhost:4000/api/appointments/";

      axios
        .get(baseURL)
        .then((res) => {
          this.appointments = res.data.appointment;

          console.log(this.appointments);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAppointment(id) {
      let baseURL = "http://localhost:4000/api/appointments/";

      axios
        .get(baseURL + id)
        .then((res) => {
          this.currentAppointment = res.data.appointment;
          this.currentAppointment.date = this.format_date(
            res.data.appointment.date
          );
          console.log("this: ");
          console.log(this.currentAppointment);
          console.log(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllClients() {
      let baseURL = "http://localhost:4000/api/clients/";

      axios
        .get(baseURL)
        .then((res) => {
          this.clients = res.data.client;
          console.log("clients: ");
          console.log(this.clients);
          console.log(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPetByOwner() {
      console.log("this.appointment.owner._id");

      console.log(this.appointment.owner._id);

      let baseURL = "http://localhost:4000/api/pets/client/";
      axios
        .get(baseURL + this.appointment.owner._id)
        .then((res) => {
          this.pets = res.data.pet;
          console.log("pets: ");
          console.log(this.pets);
          console.log(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPetById() {
      console.log("this.appointment.pet._id");

      console.log(this.appointment.pet._id);

      let baseURL = "http://localhost:4000/api/pets/";
      axios
        .get(baseURL + this.appointment.pet._id)
        .then((res) => {
          this.pet = res.data.pet;
          this.appointment.pet = this.pet;
          this.appointment.petId = this.appointment.pet._id;
          console.log("this.pet: ");
          console.log(this.pet);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createAppointment() {
      let baseURL = "http://localhost:4000/api/appointments/";
      console.log(this.appointment);
      axios
        .post(baseURL, {
          petId: this.appointment.petId,
          date: this.appointment.date,
          time: String(this.appointment.time),
          detail: this.appointment.detail,
        })
        .then((res) => {
          this.appointment = {
            name: "",
            owner: {
              _id: "",
              firstName: "",
              lastName: "",
            },
            pet: {
              _id: "",
              name: "",
              weight: "",
              type: "",
              getder: "",
            },
            by: "นัดโดยสัตวแพทย์",
            date: "",
            time: "",
            detail: "",
          };

          console.log(res.data.message);

          this.load();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    confirmAppointment(id) {
      let baseURL = "http://localhost:4000/api/appointments/confirm/" + id;
      axios
        .patch(baseURL, {
          detail: this.currentAppointment.detail,
        })
        .then((res) => {
          this.currentAppointment = {
            pet: {
              name: "",
              type: "",
              age: "",
              owner: {
                firstName: "",
                lastName: "",
                email: "",
                contact: "",
              },
              weight: "",
            },
            date: "",
            time: "",
            reservation: {
              package: [
                {
                  name: "",
                  vaccines: "",
                  treatments: "",
                  healthChecks: "",
                },
              ],
            },
            by: "",
          };

          console.log(res.data.message);
          console.log(res.data.data);

          this.load();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    getBookableTimes() {
      let baseURL = "http://localhost:4000/api/timeslots/";

      axios
        .post(baseURL, {
          date: this.appointment.date,
        })
        .then((res) => {
          this.bookableTimes = res.data.bookableTimes;
          // this.currentAppointment.date = this.format_date(
          //   res.data.appointment.date
          // );
          console.log("this.bookableTime");
          console.log(this.bookableTimes);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
h2 {
  margin: 0px 0px 5px 0px;
  color: #696969;
  font-weight: 500;
}
h3 {
  margin: 0px;
  color: #adadad;
  font-weight: 500;
  margin-left: 30px;
}
::v-deep .vs-select-content [disabled] {
    opacity: 0.8;
}
::v-deep [disabled] {
    opacity: 0.7;
    color: rgb(27, 111, 136);
    font-weight: 500;
}
.list {
  color: #adadad;
  margin: 5px;
  font-size: 14px;
  font-weight: 500;
  float: right;
}
.line {
  display: flex;
  padding-bottom: 20px;
}
.BT {
  background: rgb(94, 184, 204);
  background: linear-gradient(
    45deg,
    rgba(94, 184, 204, 1) 0%,
    rgba(68, 157, 222, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
}
.BT1 {
  background: rgb(157, 209, 103);
  background: linear-gradient(
    45deg,
    rgba(157, 209, 103, 1) 0%,
    rgba(99, 209, 157, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
}
.BTadd {
  background: rgb(142, 157, 211);
  background: linear-gradient(
    45deg,
    rgba(142, 157, 211, 1) 0%,
    rgba(86, 164, 215, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  float: right;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
}
.InputSL {
  margin-top: -3px;
  margin-left: 10px;
  display: block;
}
.HeadInput {
  font-size: 14.25px;
  color: #696969;
  font-weight: 400;
  margin: 0px;
  margin-top: 8px;
  margin-bottom: 2px;
}
.TArea {
  margin-left: 10px;
  width: 680px;
  background: #f4f7f8;
  padding: 12px;
  border-radius: 10px;
  border: none;
  color: #696969;
  font-family: kanit;
  resize: none;
  transition: 0.3s all;
}
.TArea:focus-visible {
  outline: none;
  padding-left: 17px;
  background: #f0f3f4;
}
.TArea::placeholder {
  color: #afb7be;
  font-size: 13px;
}
::v-deep .InputLast .vs-input-content {
  max-width: 170px;
}
::v-deep .vs-input__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -20px;
  margin-top: -5px;
}
::v-deep .vs-dialog__header {
  float: left;
  color: #696969;
  padding: 20px 0px 0px 20px;
}
::v-deep .InputPop .vs-input {
  width: calc(100% - 20px);
}
::v-deep .InputSM .vs-input {
  width: 41%;
}
::v-deep .DateFilter .vs-input {
  width: 200px;
}
::v-deep .vs-input {
  width: 350px;
  height: 35px;
  font-family: kanit;
}
::v-deep .Date .vs-input {
  font-size: 11.5px;
}
::v-deep .vs-input-content {
  width: 350px;
  margin-left: 10px;
  margin-top: -2px;
}
::v-deep .vs-pagination-content {
  padding-top: 20px;
}
::v-deep .vs-pagination__active {
  background: #3acad2;
  box-shadow: none;
  margin-top: 20px;
}
::v-deep .vs-table__th__content {
  color: #696969;
  text-align: center;
  justify-content: center;
  font-size: 15px;
  padding: 5px;
}
::v-deep .vs-table__tr {
  color: #696969;
  text-align: center;
  justify-content: center;
  font-size: 13px;
  padding: 5px;
}
::v-deep .vs-button__content {
  font-family: kanit;
}
::v-deep .vs-dialog__content {
  padding: 25px 30px;
}
::v-deep .vs-table__td {
  padding: 5px 12px;
}
::v-deep .vs-table_not-found td {
  color: #696969;
}
::v-deep .vs-table__tr:first-of-type .vs-table__td:first-child {
  width: 25%;
}
::v-deep .vs-select__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -15px;
  margin-top: -5px;
}
button.vs-select__option {
  font-family: kanit;
  margin: 10px;
  padding: 0px;
  margin: 8px;
  width: 95%;
  background: #ffffff;
}
::v-deep .vs-select__input {
  min-height: 36px;
  max-height: 30px;
  font-family: kanit;
  min-width: 100%;
}
::v-deep .type .vs-select {
  width: 335px;
}
button.vs-select__option {
  font-family: kanit;
  margin: 10px;
  padding: 0px;
  margin: 8px;
  width: 80% !important;
  color: #696969;
}
.vs-select__option.isMultiple:hover {
  padding: 0px !important;
}
.vs-select__option:hover {
  margin-left: 5px;
  padding: 0px;
}
::v-deep .small .vs-select {
  width: 145px;
}
::v-deep .DtPg .vs-input {
  min-width: 700px;
}
::v-deep .vs-input__message p {
  margin: 0px;
  padding-left: 10px;
}
::v-deep .vs-select__message p {
  margin: 0px;
}
</style>
