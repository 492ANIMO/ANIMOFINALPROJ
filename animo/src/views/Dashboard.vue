<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="ContentGarph">
        <h2>จำนวนสัตว์ที่เข้ารับการรักษา</h2>
        <template>
          <div id="app">
            <Chart/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import NavbarSide from "@/components/NavbarSide.vue";
import Chart from "@/components/Chart";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    NavbarSide,
    Chart
  },
  data: () => ({
  }),
};
</script>
<style scoped>
h2 {
  margin: 0px 0px 5px 0px;
  color: #696969;
  font-weight: 500;
}
.ContentGarph {
    position: absolute;
    left: calc(20% + 30px);;
    width: calc(80% - 100px);
    background: #FFFFFF;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
}
</style>
