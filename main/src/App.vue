<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="main-app">
    <Header></Header>
    <div id="micro-container">
      <RouterView />
    </div>
  </div>
</template>

<style lang="less">
.main-app {
  height: 100vh;
  #micro-container {
    position: relative;
    height: calc(100% - @nav-height);
    overflow: auto;
  }
  div[id^='__qiankun_microapp_wrapper_'] {
    height: 100%;
    > #app{
      height: 100%;
    }
  }
}
</style>
