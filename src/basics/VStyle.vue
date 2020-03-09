<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'VStyle',

  render(createElement) {
    return createElement('style', this.$slots.default);
  },
});
</script>
