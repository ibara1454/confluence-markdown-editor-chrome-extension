<template>
  <textarea
    v-model="computedValue"
    v-on="computedListeners"
  ></textarea>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'VTextarea',

  props: {
    value: { type: String, required: false, default: '' },
  },

  computed: {
    computedValue: {
      get(): string { return this.value; },
      set(value: string): void {
        this.$emit('input', value);
      },
    },

    computedListeners(): Function | Function[] {
      // Remove `input` listener from listeners
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { input, rest } = this.$listeners;
      return rest;
    },
  },
});
</script>

<style scoped>
textarea {
  resize: none;
  outline: none;
  font-size: 14px;
  font-family: 'Monaco', courier, 'Courier New', Courier, monospace;
}
</style>
