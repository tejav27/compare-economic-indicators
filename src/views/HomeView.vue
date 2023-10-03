<template>
  <v-container align-center>
    <v-row>
      <v-card class="mx-auto mb-3">
        <v-col>
          <v-select
            v-model="favorites"
            :items="allowedCountries"
            label="Select"
            multiple
            hint="Pick your favorite countries"
            persistent-hint
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="chosenIndicator"
            :items="allowedIndicators"
            label="Select"
            hint="Pick your favorite indicator"
            persistent-hint
          ></v-select>
        </v-col>
      </v-card>
    </v-row>
    <v-row>
      <v-card>
        <HistoricalDataView :countryCodes="favorites" :indicatorCode="chosenIndicator" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import HistoricalDataView from '../components/HistoricalDataView.vue';

export default {
  components: {
    HistoricalDataView
},
  data() {
    return {
      favorites: ['mexico'],
      allowedIndicators: ['gdp', 'population'],
      chosenIndicator: 'gdp',
      allowedCountries: ['mexico', 'sweden', 'thailand', 'new zealand']
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
