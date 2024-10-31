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
import RotateMultipleTool from '@/utils/gojs/extends/RotateMultipleTool.js'
import img01 from '@/assets/images/rotating.png'
const $ = go.GraphObject.make
export default {
  name: 'gojs',
  components: {},
  props: {},
  data () {
    return {
      diagram: null
    }
  },
  mounted () {
    this.initGojs()
  },
  methods: {
    initGojs () {
      // 视图
      const diagram = $(go.Diagram, 'myDiagramDiv', {
        // enable Ctrl-Z to undo and Ctrl-Y to redo
        'undoManager.isEnabled': true,
        scrollMargin: 500
      })
      diagram.grid.visible = true
      this.diagram = diagram

      // this._setToolManager()

      const resizeTemplate = this._getResizeTemplate()
      const rotateAdornmentTemplate = this._getRotateAdornmentTemplate()
      const nodeSelectionTemplate = this._getNodeSelectionTemplate()

      diagram.nodeTemplate = $(
        go.Part,
        'Vertical',
        {
          selectionAdorned: true,
          selectionObjectName: 'SHAPEPANEL',
          resizable: true,
          resizeObjectName: 'SHAPEPANEL',
          rotatable: true,
          locationSpot: go.Spot.Center,
          resizeAdornmentTemplate: resizeTemplate,
          // rotateAdornmentTemplate: rotateAdornmentTemplate,
          selectionAdornmentTemplate: nodeSelectionTemplate
        },
        $(
          go.Panel,
          'Auto',
          {
            margin: new go.Margin(0, 0, 10, 0)
          },
          $(
            go.Shape,
            {
              name: 'SHAPEPANEL',
              strokeWidth: 2,
              fill: $(go.Brush, 'Linear', { 0.0: 'white', 1.0: '#de5e60' }),
              desiredSize: new go.Size(80, 80),
              parameter1: 99
            },
            new go.Binding('figure', 'fig'),
            new go.Binding('width', '', (data, item) => {
              console.log('item', item)
              // 获取父节点的主元素或者第一个元素
              const mainElement = item.panel.findMainElement()
              const figure = go.Shape.getFigureGenerators().get(mainElement.figure)
              // console.log('mainElement', mainElement, mainElement.parameter1)
              // console.log('figure', figure)
              const geometry =
                typeof figure === 'function' ? figure(mainElement, mainElement.width, mainElement.height) : null
              const spot1 = geometry ? geometry.spot1 : go.Spot.TopLeft
              const spot2 = geometry ? geometry.spot2 : go.Spot.BottomRight
              return mainElement.width
            })
          ),
          $(go.TextBlock, 'new', { alignment: go.Spot.TopLeft, background: '#de5e60' })
        ),
        $(go.TextBlock, { textAlign: 'center', width: 80 }, new go.Binding('text', 'fig'))
      )

      const nodeDataArray = [
        { fig: 'Cuboid' },
        { fig: 'Process' },
        { fig: 'DataStorage' },
        { fig: 'Cube1' },
        { fig: 'YinYang' },
        { fig: 'Arch' },
        { fig: 'Pie' },
        { fig: 'ArcBtn' },
        { fig: 'B-RoundedRectangle' },
        { fig: 'G-RoundedRectangle' },
        { fig: 'B-Flow' },
        { fig: 'B-FlowGroup' },
        { fig: 'RoundRectangleLackTop' },
        { fig: 'RoundRectangleLackBottom' }
      ]
      diagram.model = new go.Model(nodeDataArray)
    },
    _setToolManager () {
      const toolManager = this.diagram.toolManager
      this.diagram.toolManager = Object.assign(toolManager, {
        rotatingTool: new RotateMultipleTool()
      })
      console.log('diagram', this.diagram)
    },
    _getResizeTemplate () {
      return $(
        go.Adornment,
        'Spot',
        {},
        $(go.Placeholder),
        this.makeResizeObj({
          alignment: go.Spot.TopLeft,
          cursor: 'nw-resize'
        }),
        this.makeResizeObj({
          alignment: go.Spot.Top,
          cursor: 'n-resize'
        }),
        this.makeResizeObj({
          alignment: go.Spot.TopRight,
          cursor: 'ne-resize'
        }),
        this.makeResizeObj({
          alignment: go.Spot.Left,
          cursor: 'w-resize'
        }),
        this.makeResizeObj({
          alignment: go.Spot.Right,
          cursor: 'e-resize'
        }),
        this.makeResizeObj({
          alignment: go.Spot.BottomLeft,
          cursor: 'sw-resize'
        }),
        this.makeResizeObj({
          alignment: go.Spot.Bottom,
          cursor: 's-resize'
        }),
        this.makeResizeObj({
          alignment: go.Spot.BottomRight,
          cursor: 'se-resize'
        })
      )
    },
    _getRotateAdornmentTemplate () {
      return $(
        go.Adornment,

        $(go.Picture, {
          source: require('@/assets/images/rotating.png'),
          desiredSize: new go.Size(15, 15)
        })
      )
    },
    _getNodeSelectionTemplate () {
      return $(
        go.Adornment,
        'Auto',
        {},
        $(go.Shape, 'Rectangle', {
          fill: null,
          stroke: 'orange',
          strokeWidth: 2,
          opacity: 0.7,
          cursor: 'move'
        }),
        $(go.Placeholder)
      )
    },
    makeResizeObj ({ alignment, cursor }) {
      return $(go.Shape, {
        alignment,
        cursor,
        fill: '#fff',
        stroke: 'orange',
        desiredSize: new go.Size(8, 8),
        mouseEnter (e, obj) {
          obj.fill = 'orange'
        },
        mouseLeave (e, obj) {
          obj.fill = '#fff'
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.gojs-warp {
  display: flex;
  flex-direction: column;
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
