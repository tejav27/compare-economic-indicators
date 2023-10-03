<template>
  <v-container class="mx-auto" >
    <LineChart v-if="loaded" :chartData="chartData" xAxisLabel="Year" :yAxisLabel="indicatorCode" />
    <v-card v-else class="mx-auto nodata"> We are busy! Please try again later!</v-card>
  </v-container>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import te from 'tradingeconomics'
import { watch } from 'vue'

export default {
  name: 'HistoricalDataView',
  components: { LineChart },
  props: {
    countryCodes: Array,
    indicatorCode: String
  },
  data() {
    return {
      loaded: false,
      chartData: null
    }
  },
  watch: {
    countryCodes() {
      this.loadHistoricalData()
    }
  },
  methods: {
    year(dateTime) {
      const date = new Date(dateTime)
      return date.getFullYear().toString()
    },

    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }

      return color
    },

    async loadHistoricalData() {
      this.loaded = false

      try {
        await this.login()
        const data = await this.getHistoricalData()

        const segregatedDatasets = this.segregateDatasets(data) // `segregatedDatasets` contains the segregated datasets by country
        const { labels, chartDatasets } = this.convertDatasets(segregatedDatasets)

        this.setChartData(labels, chartDatasets)
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    },

    async login() {
      await te.login()
      //await te.login('ba239be24bb243a:be260s52lj91r0p')
    },

    async getHistoricalData() {
      return te.getHistoricalData((country = this.countryCodes), (indicator = this.indicatorCode))
    },

    segregateDatasets(data) {
      const segregatedDatasets = {}

      data.forEach((item) => {
        const country = item.Country

        if (!segregatedDatasets[country]) {
          segregatedDatasets[country] = []
        }

        segregatedDatasets[country].push(item)
      })

      return segregatedDatasets
    },

    convertDatasets(segregatedDatasets) {
      const labels = []
      const chartDatasets = []

      for (const country in segregatedDatasets) {
        if (segregatedDatasets.hasOwnProperty(country)) {
          const data = segregatedDatasets[country]
          const datasetData = []

          data.forEach((item) => {
            labels.push(this.year(item.DateTime))
            datasetData.push(item.Value)
          })

          chartDatasets.push({
            label: country,
            data: datasetData,
            backgroundColor: this.getRandomColor(),
            borderColor: this.getRandomColor(), // Specify the line color
          })
        }
      }

      return { labels, chartDatasets }
    },

    setChartData(labels, chartDatasets) {
      this.chartData = {
        labels: labels,
        datasets: chartDatasets
      }
    }
  },
  async mounted() {
    this.loadHistoricalData()
  }
}
</script>
<style>
  .nodata{
    width: 30vw;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
