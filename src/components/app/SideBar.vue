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
import localeFilter from "@/filters/localization.filter";

export default {
  name: "SideBar",
  props: ['value'],
  data: () => ({
    links: [
      {title: localeFilter('Home'), url: '/', exact: true},
      {title: localeFilter('History'), url: '/history'},
      {title: localeFilter('Planning'), url: '/planning'},
      {title: localeFilter('New Record'), url: '/record'},
      {title: localeFilter('Categories'), url: '/categories'},
    ],
  })
}
</script>

<style scoped>

</style>