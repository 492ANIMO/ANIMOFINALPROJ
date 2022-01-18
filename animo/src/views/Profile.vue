<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <vs-button color="#d78461" @click="active1 = !active1" class="BTadd">
          <font-awesome-icon class="iconBTr" icon="edit" />แก้ไขข้อมูล
        </vs-button>
        <div class="profile">
          <vs-avatar class="ProfileDT" circle size="120">
            <!-- <img src="../assets/pet1.jpeg" alt="" /> -->
            <img :src="this.baseurl+this.client.avatar" alt="" />
          </vs-avatar>
          <div class="ProfileDT">
            <h2>{{ this.client.firstName + " " + this.client.lastName }}</h2>
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
                <font
                  >{{
                    this.client.address.detail +
                    " " +
                    this.client.address.subdistrict +
                    " " +
                    this.client.address.district +
                    " " +
                    this.client.address.province +
                    " " +
                    this.client.address.postalCode +
                    " "
                  }}
                </font>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <vs-button
              color="#6accb5"
              @click="active2 = !active2"
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
                  <vs-th> รายละเอียด </vs-th>
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
                    {{ data.weight + " กิโลกรัม" }}
                  </vs-td>
                  <vs-td>
                    <vs-button
                      color="#6ab8cc"
                      @click="(active3 = !active3), getPetById(data)"
                      class="BT2"
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
                    v-model="client.firstName"
                    label="ชื่อ"
                    :placeholder="this.client.firstName"
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
                    v-model="client.lastName"
                    label="นามสกุล"
                    :placeholder="this.client.lastName"
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
                    v-model="client.contact"
                    label="เบอร์โทร"
                    :placeholder="this.client.contact"
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
                  @click="(active1 = !active1), updateClientById(client)"
                  class="BT3"
                  style="float: right; width: 80px"
                >
                  ยืนยัน </vs-button
                ><br /><br />
              </div>
            </template>
          </vs-dialog>

          <vs-dialog width="80%" scroll v-model="active2">
            <template #header>
              <h2>เพิ่มข้อมูลสัตว์เลี้ยง</h2>
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
                    v-model="newPet.name"
                    label="ชื่อสัตว์เลี้ยง"
                    placeholder="ชื่อสัตว์เลี้ยง"
                  ></vs-input>
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputSL">
                  <vs-select
                    label="ประเภทสัตว์"
                    placeholder="ประเภทสัตว์"
                    v-model="newPet.type"
                    class="type"
                  >
                    <vs-option label="สุนัข" value="สุนัข"> สุนัข </vs-option>
                    <vs-option label="แมว" value="แมว"> แมว </vs-option>
                  </vs-select>
                </div>
              </vs-col>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.weight"
                    label="น้ำหนัก"
                    placeholder="กิโลกรัม"
                    type="number"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.bloodType"
                    label="กรุ๊ปเลือด"
                    placeholder="กรุ๊ปเลือด"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.breed"
                    label="สายพันธุ์"
                    placeholder="สายพันธุ์"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <div class="InputSL" w="2">
                <div class="InputPop">
                  <vs-select
                    label="เพศ"
                    placeholder="เพศ"
                    v-model="newPet.gender"
                    class="small"
                  >
                    <vs-option label="เพศผู้" value="เพศผู้"> เพศผู้ </vs-option>
                    <vs-option label="เพศเมีย" value="เพศเมีย"> เพศเมีย </vs-option>
                    <vs-option label="ไม่ระบุ" value="ไม่ระบุ"> ไม่ระบุ </vs-option>
                  </vs-select>
                </div>
              </div>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.age.year"
                    label="อายุ"
                    placeholder="ปี"
                    type="number"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.age.month"
                    label=""
                    placeholder="เดือน"
                    type="number"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <div class="InputSL" w="2">
                <div class="InputPop">
                  <vs-select
                    label="ทำหมัน"
                    placeholder="ทำหมัน"
                    v-model="newPet.sterilization"
                    class="small"
                  >
                    <vs-option label="ทำหมันแล้ว" value="ทำหมันแล้ว" > ทำหมันแล้ว </vs-option>
                    <vs-option label="ยังไม่เคยทำหมัน" value="ยังไม่เคยทำหมัน" > ยังไม่เคยทำหมัน </vs-option>
                  </vs-select>
                </div>
              </div>
            </vs-row>
            <div class="space"></div>
            <vs-row>
              <vs-col vs-type="flex" vs-justify="center" class="DtPg" w="12">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.detail"
                    label="รายละเอียด"
                    placeholder="รายละเอียด"
                  ></vs-input>
                </div>
              </vs-col>
            </vs-row>

            <template #footer>
              <div class="footer-dialog">
                <vs-button
                  primary
                  @click="active2 = !active2, handleAddPetForm()"
                  class="BT3"
                  style="float: right; width: 80px"
                >
                  ยืนยัน </vs-button
                ><br /><br />
              </div>
            </template>
          </vs-dialog>

          <vs-dialog width="80%" scroll v-model="active3">
            <template #header>
              <h2>ข้อมูลสัตว์เลี้ยง</h2>
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
                    v-model="pet.name"
                    label="ชื่อสัตว์เลี้ยง"
                    :placeholder="this.pet.name"
                  ></vs-input>
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputSL">
                  <vs-select
                  state="success"
                    label="ประเภทสัตว์"
                    :placeholder="this.pet.type"
                    v-model="pet.type"
                    class="type"
                  >
                    <vs-option :key="i"
                      v-for="(type, i) in petType"
                      :value="type" :label="type"> {{ type }} 
                    </vs-option>
                        
                  </vs-select>
                </div>
              </vs-col>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                  state="success"
                    v-model="pet.weight"
                    label="น้ำหนัก"
                    :placeholder="this.pet.weight"
                    type="number"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                  state="success"
                    v-model="pet.bloodType"
                    label="กรุ๊ปเลือด"
                    :placeholder="this.pet.bloodType"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                  state="success"
                    v-model="pet.breed"
                    label="สายพันธุ์"
                    :placeholder="this.pet.breed"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <div class="InputSL" w="2">
                <div class="InputPop">
                   <vs-select
                   state="success"
                    label="เพศ"
                    :placeholder="this.pet.gender"
                    v-model="pet.gender"
                    class="small"
                  >
                    <vs-option label="เพศผู้" value="เพศผู้"> เพศผู้ </vs-option>
                    <vs-option label="เพศเมีย" value="เพศเมีย"> เพศเมีย </vs-option>
                    <vs-option label="ไม่ระบุ" value="ไม่ระบุ"> ไม่ระบุ </vs-option>
                  </vs-select>
                </div>
              </div>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                  state="success"
                    v-model="pet.age.year"
                    label="อายุ (ปี)"
                    :placeholder="this.pet.age.year"
                    type="number"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                  state="success"
                    v-model="pet.age.month"
                    label="อายุ (เดือน)"
                    :placeholder="this.pet.age.month"
                    type="number"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <div class="InputSL" w="2">
                <div class="InputPop">
                   <vs-select
                   state="success"
                    label="ทำหมัน"
                    :placeholder="this.pet.sterilization"
                    v-model="pet.sterilization"
                    class="small"
                  >
                    <vs-option label="ทำหมันแล้ว" value="ทำหมันแล้ว" > ทำหมันแล้ว </vs-option>
                    <vs-option label="ยังไม่เคยทำหมัน" value="ยังไม่เคยทำหมัน" > ยังไม่เคยทำหมัน </vs-option>
                  </vs-select>
                </div>
              </div>
            </vs-row>
            <div class="space"></div>
            <vs-row>
              <vs-col vs-type="flex" vs-justify="center" class="DtPg" w="12">
                <div class="InputPop">
                  <vs-input
                  state="success"
                    v-model="pet.detail"
                    label="รายละเอียด"
                    :placeholder="this.pet.detail"
                  ></vs-input>
                </div>
              </vs-col>
            </vs-row>

            <template #footer>
              <div class="footer-dialog">
                <vs-button
                  color="#ca7676"
                  @click="deleteCF=!deleteCF"
                  class="BT1"
                  style="float: right; width: 80px"
                >
                  ลบ<font-awesome-icon
                    class="iconBTl"
                    style="font-size: 10px"
                    icon="trash-alt"
                  />
                </vs-button>
                <vs-button
                  color="#d78461"
                  @click="(active3 = !active3), updatePetById(pet)"
                  class="BT"
                  style="float: right; width: 80px"
                >
                  แก้ไข<font-awesome-icon
                    class="iconBTl"
                    style="font-size: 10px"
                    icon="edit"
                  />
                </vs-button>
                <br /><br />
              </div>
            </template>
          </vs-dialog>

          <vs-dialog width="550px" v-model="deleteCF">
        <template #header>
          <font class="font">
            ยืนยัน <b>การลบบัญชี</b>
          </font>
        </template>

        <div class="con-content">
            <br><br><br><br>
        </div>

        <template #footer>
          <div class="footer">
            <vs-button dark class="CF2" @click="deleteCF=!deleteCF">
              ยกเลิก
            </vs-button>
            <vs-button color="#ca7676" class="CF1" @click="(active3 = !active3),(deleteCF=!deleteCF),deletePetById(pet)">
              ยืนยัน
            </vs-button>
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
      required: true,
    },
  },
  data: () => ({
    active1: false,
    active2: false,
    active3: false,
    deleteCF: false,
    value: "",
    baseurl: 'http://localhost:4000/api/',
    user: [
    ],
    client: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      role: "",
      address: {
        province: "",
        district: "",
        subdistrict: "",
        postalCode: "",
        detail: "",
      },
      avatar: ''
    },
    petType:['สุนัข', 'แมว', 'นก', 'อื่นๆ'],
    pets: [],
    newPet: {
      name: '',
      type: '',
      breed: '',
      gender: '',
      bloodType: '',
      weight: '',
      dob: '',
      age: {
        year: '',
        month: '',
      },
      sterilization: '',
      ownerId: '',
      detail: ''
    },
    pet: {
      name: '',
      type: '',
      breed: '',
      gender: '',
      bloodType: '',
      weight: '',
      dob: '',
      age: {
        year: '',
        month: ''
      },
      sterilization: '',
      ownerId: '',
      detail: '',
      avatar: ''
    }
    
  }),
  created() {
    this.getClientById();

  },
  methods: {
    getClientById() {
      let baseURL = "http://localhost:4000/api/clients/";
      axios
        .get(baseURL + this.client_id)
        .then((res) => {

          this.client = res.data.client;

          axios
            .get("http://localhost:4000/api/pets/client/" + this.client_id)
            .then((res) => {
              this.pets = res.data.pet;
              console.log("pets: " + this.pets);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateClientById(client) {
      let baseURL = "http://localhost:4000/api/clients/";
      axios
        .patch(baseURL + client._id, {
          firstName: client.firstName,
          lastName: client.lastName,
          contact: client.contact,
          email: client.email,
          address: {
            province: client.address.province,
            district: client.address.district,
            subdistrict: client.address.subdistrict,
            postalCode: client.address.postalCode,
            detail: client.address.detail,
          },
        })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatePetById(pet) {
      let baseURL = "http://localhost:4000/api/pets/";
      console.log("pet: " + pet);
      axios
        .patch(baseURL + pet._id, {
          name: pet.name,
          type: pet.type,
          breed: pet.breed,
          gender: pet.gender,
          weight: pet.weight,
          bloodType: pet.bloodType,
          age: {
            year: pet.age.year,
            month: pet.age.month
          },
          sterilization: pet.sterilization,
          detail: pet.detail,
        })
        .then((res) => {
          console.log(res.data.message);

           axios
          .get(baseURL + 'client/' + this.client_id)
          .then((res) => {
            this.pets = res.data.pet;
            console.log(res.data.message);
            console.log(this.pet)
          })
          .catch((error) => {
            console.log(error);
          });
          
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deletePetById(pet) {
      let baseURL = "http://localhost:4000/api/pets/";
      console.log("pet: " + pet._id);
      axios
        .delete(baseURL + pet._id)
        .then((res) => {
          console.log(res.data.message);
          this.getClientById();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleAddPetForm(){
      this.newPet.ownerId = this.client_id;
      
      let baseURL = "http://localhost:4000/api/pets/";
      axios.post(baseURL, this.newPet).then((res) => {
        this.getClientById();
        console.log(res.data.message)
        this.newPet = {
          name: '',
          type: '',
          breed: '',
          gender: '',
          bloodType: '',
          weight: '',
          dob: '',
          age: {
            year: '',
            month: '',
          },
          sterilization: '',
          ownerId: '',
          detail: ''
        }

      }).catch((error) => {
          console.log(error.response.data);
      });
    },

    getPetById(pet){
      let baseURL = "http://localhost:4000/api/pets/";
      axios
        .get(baseURL + pet._id)
        .then((res) => {
          this.pet = res.data.pet;
          console.log(res.data.message);
          console.log(this.pet)
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(pet._id)
    }
  },

  computed: {
  
  },
};
</script>

<style scoped>
h2 {
  margin: 0px 0px 5px 0px;
  color: #696969;
  font-weight: 500;
}
.font {
  font-size: 20px;
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
background: rgb(106,204,181);
background: linear-gradient(45deg, rgba(106,204,181,1) 0%, rgba(84,193,211,1) 100%);
  color: #ffffff;
  border-radius: 20px;
  font-size: 12px;
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
  font-size: 13px;
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
  font-size: 13px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
}
.BT2 {
  background: rgb(94, 184, 204);
  background: linear-gradient(
    45deg,
    rgba(94, 184, 204, 1) 0%,
    rgba(68, 157, 222, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 12px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
}
.BT3 {
background: rgb(157,209,103);
background: linear-gradient(45deg, rgba(157,209,103,1) 0%, rgba(99,209,157,1) 100%);
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
}
.CF1{
background: rgb(197,94,94);
background: linear-gradient(45deg, rgba(197,94,94,1) 0%, rgba(248,139,109,1) 100%);
display: inline-block;
color: #ffffff;
border-radius: 20px;
font-size: 13px;
font-weight: 500;
margin-bottom: 15px;
--vs-button-padding: 5px 20px;
}
.CF2{
background: rgb(130,140,146);
background: linear-gradient(45deg, rgba(130,140,146,1) 0%, rgba(106,106,106,1) 100%);
display: inline-block;
color: #ffffff;
border-radius: 20px;
font-size: 13px;
font-weight: 500;
margin-bottom: 15px;
--vs-button-padding: 5px 20px;
}
.InputSL {
  margin-top: -3px;
  margin-left: 10px;
  display: block;
}
::v-deep .vs-avatar {
  filter: drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.1));
}
::v-deep .vs-input__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -20px;
  margin-top: -5px;
}
::v-deep .vs-select__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -15px;
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
::v-deep .small .vs-select {
  width: 145px;
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
::v-deep .DtPg .vs-input {
  min-width: 700px;
}
</style>
