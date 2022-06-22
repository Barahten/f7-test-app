<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>{{ $t('app_name') }}</f7-nav-title>
      <f7-nav-right>
        <f7-link class="searchbar-enable search-home" data-searchbar=".searchbar-home" icon-ios="f7:search" icon-aurora="f7:search" icon-md="f7:search"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block class="searchbar-hide-on-search icon-block">
      <f7-row>
        <f7-col class="padding-horizontal">
          <f7-link class="display-flex flex-direction-column align-items-center" href="/what-to-do/">
            <img :src="icons.what_to_do" alt="" />
            <div class="text-align-center margin-top-half">
              <h4 class="no-margin-vertical">{{ $t('what_to_do.title') }}</h4>
              <span>{{ $t('what_to_do.subtitle') }}</span>
            </div>
          </f7-link>
        </f7-col>
        <f7-col class="padding-horizontal">
          <f7-link class="display-flex flex-direction-column align-items-center" href="/firstaid/">
            <img :src="icons.first_aid" alt="" />
            <div class="text-align-center margin-top-half">
              <h4 class="no-margin-vertical">{{ $t('first_aid.title') }}</h4>
              <span>{{ $t('first_aid.subtitle') }}</span>
            </div>
          </f7-link>
        </f7-col>
        <f7-col class="padding-horizontal">
          <f7-link class="display-flex flex-direction-column align-items-center" href="/map/">
            <img :src="icons.risk_map" alt="" />
            <div class="text-align-center margin-top-half">
              <h4 class="no-margin-vertical">{{ $t('risk_map.title') }}</h4>
              <span>{{ $t('risk_map.subtitle') }}</span>
            </div>
          </f7-link>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-list class="searchbar-hide-on-search">
      <f7-list-item link="/checklist/" title="">
        <h4 class="no-margin-vertical color-black">
          Проверь свою готовность
        </h4>
      </f7-list-item>
      <f7-list-item link="/check-your-knowledge/" title="">
        <h4 class="no-margin-vertical color-black">
          Проверь свои знания
        </h4>
      </f7-list-item>
      <f7-list-item link="/recommendations/" title="">
        <h4 class="no-margin-vertical color-black">
          МЧС рекомендует
        </h4>
      </f7-list-item>
      <f7-list-item link="/go/" title="">
        <h4 class="no-margin-vertical color-black">
          Гражданская оборона
        </h4>
      </f7-list-item>
      <f7-list-item link="/children/" title="">
        <h4 class="no-margin-vertical color-black">
          МЧС детям
        </h4>
      </f7-list-item>
    </f7-list>

    <f7-block class="searchbar-hide-on-search icon-block">
      <f7-row>
        <f7-col class="padding-horizontal">
          <f7-link class="display-flex flex-direction-column align-items-center" href="/corona/">
            <img :src="icons.corona" alt="" />
            <div class="text-align-center margin-top-half">
              <span>{{ $t('corona_virus.title') }}</span>
            </div>
          </f7-link>
        </f7-col>
        <f7-col class="padding-horizontal">
          <f7-link class="display-flex flex-direction-column align-items-center" href="tel:112" target="_system" external>
            <img :src="icons.phone" alt="" />
            <div class="text-align-center margin-top-half">
              <span>{{ $t('emergency_service.title') }}</span>
            </div>
          </f7-link>
        </f7-col>
        <f7-col class="padding-horizontal">
          <f7-link class="display-flex flex-direction-column align-items-center external" href="#" @click="popupOpened = true">
            <img :src="icons.sms" alt="" />
            <div class="text-align-center margin-top-half">
              <span>{{ $t('send_sms.title') }}</span>
            </div>
          </f7-link>
        </f7-col>
        <f7-col class="padding-horizontal">
          <f7-link class="display-flex flex-direction-column align-items-center external" href="https://mchs.gov.ru" target="_system" external>
            <img :src="icons.www" alt="" />
            <div class="text-align-center margin-top-half">
              <span>{{ $t('www_portal.title') }}</span>
            </div>
          </f7-link>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-popup class="popup-sms" :opened="popupOpened" @popup:closed="popupOpened = false">
      <f7-page>
        <f7-navbar>
          <f7-nav-title>{{ $t('sms.title') }}</f7-nav-title>
          <f7-nav-right>
            <f7-link popup-close>
              <f7-icon ios="f7:multiply" aurora="f7:multiply" md="f7:multiply"></f7-icon>
            </f7-link>
          </f7-nav-right>
        </f7-navbar>
          <f7-list no-hairlines>
            <f7-list-input :label="$t('sms.form.message')" floating-label type="textarea" :placeholder="$t('sms.form.message')" required validate v-model:value="message" resizable />
            <f7-block>
              <f7-button large fill round type="button" :disabled="!message" @click="pushSms">{{ $t('sms.form.send') }}</f7-button>
            </f7-block>
            <f7-block v-html="$t('sms.content')"></f7-block>
          </f7-list>
      </f7-page>
    </f7-popup>

  </f7-page>

  <f7-popup id="popup-welcome" :opened="showWelcomePopup" @popup:open="handleWelcomePopup">
    <f7-page>
      <f7-navbar></f7-navbar>
      <f7-swiper pagination id="swiper-welcome">
        <f7-swiper-slide>
          <f7-block>
            <f7-block-title medium>{{$t('welcome.slide_1.title')}}</f7-block-title>
            <div class="block-inner" v-html="$t('welcome.slide_1.text')"></div>
            <f7-button fill round large @click="nextSlide">{{$t('welcome.slide_1.button')}}</f7-button>
          </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <f7-block>
            <f7-block-title medium>{{$t('welcome.slide_2.title')}}</f7-block-title>
            <div class="block-inner" v-html="$t('welcome.slide_2.text')"></div>
            <f7-button fill round large @click="nextSlide">{{$t('welcome.slide_2.button')}}</f7-button>
          </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <f7-block>
            <f7-block-title medium>{{$t('welcome.slide_3.title')}}</f7-block-title>
            <div class="block-inner" v-html="$t('welcome.slide_3.text')"></div>
            <f7-button fill round large @click="nextSlide">{{$t('welcome.slide_3.button')}}</f7-button>
          </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <f7-block>
            <f7-block-title medium>{{$t('welcome.slide_4.title')}}</f7-block-title>
            <div class="block-inner" v-html="$t('welcome.slide_4.text')"></div>
            <f7-button fill round large popup-close @click="closeWelcomePopup">{{$t('welcome.slide_4.button')}}</f7-button>
          </f7-block>
        </f7-swiper-slide>
      </f7-swiper>
    </f7-page>
  </f7-popup>

