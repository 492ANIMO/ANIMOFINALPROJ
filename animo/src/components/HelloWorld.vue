<template>
  <div id="app" class="container">
        <div class="content-inputs">
            <h1>Hello</h1>
            <h3>Sign in to your account </h3>
            <h4>Email</h4>
                <vs-input v-model="email" placeholder="Enter your email...">
                </vs-input>
            <h4>Password</h4>
                <vs-input type="password" v-model="password" placeholder="Enter your password...">
                </vs-input>
                
        </div>
        <vs-button
                    class="loginBT"
                    block
                    color="#46AE9C"
                    :active="active == 0"
                    @click="active = 0, login()"
                >
                    Login
                </vs-button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data:() => ({
        value1: '',
        value2: '',
        email: '',
        password: '',
        active: 0
    }),
    methods:{
        login(){
            let baseURL = "http://localhost:4000/api/auth/login/";

            axios
                .post(baseURL, { email: this.email, password: this.password })
                .then((res) => {
                    let token = res.data.access_token;
                    localStorage.setItem("jwt", token);
                    this.email= ''
                    this.password= ''
                    console.log(res.data)
                    this.$router.push({name:'Clients'})
                })
                .catch((error) => {
                   console.log(error)
                });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
        width: 3500px;
        height: 35px;
        font-size: 20px;
        margin: 10px;
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
        font-size: 18px;
    }
    ::v-deep .vs-input {
        width: 350px;
        height:35px;
        padding: 17px;
        border-radius: 8px;
    }
    ::v-deep .vs-input__label {
        font-size: 0.9rem;
    }
    ::v-deep .vs-button {
        border-radius: 8px;
        margin: 15px 10px 0px 10px;
        width: 97.5%;
        font-weight: 500;
        font-size: 15px;
    }
</style>
