<template>
  <div class="container">
    <Line v-if="chartData" :data="this.chartData" :options="chartOptions"/>
  </div>
</template>
  
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineController, LinearScale, PointElement, CategoryScale, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineController, LinearScale, PointElement, CategoryScale, LineElement)

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    chartData: Object,
    xAxisLabel: String,
    yAxisLabel: String
  },
  data () {
    return {
    chartOptions: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: this.xAxisLabel
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: this.yAxisLabel
            }
          }
        }
      }
    }
  }
}
</script>