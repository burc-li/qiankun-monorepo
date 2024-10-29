<doc>
  @author: 李百成
  @description： gojs
</doc>
<template>
  <div class="gojs-warp">
    <div class="diagram-box">
      <div id="myDiagramDiv"></div>
      <div id="toolTipDIV" style="position: absolute; background: white; z-index: 1000; display: none;">
        <p id="toolTipParagraph">Tooltip</p>
      </div>
    </div>
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

      // diagram.isEnabled = false  // 禁用图表
      diagram.isReadOnly = true // 只读

      function showToolTip (obj, diagram, tool) {
        const toolTipDIV = document.getElementById('toolTipDIV')
        const pt = diagram.lastInput.viewPoint
        toolTipDIV.style.left = pt.x + 10 + 'px'
        toolTipDIV.style.top = pt.y + 10 + 'px'
        document.getElementById('toolTipParagraph').textContent = 'Tooltip for: ' + obj.data.key
        toolTipDIV.style.display = 'block'
      }

      function hideToolTip (diagram, tool) {
        const toolTipDIV = document.getElementById('toolTipDIV')
        toolTipDIV.style.display = 'none'
      }

      const myToolTip = $(go.HTMLInfo, {
        show: showToolTip,
        hide: hideToolTip,
      })

      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        $(go.Shape, 'RoundedRectangle', { fill: 'white' }, new go.Binding('fill', 'color')),
        $(go.TextBlock, { margin: 5 }, new go.Binding('text', 'key')),
        {
          // toolTip: $('ToolTip', $(go.TextBlock, { margin: 4 }, new go.Binding('text', 'color'))),
          toolTip: myToolTip,
        },
      )

      const nodeDataArray = [
        { key: 'Alpha', color: 'lightblue' },
        { key: 'Beta', color: 'pink' },
      ]
      const linkDataArray = [{ from: 'Alpha', to: 'Beta' }]
      diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
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
  .diagram-box {
    position: relative;
  }
  #myDiagramDiv {
    width: 70vw;
    height: 70vh;
    border: 3px solid palevioletred;
  }
}
</style>
