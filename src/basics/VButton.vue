<template>
  <button class="button" @click="onclick">
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'VButton',

  methods: {
    onclick() {
      this.$emit('click');
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  text-transform: uppercase;
  font-size: 14px;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  color: #009688;
  background-color: transparent;
  border: thin solid;
  border-radius: 4px;
  outline: none;

  letter-spacing: .09em;

  transition-duration: .3s;
  &:hover {
    background-color: rgba(#009688, 0.2);
  }
  &:focus {
    background-color: rgba(#009688, 0.2);
  }
}
</style>
