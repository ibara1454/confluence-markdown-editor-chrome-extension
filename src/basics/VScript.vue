<script lang="ts">
import Vue from 'vue';

/**
 * Same as native script tags.
 * This class is one of the workarounds for that you can't use native script
 * tags in template.
 * You can use this component to add a import of a third-part library or
 * a run short script - just like native `script` tag.
 * @displayName VScript
 */
export default Vue.extend({
  name: 'VScript',

  functional: true,

  render(h, ctx) {
    return h(
      'script',
      ctx.data,
      ctx.children,
    );
  },
});
</script>
