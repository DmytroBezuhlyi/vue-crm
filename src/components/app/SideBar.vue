<template>
  <ul
      class="sidenav app-sidenav"
      :class="{open: value}"
  >
    <router-link
        tag="li"
        active-class="active"
        v-for="link in links"
        :key="link.url"
        :to="link.url"
        :exact="link.exact"
    >
      <a href="#" class="waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "SideBar",
  props: ['value'],
  data: () => ({
    links: [
      {title: 'Invoice', url: '/', exact: true},
      {title: 'History', url: '/history'},
      {title: 'Planning', url: '/planning'},
      {title: 'New Record', url: '/record'},
      {title: 'Categories', url: '/categories'},
    ],
  })
}
</script>

<style scoped>

</style>