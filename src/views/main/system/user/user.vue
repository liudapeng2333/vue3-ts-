<template>
  <div class="user">
    <page-search
      :pageSearchConfig="searchFormConfig"
      @handleSearchClick="handleSearchClick"
      @handleRefreshClick="handleRefreshClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :pageContentConfig="pageContentConfig"
      pageName="users"
      @handleNewClick="handleNewClick"
      @handleEditClick="handleEditClick"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :pageModalConfig="pageModalConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/pageSearch'
import { pageContentConfig } from './config/pageContent'
import { pageModalConfig } from './config/pageModal'

import { usePageSearch } from '@/hooks/use-page-search'
import { useModal } from '@/hooks/use-modal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleRefreshClick, handleSearchClick] =
      usePageSearch()
    const store = useStore()
    // 动态获取部门和角色信息（这些信息和用户相关）
    const pageModalConfigRef = computed(() => {
      const departmentIdItem = pageModalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      const roleItem = pageModalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      departmentIdItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id }
      })
      roleItem!.options = store.state.entireRole.map((item) => {
        return { label: item.name, value: item.id }
      })
      return pageModalConfig
    })
    // 是否隐藏password输入，属于页面逻辑
    const newShowPassword = () => {
      const passwordItem = pageModalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const eidtHidePassword = () => {
      const passwordItem = pageModalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    const [pageModalRef, defaultInfo, handleNewClick, handleEditClick] =
      useModal(newShowPassword, eidtHidePassword)
    return {
      searchFormConfig,
      pageContentConfig,
      pageModalConfigRef,
      pageContentRef,
      handleRefreshClick,
      handleSearchClick,
      handleNewClick,
      handleEditClick,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
