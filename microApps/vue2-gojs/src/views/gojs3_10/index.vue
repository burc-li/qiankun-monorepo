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

      diagram.nodeTemplate = $(
        go.Node,
        'Spot',
        { selectionObjectName: 'BODY' },
        $(
          go.Panel,
          'Auto',
          { name: 'BODY', width: 150, height: 100 },
          { portId: '' },
          $(go.Shape, { fill: 'lightgray', stroke: null, strokeWidth: 0 }),
          $(go.TextBlock, new go.Binding('text')),
        ),
        $(
          go.Panel,
          'Spot',
          new go.Binding('opacity', 'ribbon', function (t) {
            return t ? 1 : 0
          }),
          // note that the opacity defaults to zero (not visible),
          // in case there is no "ribbon" property
          {
            opacity: 0,
            alignment: new go.Spot(1, 0, 5, -5),
            alignmentFocus: go.Spot.TopRight,
          },
          $(
            go.Shape, // the ribbon itself
            { geometryString: 'F1 M0 0 L30 0 70 40 70 70z', fill: 'red', stroke: null, strokeWidth: 0 },
          ),
          $(go.TextBlock, new go.Binding('text', 'ribbon'), {
            alignment: new go.Spot(0.5, 0.5, 6, -6),
            // alignment: new go.Spot(1, 0, -29, 29),
            maxSize: new go.Size(100, NaN),
            angle: 45,
            stroke: 'white',
            font: 'bold 13px sans-serif',
            textAlign: 'center',
          }),
        ),
      )

      diagram.model = new go.GraphLinksModel(
        [
          { key: 1, text: 'Alpha' },
          { key: 2, text: 'Beta', ribbon: 'NEWEST' },
        ],
        [],
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
  #myDiagramDiv {
    width: 70vw;
    height: 70vh;
    border: 3px solid palevioletred;
  }
}
</style>
