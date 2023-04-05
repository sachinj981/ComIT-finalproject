//import { createApp } from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './Routes'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin,{
   clientId: '1039880995855-gckabqqt4gd69l6ie8pt5obk536robth.apps.googleusercontent.com'
  })
  app.use(router)
  app.mount('#app')
