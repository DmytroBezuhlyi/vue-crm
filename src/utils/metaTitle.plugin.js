import localizationFilter from "@/filters/localization.filter";

export default {
  install(Vue) {
    Vue.prototype.$title = function (title) {
      const appName = process.env.VUE_APP_TITLE;
      return `${localizationFilter(title)} | ${appName}`;
    }
  }
}