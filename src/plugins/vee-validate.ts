import Vue from 'vue';
import { required } from 'vee-validate/dist/rules';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';

extend('required', {
  ...required,
  message: '{_field_} cannot be empty',
});

Vue.component('validation-observer', ValidationObserver);
Vue.component('validation-provider', ValidationProvider);
