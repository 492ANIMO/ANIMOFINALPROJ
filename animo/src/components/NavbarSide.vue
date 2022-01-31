<template>
<div id="app">
    <ul>
        <li><div class="NavProfile">
            <h3>
                Doctor Name
            </h3>
            <h6>
                Role : Doctor
            </h6>
            </div></li>
        <li><router-link to="/dashboard"><font-awesome-icon class="icon" icon="chart-pie"/>แดชบอร์ด</router-link></li>
        <li><router-link to="/clients"><font-awesome-icon class="icon" icon="paw"/>ข้อมูลผู้ใช้</router-link></li>
        <li><router-link to="/package"><font-awesome-icon class="icon" icon="syringe"/>แพ็คเกจ</router-link></li>
        <li><router-link to="/reservation"><font-awesome-icon class="icon" icon="file-medical"/>การจอง</router-link></li>
        <li><router-link to="/appointment"><font-awesome-icon class="icon" icon="clipboard-list"/>การนัดหมาย</router-link></li>
    </ul>
</div>

</template>
<script>
    export default {
    name: 'NavbarSide',
    props: {
        msg: String
    }
    }
</script>
<style scoped>
h3 {
    font-size: 1.4vw;
    color: #ffffff;
}
h6 {
    font-size: 1.25vw;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 20%;
    background-color: #45ae9b;
    color: #ffffff;
    position: fixed;
    height: 100%;
    overflow: auto;
    position: fixed;
    z-index: 99;
}
li a {
    display: block;
    color: #ffffff;
    padding: 8px 2vw;
    margin: 10px 0px;
    text-decoration: none;
    font-size: 1.25vw;
}
li a:hover:not(.active) {
    background: rgb(204,233,216);
    background: linear-gradient(60deg, rgba(204,233,216,0.1) 0%, rgba(173,228,228,0.1) 100%);
    color: white;
}
.NavProfile {
    background: rgb(167,218,187);
    background: linear-gradient(60deg, rgba(167,218,187,0.6) 0%, rgba(111,205,205,0.6) 100%);
    padding: 5px 20px;
    margin: 0px 5px;
    border-radius: 8px;
}
.NavProfile h3 {
    font-weight: 400;
    margin: 0px;
    padding: 0px;
}
.NavProfile h6 {
    font-weight: 300;
    margin: -8px 0px 5px 0px;
    color: rgba(255,255,255,0.7);

}

</style>