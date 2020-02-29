<template>
  <v-textarea
    v-model="computedValue"
    @keydown.native.prevent.exact.tab="indent"
    @keydown.native.prevent.exact.shift.tab="unIndent" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TextEditor',

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
  },

  methods: {
    /**
     * Add an fix-sized intention (4 spaces) into target element.
     */
    indent(e: KeyboardEvent): void {
      if (e.target) {
        const inputElement = e.target as HTMLInputElement;
        const start = inputElement.selectionStart!;
        const end = inputElement.selectionEnd!;
        const value = inputElement.value;
        const before = value.substring(0, start);
        const after = value.substring(end);
        inputElement.value = `${before}    ${after}`;
        inputElement.selectionStart = start + 4;
        inputElement.selectionEnd = start + 4;
      }
    },

    // FIXME: bug
    unIndent(e: KeyboardEvent): void {
      if (e.target) {
        const inputElement = e.target as HTMLInputElement;
        const start = inputElement.selectionStart!;
        const end = inputElement.selectionEnd!;
        const value = inputElement.value;
        const before = value.substring(0, start);
        const after = value.substring(end);
        // Split text by newline charactors
        // The newline charactor may be 'CRLF', 'CR' or 'LF', which depends on you platform
        // https://blog.dreamarts.co.jp/creator/cr20160921/
        // https://stackoverflow.com/questions/1155678/javascript-string-newline-character
        const lines = before.split(/\r\n|\r|\n/);
        // currentLine is exactly not undefined since split will returns Array.length > 0
        const init = lines.slice(0, -1);
        const last = lines[lines.length - 1];

        const unIndentLine = last.replace(/^\s{0,4}/, '');

        // FIXME: join lines with correct newline charactor
        inputElement.value = [...init, unIndentLine].join('\n') + after;
      }
    },
  },
});
</script>

<style scoped>

</style>
