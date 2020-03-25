<template>
  <div>
    <h1>{{ text }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data() {
    return {
      text: 'Hello World',
    };
  },
});
</script>
