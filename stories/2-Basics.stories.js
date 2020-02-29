export default {
  title: 'Basics',
};

export const Textarea = () => ({
  data: () => ({ text: 'sample text' }),
  template: `<div>
      <p>Data: {{ text }}</p>
      <v-textarea v-model="text" />
    </div>`,
});
