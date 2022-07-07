<template>
  <div class="searchbar-hide-on-search">
    <f7-list simple-list>
      <!-- <f7-block-title>{{article.page}}</f7-block-title> -->
      <f7-list-item v-for="(article, index) in articles" :key="index">
        <f7-link v-if="article.classes" :class="article.classes">
          {{ article.title }}
        </f7-link>
        <f7-link v-else-if="article.type === 'swiper'" @click="$f7.swiper.get('.' + article.uniqid + '-swiper').slideTo(article.swiperIndex)">
          {{ article.title }}
        </f7-link>
        <f7-link v-else @click="goToArticlePage(article)">
          {{ article.title }}
        </f7-link>
      </f7-list-item>
    </f7-list>
  </div>
</template>

<script>
import {f7} from "framework7-vue";

export default {
  name: "actual-articles",
  props: {
    articles: Object
  },
  methods : {
    goToArticlePage(article) {
      if (article.type === 'page') {
        f7.views.main.router.navigate('/' + article.uniqid + '/')
      } else {
        f7.views.main.router.navigate('/article-page/' + article.uniqid, {props: {'uniqid': article.uniqid}})
      }
    }
  },

}
</script>

<style scoped>

</style>