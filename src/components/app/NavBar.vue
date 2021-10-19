<template>
  <nav class="navbar orange lighten-1 open">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a
            href="#"
            @click="$emit('click')"
        >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              @click.prevent
              ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <a href="#" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    date: new Date(),
    dropdown: '',
    dateInterval: ''
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    },
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown);
    this.dateInterval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.dateInterval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  }
}
</script>

<style scoped>

</style>