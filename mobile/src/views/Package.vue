<template>
  <div>
    <Navbar namepage="แพ็คเกจ" />
    <div class="content package">
      <div class="content1">
        <div class="content2">
          <div class="fix-filter">
            <vs-input class="search" v-model="search" placeholder="ค้นหา..." />
            <!-- <div class="filter-package" @click="filterByType('สุนัข')">
            <div class="bg-filter">
              <img src="../assets/pet1.png" alt="Animo" class="Pic-package" />
            </div>
            <h4>สุนัข</h4>
          </div>
          <div class="filter-package" @click="filterByType('แมว')">
            <div class="bg-filter">
              <img src="../assets/pet2.png" alt="Animo" class="Pic-package" />
            </div>
            <h4>แมว</h4>
          </div>
          <div class="filter-package" @click="filterByType('สัตว์ฟันแทะ')">
            <div class="bg-filter">
              <img src="../assets/pet3.png" alt="Animo" class="Pic-package" />
            </div>
            <h4>สัตว์ฟันแทะ</h4>
          </div>
          <div class="filter-package" @click="filterByType('อื่นๆ')">
            <div class="bg-filter">
              <img src="../assets/pet4.png" alt="Animo" class="Pic-package" />
            </div>
            <h4>อื่นๆ</h4>
          </div> -->

            <!-- test loop -->
            <div
              v-for="(type, i) in types"
              :key="i"
              class="filter-package"
              @click="filterByType(type), selectType(i)"
            >
              <div class="bg-filter" :class="{ active: i === activeId }">
                <img
                  :src="getImgUrl(type)"
                  alt="Animo"
                  class="Pic-package"
                  :class="{ active1: i === activeId }"
                />
              </div>
              <h4>{{ type }}</h4>
            </div>
          </div>

          <div class="space-filter"></div>
          <div
            class="Package-Card"
            :key="_id"
            v-for="(pack, _id) in $vs.getSearch(allPackage, search)"
            :data="pack"
            @click="(active = !active), getPackageDetail(pack._id)"
          >
            <div
              class="bg-package package-yellow"
              :class="BindPackageType(pack.type)"
            >
              <img
                :src="getImgUrl(pack.type)"
                alt="Animo"
                class="Pic-package-dt"
              />
            </div>
            <div class="PetDT">
              <h2>{{ pack.name }}</h2>
              <div class="TextDT">
                <font
                  >ประเภทสัตว์ : <b>{{ pack.type }}</b></font
                >
              </div>
              <div class="TextDT">
                <font
                  >ราคา : <b>{{ pack.price }} บาท</b></font
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
          <h2 class="active-text">{{ packageDetail.name }}</h2>
        </template>

        <h2 class="Head-history">รายการรักษา</h2>
        <!-- vaccines -->
        <div
          v-for="(data, i) in packageDetail.vaccines"
          :key="i"
          class="box-package"
        >
          <h2>{{ data.name }}</h2>
          <div class="box-package-dt">
            <font
              >ประเภทสัตว์ : <b>{{ data.type }}</b></font
            ><br />
            <font
              >อายุมากกว่า : <b>{{ data.age }} ปี</b></font
            ><br />
            <font
              >รายละเอียด : <b>{{ data.detail }}</b></font
            ><br />
          </div>
        </div>

        <!-- treatments -->
        <div
          class="box-package"
          v-for="(data, j) in packageDetail.treatments"
          :key="j"
        >
          <h2>{{ data.name }}</h2>
          <div class="box-package-dt">
            <font
              >ประเภทสัตว์ : <b>{{ data.petType }}</b></font
            ><br />
            <font
              >อายุมากกว่า : <b>{{ data.age }} ปี</b></font
            ><br />
            <font
              >รายละเอียด : <b>{{ data.detail }}</b></font
            ><br />
          </div>
        </div>
        <!-- healthCheck -->
        <div
          class="box-package"
          v-for="(data, k) in packageDetail.healthChecks"
          :key="k"
        >
          <h2>{{ data.name }}</h2>
          <div class="box-package-dt">
            <font
              >ประเภทสัตว์ : <b>{{ data.petType }}</b></font
            ><br />
            <font
              >อายุมากกว่า : <b>{{ data.age }} ปี</b></font
            ><br />
            <font
              >รายละเอียด : <b>{{ data.detail }}</b></font
            ><br />
          </div>
        </div>

        <template #footer>
          <div class="footer-button-none">
            <div class="button-detail active-color" @click="goToStep1()">
              จองแพ็คเกจ
            </div>
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Package",
  data() {
    return {
      search: "",
      active: false,
      types: ["สุนัข", "แมว", "สัตว์ฟันแทะ", "อื่นๆ"],
      activeId: -1,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(["fetchPackage", "getPackageDetail", "filterByType"]),
    selectType(index) {
      console.log(`index: ${index}`);
      this.activeId = index;
      console.log(`activeId: ${this.activeId}`);
    },

    goToStep1() {
      this.$router.push("/mobile/step1");
    },
    BindPackageType: function (type) {
      if (type === "สุนัข") {
        return "package-yellow";
      } else if (type === "แมว") {
        return "package-orange";
      } else if (type === "สัตว์ฟันแทะ") {
        return "package-pink";
      } else {
        return "package-red";
      }
    },
    getImgUrl: function (type) {
      const images = require.context("../assets/", false, /\.png$/);
      let pet;
      if (type === "สุนัข") {
        pet = "pet1";
      } else if (type === "แมว") {
        pet = "pet2";
      } else if (type === "สัตว์ฟันแทะ") {
        pet = "pet3";
      } else {
        pet = "pet4";
      }
      return images("./" + pet + ".png");
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
    ...mapGetters(["allPackage", "packageDetail"]),
  },
  created() {
    this.fetchPackage();
    //this.openLoading();
  },
};
</script>

<style scoped>
@import url("../assets/css/style.css");
.active {
  background: rgb(109, 185, 240);
  background: linear-gradient(
    135deg,
    rgba(109, 185, 240, 1) 0%,
    rgba(80, 150, 230, 1) 100%
  );
}
.active1 {
  filter: brightness(200%);
}
.Head-history {
  font-weight: 500;
  font-size: 19px;
  padding-top: 10px;
}
.fix-filter {
  background: #696969;
  padding-top: 15px;
  position: fixed;
  width: calc(100% - 34px);
  margin-left: -3px;
  background: rgb(154, 221, 213);
  z-index: 2;
  padding-bottom: 10px;
}
.space-filter {
  height: 160px;
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
  padding-top: 0px;
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
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
::v-deep .box-package {
  width: 100%;
  margin-top: 5px;
}
::v-deep .box-package h2 {
  color: #696969;
}
::v-deep .button-detail {
  width: 140px;
  margin-right: 0px;
}
::v-deep .footer-button-none {
  display: flex;
  justify-content: center;
  width: calc(100%);
  padding: 10px;
  margin-right: 0px;
}
</style>
