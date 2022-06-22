<template>
  <f7-page name="about">
    <f7-navbar back-link>
      <f7-nav-title>{{ $t('page.about.title') }}</f7-nav-title>
    </f7-navbar>
    <f7-block v-html="$t('page.about.content')"></f7-block>

  </f7-page>
</template>
