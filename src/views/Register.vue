<template>
  <div>
    <form class="card auth-card" @submit.prevent="onsubmit">
      <div class="card-content">
        <span class="card-title">Home Bookkeeping</span>
        <div class="input-field">
          <input
              id="email"
              type="text"
              v-model.trim="email"
              :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          >
          <label for="email">Email</label>
          <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Email is required</small>
          <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">Email is invalid</small>
        </div>
        <div class="input-field">
          <input
              id="password"
              type="password"
              v-model.trim="password"
              :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          >
          <label for="password">Password</label>
          <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Password is
            required</small>
          <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.minLength">Password should be at
            least {{ this.$v.password.$params.minLength.min }} symbols. Now is {{ password.length }}</small>
        </div>
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="name"
              :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
          >
          <label for="name">Name</label>
          <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Name is required</small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree"/>
            <span>Agree with Terms</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
          >
            Sign Up
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Have an account?
          <router-link to="/login">Sign In!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(8)},
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    async onsubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('registration', formData);
        await this.$router.push('/');
      } catch (err) {}
    }
  }
}
</script>

<style scoped>

</style>