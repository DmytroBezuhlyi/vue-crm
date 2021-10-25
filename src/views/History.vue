<template>
  <div>
    <div class="page-title">
      <h3>{{ 'History' | locale }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">There is no record yet.
      <router-link to="/record">Add new one record</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items"/>

      <Pagination
          v-model="page"
          :pageCount="pageCount"
          :clickHandler="paginationClickHandler"
          :prevText="prev"
          :nextText="next"
          :containerClass="'pagination'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import pagination from "@/mixins/pagination.mixin";
import {Pie} from "vue-chartjs"
import localeFilter from "@/filters/localization.filter";

export default {
  name: "History",
  components: {HistoryTable},
  mixins: [pagination, Pie],
  metaInfo() {
    return {
      title: this.$title('History'),
    }
  },
  data: () => ({
    loading: true,
    records: [],
    prev: '',
    next: ''
  }),
  methods: {
    setup(categories) {
      this.paginationSetup(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(cat => cat.id === record.categoryID).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Outcome',
        };
      }));

      this.prev = localeFilter('Previous');
      this.next = localeFilter('Next');
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setup(categories);

    this.renderChart({
      labels: categories.map(cat => cat.title),
      datasets: [{
        label: 'Outcomes by Category',
        data: categories.map(cat => {
          return this.records.reduce((t, rec) => {
            if (rec.categoryID === cat.id && rec.type === 'outcome') {
              t += +rec.amount;
            }
            return t;
          }, 0);
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }, {responsive: true,});

    this.loading = false;
  },
}
</script>

<style scoped>

</style>