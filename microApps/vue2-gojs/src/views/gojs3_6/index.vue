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

      // 连线类型
      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        new go.Binding('location', 'loc', go.Point.parse),
        $(go.Shape, 'RoundedRectangle', { fill: 'lightgray' }),
        $(go.TextBlock, { margin: 5 }, new go.Binding('text', 'key')),
      )

      diagram.linkTemplate = $(
        go.Link,
        new go.Binding('routing', 'routing'),
        $(go.Shape),
        $(go.Shape, { toArrow: 'Standard' }),
      )

      const nodeDataArray = [
        { key: 'Alpha', loc: '0 0' },
        { key: 'Beta', loc: '250 40' },
        { key: 'Gamma', loc: '100 0' },
        { key: 'Delta', loc: '75 50' },
        { key: 'Epsilon', loc: '150 30' },
        { key: 'burc', loc: '-50 -60' },
        { key: 'vinx', loc: '-50 60' },
      ]
      const linkDataArray = [
        { from: 'Alpha', to: 'vinx', routing: go.Link.Normal },
        { from: 'Alpha', to: 'vinx', routing: go.Link.Normal },
        { from: 'vinx', to: 'vinx', routing: go.Link.Normal },
        { from: 'Alpha', to: 'burc', routing: go.Link.Orthogonal },
        { from: 'Alpha', to: 'burc', routing: go.Link.Orthogonal },
        { from: 'Alpha', to: 'Beta', routing: go.Link.AvoidsNodes },
        { from: 'Alpha', to: 'Beta', routing: go.Link.AvoidsNodes },
      ]
      diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
      // diagram.model = $(go.GraphLinksModel, { nodeDataArray, linkDataArray })

      const layout = $(go.LayeredDigraphLayout, {
        // isOngoing: false,
        columnSpacing: 15,
        layerSpacing: 180,
        // 设置重合线分离
        // setsPortSpots: false,
        packOption: go.LayeredDigraphLayout.PackAll,
      })
      layout.doLayout(diagram)
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
