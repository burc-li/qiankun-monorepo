<template>
  <div class="consumer-wrapper">
    <section class="consumer-item">
      <h3>monorepo共享包（@libc/utils）</h3>
      <div class="content">
        <p>@libc/utils 中的 array2Object 方法</p>
        {{array2Object}}
        </div>
    </section>
    <section class="consumer-item">
      <h3>monorepo共享包（@libc/desgin3）</h3>
      <div class="content">
        <p>@libc/desgin3 组件库仅支持 vue3，<a :href="link">跳转</a> 至 vue3 项目查看</p>
      </div>
    </section>
    <section class="consumer-item">
      <h3>模块联邦（Page404 组件）</h3>
      <div class="content"><Page404></Page404></div>
    </section>
    <section class="consumer-item">
      <h3>模块联邦（CustomModal 组件）</h3>
      <div class="content">点击按钮调用 CustomModal 组件 <Button type="primary" @click="openCustomModal">按钮</Button></div>
    </section>
  </div>
</template>

<script>
import { array2Object } from '@libc/utils'
import { Button } from 'view-design'
export default {
  name: 'Consumer',
  components: {
    Button,
    Page404: () => import('remoteEntry/Page404'),
  },
  data () {
    return {
      array2Object,
      title: `${window.location.origin}`,
    }
  },
  computed: {
    link () {
      return `${window.location.origin}/pdf/jspdf`
    },
  },
  methods: {
    openCustomModal () {
      import('remoteEntry/CustomModal').then(({ customModal }) => {
        customModal({
          title: '模块联邦（CustomModal 组件）',
        }, () => {
          console.log('handleSuccess成功回调钩子')
        })
      })
    },
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
    padding: 16px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    display: flex;
    flex-direction: column;
    .content{
      flex: 1;
    }
    h3{
      font-size: 16px;
      color: #4fc084;
      font-weight: bold;
      margin-bottom: 22px;
    }
    p{
      margin-bottom: 16px;
    }
    button{
      cursor: pointer;
    }
  }
}
</style>
