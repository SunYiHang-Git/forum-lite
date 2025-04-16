<script setup>
import TEditor from '@/component/TEditor/index.vue'
import { ref, watch } from 'vue'
const value = ref()

watch(
  () => value.value,
  (val) => {
    console.log('val--->', val)
  },
  { deep: true },
)
</script>
<template>
  <div class="mark-down">
    <TEditor v-model="value" />
  </div>
</template>

<style scoped>
.mark-down {
  width: 100%;
  height: 100%;
}
</style>
