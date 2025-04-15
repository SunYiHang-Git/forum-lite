<script setup lang="ts">
import { ref } from 'vue'
import CloudLogin from './CloudLogin.vue'
import CloudRegister from './CloudRegister.vue'
import CloudForget from './CloudForget.vue'

const showPage = ref('login')
const goPage = (page: 'login' | 'register' | 'forget') => {
  showPage.value = page
}
</script>

<template>
  <div class="Login-page">
    <CloudLogin v-if="showPage === 'login'" @goPage="goPage" />
    <CloudRegister v-if="showPage === 'register'" @goPage="goPage" />
    <CloudForget v-if="showPage === 'forget'" @goPage="goPage" />
  </div>
</template>

<style lang="scss" scoped>
.Login-page {
  width: 100%;
  height: 100%;
}
</style>
