<template>
<div class="Bg">
    <Navbar/>
        <h2>สมาชิกในทีม</h2>
    <div class="content1">

        <vs-row>
            
            <vs-col w="6"  class="content2">
                <vs-card>
                    <template #title>
                        <h3>Backend Developer</h3>
                    </template>
                    <template #img>
                        <img src="../assets/may.jpg" alt="">
                    </template>
                    <template #text>
                        <p><font-awesome-icon class="icon" icon="address-card"/>นิภาพร มีทับทิม 610610595</p>
                        <p><font-awesome-icon class="icon" icon="envelope"/>myungmay42@gmail.com</p>
                        <p><font-awesome-icon class="icon" icon="phone-square-alt"/>065-5989298</p>
                    </template>
                </vs-card>
            </vs-col>

             <vs-col w="6"  class="content2">
                <vs-card>
                    <template #title>
                        <h3>Frontend Developer</h3>
                    </template>
                    <template #img>
                        <img src="../assets/jay.jpg" alt="">
                    </template>
                    <template #text>
                        <p><font-awesome-icon class="icon" icon="address-card"/>วรายุทธ พรมนิล 610610611</p>
                        <p><font-awesome-icon class="icon" icon="envelope"/>mee_jay10918@hotmail.com</p>
                        <p><font-awesome-icon class="icon" icon="phone-square-alt"/>099-2403334</p>
                    </template>
                </vs-card>
            </vs-col>
    </vs-row>
        
    </div>
     

</div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Contact',
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
h3 {
    font-weight: 500;
    color: #696969;
    font-size: 1.2rem;
}
p {
    padding-left: 10px;
}
h2 {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    color: #696969;
    font-weight: 500;
    font-size: 28px;
    padding: 40px;
}
.content1{
    padding-top: 70px;
    margin: auto;
    width: 80%;
    margin-left: 12%;
}
.content2{
    position: static;
    padding: 5%;
    margin: auto;
}
.Bg {
    background: rgb(233,253,230);
    background: linear-gradient(45deg, rgba(233,253,230,1) 0%, rgba(198,238,246,1) 100%);
    position: absolute;
    width:100%;
    height:100%;
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