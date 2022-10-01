import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'

//createApp(App).mount('#app')

const forumApp = createApp(App)
forumApp.use(router)
forumApp.mount('#app')
