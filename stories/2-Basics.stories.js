import VTextarea from '@/basics/VTextarea.vue';
import VButton from '@/basics/VButton.vue';
import { action } from '@storybook/addon-actions';

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

export const Button = () => ({
  components: { VButton },

  template: `<v-button @click="action">Click</v-button>`,

  methods: { action: action('clicked') },
})
