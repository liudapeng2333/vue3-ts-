<template>
  <el-form label-width="auto" :rules="rules" :model="iphone" size="large">
    <el-form-item label="手机号" prop="number">
      <el-input v-model="iphone.number" id="number" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="iphone.code" id="code" maxlength="4" />
        <el-button type="primary" class="get-code-btn" @click="getCodeHandle">
          获取验证码
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/iphone-config'

export default defineComponent({
  setup() {
    const iphone = reactive({
      number: '',
      code: ''
    })
    const getCodeHandle = () => {
      console.log('获取验证码')
    }
    return {
      iphone,
      rules,
      getCodeHandle
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.get-code-btn {
  margin-left: 8px;
}
</style>
