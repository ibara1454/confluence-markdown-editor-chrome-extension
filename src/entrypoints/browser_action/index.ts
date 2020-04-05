import '@/inject';
import Vue from 'vue';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import App from './App.vue';
import '@/plugins/vee-validate';

Vue.config.productionTip = false;

const vue = new Vue({
  store,
  vuetify,
  render: (h) => h(App),
});

vue.$mount('#app');
