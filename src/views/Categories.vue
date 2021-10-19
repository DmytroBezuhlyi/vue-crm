<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate
            @created="addNewCat"
        />

        <CategoryEdit/>
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
  }),
  methods: {
    addNewCat(category) {
      this.categories.push(category);
      console.log(this.categories)
    },
  },
}
</script>

<style scoped>

</style>