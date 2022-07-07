<template>
  <f7-list class="lang-switcher">
    <f7-list-item @change="changeLang('ru')" radio name="demo-radio" class="c-icon-lng ru-radio" :checked="currentLanguage === 'ru'"
    ></f7-list-item>
    <f7-list-item @change="changeLang('en')" radio name="demo-radio" class="c-icon-lng en-radio" :checked="currentLanguage === 'en'"
    ></f7-list-item>
  </f7-list>
</template>

<script>
import cordovaApp from "../js/cordova";

export default {
  name: "lang-switcher",
  methods : {
    changeLang(lang) {
      this.$i18n.locale = lang;
      localStorage.lang = lang;
    },
  },
  computed: {
    currentLanguage() {
      return this.$i18n.locale;
    }
  },
}
</script>
