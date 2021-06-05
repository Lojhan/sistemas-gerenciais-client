import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DataView from 'primevue/dataview';
import Button from 'primevue/button'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


import InputNumber from 'primevue/inputnumber';

import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core/dist/cjs/popper.js'
import 'primevue/resources/primevue.min.css'  
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'

Vue.config.productionTip = false


Vue.component('Button', Button)
Vue.component('DataTable', DataTable)
Vue.component('Column', Column)
Vue.component('InputNumber', InputNumber)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


