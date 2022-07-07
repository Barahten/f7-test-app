<template>
  <f7-page name="what-to-do">
    <f7-navbar back-link>
      <f7-nav-title>{{ $t('what_to_do') }}</f7-nav-title>
<!--      <searchbar :classname="'searchbar-page'"></searchbar>-->
    </f7-navbar>

    <link-list class="searchbar-hide-on-search" :articles="articles"></link-list>
<!--    <search-list></search-list>-->
  </f7-page>
</template>

<script>
import LinkList from "../components/link-list.vue"
export default {
  name: "what-to-do",
  components: {LinkList},
  computed: {
    articles() {
      return this.$store.getters.WHAT_TO_DO_ARTICLES;
    },
  },
  created() {
    //this.$store.commit("CURRENT_WHAT_TO_DO_ARTICLES", "what-to-do");
  },
}
</script>

<style scoped>

</style>