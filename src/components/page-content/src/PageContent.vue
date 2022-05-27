<template>
  <div class="page-content">
    <ll-table :tableData="tableData" v-bind="pageContentConfig">
      <template #status="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'">{{
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
      <template #headerHandle>
        <el-button type="primary">新建用户</el-button>
      </template>
    </ll-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import LlTable from '@/base-ui/table'
import { useStore } from '@/store'

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
    store.dispatch('system/getPageList', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const tableData = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )

    return {
      tableData
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
