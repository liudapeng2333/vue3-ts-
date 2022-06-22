<template>
  <div class="role">
    <page-search :pageSearchConfig="searchFormConfig"></page-search>
    <page-content
      :pageContentConfig="pageContentConfig"
      pageName="role"
      @handleEditClick="handleEditClick"
      @handleNewClick="handleNewClick"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :pageModalConfig="pageModalConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <div class="tree-menu">
        <el-tree
          ref="treeRef"
          :data="menus"
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          @check="handleCheck"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/pageSearch'
import { pageContentConfig } from './config/pageContent'
import { pageModalConfig } from './config/pageModal'

import { useModal } from '@/hooks/use-modal'
import { menuMapstoLeafKeys } from '@/utils/map-menus'

import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()

    const menus = computed(() => store.state.entireMenu)

    const treeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapstoLeafKeys(item.menuList)
      nextTick(() => {
        treeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewClick, handleEditClick] =
      useModal(undefined, editCallback)
    const otherInfo = ref({})
    // 将权限绑定到otherInfo上
    const handleCheck = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      pageContentConfig,
      pageModalConfig,
      menus,
      treeRef,
      pageModalRef,
      otherInfo,
      handleCheck,
      defaultInfo,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.tree-menu {
  margin-left: 50px;
}
</style>
