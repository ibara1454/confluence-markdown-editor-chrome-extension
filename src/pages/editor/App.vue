<template>
  <context class="frame">
    <!-- Load stylesheet again, since outside style cannot effect on inner frame -->
    <link type="text/css" rel="stylesheet" :href="computedUrl">
    <markdown-editor class="editor" v-model="computedText" />
  </context>
</template>

<script lang="ts">
import Vue from 'vue';
import Context from '@/components/Context.vue';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import { getExternalUrl } from '@/utils/extension';

export default Vue.extend({
  name: 'App',

  components: { Context, MarkdownEditor },

  props: {
    text: { type: String, required: true },
  },

  computed: {
    computedUrl(): string {
      return getExternalUrl('app.css');
    },

    computedText: {
      get(): string { return this.text; },

      set(value: string): void {
        this.$emit('update:text', value);
      },
    },
  },
});
</script>

<style scoped>
.frame {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(100% - 60px);
}

.editor {
  height: 100%;
  width: 100%;
}
</style>
