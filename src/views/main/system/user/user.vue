<template>
  <div class="user">
    <page-search
      :pageSearchConfig="searchFormConfig"
      @handleSearchClick="handleSearchClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :pageContentConfig="pageContentConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/pageSearch'
import { pageContentConfig } from './config/pageContent'
import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleSearchClick] = usePageSearch()

    return {
      searchFormConfig,
      pageContentConfig,
      pageContentRef,
      handleSearchClick
    }
  }
})
</script>

<style scoped></style>
