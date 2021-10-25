<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Profile' | locale }}</h3>
    </div>

    <form class="form" @submit.prevent="onsubmit">
      <div class="input-field">
        <input
            id="description"
            type="text"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
            v-model="name"
        >
        <label for="description">{{ 'Name' | locale }}</label>
        <span
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
        >
          {{ 'Name' | locale }}
        </span>
      </div>

      <div class="switch">
        <label>
          Русский
          <input
              type="checkbox"
              v-model="locale">
          <span class="lever"></span>
          English
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' | locale }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";
import localizationFilter from "@/filters/localization.filter";

export default {
  name: "Profile",
  metaInfo() {
    return {
      title: this.$title('Profile'),
    }
  },
  data: () => ({
    name: '',
    locale: '',
  }),
  validations: {
    name: {required},
  },
  methods: {
    ...mapActions(['updateInfo']),
    async onsubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        this.$error(localizationFilter('The Name is Required!'));
        return;
      }

      await this.updateInfo({
        name: this.name,
        locale: this.locale ? 'en-US' : 'ru-RU',
      })
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    this.name = this.info.name;
    this.locale = this.info.locale === 'en-US';
    setTimeout(M.updateTextFields);
  },
}
</script>

<style scoped>
.switch {
  margin-bottom: 1.5rem;
}
</style>