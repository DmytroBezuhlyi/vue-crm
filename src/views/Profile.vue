<template>
  <div>
    <div class="page-title">
      <h3>Profile</h3>
    </div>

    <form class="form" @submit.prevent="onsubmit">
      <div class="input-field">
        <input
            id="description"
            type="text"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
            v-model="name"
        >
        <label for="description">Name</label>
        <span
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
        >
          Name
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

export default {
  name: "Profile",
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
        this.$error('The Name is Required!')
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