import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
// import { createI18n } from 'vue-i18n'
// i18n configs…
const app = createApp(App)
app.use(router)
// app.use(i18n)
app.mount('#app')
