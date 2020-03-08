import VTextarea from '@/basics/VTextarea.vue';

export default {
  title: 'Basics',
};

export const Textarea = () => ({
  components: { VTextarea },
  data: () => ({ text: 'sample text' }),
  template: `<div>
      <p>Data: {{ text }}</p>
      <v-textarea v-model="text" />
    </div>`,
});
