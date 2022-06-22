import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type callback = (item?: any) => void
export function useModal(fn1?: callback, fn2?: callback) {
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
    fn2 && fn2(item)
  }

  return [pageModalRef, defaultInfo, handleNewClick, handleEditClick]
}
