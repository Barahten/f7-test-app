<template>
  <vue-plyr style="width:100%" :options="playerOptions">
    <audio crossorigin playsinline>
      <source :src="link" type="audio/mp3">
    </audio>
  </vue-plyr>
</template>

<script>

export default {
  name: "audio-player",
  data () {
    return {
      playerOptions: {
        controls: [
          'play',
          'current-time',
          'progress',
          'mute'
        ]
      }
    }
  },
  props: ['link']
}
</script>

<style scoped>

</style>