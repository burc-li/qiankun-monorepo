<template>
  <div class="container">
    <Button type="primary" @click="capture">使用 html2canvas 进行屏幕截屏</Button>
    <section v-for="(item, index) in pageList" :key="index">
      <p class="text">{{ index }} - {{ item.text }}</p>
      <img class="image" crossorigin="anonymous" :src="item.src" />
    </section>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import { Button } from '@libc/desgin3'

import html2canvas from 'html2canvas'
import { myBase64 } from '@/utils/contant.js'

// 使用 html2canvas 进行屏幕截屏
// html2canvas(element, options)
const capture = () => {
  const ele = document.querySelector('.container')
  html2canvas(document.body, {
    scale: window.devicePixelRatio * 2, // 使用设备的像素比 * 2
  }).then(canvas => {
    ele.appendChild(canvas)
  })
}

const number = 2
const pageList = ref([])
const paragraph = {
  text: 'html2canvas 是一个 HTML 渲染器。该脚本允许你直接在用户浏览器截取页面或部分网页的“屏幕截屏”，屏幕截图是基于 DOM，因此生成的图片并不一定 100% 一致，因为它没有制作实际的屏幕截图，而是根据页面上可用的信息构建屏幕截图',
  src: myBase64,
}

onBeforeMount(() => {
  pageList.value.length = 0
  while (pageList.value.length < number) {
    pageList.value.push(paragraph)
  }
})
</script>
<style lang="less" scoped>
.container {
  padding: 14px 16px;
  .text {
    line-height: 1.5em;
    margin-bottom: 16px;
    word-break: break-all;
  }
  section:nth-of-type(1){
    margin-top: 18px;
  }
  .image {
    width: 100%;
    height: 100px;
    margin-bottom: 12px;
  }
}
</style>
