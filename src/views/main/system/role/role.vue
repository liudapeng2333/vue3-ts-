<template>
  <div class="role">
    <page-search :pageSearchConfig="searchFormConfig"></page-search>
    <page-content
      :pageContentConfig="pageContentConfig"
      pageName="role"
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
  name: 'role',
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
