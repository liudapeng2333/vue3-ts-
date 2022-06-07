<template>
  <div class="page-search">
    <ll-form v-bind="pageSearchConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="footer">
          <el-button icon="Refresh" @click="refresh">重置</el-button>
          <el-button type="primary" icon="Search" @click="handleSearchBtn">
            搜索
          </el-button>
        </div>
      </template>
    </ll-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LlForm from '@/base-ui/form'

export default defineComponent({
  props: {
    pageSearchConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    LlForm
  },
  emits: ['handleSearchClick'],
  setup(props, { emit }) {
    // 根据数据动态传输搜索框的属性
    const formItems = props.pageSearchConfig?.formItems ?? []
    const originFormData: any = {}
    for (const item of formItems) {
      originFormData[item.field] = ''
    }
    const formData = ref(originFormData)
    // 依次修改ref
    const refresh = () => {
      Object.keys(formData.value).forEach((key: string) => {
        formData.value[`${key}`] = originFormData[key]
      })
    }
    const handleSearchBtn = () => {
      console.log(formData.value)

      emit('handleSearchClick', formData.value)
    }
    return {
      formData,
      refresh,
      handleSearchBtn
    }
  }
})
</script>

<style scoped lang="less">
.header {
  color: red;
}
.footer {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
