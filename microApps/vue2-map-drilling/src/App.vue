<template>
  <div class="app micro-app">
    <section class="absolut">
      点击按钮，调用模块联邦的弹窗
      <button>按钮</button>
    </section>
    <transition mode="out-in" name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { array2Object } from '@libc/utils'
export default {
  name: 'App',
  mounted () {
    console.log('共享方法库__utils.array2Object', array2Object)
  },
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
