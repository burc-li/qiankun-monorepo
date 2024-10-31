// 每次加载切换子应用都会调用此方法
const loader = loading => {
  console.log('加载loading', loading)
}
export default [
  {
    name: 'vue2-gojs', // 微应用的名称，微应用之间必须确保唯一
    entry: '//localhost:8001', // 微应用的入口
    activeRule: '/gojs', // 微应用的激活规则，当路径以 /react 为前缀时启动
    container: '#micro-container', // 微应用的容器节点的选择器或者 Element 实例
    loader, // loading 状态发生变化时会调用的方法
    props: { userInfo: { name: 'burc', password: 'xxxxxx' } }, // 主应用需要传递给微应用的数据
  },
  {
    name: 'vue2-map-drilling',
    entry: '//localhost:8002',
    activeRule: '/map',
    container: '#micro-container',
    loader,
    props: {},
  },
  {
    name: 'vue3-pdf',
    entry: '//localhost:8003',
    activeRule: '/pdf',
    container: '#micro-container',
    loader,
    props: {},
  },
]
