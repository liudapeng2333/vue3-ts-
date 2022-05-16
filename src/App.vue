<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const name = 'App'
    return {
      name
    }
  }
})
</script>

<style lang="less"></style>
