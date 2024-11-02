/**
 * @for  弹窗
 * @param {string} title -- 弹框标题
 * @params handleSuccess --  成功回调函数
 */
import Vue from 'vue'
import Modal from './index.vue'
const MainConstructor = Vue.extend(Modal)

let instance
const customModal = async ({ title = '弹窗标题' }, handleSuccess) => {
  const params = {
    title,
    handleSuccess
  }
  if (!instance) {
    // 传参，试一下响应式
    instance = new MainConstructor().$mount()
    document.body.appendChild(instance.$el)
  }
  // 试一下响应式
  instance = Object.assign(instance, params)
  instance.open()
}
export { customModal }
