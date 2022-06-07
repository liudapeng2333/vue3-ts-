import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleSearchClick = (queryInfo: any) => {
    pageContentRef.value?.getPageInfo(queryInfo)
  }

  return [pageContentRef, handleSearchClick]
}
