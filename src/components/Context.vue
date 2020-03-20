<template>
  <iframe @load="renderChildren"></iframe>
</template>

<script>
import Vue from 'vue';

/**
 * Build an isolated context witch is differenct to current document.
 *
 * This component is a wrapper of `iframe`.
 * https://forum.vuejs.org/t/render-inside-iframe/6419
 */
export default {
  name: 'Context',

  beforeUpdate() {
    // freezing to prevent unnecessary Reactifiation of vNodes
    this.iApp.children = Object.freeze(this.$slots.default);
  },

  methods: {
    renderChildren() {
      const children = this.$slots.default;
      const body = this.$el.contentDocument.body;
      // Set body style
      body.style.margin = '0';
      body.style.height = '100%';
      const el = document.createElement('div'); // we will mount or nested app to this element
      body.appendChild(el);

      const iApp = new Vue({
        name: 'iApp',
        data: { children: Object.freeze(children) },
        render(h) {
          return h('div', this.children);
        },
      });
      iApp.$mount(el); // mount into iframe
      this.iApp = iApp; // cache instance for later updates
      this.$emit('loaded');
    },
  },
};
</script>

<style>

</style>
