<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import routes from '@/routes.js'

const router = useRouter()

// 监听当前路由变化
const currentRoute = ref({})
watch(
  () => router.currentRoute.value,
  value => {
    currentRoute.value = value
  },
)

const navigateTo = path => {
  window.history.pushState({}, '', path)
}

onMounted(
  setTimeout(() => {
    if(router.currentRoute.value.path === '/'){
      window.history.pushState({}, '', routes[0].path)
    }
  }, 0)
)
</script>

<template>
  <div class="main-header header-menu">
    <span
      class="menu-item"
      :class="{
        active: route.path.split('/')[1] === currentRoute?.href?.split('/')[1],
      }"
      v-for="route in routes"
      :key="route.path"
      @click="navigateTo(route.path)"
      >{{ route.name }}</span
    >
  </div>
</template>

<style lang="less" scoped>
.main-header.header-menu {
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
    font-size: 16px;
    font-family: 'Microsoft YaHei';
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
