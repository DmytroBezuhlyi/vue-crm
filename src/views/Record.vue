<template>
  <div>
    <div class="page-title">
      <h3>{{ 'New Record' | locale }}</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">There is no categories yet.
      <router-link to="/categories">Add new one category</router-link>
    </p>

    <form
        class="form"
        v-else
        @submit.prevent="onsubmit"
    >
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
          >
            {{ c.title }}
          </option>
        </select>
        <label>{{ 'Select Category' | locale }}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{ 'Income' | locale }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{ 'Outcome' | locale }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="$v.amount.$model"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">{{ 'Sum' | locale }}</label>
        <span
            class="helper-text invalid"
            v-if="$v.amount.$dirty && !$v.amount.minValue"
        >
          {{ 'Amount' | locale }}
        </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="$v.description.$model"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{ 'Description' | locale }}</label>
        <span
            class="helper-text invalid"
            v-if="$v.description.$dirty && !$v.description.required"
        >
          {{ 'Description' | locale }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | locale }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";
import localizationFilter from "@/filters/localization.filter";

export default {
  name: "Record",
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),
  validations: {
    amount: {minValue: minValue(1)},
    description: {required},
  },
  methods: {
    async onsubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        await this.$store.dispatch('createRecord', {
          categoryID: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON(),
        });

        const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;

        await this.$store.dispatch('updateInfo', {bill});

        this.$message('Record was successfully created');
        this.$v.$reset();
        this.amount = 1;
        this.description = '';
      } else {
        this.$message(`${localizationFilter('Not enough money on your account')} ${this.amount - this.info.bill}`);
      }
    },
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0)
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>

<style scoped>

</style>