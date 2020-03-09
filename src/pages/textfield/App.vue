<template>
  <context class="frame">
    <!-- Workaround of rendering style tag -->
    <v-style>{{ rawStyle }}</v-style>
    <div v-html="computedPreview" />
  </context>
</template>

<script lang="ts">
import Vue from 'vue';
import VStyle from '@/basics/VStyle.vue';
import Context from '@/components/Context.vue';
import marked from 'marked';
import hljs from 'highlight.js';

// TODO: set the height of component dynamically
export default Vue.extend({
  name: 'App',

  components: { Context, VStyle },

  props: {
    text: { type: String, required: true },
    rawStyle: { type: String, required: true },
  },

  computed: {
    computedPreview(): string {
      return marked(this.text);
    },
  },

  created() {
    // Apply highlight.js on code blocks
    marked.setOptions({
      highlight(code, lang) {
        const result = lang !== '' ? hljs.highlightAuto(code, [lang]) : hljs.highlightAuto(code);
        return result.value;
      },
    });
  },
});
</script>

<style scoped>
.frame {
  border: 0;
  width: 100%;
}
</style>
