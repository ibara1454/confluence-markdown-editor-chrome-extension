<template>
  <context id="confluence-markdown-editor">
    <!-- Load stylesheet again, since outside style cannot effect on inner frame -->
    <link type="text/css" rel="stylesheet" :href="computedUrl">
    <markdown-editor class="editor" v-model="computedText" />
  </context>
</template>

<script lang="ts">
import Vue from 'vue';
import Context from '@/components/Context.vue';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import EditorStore from '@/store/modules/editor';
import { getExternalUrl } from '@/utils/extension';
import { getModule } from 'vuex-module-decorators';

const editorModule = getModule(EditorStore);

export default Vue.extend({
  name: 'App',

  components: { Context, MarkdownEditor },

  computed: {
    computedUrl(): string {
      return getExternalUrl('app.css');
    },

    computedText: {
      get(): string { return editorModule.TEXT; },

      set(value: string): void {
        editorModule.SET_TEXT(value);
      },
    },
  },
});
</script>

<style scoped>
.editor {
  height: 100%;
  width: 100%;
}
</style>
