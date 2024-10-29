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
      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        $(go.Shape, 'Rectangle', { fill: 'lightgray' }),
        $(
          go.Panel,
          'Table',
          $(go.RowColumnDefinition, { column: 0, width: 30, alignment: go.Spot.Left }),
          $(go.RowColumnDefinition, { column: 1, width: 30, alignment: go.Spot.Right }),
          $(
            go.TextBlock, // the node title
            {
              column: 0,
              row: 0,
              columnSpan: 2,
              alignment: go.Spot.Center,
              font: 'bold 10pt sans-serif',
              margin: new go.Margin(4, 2),
            },
            new go.Binding('text', 'key'),
          ),
          $(
            go.Panel,
            'Horizontal',
            { column: 0, row: 1 },
            $(
              go.Shape, // the "A" port
              { width: 6, height: 6, portId: 'A' },
            ),
            $(go.TextBlock, 'A'), // "A" port label
          ),
          $(
            go.Panel,
            'Horizontal',
            { column: 0, row: 2 },
            $(
              go.Shape, // the "B" port
              { width: 6, height: 6, portId: 'B' },
            ),
            $(go.TextBlock, 'B'), // "B" port label
          ),
          $(
            go.Panel,
            'Horizontal',
            { column: 1, row: 1, rowSpan: 2 },
            $(go.TextBlock, 'Out'), // "Out" port label
            $(
              go.Shape, // the "Out" port
              { width: 6, height: 6, portId: 'Out' },
            ),
          ),
        ),
      )

      diagram.linkTemplate = $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 3 },
        $(go.Shape),
        $(go.Shape, { toArrow: 'Standard' }),
      )

      diagram.layout = $(go.LayeredDigraphLayout, { columnSpacing: 10 })

      diagram.model = $(go.GraphLinksModel, {
        linkFromPortIdProperty: 'fromPort', // required information:
        linkToPortIdProperty: 'toPort', // identifies data property names
        nodeDataArray: [{ key: 'Add1' }, { key: 'Add2' }, { key: 'Subtract1' }],
        linkDataArray: [
          { from: 'Add1', fromPort: 'Out', to: 'Subtract1', toPort: 'A' },
          { from: 'Add2', fromPort: 'Out', to: 'Subtract1', toPort: 'B' },
        ],
      })
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
