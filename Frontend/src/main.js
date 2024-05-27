/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { persistStatePlugin } from './store/dataStore'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
pinia.use(persistStatePlugin)


registerPlugins(app)

app.use(pinia)
app.mount('#app')
