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
        'undoManager.isEnabled': true
      })
      diagram.grid.visible = true

      // diagram.isEnabled = false  // 禁用图表
      diagram.isReadOnly = true // 只读

      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        $(go.Shape, 'RoundedRectangle', { fill: 'white' }, new go.Binding('fill', 'color')),
        $(go.TextBlock, { margin: 5 }, new go.Binding('text', 'key')),
        {
          // define a tooltip for each node that displays the color as text
          toolTip: $('ToolTip', $(go.TextBlock, { margin: 4 }, new go.Binding('text', 'color'))) // end of Adornment
        }
      )

      // a function that produces the content of the diagram tooltip
      function diagramInfo (model) {
        return 'Model:\n' + model.nodeDataArray.length + ' nodes, ' + model.linkDataArray.length + ' links'
      }

      // provide a tooltip for the background of the Diagram, when not over any Part
      diagram.toolTip = $(
        'ToolTip',
        $(
          go.TextBlock,
          { margin: 4 },
          // use a converter to display information about the diagram model
          new go.Binding('text', '', diagramInfo)
        )
      )

      const nodeDataArray = [
        { key: 'Alpha', color: 'lightblue' },
        { key: 'Beta', color: 'pink' }
      ]
      const linkDataArray = [{ from: 'Alpha', to: 'Beta' }]
      diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
    }
  }
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
