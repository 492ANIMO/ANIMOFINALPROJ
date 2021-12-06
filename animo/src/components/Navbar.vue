<template>
    <div id="app">
        <ul>
            <li><img src="../assets/ANIMO1.png" alt="Animo" class="Logo1"></li>
            <li><h1 class="LogoText">ANIMO</h1></li>
            <li><a href="#news">introduction</a></li>
            <li><a href="#contact">Contact</a></li>
            <li class=login>
                <vs-button
                    border
                    color="#d4e9e7"
                    :active="active == 1"
                    @click="active = 1"
                ><font-awesome-icon class="icon" icon="power-off"/>
                Log in
              </vs-button></li>
          </ul>
    </div>
</template>
<script>
export default {
  name: 'Navbar',
  props: {
  },
}
</script>
<style scoped>
    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .content-inputs {
        margin-left: 10px;
    }
    .loginBT {
        width: 95%;
        margin-left: 10;
        margin-top: 15px;
    }
    ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: rgb(70,174,156);
    background: linear-gradient(45deg, rgba(70,174,156,1) 14%, rgba(99,188,201,1) 100%);
    height: 52px;
    position: fixed;
    width: 100%;
    z-index: 100;
    }

    li {
    float: left;
    }

    li a {
    display: block;
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
    }

    li a:hover:not(.active) {
    background: rgb(204,233,216);
    background: linear-gradient(60deg, rgba(204,233,216,0.1) 0%, rgba(173,228,228,0.1) 100%);
    }

    .active {
    background-color: #04AA6D;
    }
    .login {
        float: right;
        margin-right: 20px;
        top: 50%;
        transform: translateY(10%);
    }
    .vs-button {
        background: rgb(255,255,255,0.2);
        font-size: 15px;
        font-weight: 600;
        padding:0px 10px 0px 10px;
        border-radius: 20px;
    }
    h1,h3 {
        font-weight: 400;
        transform: translateX(-30px);
        margin: 0px;
        color: #494949;
    }
    h3 {
        margin-top: -10px;
    }
    h4 {
        margin: 10px 0px 10px -10px;
        padding-left: 5px;
        font-weight: 400;
        color: #696969;
    }
    ::v-deep .vs-button--border:focus {
        background: rgb(255,255,255,0.4) ;
    }
    .Logo1 {
        width: 45px;
        height: 45px;
        padding: 0px 35px 0px 30px;
    }
    .LogoText{
        color: #ffffff;
    }
</style>