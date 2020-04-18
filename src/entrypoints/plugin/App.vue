<template>
  <div class="vuetify-app">
    <link type="text/css" rel="stylesheet" :href="computedUrl">
    <!--
      Append an addition stylesheet to confluence page.
      Which is responsible to adjust the style of markdown editor
      and the whole confluence page.
    -->
    <v-style v-if="launched">{{ computedGlobalStyle }}</v-style>
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
import VStyle from '@/basics/VStyle.vue';
import VDialog from '@/components/Dialog.vue';
import Editor from '@/pages/Editor.vue';
import TextField from '@/pages/TextField.vue';
import editorStore from '@/store/modules/editor';
import config from 'config';
import { getExternalUrl } from '@/utils';
import { parseConfluencePage } from '@/models/confluence-page';

/**
 * Append an addition stylesheet to confluence page.
 * Which is responsible to adjust the style of markdown editor
 * and the whole confluence page.
 */

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
    const page = parseConfluencePage(innerDocument);

    const vue = new Vue({
      store,
      render: (h) => h(TextField, {
        props: {
          text: page?.text || '',
        },
      }),
    });
    // Replace the original body with component
    vue.$mount(innerDocument.body);
  }
}

export default Vue.extend({
  name: 'App',

  components: { VButton, VStyle, VDialog },

  data() {
    return {
      // Show dialog immediately
      dialog: true,
      launched: false,
    };
  },

  methods: {
    clickOk(): void {
      this.dialog = false;
      this.launched = true;
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

    computedGlobalStyle(): string {
      return editorStore.GLOBAL_STYLE;
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
