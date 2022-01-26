<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <vs-button color="#6b9bce" @click="active = !active" class="BTadd">
          <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มข้อมูล
        </vs-button>
        <h2><font-awesome-icon class="icon" icon="newspaper" />บทความ</h2>
        <div class="line">
          <h3><font-awesome-icon class="icon" icon="search" />ค้นหา</h3>
          <vs-input v-model="search" placeholder="ค้นหา..." />
        </div>
        <h4 class="list">
          รายการทั้งหมด {{ $vs.getSearch(annoucements, search).length }} รายการ
        </h4>
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>ชื่อหัวข้อ</vs-th>
              <vs-th>วันที่สร้าง</vs-th>
              <vs-th>ผู้เขียน</vs-th>
              <vs-th>จัดการข้อมูล</vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr
              :key="i"
              v-for="(data, i) in $vs.getPage(
                $vs.getSearch(annoucements, search),
                page,
                max
              )"
              :data="data"
            >
              <vs-td>{{ data.title }}</vs-td>
              <vs-td>{{ format_date(data.createdAt) }}</vs-td>
              <!-- <vs-td>{{ data.createdAt }}</vs-td> -->
              <vs-td>{{ data.author }}</vs-td>
              <vs-td
                ><vs-button
                  color="#6b9bce"
                  @click="active1 = !active1, showAnnoucementDetail(data._id)"
                  class="BT"
                >
                  ดูข้อมูล
                  <font-awesome-icon
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
            :length="$vs.getLength($vs.getSearch(annoucements, search), max)"
          />
        </div>
      </div>

      <vs-dialog width="80%" scroll v-model="active">
        <template #header>
          <h2>เพิ่มบทความ</h2>
        </template>

        <vs-row>
          <vs-col w="6">
            <div class="InputPop">
              <vs-input
                v-model="addAnnoucementForm.title"
                label="ชื่อหัวข้อ"
                placeholder="ชื่อหัวข้อ"
                @blur="$v.addAnnoucementForm.title.$touch()"
              >
                <template v-if="$v.addAnnoucementForm.title.$error" #message-danger> 
                  <p v-if="!$v.addAnnoucementForm.title.required" >กรุณาระบุชื่อหัวข้อ</p>
                </template>
              </vs-input>
            </div>
          </vs-col>
          <vs-col w="6">
            <div class="InputSL">
              <vs-select
                label="ประเภทบทความ"
                placeholder="ประเภทบทความ"
                v-model="addAnnoucementForm.type"
                class="type"
                @blur="$v.addAnnoucementForm.type.$touch()"
              >
                <vs-option label="ข่าวสาร" value="ข่าวสาร"> ข่าวสาร </vs-option>
                <vs-option label="ประกาศ" value="ประกาศ"> ประกาศ </vs-option>
                <vs-option label="บทความ" value="บทความ"> บทความ </vs-option>
                <template v-if="$v.addAnnoucementForm.type.$error" #message-danger> 
                  <p v-if="!$v.addAnnoucementForm.type.required" >กรุณาเลือกประเภทบทความ</p>
                </template>
              </vs-select>
            </div>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col w="12">
            <div class="InputPop">
              <h4 class="HeadInput">เนื้อความ</h4>
              <!-- <textarea class="TArea" placeholder="เนื้อความ..." cols="90" rows="5" v-model="addAnnoucementForm.body"
              @blur="$v.addAnnoucementForm.body.$touch()"
              >
                <template v-if="$v.addAnnoucementForm.body.$error" #message-danger> 
                  <p v-if="!$v.addAnnoucementForm.body.required" >กรุณาระบุเนื้อความ</p>
                </template>
              </textarea> -->

              <vue-editor v-model="addAnnoucementForm.body"
              @blur="$v.addAnnoucementForm.body.$touch()">
              </vue-editor>
              <!-- validation message -->
              <div v-if="$v.addAnnoucementForm.body.$error" > 
                  <p v-if="!$v.addAnnoucementForm.body.required" ></p>
              </div>
            </div>
          </vs-col>
        </vs-row>        

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              primary
              @click="active = !active,AddNoti('bottom-right',1500,'#57c496'), createAnnoucement()"
              class="BT1"
              style="float: right; width: 80px"
              :disabled="$v.addAnnoucementForm.$invalid"
            >
              ยืนยัน </vs-button
            ><br /><br />
          </div>
        </template>
      </vs-dialog>

      <vs-dialog width="80%" scroll v-model="active1">
        <template #header>
          <h2>แก้ไขบทความ</h2>
        </template>

        <vs-row>
          <vs-col w="12">
            <div class="InputPop">
              <vs-input
              state="success"
                v-model="showAnnoucementForm.title"
                label="ชื่อหัวข้อ"
                placeholder="ชื่อหัวข้อ"
              @blur="$v.showAnnoucementForm.title.$touch()"
              >
                <template v-if="$v.showAnnoucementForm.title.$error" #message-danger> 
                  <p v-if="!$v.showAnnoucementForm.title.required" >กรุณาระบุชื่อหัวข้อ</p>
                </template>
              </vs-input>
            </div>
          </vs-col>
          <vs-col w="6">
            <div class="InputSL">
              <vs-select
              state="success"
                label="ประเภทบทความ"
                placeholder="-"
                v-model="showAnnoucementForm.type"
                class="type"
                @blur="$v.showAnnoucementForm.type.$touch()"

              >
                <vs-option label="ข่าวสาร" value="ข่าวสาร"> ข่าวสาร </vs-option>
                <vs-option label="ประกาศ" value="ประกาศ"> ประกาศ </vs-option>
                <vs-option label="บทความ" value="บทความ"> บทความ </vs-option>
                <template v-if="$v.showAnnoucementForm.type.$error" #message-danger> 
                  <p v-if="!$v.showAnnoucementForm.type.required" >กรุณาเลือกประเภทบทความ</p>
                </template>
              </vs-select>
            </div>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col w="12">
            <div class="InputPop">
              <h4 class="HeadInput">เนื้อความ</h4>
              <!-- <textarea  class="TArea" placeholder="เนื้อความ..." cols="90" rows="5" v-model="showAnnoucementForm.body"
              @blur="$v.showAnnoucementForm.body.$touch()"
              >
                <template v-if="$v.showAnnoucementForm.body.$error" #message-danger> 
                  <p v-if="!$v.showAnnoucementForm.body.required" >กรุณาระบุเนื้อความ</p>
                </template>
              </textarea> -->
              <vue-editor v-model="showAnnoucementForm.body"
              @blur="$v.showAnnoucementForm.body.$touch()">
              </vue-editor>
              <div v-if="$v.showAnnoucementForm.body.$error" > 
                  <p v-if="!$v.showAnnoucementForm.body.required" >กรุณาระบุเนื้อความ</p>
              </div>
              <!-- <template v-if="$v.showAnnoucementForm.body.$error" #message-danger> 
              <p v-if="!$v.showAnnoucementForm.body.required" >กรุณาระบุเนื้อความ</p>
              </template> -->
              
            </div>
          </vs-col>
        </vs-row>        

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              color="#d78461"
              @click="active1 = !active1,EditNoti('bottom-right',1500,'#da9952'), updateAnnoucement(showAnnoucementForm._id)"
              class="BT2"
              style="float: right; width: 80px"
              :disabled="$v.showAnnoucementForm.$invalid"
            >
              แก้ไข </vs-button
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
import mixins from "../mixins.js";
import { required } from 'vuelidate/lib/validators';
import { VueEditor } from "vue2-editor";

