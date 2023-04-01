import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import router from './router'
import store from './store'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import { globalCookiesConfig } from "vue3-cookies";

const vuetify = createVuetify({
  components,
  directives
})

const temp = axios.create({
  baseURL: '/'
})

globalCookiesConfig({
  expireTimes: "999y"
});

createApp(App).use(vuetify).use(store).use(store).use(router).use(VueAxios, temp).mount('#app')
