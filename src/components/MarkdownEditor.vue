<template>
  <!-- FIXME: input event handler on component will be hooked on div element,
              and will never be triggered by div -->
  <div class="editor">
    <text-editor class="input" v-model="computedValue" />
    <html-preview class="preview" :text="dataMarkdown" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import marked from 'marked';
// require the highlight.js library including all languages
import hljs from 'highlight.js';
import debounce from 'lodash.debounce';
import TextEditor from '@/components/TextEditor.vue';
import HtmlPreview from '@/components/HtmlPreview.vue';

// TODO: scroll synchronize
// TODO: apply custom style
export default Vue.extend({
  name: 'MarkdownEditor',

  components: { TextEditor, HtmlPreview },

  props: {
    value: { type: String, required: false, default: '' },
  },

  data() {
    // Initialize displayed text without debounce in the begining
    // vue markdown editor example
    // https://jp.vuejs.org/v2/examples/index.html
    return {
      dataMarkdown: marked(this.value),
    };
  },

  computed: {
    computedValue: {
      get(): string {
        return this.value;
      },
      set(text: string): void {
        this.$emit('input', text);
        this.setBouncedMarkdown(text);
      },
    },

    computedListeners(): Function | Function[] {
      // Remove `input` listener from listeners
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { input, rest } = this.$listeners;
      return rest;
    },
  },

  methods: {
    // eslint-disable-next-line func-names, @typescript-eslint/no-explicit-any
    setBouncedMarkdown: debounce(function (this: any, text: string) {
      this.dataMarkdown = marked(text);
    }, 300),
  },

  beforeCreate(): void {
    marked.setOptions({
      highlight: (code, lang) => {
        // Let `highlight` detech the language if no launguage is given
        const result = lang !== '' ? hljs.highlightAuto(code, [lang]) : hljs.highlightAuto(code);
        return result.value;
      },
    });
  },
});
</script>

<style scoped>
.editor {
  display: flex;
  overflow: hidden;
}

/* TODO: make user choose the ratio of editor and preview */
.input, .preview {
  flex: 1;
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
}

.input {
  background: #f6f6f6;
  border-right: 1px solid #ccc;
}

.preview {
  background: rgb(255, 255, 255);
  overflow-y: scroll;
}
</style>
