<script setup lang="ts">
import { ref } from 'vue'
import CloudLogin from './CloudLogin.vue'
import CloudRegister from './CloudRegister.vue'
import CloudForget from './CloudForget.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const { type, toPage } = defineProps<{
  type: string
  toPage: string
}>()
const showPage = ref(type || 'login')
const goPage = (page: 'login' | 'register' | 'forget') => {
  showPage.value = page
}
/** 登录成功的回调 */
const loginSuccess = () => {
  router.push(toPage)
}
</script>

<template>
  <div class="Login-page">
    <CloudLogin v-if="showPage === 'login'" @goPage="goPage" @loginSuccess="loginSuccess" />
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
