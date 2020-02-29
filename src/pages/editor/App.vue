<template>
  <markdown-editor id="editor" v-model="computedText" />
</template>

<script lang="ts">
import Vue from 'vue';
import MarkdownEditor from '@/components/MarkdownEditor.vue';

export default Vue.extend({
  name: 'App',

  components: { MarkdownEditor },

  props: {
    text: { type: String, required: true },
  },

  computed: {
    computedText: {
      get(): string { return this.text; },

      set(value: string): void {
        this.$emit('update:text', value);
      },
    },
  },
});
</script>

<style>
#editor {
  height: 100%;
  width: 100%;
}
</style>
