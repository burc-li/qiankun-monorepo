<template>
  <Modal v-model="visible" :title="title" @on-ok="handleConfirm">
    <div class="modal-inner">
    </div>
  </Modal>
</template>

<script>
import { Modal } from 'view-design'
export default {
  components: { Modal },
  props: {
    title: {
      type: String,
      default: '位置'
    },
    handleSuccess: null // 成功回调函数
  },
  data () {
    return {
      visible: false
    }
  },

  methods: {
    // 打开弹窗
    open () {
      this.visible = true
    },

    // 确认
    handleConfirm () {
      this.handleSuccess && this.handleSuccess()
    }
  }
}
</script>

<style lang="less" scoped>
.modal-inner {
  height: 480px;
}
</style>
