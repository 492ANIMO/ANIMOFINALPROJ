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
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          itemStyle: {
            color: '#696969',
            fontWeight: 'thin'
            },
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 2010,
            borderRadius: 4
          },
        },
        chart: {
          type: "column",
          alignTicks: false,
          style: {
            fontFamily: "Kanit",
            fontSize: 15,
            height: 350,            
          },
        },
        
        series: [
          {
            name: "แมว",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
            color: '#f785b0'
          },
          {
            name: "หมา",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
            color: '#f29c77'
          },
          {
            name: "หนู",
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
            color: '#b798e3'
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 800,
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
