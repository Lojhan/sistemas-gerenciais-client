import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import VCreditCard from 'v-credit-card';
import InputMask from 'primevue/inputmask';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';



import InputNumber from 'primevue/inputnumber';


import InputText from 'primevue/inputtext';

import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core/dist/cjs/popper.js'
import 'primevue/resources/primevue.min.css'  
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'v-credit-card/dist/VCreditCard.css';

Vue.config.productionTip = false

Vue.component('Dialog', Dialog)

Vue.component('Dropdown', Dropdown)
Vue.component('InputMask', InputMask)
Vue.component('InputText', InputText)
Vue.component('TabView', TabView)
Vue.component('v-credit-card', VCreditCard);
Vue.component('TabPanel', TabPanel)
Vue.component('Button', Button)
Vue.component('DataTable', DataTable)
Vue.component('Column', Column)
Vue.component('InputNumber', InputNumber)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


