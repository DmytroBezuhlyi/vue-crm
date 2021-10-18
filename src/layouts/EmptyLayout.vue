<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  computed: {
    error() {
      return this.$store.getters.getError;
    }
  },
  watch: {
    error(err) {
      this.$error(messages[err.code] || 'Something goes wrong...');
    }
  },
}
</script>