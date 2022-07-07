<template>
  <f7-app v-bind="f7params" >

  <!-- Left panel with cover effect when hidden -->
  <f7-panel left cover :visible-breakpoint="960" swipe>
    <f7-view>
      <f7-page>
        <lang-switcher />
        <f7-list simple-list>
          <f7-list-item>
            <f7-link panel-close="left" href="/personal-area/">{{ this.$t('menu.test_results') }}</f7-link>
          </f7-list-item>
          <f7-list-item>
            <f7-link panel-close="left" href="/subscribe/">{{ this.$t('menu.notifications') }}</f7-link>
          </f7-list-item>
          <f7-list-item>
            <f7-link panel-close="left" href="/settings/" view=".view-main">{{ this.$t('menu.settings') }}</f7-link>
          </f7-list-item>
          <f7-list-item>
            <f7-link panel-close="left" href="/contacts/">{{ this.$t('menu.contacts') }}</f7-link>
          </f7-list-item>
          <f7-list-item>
            <f7-link panel-close="left" href="/feedback/" view=".view-main">{{ this.$t('menu.feedback') }}</f7-link>
          </f7-list-item>
          <f7-list-item>
            <f7-link panel-close="left" href="/about/" view=".view-main">{{ this.$t('menu.about') }}</f7-link>
          </f7-list-item>
          <!--<f7-list-item>-->
          <!--<f7-link panel-close="left" href="/coordinates/">{{ $t('my_location') }}</f7-link>-->
          <!--</f7-list-item>-->
        </f7-list>
        <f7-list no-hairlines class="margin-top-auto">
          <f7-list-item>
            v. {{ this.f7params.version }}
          </f7-list-item>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/"></f7-view>



  </f7-app>
</template>
<script>
  import routes from '../js/routes.js';
  import cordovaApp from '../js/cordova'
  import Dom7 from 'dom7';
  import LangSwitcher from './lang-switcher.vue'
  export default {
    components: {LangSwitcher},
    data() {
      return {
        f7params : {
          theme: 'auto', // Automatic theme detection
          autoDarkMode: true,
          version: '1.2.5',
          routes: routes,
          touch: {
            tapHold: true,
            fastClicks: true,
            materialRipple: true,
            activeState: true,
            disableContextMenu: false
          }
        }
      }
    },
    methods : {
      onDeviceReady: () => {
        cordovaApp.init()
      }
    },
    computed: {


    },
    mounted() {
      if(localStorage.fontsize) {
        let size = Number(localStorage.fontsize)
        Dom7('body').attr('style', 'font-size:' + size + 'px')
      }
      if(localStorage.theme) {
        Dom7("html").addClass("dark")
      }

      if(window.cordova) {
        document.addEventListener('deviceready', this.onDeviceReady, false)
      }

    }
  }
</script>