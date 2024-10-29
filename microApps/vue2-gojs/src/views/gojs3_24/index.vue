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
        // enable Ctrl-Z to undo and Ctrl-Y to redo
        'undoManager.isEnabled': true,
      })
      // 默认网格
      diagram.grid.visible = true
      // 节点拉伸缩放是单元格的倍数
      diagram.toolManager.draggingTool.isGridSnapEnabled = true
      diagram.toolManager.resizingTool.isGridSnapEnabled = true
      // 自定义单元格大小
      diagram.grid.gridCellSize = new go.Size(20, 20)

      diagram.add(
        $(
          go.Part,
          'Graduated',
          {
            graduatedMin: 0,
            graduatedMax: 100,
            graduatedTickBase: 0,
            graduatedTickUnit: 2.5,
            background: '#de5e60',
          },
          // H400 刻度尺长度
          $(go.Shape, { geometryString: 'M0 0 H400' }), // the main Shape
          // a short, frequent tick mark
          $(go.Shape, { geometryString: 'M0 0 V5' }),
          // a longer tick mark every four ticks
          $(go.Shape, { geometryString: 'M0 0 V10', interval: 4 }),
          // text label only every four ticks, with a vertical offset
          $(go.TextBlock, { segmentOffset: new go.Point(0, 12), interval: 4 }),
        ),
      )
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
