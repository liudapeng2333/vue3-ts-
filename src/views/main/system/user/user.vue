<template>
  <div class="user">
    <page-search :pageSearchConfig="searchFormConfig"></page-search>
    <page-content
      :pageContentConfig="pageContentConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/pageSearch'
import { pageContentConfig } from './config/pageContent'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      searchFormConfig,
      pageContentConfig
    }
  }
})
</script>

<style scoped></style>
