<template>
  <div class="ll-talbe">
    <div class="header">
      <slot name="header">
        <div class="title">{{ tableTitle }}</div>
        <div class="handler">
          <slot name="headerHandle"></slot>
        </div>
      </slot>
    </div>

    <el-table :data="tableData" border size="large">
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
        <el-table-column v-bind="item" align="center">
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
          layout="total, prev, pager, next, jumper"
          :total="1000"
        />
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
    }
  },
  setup() {
    const currentPage = ref()

    return {
      currentPage
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
.footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
