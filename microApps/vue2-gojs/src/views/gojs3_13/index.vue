<doc>
  @author: 李百成
  @description： gojs
</doc>
<template>
  <div class="gojs-warp">
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
      diagram.grid.visible = true

      function onSelectionChanged (node) {
        // 选择改变事件的回调函数
        const shape = node.findObject('Icon')
        if (shape !== null) {
          // 判断node的选择状态
          if (node.isSelected) {
            shape.fill = 'cyan'
            shape.stroke = '#de5e60'
            return
          }
          shape.fill = 'lightgray'
          shape.stroke = '#333'
        }
      }

      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        {
          selectionAdorned: true, // don't bother with any selection adornment
          selectionChanged: onSelectionChanged,
        }, // 在 Part.isSelected 改变后调用
        new go.Binding('location', 'loc', go.Point.parse),
        $(go.Shape, 'RoundedRectangle', { name: 'Icon', fill: 'lightgray', strokeWidth: 2 }),
        $(go.TextBlock, { margin: 5 }, new go.Binding('text', 'key')),
        {
          selectionAdornmentTemplate: $(
            go.Adornment,
            'Auto',
            $(go.Shape, 'RoundedRectangle', { fill: null, stroke: 'dodgerblue', strokeWidth: 4 }),
            // Placeholder占位符，获取成员部件边界的并集的大小和位置
            $(go.Placeholder),
          ),
        },
      )

      const nodeDataArray = [
        { key: 'Alpha', loc: '0 0' },
        { key: 'Beta', loc: '200 50' },
      ]
      const linkDataArray = [{ from: 'Alpha', to: 'Beta' }]
      diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)

      diagram.select(diagram.findNodeForKey('Beta'))
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
  #myDiagramDiv {
    width: 70vw;
    height: 70vh;
    border: 3px solid palevioletred;
  }
}
</style>
