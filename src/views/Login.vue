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
      </div>
      <div class="card-action">
        <div>
          <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
          >
            Sign In
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Don't have an account?
          <router-link to="/register">Registration</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import {required, email, minLength} from 'vuelidate/lib/validators';
import messages from "@/utils/messages";

export default {
  name: "Login",
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(8)}
  },
  methods: {
    async onsubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData);
        await this.$router.push('/');
      } catch (err) {}
    }
  },
  mounted() {
    const queryMessage = messages[this.$route.query.message];

    if (queryMessage) {
      this.$message(queryMessage);
    }
  }
}
</script>

<style scoped>

</style>