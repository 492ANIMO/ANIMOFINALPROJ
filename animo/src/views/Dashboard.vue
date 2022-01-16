<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <h1>กราฟ</h1>
        <div>
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
import Navbar from "@/components/Navbar.vue";
import NavbarSide from "@/components/NavbarSide.vue";
import { config } from "vue/types/umd";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    NavbarSide,
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

// console.log('888==================',ctx);
//  document.onload=function(){
//    const ctx=document.getElementById('myChart');
//     console.log('==================',ctx);
//    };

window.onload = function () {
  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {},
  };
   const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  
};


// function loaded(){
//   const ctx=document.getElementById('myChart');
//   ctx.innerHTML='hello';
// }
</script>
