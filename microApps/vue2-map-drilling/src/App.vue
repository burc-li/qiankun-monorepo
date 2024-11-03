<template>
  <div class="app micro-app">
    <Header></Header>
    <transition mode="out-in" name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components: { Header },
}
</script>

<style lang="less">
.micro-app {
  height: 100%;
  overflow: hidden;
  background-color: #f5f7f9;
  .fade-enter {
    opacity: 0;
    transform: translateX(10px);
  }
  .fade-enter-active {
    transition: all 0.5s;
  }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-leave {
    opacity: 1;
  }
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
  .absolut{
    position: absolute;
    top: 30px;
    left: 20px;
    button{
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
