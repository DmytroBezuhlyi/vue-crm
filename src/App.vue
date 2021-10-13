<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import materialize from 'materialize-css';
import EmptyLayout from '@/layouts/EmptyLayout';
import MainLayout from '@/layouts/MainLayout';

export default {
  components: {
    EmptyLayout, MainLayout
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'empty'}-layout`
    }
  },
  mounted() {
    materialize.AutoInit();
  }
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
