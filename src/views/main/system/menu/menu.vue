<template>
  <div class="menu">
    <page-content
      :pageContentConfig="pageContentConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { pageContentConfig } from './config/pageContent'

export default defineComponent({
  name: 'menu-view',
  components: { PageContent },
  setup() {
    return { pageContentConfig }
  }
})
</script>

<style scoped></style>
