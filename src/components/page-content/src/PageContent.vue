<template>
  <div class="page-content">
    <ll-table
      :tableData="tableData"
      v-bind="pageContentConfig"
      v-model:page="pageInfo"
      :listCount="listCount"
      @handleNewClick="handleNewClick"
    >
      <template #status="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'" plain>{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handler">
          <el-button
            icon="Edit"
            type="text"
            size="small"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            icon="Delete"
            type="text"
            size="small"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 将其他组件独有的插槽动态插入 -->
      <template
        v-for="item in oterSlotsProps"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </ll-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import LlTable from '@/base-ui/table'
import { useStore } from '@/store'
import { userPermission } from '@/hooks/user-permission'

export default defineComponent({
  props: {
    pageContentConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    LlTable
  },
  emits: ['handleNewClick', 'handleEditClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 获取操作的权限
    const isCreate = userPermission(props.pageName, 'create')
    const isUpdate = userPermission(props.pageName, 'update')
    const isDelete = userPermission(props.pageName, 'delete')
    const isQuery = userPermission(props.pageName, 'query')

    const tableData = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const listCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageInfo())
    const getPageInfo = (queryInfo: any = {}) => {
      if (!isQuery) return null
      store.dispatch('system/getPageList', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageInfo()

    const oterSlotsProps = props.pageContentConfig.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    const handleNewClick = () => {
      if (isCreate) emit('handleNewClick')
      else alert('没有新建权限！')
    }
    const handleEditClick = (item: any) => {
      if (isUpdate) emit('handleEditClick', item)
      else alert('没有编辑权限！')
    }
    const handleDeleteClick = (item: any) => {
      if (isDelete) {
        console.log('删除操作')
        store.dispatch('system/deleteBtnActions', {
          pageName: props.pageName,
          id: item.id
        })
      } else alert('没有删除权限')
    }
    return {
      tableData,
      listCount,
      pageInfo,
      getPageInfo,
      oterSlotsProps,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleNewClick,
      handleEditClick,
      handleDeleteClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .handler {
    display: flex;
    justify-content: space-around;
  }
}
</style>
