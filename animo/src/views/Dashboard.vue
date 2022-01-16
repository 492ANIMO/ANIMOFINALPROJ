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
import Chart from 'chart.js'



export default {
  name: "Dashboard",
  components: {
    Navbar,
    NavbarSide,
  },
  data: () => ({
  }),
  created() {
    this.chart();
  },

  methods: {
    chart(){
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
    }
  }
};

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// const labels = ["January", "February", "March", "April", "May", "June"];

// // console.log('888==================',ctx);
// //  document.onload=function(){
// //    const ctx=document.getElementById('myChart');
// //     console.log('==================',ctx);
// //    };

// window.onload = function () {

  
// };


// function loaded(){
//   const ctx=document.getElementById('myChart');
//   ctx.innerHTML='hello';
// }
</script>
