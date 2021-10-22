<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <NavBar @click="isOpen = !isOpen"/>

      <SideBar v-model="isOpen"/>

      <main
          class="app-content"
          :class="{full: !isOpen}"
      >
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Add New Record'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/app/NavBar";
import SideBar from "@/components/app/SideBar";
import messages from "@/utils/messages";

export default {
  components: {SideBar, NavBar},
  data: () => ({
    isOpen: true,
    loading: true
  }),
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
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }

    this.loading = false;
  },
}
</script>