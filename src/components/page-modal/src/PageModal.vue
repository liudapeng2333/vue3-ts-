<template>
  <div>
    <el-dialog
      draggable
      title="LIU"
      center
      v-model="dialogVisiable"
      width="30%"
      destroy-on-close
    >
      <ll-form v-bind="pageModalConfig" v-model="formData"></ll-form>
      <!-- 默认插槽 -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleConfimClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import LlForm from '@/base-ui/form'

export default defineComponent({
  components: { LlForm },
  props: {
    pageModalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialogVisiable = ref(false)
    const store = useStore()

    // 根据数据动态传输输入框的属性
    const formItems = props.pageModalConfig?.formItems ?? []
    const originFormData: any = {}
    for (const item of formItems) {
      originFormData[item.field] = ''
    }
    const formData = ref(originFormData)

    watch(
      // watch 跟踪响应式对象
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.pageModalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const handleConfimClick = () => {
      if (Object.keys(props.defaultInfo).length) {
        console.log('编辑用户')
        store.dispatch('system/editBtnActions', {
          pageName: props.pageName,
          // 修改config中的form数据外，将权限数据化为otherInfo补充到newdata中
          newData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        console.log('新建用户')
        store.dispatch('system/creatBtnActions', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
      dialogVisiable.value = false
    }

    return { formData, dialogVisiable, handleConfimClick }
  }
})
</script>

<style scoped></style>
