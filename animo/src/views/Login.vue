<template>
  <div>
    <img src="../assets/A1.png" class="a1" alt="" /><br>
    <div class="box-login">
      <HelloWorld class="content-login"/>
    </div>
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
  background: #f4f7f8;
  overflow: hidden;
}
.a1 {
  transform: translate(-15% ,-10%);
  width: 40vw;
  position: fixed;
}
.a2 {
  transform: translate(15% ,10%);
  width: 40vw;
  position: fixed;
  bottom: -20px;
  right: 0px;
}
.box-login {
  position: absolute;
  left: calc(50% - 225px);
  transform: translateX(-50%);
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: #ffffff;
  height: 330px;
  width: 450px;
  padding-top: -100px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}
.content-login {
  margin-top: -15px;
}
</style>
