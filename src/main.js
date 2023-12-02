import { createApp } from 'vue'
import App from './App.vue'

import ElementUI from 'element-plus'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(ElementUI)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
