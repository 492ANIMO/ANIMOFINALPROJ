<template>
  <div class="ct">
    <img src="../assets/A1.png" class="a1" alt="" /><br>
    <HelloWorld />
    <img src="../assets/A2.png" class="a2" alt="" />
  </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "Login",
  components: {
    HelloWorld,
  },
  data: () => ({
    value: "",
  }),
};
</script>
<style>
body {
  background: #ffffff;
  overflow: hidden;
}
.ct {
  display: grid;
  grid: 100vh / 40% auto 40%;
}
.a1 {
  transform: translate(-15% ,-10%);
  width: 100%;
}
.a2 {
  transform: translate(15% ,10%);
  display: grid;
  align-self: end;
  width: 100%;
}
</style>
