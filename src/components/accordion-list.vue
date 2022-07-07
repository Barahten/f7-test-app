<template>
  <f7-list accordion-list>
    <f7-list-item
        accordion-item
        v-for="(article, index) in articles"
        :title="article.title"
        :key="index"
        :accordion-item-opened="article.opened"
    >
      <f7-accordion-content>
        <accordion-list v-if="article.children" :articles="article.children"></accordion-list>
        <div v-else>
          <f7-block-title v-if="article.header">{{ article.header }}</f7-block-title>
          <div class="img" v-if="article.imageSrc && article.imageSrc.src">
            <img v-if="article.imageSrc.src" :src="article.imageSrc.src" alt="">
          </div>
          <f7-block v-if="article.text && article.text !== ''" v-html="article.text" class="padding-vertical"></f7-block>
          <gallery v-if="article.img" :article="article"></gallery>
          <div
              v-if="article.video"
              v-for="(video, index) in article.video"
              :key="index"
          >
            <div v-if="video.src" style="width: 100%">
              <video-player :options="{
							controls: true,
							fluid: true,
							aspectRatio: '16:9',
							sources: [
								{
									src: video.src,
									type: 'video/mp4'
								}
							]
						}"/>
            </div>
          </div>
          <div
              v-if="article.audio"
              v-for="(audio, index) in article.audio"
              :key="index"
          >
            <f7-toolbar v-if="audio.src" top>
              <audio-player :link="audio.src"></audio-player>
            </f7-toolbar>
          </div>
          <f7-list v-if="article.document">
            <f7-list-item
                v-for="(doc, index) in article.document"
                :key="index"
            >
              <f7-link @click="openDoc(doc.src)">
                {{doc.src.slice(doc.src.lastIndexOf('/') + 1)}}
              </f7-link>
            </f7-list-item>
          </f7-list>
          <link-list v-if="article.links" :articles="article.links"></link-list>
        </div>
      </f7-accordion-content>
    </f7-list-item>
  </f7-list>
</template>

<script>
import AudioPlayer from "./audio-player.vue"
import LinkList from "./link-list.vue"
import Gallery from "./gallery.vue"
export default {
  name: "accordion-list",
  props: {
    articles: Object
  },
  components: {AudioPlayer, LinkList, Gallery}
}
</script>
