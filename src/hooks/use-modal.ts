import { ref } from 'vue'
import PageModal from '@/components/page-modal'

export function useModal(fn1?: () => void, fn2?: () => void) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleNewClick = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisiable = true
    }
    fn1 && fn1()
  }
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisiable = true
    }
    fn2 && fn2()
  }

  return [pageModalRef, defaultInfo, handleNewClick, handleEditClick]
}
