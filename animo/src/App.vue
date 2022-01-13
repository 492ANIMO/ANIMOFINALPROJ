<template>
  <div>
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
   background: #f4f7f8;
   font-size: 100%;
 }
 .icon {
   padding-right: 8px;
 }
 .Content1 {
    padding-top: 30px;
}
.Content2 {
    position: absolute;
    left: calc(20% + 30px);;
    width: calc(80% - 100px);
    background: #FFFFFF;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    min-height: calc(100% - 152px);
}
.iconBTr{
  padding-right: 5px;
  margin-left: 1px;
}
.iconBTl{
  padding-left: 5px;
  margin-right: 1px;
  }
.space{
  height: 30px;
  width: 63px;
}
::v-deep .vs-input {
  font-family: kanit;
  color: #696969;
}

</style>
