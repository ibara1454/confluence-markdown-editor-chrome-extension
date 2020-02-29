import VMarkdownEditor from '@/components/MarkdownEditor.vue';

export default {
  title: 'Markdown',
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
