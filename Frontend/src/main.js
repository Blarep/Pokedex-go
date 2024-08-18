/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { persistStatePlugin } from './store/dataStore'
import VueGtag from 'vue-gtag-next'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
pinia.use(persistStatePlugin)


registerPlugins(app)

// Configuración de Google Analytics
app.use(VueGtag, {
    property: {
        id: 'G-6DDKC9NEN2' // Reemplaza con tu ID de Google Analytics
    }
  })

app.use(pinia)
app.mount('#app')
