<template>
  <f7-card style="border-radius:0;margin-left:0;margin-right:0;padding:0;">
    <f7-swiper pagination navigation :params="swiperParams" :class="article.uniqid + '-swiper'">
      <f7-swiper-slide class="gallery-swiper"
                       v-for="(slide, index) in article.img"
                       :key="index">
        <div class="img">
          <img :src="slide.src" alt="">
        </div>
        <accordion-list v-if="slide.children" :articles="slide.children"></accordion-list>
        <p v-html="slide.desc" class="text padding-horizontal"></p>
        <f7-list>
          <f7-list-item
              v-for="(linkedArticle, index) in slide.links"
              :key="index"
              v-if="!linkedArticle.hidden"
          >
            <f7-link v-if="linkedArticle.classes"
                     :class="linkedArticle.classes"
            >
              {{ linkedArticle.title }}
            </f7-link>
            <f7-link v-else-if="linkedArticle.type === 'swiper'"
                     @click="swipeToSlide(linkedArticle)"
            >
              {{ linkedArticle.title }}
            </f7-link>
            <f7-link v-else
                     @click="goToArticlePage(linkedArticle)"
            >
              {{ linkedArticle.title }}
            </f7-link>
          </f7-list-item>
        </f7-list>
        <!--                <link-list v-if="item.links" :articles="item.links"></link-list>-->
      </f7-swiper-slide>
    </f7-swiper>
  </f7-card>
</template>

<script>
export default {
  name: "gallery",
  props: {
    articles: Object
  },
  beforeCreate() {
    this.$options.components.AccordionList = import("./accordion-list.vue").default;
  }
}
</script>

<style scoped>

</style>