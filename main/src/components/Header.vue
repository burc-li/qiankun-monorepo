<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 监听当前路由变化
const currentRoute = ref({})
watch(
  () => router.currentRoute.value,
  (value) => {
    currentRoute.value = value
  },
)

const navigateTo = path => {
  window.history.pushState({}, '', path)
}

import routes from '@/routes.js'
console.log('routes', routes)
</script>

<template>
  <div class="header-menu">
    <span
      class="menu-item"
      :class="{ active: currentRoute.path?.startsWith(route.path)}"
      v-for="route in routes"
      :key="route.path"
      @click="navigateTo(route.path)"
      >{{ route.name }}</span
    >
  </div>
</template>

<style lang="less" scoped>
.header-menu {
  position: relative;
  display: flex;
  box-shadow:
    0 1px 0 0 #0000001a,
    0 1px 5px 0 #0000001a;
  z-index: 999;
  .menu-item {
    box-sizing: border-box;
    display: inline-block;
    line-height: @navHeight;
    height: @navHeight;
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      color: #2d8cf0;
      background-color: rgba(0, 0, 0, 0.05);
    }
    &.active {
      border-bottom: 2px solid #2465ff;
    }
  }
}
</style>
