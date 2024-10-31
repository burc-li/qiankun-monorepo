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
        scale: 0.7
      })
      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        new go.Binding('location', 'loc', go.Point.parse),
        $(go.Shape, { width: 1, height: 1 })
      )

      diagram.linkTemplate = $(go.Link, { routing: go.Link.Normal }, $(go.Shape), $(go.Shape, { toArrow: 'Standard' }))

      const nodeDataArray = [
        { key: 'A', loc: '0 24' },
        { key: 'B', loc: '22 4' }
      ]
      const linkDataArray = [{ from: 'A', to: 'B' }]
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
    width: 32px;
    height: 32px;
    border: 3px solid palevioletred;
  }
}
</style>
