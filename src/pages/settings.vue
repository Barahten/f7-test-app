<template>
  <f7-page>
    <f7-navbar :title="$t('page.settings.title')" back-link></f7-navbar>
    <f7-list>
      <f7-list-item>
        <span>{{$t('page.settings.form.dark')}}</span>
        <f7-toggle class="toggle dark" @toggle:change="changeTheme" v-model:checked="checked"></f7-toggle>
      </f7-list-item>
    </f7-list>
    <f7-list virtual-list>
      <f7-list-item @click.prevent="popupOpened = true" :title="$t('page.settings.form.font')" link="#" :after="fontsize + 'px'"></f7-list-item>
    </f7-list>

    <f7-popup class="popup-font" :opened="popupOpened" @popup:closed="popupOpened = false">
      <f7-page>
        <f7-navbar>
          <f7-nav-title>{{ $t('fontsize.title') }}</f7-nav-title>
          <f7-nav-right>
            <f7-link popup-close>
              <f7-icon ios="f7:multiply" aurora="f7:multiply" md="f7:multiply"></f7-icon>
            </f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-list simple-list>
          <f7-list-item>
            <f7-list-item-cell class="width-auto flex-shrink-0">
              <f7-icon ios="f7:minus_circle" aurora="f7:minus_circle" md="material:remove_circle_outline"></f7-icon>
            </f7-list-item-cell>
            <f7-list-item-cell class="flex-shrink-3">
              <f7-range :min="14" :max="20" :step="2" v-model:value="fontsize" :label="true" color="orange" @range:change="changeSize"></f7-range>
            </f7-list-item-cell>
            <f7-list-item-cell class="width-auto flex-shrink-0">
              <f7-icon ios="f7:plus_circle" aurora="f7:plus_circle" md="material:add_circle_outline"></f7-icon>
            </f7-list-item-cell>
          </f7-list-item>
        </f7-list>

        <!-- example text for testing size font -->
        <f7-block-title>{{ $t('fontsize.preview') }}</f7-block-title>
        <f7-card :content="$t('fontsize.example')"></f7-card>

      </f7-page>
    </f7-popup>

  </f7-page>


</template>

<script>
import Dom7 from 'dom7';
export default {
  data() {
    return {
      popupOpened: false,
      checked: !!(localStorage.theme && localStorage.theme === 'dark')
    };
  },
  methods: {
    changeSize(fontsize) {
      Dom7('body').attr('style', 'font-size:' + fontsize + 'px')
      localStorage.fontsize = fontsize
      this.$store.commit('fontsize', fontsize)
    }

  },
  computed: {
    changeTheme() {
      if(this.checked) {
        Dom7("html").addClass("dark")
        localStorage.theme = 'dark'
      } else {
        Dom7("html").removeClass("dark");
        localStorage.removeItem('theme')
      }

    },
    fontsize() {
      return this.$store.getters.fontsize;
    },
  },
  mounted() {
    console.log('FROM STORE', this.$store.getters.count)
  }
}
</script>