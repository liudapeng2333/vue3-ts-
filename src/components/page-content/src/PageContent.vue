<template>
  <div class="page-content">
    <ll-table
      :tableData="tableData"
      v-bind="pageContentConfig"
      v-model:page="pageInfo"
      :listCount="listCount"
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
      <template #handler>
        <div class="handler">
          <el-button icon="Edit" type="text" size="small">编辑</el-button>
          <el-button icon="Delete" type="text" size="small">删除</el-button>
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
import { tr } from 'element-plus/lib/locale'

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
  setup(props) {
    const store = useStore()
    const tableData = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const listCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageInfo())
    const getPageInfo = (queryInfo: any = {}) => {
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
    return {
      tableData,
      listCount,
      pageInfo,
      getPageInfo,
      oterSlotsProps
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
