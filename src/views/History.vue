<template>
  <div>
    <div class="page-title">
      <h3>Record History</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
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
          :prevText="'Previous'"
          :nextText="'Next'"
          :containerClass="'pagination'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import pagination from "@/mixins/pagination.mixin"

export default {
  name: "History",
  components: {HistoryTable},
  mixins: [pagination],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.paginationSetup(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(cat => cat.id === record.categoryID).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome',
      };
    }));

    this.loading = false;
  },
}
</script>

<style scoped>

</style>