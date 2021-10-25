<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | locale }}</h4>
      </div>

      <form @submit.prevent="onsubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
            >
              {{ c.title }}
            </option>
          </select>
          <label>{{ 'Select Category' | locale }}</label>
        </div>

        <div class="input-field">
          <input
              id="title"
              type="text"
              v-model="$v.title.$model"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="title">{{ 'Title' | locale }}</label>
          <span
              class="helper-text invalid"
              v-if="$v.title.$dirty && !$v.title.required"
          >
            {{ 'Enter the category title' | locale }}
          </span>
        </div>

        <div class="input-field">
          <input
              id="min-limit"
              type="number"
              v-model.number="$v.limit.$model"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="min-limit">{{ 'Limit' | locale }}</label>
          <span
              class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            {{ 'Minimal value is' | locale }} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Update' | locale }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
  name: "CategoryEdit",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null,
  }),
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)},
  },
  methods: {
    async onsubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit,
      };

      try {
        await this.$store.dispatch('updateCategory', categoryData);

        this.$message('Category was successfully updated');
        this.$emit('updated', categoryData)
      } catch (err) {

      }
    },
  },
  watch: {
    current(catID) {
      const {title, limit} = this.categories.find(c => c.id === catID);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    const {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy;
    }
  }
}
</script>

<style scoped>

</style>