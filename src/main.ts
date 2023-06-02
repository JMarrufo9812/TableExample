import { createApp  } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import '@vue/compat';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const app = createApp(App);

app.use(createPinia())

app.mount('#app');
