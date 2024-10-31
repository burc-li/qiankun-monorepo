<template>
  <Sider class="sider-nav-wrap">
    <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          快速上手
        </template>
        <MenuItem name="2-1" to="/gojs2_1">给节点添加样式</MenuItem>
        <MenuItem name="2-2" to="/gojs2_2">各种模型</MenuItem>
        <MenuItem name="2-3" to="/gojs2_3">图形布局</MenuItem>
        <MenuItem name="2-4" to="/gojs2_4">连线模板</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          GOJS教程
        </template>
        <MenuItem name="3-1" to="/gojs3_1">数据绑定</MenuItem>
        <MenuItem name="3-2" to="/gojs3_2">文本快</MenuItem>
        <MenuItem name="3-3" to="/gojs3_3">面板</MenuItem>
        <MenuItem name="3-4" to="/gojs3_4">笔刷</MenuItem>
        <MenuItem name="3-5" to="/gojs3_5">Panel Item Arrays</MenuItem>
        <MenuItem name="3-6" to="/gojs3_6">连线</MenuItem>
        <MenuItem name="3-7" to="/gojs3_7">连线上的标签</MenuItem>
        <MenuItem name="3-8" to="/gojs3_8">连接点</MenuItem>
        <MenuItem name="3-9" to="/gojs3_9">节点端口</MenuItem>
        <MenuItem name="3-10" to="/gojs3_10">节点</MenuItem>
        <MenuItem name="3-11" to="/gojs3_11">布局</MenuItem>
        <MenuItem name="3-12" to="/gojs3_12">分组</MenuItem>
        <MenuItem name="3-13" to="/gojs3_13">选择</MenuItem>
        <MenuItem name="3-14" to="/gojs3_14">高亮</MenuItem>
        <MenuItem name="3-15" to="/gojs3_15">动画</MenuItem>
        <MenuItem name="3-16" to="/gojs3_16">提示框</MenuItem>
        <MenuItem name="3-17" to="/gojs3_17">右键菜单</MenuItem>
        <MenuItem name="3-18" to="/gojs3_18">HTML 交互</MenuItem>
        <MenuItem name="3-19" to="/gojs3_19">HTML 交互</MenuItem>
        <MenuItem name="3-20" to="/gojs3_20">图层</MenuItem>
        <MenuItem name="3-21" to="/gojs3_21">图形及模型的更新</MenuItem>
        <MenuItem name="3-22" to="/gojs3_22">模板</MenuItem>
        <MenuItem name="3-23" to="/gojs3_23">网格</MenuItem>
        <MenuItem name="3-24" to="/gojs3_24">刻度面板</MenuItem>
        <MenuItem name="3-25" to="/gojs3_25">生成图片</MenuItem>
        <MenuItem name="3-26" to="/gojs3_26">事务</MenuItem>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          导师任务
        </template>
        <MenuItem name="4-1" to="/gojs4_1">自定义形状</MenuItem>
        <MenuItem name="4-2" to="/gojs4_2">布局</MenuItem>
        <MenuItem name="4-3" to="/gojs4_3">布局Pro</MenuItem>
        <MenuItem name="4-4" to="/gojs4_4">布局Pro-itemArray</MenuItem>
        <MenuItem name="4-5" to="/gojs4_5">自定义布局</MenuItem>
        <MenuItem name="4-6" to="/gojs4_6">分组容器</MenuItem>
      </Submenu>
      <Submenu name="5">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          在线示例
        </template>
        <MenuItem name="5-1" to="/gojs5_1">重新分组</MenuItem>
      </Submenu>
      <Submenu name="6">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          自定义扩展
        </template>
        <MenuItem name="6-1" to="/gojs6_1">TextEditingTool</MenuItem>
        <MenuItem name="6-2" to="/gojs6_2">RotateMultipleTool</MenuItem>
      </Submenu>
    </Menu>
  </Sider>
</template>

<script>
export default {
  name: 'SiderNav',
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.sider-nav-wrap {
  height: calc(100vh - 0px);
  overflow: auto;
}
</style>
