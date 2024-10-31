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

      diagram.layout = $(
        go.LayeredDigraphLayout, // this will be discussed in a later section
        { columnSpacing: 5, setsPortSpots: false }
      )
      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        {
          fromSpot: go.Spot.RightSide, // coming out from middle-right
          toSpot: go.Spot.LeftSide
        }, // going into at middle-left
        $(go.Shape, 'Rectangle', { fill: 'lightgray' }),
        $(go.TextBlock, { margin: 5 }, new go.Binding('text', 'key'))
      )

      diagram.linkTemplate = $(
        go.Link,
        {
          routing: go.Link.Orthogonal, // Orthogonal routing
          corner: 2
        },
        $(go.Shape),
        $(go.Shape, { toArrow: 'Standard' })
      )

      const nodeDataArray = [
        { key: 'Alpha' },
        { key: 'Beta' },
        { key: 'Gamma' },
        { key: 'Delta' },
        { key: 'Epsilon' },
        { key: 'Zeta' },
        { key: 'Eta' },
        { key: 'Theta' }
      ]
      const linkDataArray = [
        { from: 'Beta', to: 'Alpha' },
        { from: 'Gamma', to: 'Alpha' },
        { from: 'Delta', to: 'Alpha' },
        { from: 'Alpha', to: 'Epsilon' },
        { from: 'Alpha', to: 'Epsilon' },
        { from: 'Alpha', to: 'Zeta' },
        { from: 'Alpha', to: 'Eta' },
        { from: 'Alpha', to: 'Theta' }
      ]
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
