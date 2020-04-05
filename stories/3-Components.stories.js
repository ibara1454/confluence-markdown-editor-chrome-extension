import VMarkdownEditor from '@/components/MarkdownEditor.vue';
import VDialog from '@/components/Dialog.vue';
import VButton from '@/basics/VButton.vue';

export default {
  title: 'Components',
};

export const MarkdownEditor = () => ({
  data() {
    return {
      text: '# Try & write Markdown!\n\nList\n - [ ] 1\n - [ ] 2\n - 3'
    };
  },

  components: { VMarkdownEditor },

  template: `<div>
    <h2>For performance, the markdown viewer on the right hand side will have a short delay.</h2>
    <v-markdown-editor v-model="text" style="height: 500px;"/>
    <p>data: {{ text }}</p>
  </div>`,
});

export const Dialog = () => ({
  components: { VDialog, VButton },

  data() {
    return { dialog: false };
  },

  template: `
    <div>
      <v-button @click="dialog = true">OPEN</v-button>
      <v-dialog v-model="dialog">
        <div :style="{
          width: '230px',
          height: '150px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '10px 20px',
        }">
          <h1 style="font-size: 1.5rem; margin: 0; font-weight: normal;">Confirm</h1>
          <p>Open Markdown editor?</p>
          <div :style="{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }">
            <v-button @click="dialog = false" style="margin: 8px;">Cancel</v-button>
            <v-button @click="dialog = false" style="margin: 8px;">OK</v-button>
          </div>
        </div>
      </v-dialog>
    </div>
  `,
});
