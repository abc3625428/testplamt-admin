import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { router } from './route'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

app.use(store)
app.use(router)

app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
import 'virtual:windi.css'
import './permission'
import "nprogress/nprogress.css"

import permission from './directives/permission'
app.use(permission)




app.mount('#app')
