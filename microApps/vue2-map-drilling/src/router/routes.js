export default [
  {
    path: '/',
    name: '地图',
    component: resolve => require(['@/views/map/index.vue'], resolve),
  },
  {
    path: '/consumer',
    name: 'monorepo共享包/模块联邦',
    component: resolve => require(['@/views/consumer/index.vue'], resolve),
  },
]
