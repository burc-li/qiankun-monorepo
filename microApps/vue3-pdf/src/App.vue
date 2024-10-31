<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="micro-app">
    <Header></Header>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style lang="less" scoped>
.micro-app {
  height: 100%;
  .content{
    height: calc(100% - @sub-nav-height);
    overflow: auto;
  }
}
</style>
