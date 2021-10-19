<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="onsubmit">
        <div class="input-field">
          <input
              id="title"
              type="text"
              v-model="$v.title.$model"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="title">Title</label>
          <span
              class="helper-text invalid"
              v-if="$v.title.$dirty && !$v.title.required"
          >
            Enter the category title
          </span>
        </div>

        <div class="input-field">
          <input
              id="min-limit"
              type="number"
              v-model.number="$v.limit.$model"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="min-limit">Limit</label>
          <span
              class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Minimal value is {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button
            class="btn waves-effect waves-light"
            type="submit"
        >
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from "vuelidate/lib/validators";

export default {
  name: "CategoryCreate",
  data: () => ({
    title: '',
    limit: 100,
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)},
  },
  methods: {
    async onsubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        });

        this.title = '';
        this.limit = 100;
        this.$v.$reset();

        this.$emit('created', category);

        this.$message('Category was created');
      } catch (err) {}
    }
  },
  mounted() {
    M.updateTextFields();
  },
}
</script>

<style scoped>

</style>