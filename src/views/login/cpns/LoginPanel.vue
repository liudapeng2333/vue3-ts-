<template>
  <div class="loginPanel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs type="border-card" stretch v-model="elTabRef">
      <el-tab-pane name="account">
        <template #label>
          <el-icon class="user-filled">
            <user-filled />
          </el-icon>
          <span class="account-login"> 账号登陆 </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="iphone">
        <template #label>
          <el-icon class="iphone"><iphone /></el-icon>
          <span class="iphone-login"> 手机登陆 </span>
        </template>
        <login-iphone ref="iphoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="login-control">
      <el-checkbox v-model="isRemNum" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>

    <el-button
      type="primary"
      class="login-btn"
      size="large"
      @click="loginHandle"
    >
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginIphone from './LoginIphone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginIphone
  },
  setup() {
    // 是否记住密码
    let isRemNum = ref(true)
    // accountRef 传递从account中的账号信息
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const iphoneRef = ref<InstanceType<typeof LoginIphone>>()
    const elTabRef = ref('account')

    const loginHandle = () => {
      // console.log('立即登录按钮')
      if (elTabRef.value === 'account') {
        accountRef.value?.accountLogin(isRemNum.value)
      } else {
        console.log('手机登陆')
      }
    }
    return {
      isRemNum,
      loginHandle,
      accountRef,
      elTabRef,
      iphoneRef
    }
  }
})
</script>

<style lang="less" scoped>
.loginPanel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }
  .login-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
