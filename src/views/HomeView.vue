<template>
  <v-container align-center>
    <v-row >
      <v-card class="mx-auto mb-3 d-flex dropdowns">
        <v-col>
          <v-select
            v-model="favorites"
            :items="allowedCountries"
            label="Countries"
            multiple
            hint="Choose one or more countries"
            persistent-hint
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="chosenIndicator"
            :items="allowedIndicators"
            label="Indicator"
            hint="Pick your favorite indicator"
            persistent-hint
          ></v-select>
        </v-col>
      </v-card>
    </v-row>
    <v-row>
      <v-card>
        <HistoricalDataView :countryCodes="favorites" :indicatorCode="chosenIndicator" class="mx-auto" />
      </v-card>
    </v-row>
  </v-container>
  <v-footer class="d-flex flex-column">
      <div class="bg-teal d-flex w-100 align-center px-4">
        <strong>Get connected with us on social networks!</strong>
        <v-spacer></v-spacer>
      </div>

      <div class="px-4 py-2 bg-black text-center w-100">
        @ {{ new Date().getFullYear() }} — <strong>Tejaswi</strong>
      </div>
    </v-footer>
</template>

<script>
import HistoricalDataView from '../components/HistoricalData.vue';

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
  .dropdowns{
    width:30vw;
  }
 
}

</style>
