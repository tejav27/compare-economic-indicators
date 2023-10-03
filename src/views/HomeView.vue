<template>
  <v-container class="container">
    <v-row class="mb-5">
    <Header/>
    </v-row>
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
      <v-card class="chartstyle">
        <HistoricalData :countryCodes="favorites" :indicatorCode="chosenIndicator" />
      </v-card>
    </v-row>
    <v-row class="mt-15">
    <Footer/>
    </v-row>
  </v-container>
</template>

<script>
import HistoricalData from '../components/HistoricalData.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'

export default {
  components: {
    HistoricalData,
    Footer,
    Header
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
.chartstyle{
  background-color: #fff;
  align-items: center;
  margin: 10px auto;
}
.container{
  border: 1px solid #ccc;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  background-color: #ececec;
}
</style>
