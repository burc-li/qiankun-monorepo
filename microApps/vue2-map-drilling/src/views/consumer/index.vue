<template>
  <div class="consumer-wrapper">
    <section class="consumer-item">
      <h3>monorepo共享包（@libc/utils）</h3>
      <div class="consumer-content">124</div>
    </section>
    <section class="consumer-item">
      <h3>monorepo共享包（@libc/desgin3）</h3>
      <div class="consumer-content">124</div>
    </section>
    <section class="consumer-item">
      <h3>模块联邦（@libc/desgin3）</h3>
      <div class="consumer-content">124</div>
    </section>
    <section class="consumer-item">
      <h3>模块联邦（@libc/desgin3）</h3>
      <div class="consumer-content">124</div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Consumer',
  components: {
  },
}
</script>

<style lang="less">
.consumer-wrapper{
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-around;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  .consumer-item{
    width: 45%;
    height: 40%;
    margin-top: 30px;
    border: 2px solid #de5e60;
    border-radius: 4px;
  }
}
</style>
