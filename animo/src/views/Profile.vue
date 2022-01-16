<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <vs-button
          color="#d78461"
          @click="(active1 = !active1), getClients()"
          class="BTadd"
        >
          <font-awesome-icon class="iconBTr" icon="edit" />แก้ไขข้อมูล
        </vs-button>
        <div class="profile">
          <vs-avatar class="ProfileDT" circle size="120">
            <img src="../assets/pet1.jpeg" alt="" />
          </vs-avatar>
          <div class="ProfileDT">
            <h2>{{ this.client.name }}</h2>
            <div class="ProfileContent">
              <div>
                <font class="t1">อีเมลล์ : </font>
                <font>{{ this.client.email }}</font>
              </div>
              <div>
                <font class="t1">เบอร์โทร : </font>
                <font>{{ this.client.contact }}</font>
              </div>
              <div>
                <font class="t1">ที่อยู่ : </font>
                <font>{{ this.client.address }}</font>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <vs-button
              color="#6b9bce"
              @click="(active = !active)"
              class="BTadd1"
            >
              <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มข้อมูล
            </vs-button>
          </div>
          <h3 class="TextHead">สัตว์เลี้ยง</h3>
          <template>
            <vs-table striped>
              <template #thead>
                <vs-tr>
                  <vs-th> ชื่อสัตว์เลี้ยง </vs-th>
                  <vs-th> ชนิด </vs-th>
                  <vs-th> เพศ </vs-th>
                  <vs-th> น้ำหนัก </vs-th>
                  <vs-th>แก้ไข/ลบ</vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr :key="i" v-for="(data, i) in pets" :data="data">
                  <vs-td>
                    {{ data.name }}
                  </vs-td>
                  <vs-td>
                    {{ data.type }}
                  </vs-td>
                  <vs-td>
                    {{ data.gender }}
                  </vs-td>
                  <vs-td>
                    {{ data.weight+ ' กิโลกรัม' }} 
                  </vs-td>
                  <vs-td>
                    <vs-button
                      color="#d78461"
                      @click="(active1 = !active1), showClient(data.id)"
                      class="BT"
                    >
                      แก้ไข<font-awesome-icon
                        class="iconBTl"
                        style="font-size: 10px"
                        icon="edit"
                      />
                    </vs-button>
                    <vs-button
                      color="#ca7676"
                      @click="(active1 = !active1), showClient(data.id)"
                      class="BT1"
                    >
                      ลบ<font-awesome-icon
                        class="iconBTl"
                        style="font-size: 10px"
                        icon="trash-alt"
                      />
                    </vs-button>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </template>

          <vs-dialog width="80%" scroll v-model="active1">
            <template #header>
              <h2>ข้อมูลเจ้าของสัตว์เลี้ยง</h2>
            </template>

            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    state="success"
                    v-model="client.name"
                    label="ชื่อ"
                    :placeholder="this.client.name"
                  ></vs-input>
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    state="success"
                    v-model="client.email"
                    label="นามสกุล"
                    :placeholder="this.client.email"
                  ></vs-input>
                </div>
              </vs-col>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    state="success"
                    v-model="client.name"
                    label="เบอร์โทร"
                    :placeholder="this.client.name"
                  ></vs-input>
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    state="success"
                    v-model="client.email"
                    label="อีเมลล์"
                    :placeholder="this.client.email"
                  ></vs-input>
                </div>
              </vs-col>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    state="success"
                    v-model="client.address.detail"
                    label="ที่อยู่"
                    :placeholder="this.client.address.detail"
                  ></vs-input>
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    state="success"
                    v-model="client.address.province"
                    label="จังหวัด"
                    :placeholder="this.client.address.province"
                  ></vs-input>
                </div>
              </vs-col>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    state="success"
                    v-model="client.address.subdistrict"
                    label="ตำบล"
                    :placeholder="this.client.address.subdistrict"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    state="success"
                    v-model="client.address.district"
                    label="อำเภอ"
                    :placeholder="this.client.address.district"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    state="success"
                    v-model="client.address.postalCode"
                    label="รหัสไปรษณีย์"
                    :placeholder="this.client.address.postalCode"
                  ></vs-input>
                </div>
              </vs-col>
            </vs-row>

            <template #footer>
              <div class="footer-dialog">
                <vs-button
                  primary
                  @click="(active1 = !active1), updateClient(client)"
                  class="BT2"
                  style="float: right; width: 80px"
                >
                  ยืนยัน </vs-button
                ><br /><br />
              </div>
            </template>
          </vs-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import NavbarSide from "@/components/NavbarSide.vue";
