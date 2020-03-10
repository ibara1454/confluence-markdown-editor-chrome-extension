<script lang="ts">
import Vue from 'vue';

/**
 * Same as native style tags.
 * This class is one of the workarounds for that you can't use native style
 * tags in template. To provide the same effect as native script,
 * you could use style via components.
 * @displayName VStyle
 */
export default Vue.extend({
  name: 'VStyle',

  render(createElement) {
    return createElement('style', this.$slots.default);
  },
});
</script>
