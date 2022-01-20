<template>
<div>
    <Navbar/>
    <div class="content">
      <div class="ImBox">
        <img class="intro" src="../assets/intro1.jpg" alt="">
      </div>
      <div class="ImBox">
        <img class="intro" src="../assets/intro2.jpg" alt="">
      </div>
      <div class="ImBox">
        <img class="intro" src="../assets/intro3.jpg" alt="">
      </div>
    </div>
</div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Intro',
  components: {
    Navbar,
  },
  methods: {
  sendData(e) {
    e.preventDefault();
    console.log("sendData.......");
    this.clearData();
    }
  }
}

</script>
<style scoped>
.font {
  font-size: 20px;
}
.intro {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.5s;
  margin: 0px ;
}
.intro:hover {
  transform: scale(1.08);
}
.content {
  padding: 12px;
  padding-top: 27px;
}
.ImBox {
  border-radius: 20px;
  margin: auto;
  display: block;  
  margin-top: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 0 0 100%;
}
::v-deep .vs-dialog__content {
  padding: 25px 30px;
}
::v-deep .vs-dialog__header {
  float: left;
  color: #696969;
  padding: 20px 0px 0px 20px;
}
</style>