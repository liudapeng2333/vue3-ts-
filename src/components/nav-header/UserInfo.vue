<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </span>
      <template #dropdown>
        <div style="text-align: center; font-size: 13px; margin-top: 10px">
          {{ userName }}
        </div>
        <el-dropdown-menu>
          <el-dropdown-item>用户管理</el-dropdown-item>
          <el-dropdown-item divided>设置</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
          <el-dropdown-item @click="signOut">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const userName = store.state.accountLogin.userInfo.name
    const signOut = () => {
      localCache.removeItem('token')
      router.push('/main')
    }
    return {
      userName,
      signOut
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