import axios from "axios";

export default {
  name: "Profile",
  components: {
    Navbar,
    NavbarSide,
  },
  props: {
    client_id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    active1: false,
    user: [
      {
        id: "ชาย",
        name: "Bobby",
        username: "Bret",
        email: "สุนัข",
        website: "2 กิโลกรัม",
      },
      {
        id: "หญิง",
        name: "Muji",
        username: "Antonette",
        email: "แมว",
        website: "2ใถ กิโลกรัม",
      },
    ],
    client: {
      name: '',
      email: '',
      contact: '',
      role: '',
      address: {
        province: '',
        district: '',
        subdistrict: '',
        postalCode: '',
        detail: ''
      },
      
    },
    pets: [],
    clientCount: "",
  }),
  created() {
    this.getClientById();
  },
  methods: {
    getClientById() {
      let baseURL = "http://localhost:4000/api/clients/";
      axios.get(baseURL+this.client_id).then((res) => {
          this.client = res.data.client;
          // concatnate address
          
          this.client.address = res.data.client.address.detail+' '+res.data.client.address.subdistrict+' '+res.data.client.address.district+' '+res.data.client.address.province+' '+res.data.client.address.postalCode;
          console.log('this.client: '+this.client);
          axios.get("http://localhost:4000/api/pets/client/" + this.client_id).then((res)=> {
            this.pets = res.data.pet;
            console.log('pets: '+ this.pets)
          })
          
      }).catch((error) => {
          console.log(error);
      });
    },
    },

  computed: {
    resultCount() {
      return this.users && this.users.length;
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
.TextHead {
  font-size: 20px;
  color: #797979;
  transform: translateY(30%);
  margin: 0px;
  font-weight: 500;
}
.profile {
  display: flex;
}
.ImgProfile {
  width: 50px;
  height: 50px;
}
.text {
  margin: 0px 0px 5px 0px;
  color: #696969;
  font-weight: 500;
}
font {
  color: #797979;
  margin: 0px;
}
.t1 {
  color: #adadad;
}
.ProfileDT {
  display: block;
  float: left;
  margin: 10px 20px 10px 10px;
}
.ProfileContent {
  margin-left: 10px;
}
.BTadd {
  background: rgb(215, 132, 97);
  background: linear-gradient(
    45deg,
    rgba(215, 132, 97, 1) 0%,
    rgba(215, 169, 106, 1) 100%
  );
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  float: right;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
}
.BTadd1 {
  background: rgb(79, 161, 199);
  background: linear-gradient(
    45deg,
    rgba(79, 161, 199, 1) 0%,
    rgba(97, 199, 215, 1) 100%
  );
  color: #ffffff;
  border-radius: 20px;
  font-size: 11px;
  float: right;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
  margin-bottom: 10px;
}
.BT {
  background: rgb(215, 132, 97);
  background: linear-gradient(
    45deg,
    rgba(215, 132, 97, 1) 0%,
    rgba(215, 169, 106, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 11px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
}
.BT1 {
  background: rgb(197, 94, 94);
  background: linear-gradient(
    45deg,
    rgba(197, 94, 94, 1) 0%,
    rgba(248, 139, 109, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 11px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
}
.BT2 {
  background: rgb(157, 209, 103);
  background: linear-gradient(
    45deg,
    rgba(157, 209, 103, 1) 0%,
    rgba(99, 209, 157, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 11px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
}
::v-deep .vs-avatar {
  filter: drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.1));
}

::v-deep .vs-input__label--label {
  font-size: 14px;
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
::v-deep .vs-input {
  width: 350px;
  height: 35px;
  font-family: kanit;
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
</style>
