<script lang="ts">
import Vue from 'vue';

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
