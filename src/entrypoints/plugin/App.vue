<template>
  <div class="vuetify-app">
    <link type="text/css" rel="stylesheet" :href="computedUrl">
    <v-dialog class="dialog" v-model="dialog">
      <div class="card">
        <h1 class="dialog-title">Confirm</h1>
        <div class="dialog-body">Open Markdown editor?</div>
        <div class="dialog-actions">
          <v-button class="m2" @click="clickCancel">Cancel</v-button>
          <v-button class="m2" @click="clickOk">OK</v-button>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import VButton from '@/basics/VButton.vue';
import VDialog from '@/components/Dialog.vue';
import Editor from '@/pages/Editor.vue';
import TextField from '@/pages/TextField.vue';
import editorStore from '@/store/modules/editor';
import config from 'config';
import { getExternalUrl } from '@/utils';

/**
 * Return the content of first element `<pre></pre>` of given document' body.
 * @param doc a Document.
 * @returns inner text of first element `<pre></pre>`.
 */
function getTextFieldValue(doc: Document): string | undefined {
  const child = doc.body?.firstElementChild;
  if (child && child.tagName === 'PRE') {
    return (child as HTMLElement).innerText;
  }
  return undefined;
}

/**
 * Append an addition stylesheet to confluence page.
 * Which is responsible to adjust the style of markdown editor
 * and the whole confluence page.
 */
function applyStyle(): void {
  const style = document.createElement('style');
  style.innerText = editorStore.GLOBAL_STYLE;
  document.body.appendChild(style);
}

function setupEditor(): void {
  const rte = document.getElementById('rte');
  if (rte) {
    const editorWrapper = document.createElement('div');
    rte.appendChild(editorWrapper);
    const vue = new Vue({
      store,
      render: (h) => h(Editor),
    });
    vue.$mount(editorWrapper);
  }
}

function setupTextField(): void {
  // Id of iframe of Inner document
  const iframeId = 'wysiwygTextarea_ifr';

  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
  const innerDocument = iframe?.contentDocument;
  if (innerDocument) {
    const body = innerDocument.body;
    const text = getTextFieldValue(innerDocument);
    if (text) {
      editorStore.SET_TEXT(text);
    }

    const vue = new Vue({
      store,
      render: (h) => h(TextField),
    });
    vue.$mount(body);
  }
}

export default Vue.extend({
  name: 'App',

  components: { VButton, VDialog },

  data() {
    // Show dialog immediately
    return { dialog: true };
  },

  methods: {
    clickOk(): void {
      this.dialog = false;
      applyStyle();
      setupEditor();
      setupTextField();
    },

    clickCancel(): void {
      this.dialog = false;
    },
  },

  computed: {
    computedUrl(): string {
      return getExternalUrl(`${config.module.plugin}.css`);
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: 230px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 10px 20px;
}

.dialog-title {
  font-size: 1.5rem;
  margin: 0;
  font-weight: normal;
}

.dialog-actions {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.m2 {
  margin: 8px;
}
</style>
