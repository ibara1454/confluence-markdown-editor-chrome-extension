import { shallowMount } from '@vue/test-utils';
import expect from 'expect';
import Context from '@/components/Context.vue';
import Vue from 'vue';

describe('Context (intergration test)', () => {
  it('contains an iframe', () => {
    const wrapper = shallowMount(Context);
    expect(wrapper.contains('iframe')).toBeTruthy();
  });

  it('renders given slots inside iframe', async () => {
    const actual = '<div class="stubbed"></div>';
    // To enable the resource loading, we should set `attachToDocument: true`
    // https://github.com/vuejs/vue-test-utils/issues/230#issuecomment-350457377
    const wrapper = shallowMount(Context, {
      attachToDocument: true,
      slots: {
        default: actual,
      },
    });
    await Vue.nextTick();
    const iframe = wrapper.find('iframe').element as HTMLIFrameElement;
    // The inner content will wrapped with a top level div
    expect(iframe.contentDocument?.body.innerHTML).toBe(`<div>${actual}</div>`);
    // Finished with 'loaded' event
    expect(wrapper.emitted().loaded).toBeTruthy();
  });
});
