<doc>
  @author: 李百成
  @description： gojs
</doc>
<template>
  <div class="gojs-warp">
    <div class="diagram-box">
      <div id="myDiagramDiv"></div>
    </div>
  </div>
</template>

<script>
import * as go from 'gojs'
// import RotateMultipleTool from '@/utils/gojs/extends/RotateMultipleTool/RotateMultipleTool.js'
export default {
  name: 'gojs',
  components: {},
  props: {},
  data () {
    return {
      diagram: null,
    }
  },
  mounted () {
    this.initGojs()
    this._setToolManager()
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
      this.diagram = diagram
      window.diagram = diagram

      diagram.nodeTemplate = $(
        go.Node,
        'Vertical',
        {
          name: 'NODE',
          selectionAdorned: true,
          selectionObjectName: 'SHAPE',
          resizable: true,
          resizeObjectName: 'SHAPE',
          rotatable: true,
          locationSpot: go.Spot.Center,
        },
        $(
          go.Panel,
          'Spot',
          {
            name: 'Panel',
          },
          $(
            go.Shape,
            {
              name: 'SHAPE',
              strokeWidth: 1,
              fill: $(go.Brush, 'Linear', { 0.0: 'white', 1.0: '#de5e60' }),
            },
            new go.Binding('figure', 'fig'),
            new go.Binding('width'),
            new go.Binding('height'),
          ),
          // $(
          //   go.TextBlock,
          //   {
          //     name: 'TEXT',
          //     editable: true,
          //     isMultiline: true,
          //     isUnderline: false,

          //     textAlign: 'center',
          //     verticalAlignment: go.Spot.Center,
          //     alignmentFocus: go.Spot.Left,
          //     wrap: go.TextBlock.WrapBreakAll,

          //     width: 80,
          //     margin: 10,
          //     background: '#f00',
          //   },
          //   new go.Binding('text').makeTwoWay(),
          //   new go.Binding('alignment', '', (data, item) => {
          //     const mainElt = item.panel.findMainElement()
          //     const offsetX = mainElt.strokeWidth
          //     return new go.Spot(0, 0.5, offsetX, 0)
          //   }),
          //   new go.Binding('width', '', (data, item) => {
          //     const mainElt = item.panel.findMainElement()
          //     const figureFunc = go.Shape.getFigureGenerators().get(mainElt.figure)
          //     const geo = figureFunc(mainElt, mainElt.width, mainElt.height)
          //     const leftRate = geo.leftRate ? geo.leftRate : 0.33
          //     return data.width * leftRate - mainElt.strokeWidth
          //   }),
          // ),
          // $(
          //   go.TextBlock,
          //   {
          //     name: 'TEXT',
          //     editable: true,
          //     isMultiline: true,
          //     isUnderline: false,

          //     textAlign: 'center',
          //     alignment: new go.Spot(1, 0.5, -4, 0),
          //     alignmentFocus: go.Spot.Right,
          //     wrap: go.TextBlock.WrapBreakAll,

          //     width: 80,
          //     margin: 10,
          //     background: 'lightblue',
          //   },
          //   new go.Binding('text', 'subText').makeTwoWay(),
          //   new go.Binding('width', '', (data, item) => {
          //     return data.width * 0.67 - 4
          //   }),
          // ),
        ),
      )
      const nodeDataArray = [
        { text: '百成', subText: '程序员', width: 100, height: 40, fig: 'Rectangle' },
        { text: '百成', subText: '程序员', width: 100, height: 40, fig: 'G-RoundedRectangle' },
        { text: '百成', subText: '程序员', width: 100, height: 40, fig: 'B-Flow' },
        { text: '百成', subText: '程序员', width: 100, height: 40, fig: 'B_BusinessArea' },
        { text: '百成', subText: '程序员', width: 112, height: 40, fig: 'BU_FC_CostChain' },
      ]
      diagram.model = new go.Model(nodeDataArray)
    },
    _setToolManager () {
      const toolManager = this.diagram.toolManager
      this.diagram.toolManager = Object.assign(toolManager, {
        // rotatingTool: new RotateMultipleTool(),
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
