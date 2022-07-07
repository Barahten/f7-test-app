<template>
  <f7-page>
    <f7-navbar back-link></f7-navbar>
    <f7-block-title medium v-if="article.title">{{article.title}}</f7-block-title>
    <f7-block-title v-if="article.header">{{ article.header }}</f7-block-title>
    <div class="img" v-if="article.imageSrc && article.imageSrc.src">
      <img v-if="article.imageSrc.src" :src="article.imageSrc.src" alt="" />
    </div>
    <f7-block v-if="article.text" v-html="article.text"></f7-block>
    <accordion-list v-if="article.children" :articles="article.children"></accordion-list>
    <gallery v-if="article.img" :article="article"></gallery>
    <link-list v-if="article.links" :articles="article.links"></link-list>
    <f7-block>
      <f7-link class="c-icon external" v-if="article.source" target="_system" external :href="article.source">
        {{$t('source')}}
      </f7-link>
    </f7-block>
    <f7-toolbar v-if="article.audioSrc" top>
      <audio-player :link="article.audioSrc"></audio-player>
    </f7-toolbar>
  </f7-page>
</template>

<script>
import AccordionList from "../components/accordion-list.vue"
import Gallery from "../components/gallery.vue"
import LinkList from "../components/link-list.vue"
import AudioPlayer from "../components/audio-player.vue"

export default {
  name: "Articles",
  components: {AccordionList, Gallery, LinkList, AudioPlayer},
  props: {
    uniqid: String
  },
  data() {
    return {

    }
  },
  computed: {
    article() {
      return  this.$store.getters.CURRENT_ARTICLE
    }
  },
  created() {
    this.$store.commit('CURRENT_ARTICLE', this.uniqid)
  },
  mounted() {
    console.log()

  }

}
</script>

<style scoped>

</style>