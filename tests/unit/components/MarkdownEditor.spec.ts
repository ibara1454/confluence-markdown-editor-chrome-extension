import { shallowMount, createLocalVue } from '@vue/test-utils';
import expect from 'expect';
import MarkdownEditor from '@/components/MarkdownEditor.vue';

// Register v-textarea for testing
const localVue = createLocalVue();

describe('MarkdownEditor', () => {
  it('has a input panel', () => {
    const wrapper = shallowMount(MarkdownEditor, {
      localVue,
    });
    expect(wrapper.contains('.input')).toBeTruthy();
  });

  it('has a preview panel', () => {
    const wrapper = shallowMount(MarkdownEditor, {
      localVue,
    });
    expect(wrapper.contains('.preview')).toBeTruthy();
  });

  it('rendered with given markdown input `#`', () => {
    const wrapper = shallowMount(MarkdownEditor, {
      propsData: { value: '# Dummy text' },
      localVue,
    });
    expect(wrapper.vm.$data.dataMarkdown).toBe('<h1 id="dummy-text">Dummy text</h1>\n');
  });
});
