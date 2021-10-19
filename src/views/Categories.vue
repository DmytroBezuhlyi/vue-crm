<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate
            @created="addNewCat"
        />

        <CategoryEdit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updateCategories"
        />
        <p v-else class="center">There is no category yet</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

export default {
  name: "Categories",
  components: {CategoryEdit, CategoryCreate},
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    addNewCat(category) {
      this.categories.push(category);
      console.log(this.categories)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
}
</script>

<style scoped>

</style>