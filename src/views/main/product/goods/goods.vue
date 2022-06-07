<template>
  <div class="goods">
    <page-content :pageContentConfig="pageContentConfig" pageName="goods">
      <template #img="scope">
        <el-image
          style="width: 80px; height: 80px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { pageContentConfig } from './config/pageContent'

export default defineComponent({
  name: 'goods',
  components: { PageContent },
  setup() {
    return { pageContentConfig }
  }
})
</script>

<style scoped></style>
