import expect from 'expect';
import Vue from 'vue';
import VScript from '@/basics/VScript.vue';

// The usage of Vue.$createElement
// See https://github.com/vuejs/vue/blob/52719ccab8fccffbdf497b96d3731dc86f04c1ce/test/unit/modules/vdom/create-element.spec.js
describe('VScript', () => {
  it('render basic script tag with inner text', () => {
    const vue = new Vue({
      render: (h) => h(VScript, ['inner text']),
    });
    vue.$mount();
    expect(vue.$el.outerHTML).toEqual('<script>inner text</script>');
  });

  it('render async script tag with inner text', () => {
    // attrs: { async: true } will let vue renders async="async"
    // And there is no way to just render 'async'.
    // FYI: https://github.com/vuejs/vue/blob/52719ccab8fccffbdf497b96d3731dc86f04c1ce/test/unit/modules/vdom/modules/attrs.spec.js
    const vue = new Vue({
      render: (h) => h(VScript, { attrs: { async: true } }, ['inner text']),
    });
    vue.$mount();
    expect(vue.$el.outerHTML).toEqual('<script async="async">inner text</script>');
  });

  it('render defer script tag with inner text', () => {
    const vue = new Vue({
      render: (h) => h(VScript, { attrs: { defer: true } }, ['inner text']),
    });
    vue.$mount();
    expect(vue.$el.outerHTML).toEqual('<script defer="defer">inner text</script>');
  });

  it('render script tag with src', () => {
    const vue = new Vue({
      render: (h) => h(VScript, { attrs: { src: 'http://dummy.link' } }),
    });
    vue.$mount();
    expect(vue.$el.outerHTML).toEqual('<script src="http://dummy.link"></script>');
  });
});
