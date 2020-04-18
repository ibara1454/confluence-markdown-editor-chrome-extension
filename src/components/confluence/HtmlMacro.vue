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
    return { slot: '' };
  },

  methods: {
    renderString(vnodes: VNode[] | undefined): string {
      const vm = new Vue({
        render(h) {
          return h('div', vnodes);
        },
      });
      //
      vm.$mount();
      // const s = new XMLSerializer();
      // const str = Array.from(vm.$el.childNodes)
      //   .map((node) => s.serializeToString(node))
      //   .join('');
      // console.log(str);
      const str = vm.$el.innerHTML;
      // https://developer.mozilla.org/ja/docs/Web/API/Node/textContent
      return str;
    },
  },

  created() {
    // eslint-disable-next-line dot-notation
    this.slot = this.renderString(this.$slots['default']);
  },

  beforeUpdate() {
    // eslint-disable-next-line dot-notation
    this.slot = this.renderString(this.$slots['default']);
  },
});


</script>