export default {
  name: "Annoucement",
  components: {
    Navbar,
    NavbarSide,
    VueEditor
  },
  mixins: [mixins],
  data: () => ({
    page: 1,
    max: 5,
    active: false,
    active1: false,
    value: '',
    search: "",
    type: ['ข่าวสาร', 'ประกาศ', 'บทความ'],
    annoucements: [],
    showAnnoucementForm: {
      id: '',
      title: '',
      body: '',
      type: '',
    },
    addAnnoucementForm:{
      title: '',
      body: '',
      type: '',
    }

  }),
    validations: {
      addAnnoucementForm: {
        title: { required },
        body: { required },
        type: { required },
      },
      showAnnoucementForm: {
        title: { required },
        body: { required },
        type: { required },
      },
  },
  created() {
    this.load();
  },
  methods: {
    clearForm(){
       // clear data
      this.showAnnoucementForm = {
        id: '',
        title: '',
        body: '',
        type: '',
        img: ''
      },
      this.addAnnoucementForm = {
        title: '',
        body: '',
        type: '',
      }
    },

    load() {
      let baseURL = "http://localhost:4000/api/annoucements/";

      axios
        .get(baseURL)
        .then((res) => {
          this.clearForm();
          this.annoucements = res.data.annoucement;
          console.log(res.data);
          console.log('load success');
          console.log(this.annoucements);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showAnnoucementDetail(id) {
      let baseURL = "http://localhost:4000/api/annoucements/";
      this.showAnnoucementForm._id = id;
      console.log(this.showAnnoucementForm._id);
      axios
        .get(baseURL+id)
        .then((res) => {
          this.showAnnoucementForm = res.data.annoucement;
          console.log(res.data);
          // this.load();
        })
        .catch((error) => {
          console.log(error);
        });
    
    },

    updateAnnoucement(id) {
      console.log('id : '+ id);
      let baseURL = "http://localhost:4000/api/annoucements/";
      axios.patch(baseURL+id, this.showAnnoucementForm).then((res) => {
        console.log(res.data);
         this.load();
      }).catch((error) => {
          console.log(error);
      });

    },
    createAnnoucement() {
      let baseURL = "http://localhost:4000/api/annoucements/";
      axios.post(baseURL, this.addAnnoucementForm).then((res) => {
        console.log(res.data);
        this.load();
      }).catch((error) => {
          console.log(error);
      });

    },
    deleteAnnoucement(id) {
      let baseURL = "http://localhost:4000/api/annoucements/";
      axios.post(baseURL+id).then((res) => {
        console.log(res.data.message);
        this.load();
      }).catch((error) => {
          console.log(error);
      });

    },

    AddNoti(position = null ,duration ,color) {
          this.$vs.notification({
            color,
            duration,
            position,
            title: 'เพิ่มข้อมูลสำเร็จ',
            text: `เพิ่มรายการข้อมูลที่เลือกสำเร็จ`
          })
        },
    EditNoti(position = null ,duration ,color) {
         this.$vs.notification({
            color,
            duration,
            position,
            title: 'แก้ไขข้อมูลสำเร็จ',
            text: `แก้ไขรายการข้อมูลที่เลือกสำเร็จ`
          })
        },
    DeleteNoti(position = null ,duration ,color) {
         this.$vs.notification({
            color,
            duration,
            position,
            title: 'ลบข้อมูลสำเร็จ',
            text: `ลบรายการข้อมูลที่เลือกสำเร็จ`
          })
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
.BT2 {
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
.HeadInput {
  font-size: 14.5px;
  color: #696969;
  font-weight: 400;
  margin: 0px;
}
::v-deep .vs-select--state-success .vs-select__input {
  background: rgba(var(--vs-success), 0.1) !important;
}
::v-deep svg {
  height: 18px !important;
  font-family: kanit;
}
::v-deep .ql-snow.ql-toolbar button {
  width: 20px !important;
}
::v-deep .ql-snow .ql-picker-label::before {
  font-family: kanit !important;
}
::v-deep .ql-toolbar.ql-snow {
  border: none;
  border-radius: 10px 10px 0px 0px;
  background: #f0f3f4;
}
::v-deep .ql-editor {
  background: #f6f8f8;
  border-radius: 0px 0px 10px 10px !important;
  border: 2px solid #f0f3f4;
}
::v-deep .ql-container.ql-snow {
    border: none;
}
::v-deep .vs-input__message p{
  margin: 0px;
  padding-left: 10px;
}
::v-deep .vs-select__message p{
  margin: 0px;
}
</style>
