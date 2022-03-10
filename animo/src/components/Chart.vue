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
            pointStart: 2022,
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
            data: [20],
            color: '#f785b0'
          },
          {
            name: "สุนัข",
            data: [30],
            color: '#f29c77'
          },
          {
            name: "สัตว์ฟันแทะ",
            data: [7],
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
  created(){


  }
};
</script>

<style>
.highcharts-container {
  margin: auto;
  font-family: kanit;
}
</style>
