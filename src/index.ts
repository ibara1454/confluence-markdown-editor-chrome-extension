import '@/inject';
import Vue from 'vue';
import App from '@/App.vue';

const vue = new Vue({
  render: (h) => h(App),
});

vue.$mount('#app');
