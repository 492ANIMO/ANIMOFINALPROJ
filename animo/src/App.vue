<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style>
 body {
   margin: 0px;
   font-family: kanit;
   background: #F9FBFC;
 }
 .icon {
   padding-right: 8px;
 }
 .Content1 {
    margin-left: 20%;
    padding: 0px 16px;
}
.Content2 {
    position: absolute;
    left: 90%;
    margin-top:30px;
    transform: translateX(-90%);
    width: 72%;
    background: #FFFFFF;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
}
</style>
