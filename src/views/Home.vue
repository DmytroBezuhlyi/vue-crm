<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Home' | locale }}</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div class="row" v-else>
      <HomeBill
          :rates="currency.rates"
      />

      <HomeCurrency
          :rates="currency.rates"
          :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";

export default {
  name: 'Home',
  components: {HomeCurrency, HomeBill},
  data() {
    return {
      loading: true,
      currency: null,
    }
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      setTimeout(() => {
        this.loading = false;
      }, 1000)
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  }
}
</script>
