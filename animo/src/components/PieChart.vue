<template>
  <div>
    <highcharts :options="chartOptions" :callback="myCallback"></highcharts>
  </div>
</template>

<script>
export default {
  name: "Chart",
  data() {
    return {
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
                y: 10,
                color: '#f29c77'
              },
              {
                name: "แมว",
                y: 15,
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
  },
};
</script>

<style>
.highcharts-container {
  margin: auto;
  font-family: kanit;
}
</style>
