<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="app">
    <Header></Header>
    <div id="container">
      <RouterView />
    </div>
  </div>
</template>

<style lang="less" scoped>
.app {
  // width: 100vw;
  // height: 100vh;
  #container{
    height: calc(100% - @nav-height);
    overflow: auto;
  }
}
</style>
