<template>
  <!-- eslint-disable max-len -->
  <table
    class="wysiwyg-macro"
    data-macro-name="html"
    data-macro-schema-version="1"
    style="background-image: url(/plugins/servlet/confluence/placeholder/macro-heading?definition=e2h0bWx9&amp;locale=ja_JP&amp;version=2); background-repeat: no-repeat;"
    data-macro-body-type="PLAIN_TEXT"
    data-mce-selected="1"
  >
  <!-- eslint-enable max-len -->
    <tbody>
      <tr>
        <td class="wysiwyg-macro-body">
          <pre v-text="slot"></pre>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';

/**
 * The Raw HTML macro of confluence.
 * @displayName HtmlMacro
 */
export default Vue.extend({
  name: 'HtmlMacro',

  data() {
    // The raw text of default slot
    return { slot: '' };
  },

  methods: {
    /**
     * Render the given vnodes into strings instead of DOMs.
     */
    renderString(vnodes: VNode[] | undefined): string {
      // The easiest way to get the rendered vnodes is getting them from `vm.$el.innerHTML`
      // You can do it by other ways
      const vm = new Vue({
        render: (h) => h('div', vnodes),
      });
      // Render off-document
      // See https://vuejs.org/v2/api/index.html#vm-mount
      vm.$mount();
      // Get the raw DOM text rendered by vue
      const rawDomText = vm.$el.innerHTML;
      // Clean vm after used
      vm.$destroy();
      return rawDomText;
    },
  },

  created() {
    // Get the raw text of default slot but not the DOM elements
    // eslint-disable-next-line dot-notation
    this.slot = this.renderString(this.$slots['default']);
  },

  beforeUpdate() {
    // Get the raw text of default slot but not the DOM elements
    // eslint-disable-next-line dot-notation
    this.slot = this.renderString(this.$slots['default']);
  },
});


</script>
