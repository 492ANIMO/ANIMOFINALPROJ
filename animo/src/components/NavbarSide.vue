<template>
<div id="app">
    <ul>
        <li><div class="NavProfile">
            <h3 v-if="isAdmin()">
                Admin
            </h3>
            <h3 v-else>
                {{ name }}
            </h3>
            <h6>
                Role : {{ role }}
            </h6>
            </div></li>
        <li><router-link class="Nav-box" to="/dashboard"><font-awesome-icon class="icon" icon="chart-pie"/><h4>แดชบอร์ด</h4></router-link></li>
        <li><router-link class="Nav-box" to="/clients"><font-awesome-icon class="icon" icon="paw"/><h4>ข้อมูลผู้ใช้</h4></router-link></li>
        <li><router-link class="Nav-box" to="/package"><font-awesome-icon class="icon" icon="syringe"/><h4>แพ็คเกจ</h4></router-link></li>
        <li><router-link class="Nav-box" to="/reservation"><font-awesome-icon class="icon" icon="file-medical"/><h4>การจอง</h4></router-link></li>
        <li><router-link class="Nav-box" to="/appointment"><font-awesome-icon class="icon" icon="clipboard-list"/><h4>การนัดหมาย</h4></router-link></li>
        <li v-if="isAdmin()"><router-link class="Nav-box" to="/Admin/Addpet"><font-awesome-icon class="icon" icon="user"/><h4>แอดมิน</h4></router-link></li>
    </ul>
</div>

</template>
<script>
    import jwt_decode from "jwt-decode";

    export default {
    name: 'NavbarSide',
    props: {
        msg: String
    },
    data: () => ({
        role: '',
        name: 'Staff'
    }),
    methods:{
        isAdmin(){
            const token = localStorage.getItem('jwt');
            console.log(`token: ${token}`)
            const decoded = jwt_decode(token);
            console.log('jwt decoded:'+JSON.stringify(decoded));
            console.log('jwt role:'+JSON.stringify(decoded.role));

            if(localStorage.getItem('jwt') && decoded.role==='admin'){
                console.log('ดีจ้า admin');
                this.role = decoded.role
                return true;
            }
            else{
                console.log('แกไม่ใช่ admin แกคือ' + decoded.role);
                this.role = decoded.role
                return false;
            }        
        //   return (localStorage.getItem("jwt") ? true : false)
        },
    },
        created(){
            this.isAdmin()
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
h4 {
    margin: 0px;
    font-weight: 400;
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
.Nav-box {
    display: grid;
    grid: auto / 30px 100px ;
    align-items: center;
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