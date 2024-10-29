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
      diagram.add(
        $(
          go.Part,
          'Position',
          { position: new go.Point(0, 0), background: 'lightgray' },
          $(go.TextBlock, '(-50,50)', { position: new go.Point(-50, 50), background: 'lightgreen' }),
          $(go.TextBlock, '(50, 50)', { position: new go.Point(50, 50), background: 'lightgreen' }),
          $(go.TextBlock, '(0, 100)', { position: new go.Point(0, 100), background: 'lightgreen' }),
        ),
      )
      diagram.add(
        $(
          go.Part,
          go.Panel.Vertical, // or "Vertical"
          { position: new go.Point(200, 0), background: 'lightgray' },
          $(go.TextBlock, 'a longer string', { background: 'lightgreen' }),
          $(go.TextBlock, 'left', { background: 'lightgreen', alignment: go.Spot.Left }),
          $(go.TextBlock, 'center', { background: 'lightgreen', alignment: go.Spot.Center }),
          $(go.TextBlock, 'right', { background: 'lightgreen', alignment: go.Spot.Right }),
          $(go.TextBlock, 'stretch', { background: 'lightgreen', stretch: go.GraphObject.Fill }),
        ),
      )
      diagram.add(
        $(
          go.Part,
          go.Panel.Horizontal, // or "Horizontal"
          { position: new go.Point(330, 0), background: 'lightgray' },
          $(go.Shape, { width: 30, fill: 'lightgreen', height: 100 }),
          $(go.Shape, { width: 30, fill: 'lightgreen', height: 50, alignment: go.Spot.Top }),
          $(go.Shape, { width: 30, fill: 'lightgreen', height: 50, alignment: go.Spot.Center }),
          $(go.Shape, { width: 30, fill: 'lightgreen', height: 50, alignment: go.Spot.Bottom }),
          $(go.Shape, { width: 30, fill: 'lightgreen', stretch: go.GraphObject.Fill }),
        ),
      )
      diagram.add(
        $(
          go.Part,
          'Spot',
          {
            position: new go.Point(530, 0),
            background: 'lightgray',
            // alignment: go.Spot.Center,
            // alignmentFocusName: 'Main',
          },
          $(go.Shape, 'Rectangle', { name: 'Main', isPanelMain: true }, { fill: 'lightgreen', width: 100, height: 50 }),

          $(go.TextBlock, 'TL', {
            background: 'yellow',
            alignment: new go.Spot(0.8, 0.5, 0, 0),
            alignmentFocus: new go.Spot(0.5, 0.5, 0, 0),
          }),
          $(go.TextBlock, 'TR', {
            background: 'yellow',
            alignment: go.Spot.TopRight,
            alignmentFocus: new go.Spot(0.5, 0.5, 0, 0),
          }),
          $(go.TextBlock, 'BL', {
            background: 'yellow',
            alignment: go.Spot.BottomLeft,
            alignmentFocus: new go.Spot(0.5, 0.5, 0, 0),
          }),
          $(go.TextBlock, 'BR', {
            background: 'yellow',
            alignment: go.Spot.BottomRight,
            alignmentFocus: new go.Spot(0.5, 0.5, 0, 0),
          }),

          // NOTE: the main element isn't first, so it must be declared by setting isPanelMain to true
          // $(go.Shape, 'Rectangle', {}, { fill: '#de5e60', width: 100, height: 50 }),
        ),
      )
      diagram.add(
        $(
          go.Node,
          'Auto',
          { position: new go.Point(710, 0) },
          $(go.Shape, { fill: 'white', stroke: 'gray', strokeWidth: 3 }),
          $(
            go.Panel,
            'Table',
            // Set defaults for all rows and columns:
            { defaultRowSeparatorStroke: 'gray', defaultColumnSeparatorStroke: 'gray' },

            $(go.TextBlock, 'Header 1', { row: 0, column: 1, font: 'bold 10pt sans-serif', margin: 2 }),
            $(go.TextBlock, 'Header 2', { row: 0, column: 2, font: 'bold 10pt sans-serif', margin: 2 }),

            $(go.RowColumnDefinition, { row: 1, separatorStrokeWidth: 1.5, separatorStroke: 'black' }),
            $(go.RowColumnDefinition, { column: 1, width: 100, separatorStrokeWidth: 1.5, separatorStroke: 'black' }),

            $(go.TextBlock, 'One', { row: 1, column: 0, stroke: 'green', margin: 2 }),
            $(go.TextBlock, 'row 1 col 1', { row: 1, column: 1, margin: 2 }),
            $(go.TextBlock, 'row 1 col 2', { row: 1, column: 2, margin: 2 }),
            $(go.TextBlock, 'Two', { row: 2, column: 0, stroke: 'green', margin: 2 }),
            $(go.TextBlock, 'row 2 col 1', { row: 2, column: 1, margin: 2 }),
            $(go.TextBlock, 'row 2 col 2', { row: 2, column: 2, margin: 2 }),
            $(go.TextBlock, 'Three', { row: 3, column: 0, stroke: 'green', margin: 2 }),
            $(go.TextBlock, 'row 3 col 1', { row: 3, column: 1, margin: 2 }),
            $(go.TextBlock, 'row 3 col 2', { row: 3, column: 2, margin: 2 }),
          ),
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
  #myDiagramDiv {
    width: 70vw;
    height: 70vh;
    border: 3px solid palevioletred;
  }
}
</style>
