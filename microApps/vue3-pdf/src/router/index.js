import { createRouter, createWebHistory } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

export default () => {
  
  const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/pdf/' : '/'

  return new createRouter({
    history: createWebHistory(base),

    routes: [
      {
        path: '/',
        redirect: '/html2canvas',
        meta: {
          hidden: true,
        },
      },
      {
        path: '/html2canvas',
        name: 'html2canvas',
        component: () => import('../views/html2canvas.vue'),
      },
      {
        path: '/jspdf',
        name: 'jspdf',
        component: () => import('../views/jspdf.vue'),
      },
    ],
  })
}
