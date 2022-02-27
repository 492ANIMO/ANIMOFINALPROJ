<template>
  <div>
    <highcharts :options="chartOptions" :callback="myCallback"></highcharts>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Chart",
  data() {
    return {
      colors:['#f29c77','#f785b0','#b798e3','#64ced0',],
      chartOptions: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
         yAxis: {
          title: {
            text: "จำนวนสัตว์",
          },
        },
         plotOptions: {
        pie: {
            dataLabels: {
                distance: 10,
                style: {
                    color: '#696969',
                    fontSize: 18,
                    borderWidth: 0,
                }
            },
        }
    },
        chart: {
          type: "pie",
          alignTicks: false,
          style: {
            fontFamily: "Kanit",
            height: 300,
          },
        },

        series: [
          {
            innerSize: '60%',
            data: [
              {
                name: "สุนัข",
                y: 2,
                color: '#f29c77'
              },
              {
                name: "แมว",
                y: 3,
                color: '#f785b0'
              },
              {
                name: "นก",
                y: 20,
                color: '#b798e3'
              },
              {
                name: "อื่นๆ",
                y: 30,
                color: '#64ced0'
              },
            ],
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      },
    };
  },
  mounted() {},
  methods: {
    myCallback() {
      console.log("this is callback function");
    },
    countPetType(){
      let baseURL = "http://localhost:4000/api/pets/petCount"
      axios
      .get(baseURL)
      .then((res) => {
        console.log(res.data);
        const response = res.data;
        this.chartOptions.series[0].data = response.map( data => {
          return{
            name: data._id,
            y: data.count,
            color: this.colors[response.indexOf(data)]
          }
        })

      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  created(){
    this.countPetType();
  }
};
</script>

<style>
.highcharts-container {
  margin: auto;
  font-family: kanit;
}
</style>
