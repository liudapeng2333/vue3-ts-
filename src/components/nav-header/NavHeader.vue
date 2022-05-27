<template>
  <div class="nav-header">
    <el-icon class="fold-menu">
      <component :is="iconName" @click="handleFoldClick"></component>
    </el-icon>
    <div class="content">
      <ll-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import LlBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

import UserInfo from './UserInfo.vue'

export default defineComponent({
  emits: ['flodChange'],
  components: {
    LlBreadcrumb,
    UserInfo
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const iconName = ref('Expand')
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      iconName.value = isFold.value ? 'Fold' : 'Expand'
      emit('flodChange', isFold.value)
    }

    const route = useRoute()
    const store = useStore()
    // 面包屑数据
    const breadcrumbs = computed(() => {
      const currentPath = route.path
      const userMenus = store.state.accountLogin.userMenus
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    return {
      isFold,
      iconName,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
