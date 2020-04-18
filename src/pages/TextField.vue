<template>
<!--
    In general, you should not mount any component directly
    on the body tag. We use body tag here because we need to
    keep same tag structure as original confluence's.
-->
<body
  id="tinymce"
  data-id="wysiwygTextarea"
  contenteditable="true"
  :class="[
    'mce-content-body',
    'aui-theme-default',
    'mceContentBody',
    'wiki-content',
    'fullsize',
    'notranslate',
    'page-edit'
  ]"
  style="padding-top: 108px;"
>
  <pre>{{ computedText }}</pre>
  <!-- eslint-disable max-len -->
  <html-macro>
    <v-script type="text/template">{{ computedEditorStyle }}</v-script>
    <v-script defer>
      const main = document.getElementById('main-content');
      const text = main.firstElementChild.innerText;
      const iframe = document.createElement('iframe');
      main.innerHTML = '';
      main.appendChild(iframe);

      const markedLoaded = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/marked/0.8.0/marked.min.js";
        document.body.appendChild(script);
        script.onload = resolve;
      });

      const hightlightLoaded = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js";
        document.body.appendChild(script);
        script.onload = resolve;
      });

      Promise.all([markedLoaded, hightlightLoaded]).then(() => {
        marked.setOptions({
          highlight: (code, lang) => {
            const result = lang !== '' ? hljs.highlightAuto(code, [lang]) : hljs.highlightAuto(code);
            return result.value;
          },
        });
        iframe.contentDocument.body.innerHTML = marked(text);
        iframe.contentDocument.body.style = 'margin: 0; overflow-y: hidden;';
        iframe.style = 'width: 100%; border: 0;';
        iframe.style.height = iframe.contentDocument.body.offsetHeight + 'px';
        const style = iframe.contentDocument.createElement('style');
        iframe.contentDocument.body.appendChild(style);
      });
    </v-script>
  </html-macro>
</body>
</template>

<script lang="ts">
import Vue from 'vue';
import VScript from '@/basics/VScript.vue';
import HtmlMacro from '@/components/confluence/HtmlMacro.vue';
import editorStore from '@/store/modules/editor';

// TODO: set the height of component dynamically
export default Vue.extend({
  name: 'TextField',

  components: { VScript, HtmlMacro },

  props: {
    text: { type: String, required: true },
  },

  computed: {
    computedText: {
      get(): string { return editorStore.TEXT; },
      set(val: string): void {
        editorStore.SET_TEXT(val);
      },
    },

    computedEditorStyle(): string {
      return editorStore.EDITOR_STYLE;
    },
  },

  created() {
    // Initialize the text state
    editorStore.SET_TEXT(this.text);
  },
});
</script>
