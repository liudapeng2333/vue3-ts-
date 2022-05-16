<template>
  <el-form
    label-width="60px"
    :rules="rules"
    :model="account"
    size="large"
    ref="formRef"
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" id="name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        show-password
        v-model="account.password"
        id="password"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getItem('name') ?? '',
      password: localCache.getItem('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const accountLogin = (isRemNum: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isRemNum) {
            // 如果要记住密码，就将账号密码加入本地缓存
            localCache.setItem('name', account.name)
            localCache.setItem('password', account.password)
          } else {
            localCache.removeItem('name')
            localCache.removeItem('password')
          }
        }
        store.dispatch('accountLogin/accountLoginAction', { ...account })
      })
    }
    return {
      account,
      rules,
      accountLogin,
      formRef
    }
  }
})
</script>

<style scoped></style>
