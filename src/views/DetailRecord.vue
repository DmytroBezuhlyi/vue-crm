<template>
  <div>
    <Loader v-if="loading"/>

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Income' : 'Outcome' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
              class="card"
              :class="{'red': record.type === 'outcome',
                       'green': record.type === 'income'}"
          >
            <div class="card-content white-text">
              <p>Description: {{ record.description }}</p>
              <p>Sum: {{ record.amount }}</p>
              <p>Category: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>The records with id=<strong>{{ $route.params.id }}</strong> wasn't found</p>
  </div>
</template>

<script>
export default {
  name: "DetailRecord",
  metaInfo() {
    return {
      title: this.$title('Record Details'),
    }
  },
  data: () => ({
    loading: true,
    record: null,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordByID', id);
    const category = await this.$store.dispatch('fetchCategoryByID', record.categoryID);

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  }
}
</script>

<style scoped>

</style>