</template>

<script>
import what_to_do from "../images/help.svg";
import first_aid from "../images/firstaid.svg";
import risk_map from "../images/map.svg";
import corona from "../images/corona.svg";
import phone from "../images/phone.svg";
import sms from "../images/sms.svg";
import www from "../images/www.svg";

import { f7 } from 'framework7-vue';
import cordovaApp from "../js/cordova";

export default {
  data() {
    return {
      icons : {
        what_to_do,
        first_aid,
        risk_map,
        corona,
        phone,
        sms,
        www
      },
      popupOpened: false,
      message: null,
      swiperParams: {
        autoHeight: true,
        allowTouchMove: false,
        centeredSlides: true,
        // spaceBetween: 20,
        // init: true,
        // on: {
        //   slideChangeTransitionStart: () => {
        //     this.Dom7(".page-content").scrollTop(0, 300);
        //   },
        // },
      }
    };
  },
  methods: {
    pushSms() {
      f7.dialog.progress(this.$t('dialog.progress.text'));

        let options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
            intent: '' // send SMS without opening any other app, require : android.permission.SEND_SMS and android.permission.READ_PHONE_STATE
          }
        };
          window.sms.hasPermission(hasPermission => {
            if(hasPermission) {
              window.sms.send('+79999204165', this.message, options, () => {
                this.message = null
                this.popupOpened = false
                f7.dialog.close()
                f7.toast.create({
                  text: this.$t('toast.sms_send'),
                  closeTimeout: 5000,
                  closeButton: true,
                  closeButtonColor: 'white'
                }).open(true);
                console.log('SMS SENT')
              }, error => {console.log('SMS ERROR', error)})
            } else {
              window.sms.requestPermission(() => {
                window.sms.send('+79999204165', this.message, options, () => {
                  this.message = null
                  f7.dialog.close()
                  f7.toast.create({
                    text: 'СМС успешно отправлено',
                    closeTimeout: 2000,
                  }).open(true);
                }, error => {console.log('SMS ERROR', error)})
              }, () => {
                console.log('SMS PERMISSION DENIED')
              })
            }

          }, () => {
            console.log('SMS PERMISSION DENIED')
          })


    },
    langSwitcher(lang) {
      localStorage.lang = lang
      this.$i18n.locale = lang;
    },
    handleWelcomePopup() {
      f7.swiper.get("#swiper-welcome").update();
    },
    nextSlide() {
      f7.swiper.get('#swiper-welcome').slideNext()
    },
    closeWelcomePopup() {
      localStorage.welcome = false;
      cordovaApp.smsPermissionRequest()
    },

  },
  computed: {
    showWelcomePopup() {
      return !localStorage.welcome;
    },
  },
  mounted() {
    console.log('FROM STORE', this.$store.getters.count)
  }
}
</script>