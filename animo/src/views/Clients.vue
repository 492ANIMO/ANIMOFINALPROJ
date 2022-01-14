<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <vs-button color="#6b9bce" @click="active = !active, getClients()" class="BTadd">
          <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มข้อมูล
        </vs-button>
        <h2><font-awesome-icon class="icon" icon="paw" />Clients</h2>
        <div class="line">
          <h3><font-awesome-icon class="icon" icon="search" />ค้นหา</h3>
          <vs-input v-model="search" placeholder="search..." />
        </div>

        <h4 class="list">รายการทั้งหมด {{ resultCount }} รายการ</h4>
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>ไอดี</vs-th>
              <vs-th>ชื่อ - นามสกุล</vs-th>
              <vs-th>เบอร์โทรศัพท์</vs-th>
              <vs-th>จัดการข้อมูล</vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(data, i) in $vs.getPage($vs.getSearch(users, search), page, max)" :data="data">
              <vs-td>{{ data.id }}</vs-td>
              <vs-td>{{ data.name }}</vs-td>
              <vs-td>{{ data.contact }}</vs-td>
              <vs-td><router-link to="/profile">
                <vs-button
                  color="#6b9bce"
                  @click="active1 = !active1, showClient(data.id)"
                  class="BT"
                >
                ดูข้อมูล
                 <font-awesome-icon
                    class="iconBTl"
                    style="font-size: 10px"
                    icon="info-circle"
                  />
                </vs-button></router-link>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div class="center">
          <vs-pagination infinite v-model="page" :length="$vs.getLength(users, max)" />
        </div>
      </div>
      <!-- add client -->
      <vs-dialog width="80%" scroll v-model="active">
        <template #header>
          <h2>เพิ่มข้อมูลเจ้าของสัตว์เลี้ยง</h2>
        </template>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="client.name"
                label="ชื่อเจ้าของสัตว์เลี้ยง"
                placeholder="ชื่อเจ้าของสัตว์เลี้ยง"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="client.email"
                label="อีเมลล์"
                placeholder="อีเมลล์"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="client.contact"
                label="เบอร์โทร"
                placeholder="เบอร์โทร"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="client.address.detail"
                label="ที่อยู่"
                placeholder="บ้านเลขที่, หมู่ที่, ซอย, ถนน"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                v-model="client.address.province"
                label="จังหวัด"
                placeholder="จังหวัด"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col class="InputSM" w="2" >
            <div class="InputPop">
              <vs-input
                v-model="client.address.subdistrict"
                label="ตำบล"
                placeholder="ตำบล"
              ></vs-input>
            </div>
          </vs-col>
          <div class="space"></div>
          <vs-col
            class="InputSM"
            w="2"
          >
            <div class="InputPop">
              <vs-input
                v-model="client.address.district"
                label="อำเภอ"
                placeholder="อำเภอ"
              ></vs-input>
            </div>
          </vs-col>
          <div class="space"></div>
          <vs-col
            class="InputSM"
            w="2"
          >
            <div class="InputPop">
              <vs-input
                v-model="client.address.postalCode"
                label="รหัสไปรษณีย์"
                placeholder="รหัสไปรษณีย์"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              primary
              @click="active = !active, createClient()"
              class="BT1"
              style="float: right; width: 80px"
            >
              ยืนยัน </vs-button
            ><br /><br />
          </div>
        </template>
      </vs-dialog>
      <!-- show client -->
      <vs-dialog width="80%" scroll v-model="active1">
        <template #header>
          <h2>ข้อมูลเจ้าของสัตว์เลี้ยง</h2>
        </template>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                state="success"
                v-model="client.name"
                label="ชื่อเจ้าของสัตว์เลี้ยง"
                :placeholder="this.client.name"
              ></vs-input>
   
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
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
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                state="success"
                v-model="client.contact"
                label="เบอร์โทร"
                :placeholder="this.client.contact"
              ></vs-input>
            </div>
          </vs-col>
        </vs-row>
        <div class="space"></div>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <div class="InputPop">
              <vs-input
                state="success"
                v-model="client.address.detail"
                label="ที่อยู่"
                :placeholder="this.client.address.detail"
              ></vs-input>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
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
          <vs-col
            class="InputSM"
            w="2"
          >
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
          <vs-col
            class="InputSM"
            w="2"
          >
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
          <vs-col
            class="InputSM"
            w="2"
          >
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
              @click="active1 = !active1,  updateClient(client)"
              class="BT1"
              style="float: right; width: 80px"
            >
              ยืนยัน </vs-button
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

export default {
  name: "Dashboard",
  components: {
    Navbar,
    NavbarSide,
  },
  data: () => ({
    page: 1,
    max: 5,
    value: "",
    active: false,
    active1: false,
    search: '',
    users: [
    ],
    client: {
      name: '',
      contact: '',
      email: '',
      address: {
        province: '',
        district: '',
        subdistrict: '',
        postalCode: '',
        detail: '',
      },
      role: 'client',
      avatar: ''
    },
    clientCount: ''
 
  }),
  created() {
    this.getClients();
  },
  methods: {
    getClients() {
      let baseURL = "http://localhost:4000/api/clients/";
      axios.get(baseURL).then((res) => {
          this.users = res.data.client;
          this.client = {
            name: '',
            contact: '',
            email: '',
            address: {
              province: '',
              district: '',
              subdistrict: '',
              postalCode: '',
              detail: '',
            },
            role: 'client',
            avatar: ''
          }
          this.clientCount = res.data.count;
          console.log(res.data);
          console.log('number of data: '+ this.clientCount);
      }).catch((error) => {
          console.log(error);
      });
    },
    

    showClient(id) {
      let baseURL = "http://localhost:4000/api/clients/";
      axios.get(baseURL+id).then((res) => {
          this.client = res.data.client;
          console.log(this.client);
      }).catch((error) => {
          console.log(error);
      });
    },

    createClient() {
      let baseURL = "http://localhost:4000/api/clients/";
      axios.post(baseURL, this.client).then(() => {
        this.getClients();
        console.log(this.client)
      }).catch((error) => {
          console.log(error);
      });
    },

    updateClient(client) {
      let baseURL = "http://localhost:4000/api/clients/";
      console.log('client: '+client.id)
      axios.patch(baseURL+client.id, {
        name: client.name,
        email: client.email,
        contact: client.contact,
        address: client.address,

      }).then(() => {
          this.client = {
          name: '',
          contact: '',
          email: '',
          address: {
            province: '',
            district: '',
            subdistrict: '',
            postalCode: '',
            detail: '',
          },
          role: 'client',
          avatar: ''
        }
        this.getClients();
        console.log(client)
      }).catch((error) => {
          console.log(error);
      });
    },

  },

  computed: {
    resultCount () {
      return this.users && this.users.length
    }
}
};
</script>
<style scoped>
a {
color: rgb(255, 255, 255);
text-decoration: none;
}
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
.line {
  display: flex;
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
.list{
  color: #adadad;
  margin: 10px;
  font-size: 14px;
  font-weight: 500;
  float: right;
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
</style>
