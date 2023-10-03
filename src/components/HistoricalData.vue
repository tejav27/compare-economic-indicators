<template>
  <v-container class="mx-auto">
    <LineChart v-if="loaded" :chartData="chartData" xAxisLabel="Year" :yAxisLabel="indicatorCode" />
    <v-card v-else class="mx-auto nodata">We are busy! Please try again later!</v-card>
  </v-container>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import te from 'tradingeconomics'
import { watch } from 'vue'

export default {
  name: 'HistoricalData',
  components: { LineChart },
  props: {
    countryCodes: {
      type: Array,
      required: true
    },
    indicatorCode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loaded: false,
      chartData: null,
      apiKey: import.meta.env.VITE_API_KEY_VARIABLE
    }
  },
  watch: {
    countryCodes() {
      this.loadHistoricalData()
    },
    indicatorCode() {
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

        const dataSegregatedByCountry = this.segregateDataByCountry(data) // `segregatedDatasets` contains the segregated datasets by country
        const { labels, chartDatasets } = this.createChartData(dataSegregatedByCountry)

        this.setChartData(labels, chartDatasets)
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    },

    async login() {
      await te.login(this.apiKey)
      //await te.login()
    },

    async getHistoricalData() {
      return te.getHistoricalData((country = this.countryCodes), (indicator = this.indicatorCode))
    },

    segregateDataByCountry(data) {
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

    createChartData(segregatedDatasets) {
      const labels = new Set()
      const chartDatasets = []

      for (const country in segregatedDatasets) {
        if (segregatedDatasets.hasOwnProperty(country)) {
          const data = segregatedDatasets[country]
          const datasetData = []

          data.forEach((item) => {
            labels.add(this.year(item.DateTime))
            datasetData.push(item.Value)
          })

          chartDatasets.push({
            label: country,
            data: datasetData,
            backgroundColor: this.getRandomColor(),
            borderColor: this.getRandomColor() // Specify the line color
          })
        }
      }

      return { labels: Array.from(labels), chartDatasets }
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
.nodata {
  width: 30vw;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
