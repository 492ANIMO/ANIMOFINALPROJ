<template>
  <div>
    <Navbar namepage="สัตว์เลี้ยง" />
    <div class="content mypet">
      <div class="content1">
        <vs-input class="search" v-model="search" placeholder="ค้นหา..." />
        <div class="content2">
          <div
            class="PetCard"
            :key="_id"
            v-for="(pet, _id) in $vs.getSearch(allPets, search)"
            :data="pet"
            @click="(active = !active), fetchPetDetail(pet._id)"
          >

            <img v-if="pet.avatar" :src="pet.avatar" alt="Animo" class="PicCat" />
            <img v-else src="../assets/bento.png" alt="Animo" class="PicCat" />
            <div class="PetDT">
              <h2>{{ pet.name }}</h2>
              <!-- <font-awesome-icon class="gander" icon="mars" /> -->
              <div class="TextDT">
                <font
                  >ประเภทสัตว์ : <b>{{ pet.type }}</b></font
                >
              </div>
              <div class="TextDT">
                <font
                  >อายุ :
                  <b>{{ pet.age.year }} ปี {{ pet.age.month }} เดือน</b></font
                >
              </div>
              <div class="TextDT">
                <font
                  >น้ำหนัก : <b>{{ pet.weight }} กิโลกรัม</b></font
                >
              </div>
              <div class="TextDT1">
                <font>ข้อมูลเพิ่มเติม...</font>
              </div>
            </div>
          </div>

          <div class="button-add">
            <router-link to="/mobile/addpet"
              ><font-awesome-icon class="icon" icon="plus"
            /></router-link>
          </div>
        </div>
      </div>
    </div>
    
    <vs-dialog v-model="active">
      <template #header>
        <img v-if="petDetail.avatar" :src="petDetail.avatar" alt="Animo" class="PicCatDT" />
        <img v-else src="../assets/bento.png" alt="Animo" class="PicCatDT" />
        <!-- <img src="../assets/bento.png" alt="Animo" class="PicCatDT" /> -->
      </template>

      <div class="content-detail">
        <h2 style="font-size: 25px; color: #696969">{{ petDetail.name }}</h2>
        <!-- <font-awesome-icon class="gander" icon="venus" />
        <font-awesome-icon class="gander" icon="mars" /> -->

        <div class="TextDT" style="font-size: 18px">
          <font
            >ประเภทสัตว์ : <b>{{ petDetail.type }}</b></font
          >
        </div>
        <div class="TextDT" style="font-size: 18px">
          <font
            >พันธุ์ : <b>{{ petDetail.breed }}</b></font
          >
        </div>
        <div class="TextDT" style="font-size: 18px">
          <font
            >เพศ : <b>{{ petDetail.gender }}</b></font
          >
        </div>
        <div class="TextDT" style="font-size: 18px">
          <font
            >อายุ :
            <b
              >{{ petDetail.age.year }} ปี {{ petDetail.age.month }} เดือน</b
            ></font
          >
        </div>
        <div class="TextDT" style="font-size: 18px">
          <font
            >น้ำหนัก : <b>{{ petDetail.weight }} กิโลกรัม</b></font
          >
        </div>
        <!-- <div class="TextDT" style="font-size: 18px">
          <font
            >กรุ๊ปเลือด : <b>{{ petDetail.bloodType }} </b></font
          >
        </div> -->
      </div>

      <template #footer>
        <div class="footer-button-none">
          <div class="button-detail edit" @click="goToEditpet()">แก้ไข</div>
          <div class="button-detail delete" @click="goToMyPet(),deleteMyPet()">ลบ</div>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "Mypet",
  methods: {
    ...mapActions([
      "fetchMyPet",
      "fetchCurrentUser",
      "fetchPetDetail",
      "deleteMyPet",
    ]),
    goToEditpet() {
      this.$router.push('/mobile/editpet'); 
    },
    goToMyPet() {
      this.$router.push('/mobile/mypet'); 
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
    ...mapGetters(["allPets", "petDetail", 'getHistoryById']),
  },
  created() {
    this.fetchMyPet();
    this.fetchCurrentUser();
    //this.openLoading();
  },

  data() {
    return {
      ...mapState(["petDetailPopup"]),
      search: "",
      active: false,
      baseurl: 'http://localhost:4000/api/',
    };
  },
  components: {
    Navbar,
  },
};
</script>
<style scoped>
@import url("../assets/css/style.css");
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
