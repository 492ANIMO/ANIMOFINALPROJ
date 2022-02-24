<template>
  <div>
    <Navbar namepage="ข่าวสาร" />
    <div class="content">
      <div>
        <div class="Head-text">
          <br />
          <div class="button-news">ข่าวสาร</div>
          <br />
          <div class="button-news">ประชาสัมพันธ์</div>
          <br />
          <div class="button-news news-active">บทความ</div>
          <br />
        </div>
        <div class="content1">
          <div class="content-scroll">

            <div v-for="annoucement in allAnnoucements" :key="annoucement._id">
                <div class="news-box" @click="goTonews(annoucement._id)">
                <img src="../assets/muji.png" alt="Animo" class="news-box-pic" />
                <div class="news-box-text">
                  <h2>{{ annoucement.title }}</h2>
                  <div class="news-box-dt">
                    <h4>
                      {{annoucement.body | strippedContent}}
                    </h4>
                  </div>
                  <div class="TextDT1">
                    <font>อ่านเพิ่มเติม...</font>
                  </div>
                </div>
              </div>
              <br>
            </div>
            <br /><br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navbar from "../components/Navbar";


export default {
  name: "Annoucement",
  data() {
    return {
      search: "",
      value: "",
      active: false,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(['fetchAnnoucements', 'getAnnoucementDetail']),
    goTonews(id) {
      this.getAnnoucementDetail(id)
      this.$router.push('/mobile/news'); 
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
  created() {
    //this.openLoading();
  },
  computed: {
    ...mapGetters(['allAnnoucements']),
    
  },
  beforeMount(){
    this.fetchAnnoucements();
  },
  filters: {
    strippedContent: function(string) {
           return string.replace(/<\/?[^>]+>/ig, " "); 
    }
}
};
</script>
<style scoped>
@import url("../assets/css/style.css");
.news-box {
  display: grid;
  grid: auto auto / auto;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.news-box-pic {
  width: calc(100vw - 60px);
  height: 180px;
  object-fit: cover;
}
.news-box-text {
  text-align: left;
  padding: 8px 10px;
  word-break: break-all;
}
.news-box-text h2 {
  word-break: break-all;
  color: #696969;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  margin: 5px 0px;
}
.news-box-text h4 {
  word-break: break-all;
  color: #acacac;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}
.news-box-dt {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.news-active {
  background: #65c0d4 !important;
  color: #ffffff !important;
  border: none !important;
}
.button-news {
  color: #c2c2c2;
  background: #ffffff;
  border: #c2c2c2 solid 1px;
  border-radius: 20px;
  padding: 5px;
}
::v-deep .TextDT1 {
  font-size: 12px;
  padding-right: 5px;
}
::v-deep .Head-text {
  display: grid;
  grid: auto / 10px auto 10px auto 10px auto 10px;
  text-align: center;
  position: sticky;
  top: 0px;
  z-index: 2;
  background: #ffffff;
}
::v-deep .bar {
  background: rgb(118, 204, 194);
  background: linear-gradient(
    135deg,
    rgba(118, 204, 194, 1) 0%,
    rgba(125, 189, 217, 1) 100%
  );
}
::v-deep .content {
  background: #e8f5f3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
::v-deep .content1 {
  padding: 20px 30px;
  text-align: center;
  height: calc(100vh - 80px);
  position: absolute;
  overflow: scroll;
}
::v-deep .line1 {
  background: #ffffff;
}
::v-deep .line2 {
  background: #ffffff;
}
::v-deep .rightNav {
  color: #ffffff;
}
::v-deep .Logo1 {
  filter: invert(1);
  opacity: 100%;
}
::v-deep .HeadPage {
  color: #ffffff;
}
::v-deep .vs-input {
  width: 100%;
  border-radius: 10px;
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
::v-deep .vs-input__label--label {
  color: #696969;
  font-size: 18px;
  margin-left: -10px;
}
::v-deep .vs-select__label--label {
  color: #696969;
  font-size: 18px;
  margin-left: -5px;
  margin-bottom: 12px;
  z-index: 1;
}
::v-deep .vs-select__input {
  width: 100%;
  border-radius: 10px;
  padding: 7px 13px 7px 10px;
}
::v-deep .vs-select {
  z-index: 1;
}
</style>
