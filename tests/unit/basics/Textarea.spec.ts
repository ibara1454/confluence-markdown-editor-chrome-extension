import { shallowMount } from '@vue/test-utils';
import expect from 'expect';
import VTextarea from '@/basics/VTextarea.vue';

describe('VTextarea', () => {
  it('Rendered with given input', () => {
    const wrapper = shallowMount(VTextarea, {
      propsData: {
        value: '# Dummy text',
      },
    });
    const inputField = wrapper.find('textarea').element as HTMLInputElement;
    expect(inputField.value).toBe('# Dummy text');
  });

  it('Input event triggered on user input', () => {
    const wrapper = shallowMount(VTextarea);
    wrapper.find('textarea').setValue('# Dummy text');
    const inputField = wrapper.find('textarea').element as HTMLInputElement;
    expect(inputField.value).toBe('# Dummy text');
    expect(wrapper.emitted().input[0]).toStrictEqual(['# Dummy text']);
  });
});
