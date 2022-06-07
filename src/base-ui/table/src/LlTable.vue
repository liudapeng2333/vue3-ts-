<template>
  <div class="ll-talbe">
    <div class="header">
      <slot name="header">
        <div class="title">{{ tableTitle }}</div>
        <div class="handler">
          <slot name="headerHandle">
            <el-button type="primary">{{ headerHandle }}</el-button>
          </slot>
        </div>
      </slot>
    </div>

    <el-table :data="tableData" border>
      <el-table-column
        v-if="showSelectionColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        width="80"
        label="序号"
      ></el-table-column>
      <template v-for="item of propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <slot name="footer">
      <div class="footer">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        ></el-pagination>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    tableTitle: {
      type: String,
      default: '用户列表'
    },
    headerHandle: {
      type: String,
      default: '新建用户'
    },
    tableData: {
      type: Array,
      default: () => []
    },
    propList: {
      type: Array,
      default: () => []
    },
    showSelectionColumn: {
      type: Boolean,
      default: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      required: true
    },
    listCount: {
      type: Number,
      defaut: 0
    }
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    return {
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
}
.el-table {
  & ::v-deep th.el-table__cell,
  ::v-deep td.el-table__cell {
    // 设置position 使得 子元素不与其产生新的层叠关系
    position: static;
  }
}
.footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
