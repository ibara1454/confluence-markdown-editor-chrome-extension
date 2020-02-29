<template>
  <div v-html="text"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HtmlPreview',

  props: {
    text: { type: String, required: false, default: '' },
  },
});
</script>
