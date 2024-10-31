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

      diagram.nodeTemplate = $(
        go.Node,
        'Horizontal',
        // { isTreeExpanded: false },
        new go.Binding('text', 'key'),
        $(go.Panel, 'Auto', $(go.Shape, 'Ellipse', { fill: null }), $(go.TextBlock, new go.Binding('text', 'key'))),
        $('TreeExpanderButton')
      )

      diagram.linkTemplate = $(go.Link, { routing: go.Link.Orthogonal, corner: 5 }, $(go.Shape))

      const nodeDataArray = [
        { key: 'Alpha' },
        { key: 'Beta', parent: 'Alpha' },
        { key: 'Gamma', parent: 'Beta' },
        { key: 'Delta', parent: 'Beta' },
        { key: 'Epsilon', parent: 'Alpha' },
        { key: 'Zeta', parent: 'Epsilon' },
        { key: 'Eta', parent: 'Epsilon' },
        { key: 'Theta', parent: 'Epsilon' },
        { key: 'burc', parent: 'Delta' }
      ]
      diagram.model = new go.TreeModel(nodeDataArray)

      diagram.layout = $(go.TreeLayout, {
        angle: 0,
        layerSpacing: 30,
        nodeSpacing: 20,
        alignment: go.TreeLayout.AlignmentStart,
        sorting: go.TreeLayout.SortingAscending
      })
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
