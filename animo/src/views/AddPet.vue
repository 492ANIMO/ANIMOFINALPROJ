<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <h2><font-awesome-icon class="icon" icon="dog" />ประเภทสัตว์เลี้ยง</h2>
        <div class="line">
          <h3>
            <font-awesome-icon class="icon" icon="plus" />เพิ่มประเภทสัตว์
          </h3>
          <vs-input v-model="petType" placeholder="ประเภทสัตว์..." />
          <vs-button color="#6b9bce" @click="createPetType(),active = !active" class="BT2">
            <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มข้อมูล
          </vs-button>
        </div>
        <h4 class="list">รายการทั้งหมด {{ types.length }} รายการ</h4>
        <template>
    <div class="center examplex">
      <vs-table striped>
        <template #thead>
          <vs-tr>
            <vs-th>
              ประเภทสัตว์
            </vs-th>
            <!-- <vs-th>
              จำนวน
            </vs-th> -->
            <vs-th>
              จัดการข้อมูล
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr v-for="data in types" :key="data._id"
          >
            <vs-td>
              {{ data.petType }}
            </vs-td>
            <!-- <vs-td>
              {{ data.count }}
            </vs-td> -->
            <vs-td>
                <vs-button
                  color="#ca7676"
                  @click="active=!active, deletePetType(data._id)"
                  class="BT1"
                  style="width:70px"
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
    </div>
  </template>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/NavbarAdmin.vue";
import NavbarSide from "@/components/NavbarSideAdmin.vue";
import axios from "axios";
import mixins from "../mixins.js";

export default {
  name: "Annoucement",
  components: {
    Navbar,
    NavbarSide,
  },
  mixins: [mixins],
  data: () => ({
    active: false,
    active1: false,
    value: "",
    search: "",
    count: [],
    petType: "",
    types: []
  }),
  methods: {
    countPetType(){
      let baseURL = "http://localhost:4000/api/pets/petType"
      axios
      .get(baseURL)
      .then((res) => {
        this.types = res.data.petTypes;
        console.log(res.data);

      })
      .catch((error) => {
        console.log(error);
      });
    },
    createPetType(){
      let baseURL = "http://localhost:4000/api/pets/petType"
      axios
      .post(baseURL, {petType: this.petType})
      .then((res) => {
        console.log(res.data);
        this.petType = '';
        this.countPetType();
      })
      .catch((error) => {
        console.log(error);
      });
    },
    deletePetType(id){
      let baseURL = "http://localhost:4000/api/pets/petType/"
      axios
      .delete(`${baseURL}${id}`)
      .then((res) => {
        console.log(res.data);
        this.countPetType();
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  created(){
    this.countPetType();
  }
};
</script>
<style scoped>
@import url("../assets/css/style.css");


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
  width: 33%;
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
</style>
