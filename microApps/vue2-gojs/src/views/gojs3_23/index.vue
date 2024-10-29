<doc>
  @author: 李百成
  @description： gojs
</doc>
<template>
  <div class="gojs-warp">
    <div id="imgBox"></div>
    <div id="myDiagramDiv"></div>
  </div>
</template>

<script>
import * as go from 'gojs'
export default {
  name: 'gojs',
  components: {},
  props: {},
  data () {
    return {}
  },
  mounted () {
    this.initGojs()
  },
  methods: {
    initGojs () {
      const $ = go.GraphObject.make

      // 视图
      const diagram = $(go.Diagram, 'myDiagramDiv', {
        grid: $(
          go.Panel,
          'Grid',
          { visible: true, gridCellSize: new go.Size(20, 20) },
          $(go.Shape, 'LineH', { stroke: '#efefef' }),
          $(go.Shape, 'LineV', { stroke: '#efefef' }),
          $(go.Shape, 'LineH', {
            stroke: '#e0e0e0',
            interval: 4,
          }),
          $(go.Shape, 'LineV', {
            stroke: '#e0e0e0',
            interval: 4,
          }),
        ),
        // 节点拖动并不是线性移动，而是散点移动，默认对齐网格进行
        'draggingTool.isGridSnapEnabled': true,
        // 拖动期间最小单元距离不必与背景网格的单元格大小完全相同
        'draggingTool.gridSnapCellSize': new go.Size(40, 40),
        // 节点拉伸缩放是单元格的倍数
        'resizingTool.isGridSnapEnabled': true,
        // enable Ctrl-Z to undo and Ctrl-Y to redo
        'undoManager.isEnabled': true,
      })
      // 默认网格
      // diagram.grid.visible = true
      // 自定义单元格大小
      // diagram.grid.gridCellSize = new go.Size(20, 20)
      // // 节点拖动并不是线性移动，而是散点移动，默认对齐网格进行
      // diagram.toolManager.draggingTool.isGridSnapEnabled = true
      // // 节点拉伸缩放是单元格的倍数
      // diagram.toolManager.resizingTool.isGridSnapEnabled = true
      // // 拖动期间最小单元距离不必与背景网格的单元格大小完全相同
      // diagram.toolManager.draggingTool.gridSnapCellSize = new go.Size(40, 40)

      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        { resizable: true },
        $(go.Shape, 'Rectangle', { fill: 'lightgray' }),
        $(go.TextBlock, { margin: 5 }, new go.Binding('text', 'key')),
      )
      const nodeDataArray = [{ key: 'Alpha' }, { key: 'Beta' }, { key: 'Gamma' }]
      diagram.model = new go.GraphLinksModel(nodeDataArray)
    },
  },
}
</script>

<style lang="less" scoped>
.gojs-warp {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 0px - 16px);
  border: 3px solid palevioletred;
  overflow: auto;
  #myDiagramDiv {
    width: 70vw;
    height: 70vh;
    border: 3px solid palevioletred;
  }
}
</style>
