<template>
  <div class="wrapper">
    <img src="@/assets/logo.png" />
    <p class="title">抱歉，您无权访问该页面</p>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.wrapper{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  overflow: hidden;
  .title{
    font-size: 16px;
    margin-top: 56px;
    margin-bottom: 3px;
  }
  .text{
    font-size: 14px;
    color: #999999;
  }
  .btn{
    margin-top: 16px;
    width: 150px;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
