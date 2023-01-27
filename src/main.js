import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import router from './router'
import store from './store'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(store).use(store).use(router).use(vuetify).mount('#app')
