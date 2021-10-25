<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Planning' | locale }}</h3>
      <h4>{{ info.bill | currency }}</h4>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">There is no categories yet.
      <router-link to="/categories">Add new one category</router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spent | currency }} from {{ cat.limit }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="cat.percentColor"
              :style="{width: `${cat.percentProgress}%`}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import currencyFilter from "@/filters/currency.filter";

export default {
  name: "Planning",
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories');
    const records = await this.$store.dispatch('fetchRecords');

    this.categories = categories.map(cat => {
      const spent = records
          .filter(rec => rec.categoryID === cat.id)
          .filter(rec => rec.type === 'outcome')
          .reduce((total, rec) => total + rec.amount, 0);

      const percent = spent * 100 / cat.limit;

      const percentProgress = percent > 100 ? 100 : percent;

      const percentColor = percentProgress < 60
          ? 'green'
          : percentProgress < 100
              ? 'orange'
              : 'red';

      const tooltipValue = cat.limit - spent;
      const tooltip = `${tooltipValue > 0 ? 'Left' : 'Excess by'} ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        spent,
        percentProgress,
        percentColor,
        tooltip
      };
    });

    this.loading = false;
  },
}
</script>

<style scoped>

</style>