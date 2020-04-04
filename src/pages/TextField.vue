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
  <table
    class="wysiwyg-macro"
    data-macro-name="html"
    data-macro-schema-version="1"
    style="background-image: url(/plugins/servlet/confluence/placeholder/macro-heading?definition=e2h0bWx9&amp;locale=ja_JP&amp;version=2); background-repeat: no-repeat;"
    data-macro-body-type="PLAIN_TEXT"
    data-mce-selected="1"
  >
  <!-- eslint-enable max-len -->
    <tbody>
      <tr>
        <td class="wysiwyg-macro-body">
          <pre>{{ computedContent }}</pre>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</template>

<script lang="ts">
import Vue from 'vue';
import editorStore from '@/store/modules/editor';

const styleScript = `
<${'script'}>
const main = document.getElementById('main-content');
const text = main.firstElementChild.innerText;
const iframe = document.createElement('iframe');
main.innerHTML = '';
main.appendChild(iframe);
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/marked/0.8.0/marked.min.js";
document.body.appendChild(script);
script.onload = () => {
  iframe.contentDocument.body.innerHTML = marked(text);
  iframe.contentDocument.body.style = 'margin: 0; overflow-y: hidden;';
  iframe.style = 'width: 100%; border: 0;';
  iframe.style.height = iframe.contentDocument.body.offsetHeight + 'px';
};
</${'script'}>
`;

// TODO: set the height of component dynamically
export default Vue.extend({
  name: 'TextField',

  computed: {
    computedText: {
      get(): string { return editorStore.TEXT; },
      set(val: string): void {
        editorStore.SET_TEXT(val);
      },
    },

    computedContent(): string {
      return styleScript;
    },
  },
});
</script>
