// polyfills to support node shims from 'tradingeconomics' npm library
window.process = {
    env: { DEBUG: undefined },
  }
window.global = window

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

app.use(router)

const vuetify = createVuetify({
    components,
    directives,
  })
app.use(vuetify)

app.mount('#app')
