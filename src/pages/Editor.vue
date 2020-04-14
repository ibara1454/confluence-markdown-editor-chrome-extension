<template>
  <context id="confluence-markdown-editor">
    <!-- Load stylesheet again, since outside style cannot effect on inner frame -->
    <link type="text/css" rel="stylesheet" :href="computedUrl">
    <v-style>{{ computedEditorStyle }}</v-style>
    <markdown-editor class="editor" v-model="computedText" />
  </context>
</template>

<script lang="ts">
import Vue from 'vue';
import VStyle from '@/basics/VStyle.vue';
import Context from '@/components/Context.vue';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import editorStore from '@/store/modules/editor';
import config from 'config';
import { getExternalUrl } from '@/utils';

export default Vue.extend({
  name: 'Editor',

  components: { Context, MarkdownEditor, VStyle },

  computed: {
    computedUrl(): string {
      // Resolve the related stylesheet of plugin
      // TODO: remove the dependency to plugin from this component
      return getExternalUrl(`${config.module.plugin}.css`);
    },

    computedEditorStyle(): string {
      return editorStore.EDITOR_STYLE;
    },

    computedText: {
      get(): string { return editorStore.TEXT; },

      set(value: string): void {
        editorStore.SET_TEXT(value);
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
