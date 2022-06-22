<template>
  <f7-page>
    <f7-navbar back-link>
      <f7-nav-title>{{ $t('page.feedback.title') }}</f7-nav-title>
    </f7-navbar>
      <f7-list no-hairlines>
        <f7-block v-html="$t('page.feedback.description')"></f7-block>
        <f7-list-input :label="$t('page.feedback.form.name')" floating-label type="text" :placeholder="$t('page.feedback.form.name')" clear-button required validate v-model:value="name" />
        <f7-list-input :label="$t('page.feedback.form.message')" floating-label type="textarea" resizable :placeholder="$t('page.feedback.form.message')" clear-button required validate v-model:value="message" />
        <f7-block>
          <f7-button large fill round type="button" :disabled="!name || !message" @click="sendFeedback">{{ $t('page.feedback.form.sent') }}</f7-button>
        </f7-block>
      </f7-list>
  </f7-page>
</template>

<script>

import {f7} from "framework7-vue";

export default {
  name: "feedback",
  data() {
    return {
      name: null,
      message: null,
    }
  },

  methods: {
    sendFeedback() {
      f7.dialog.progress(this.$t('dialog.progress.text'));
      setTimeout(() => {
        this.name = this.message = null
        f7.dialog.close()
        f7.toast.create({
          text: this.$t('toast.feedback_send'),
          closeTimeout: 5000,
          closeButton: true,
          closeButtonColor: 'white'
        }).open(true);
        f7.views.main.router.back()
      }, 3000)

    }
  }
}
</script>
