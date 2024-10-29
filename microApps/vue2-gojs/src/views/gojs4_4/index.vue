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
import { MyGridLayout, MyCircularLayout } from '@/utils/layout.js'
import { marginParse, getRandom } from '@/utils'
const $ = go.GraphObject.make
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
  },
  methods: {
    initGojs () {
      // 视图
      this.diagram = $(go.Diagram, 'myDiagramDiv', {
        // enable Ctrl-Z to undo and Ctrl-Y to redo
        'undoManager.isEnabled': true,
      })
      this.diagram.grid.visible = false

      this.diagram.nodeTemplate = this.getNodeTemplate()
      this.diagram.groupTemplateMap = this.getGroupTemplate()
      this.diagram.model = this.getModel()
    },

    // 获取 GroupTemplate
    getGroupTemplate () {
      const groupTemplate = $(
        go.Group,
        'Auto',
        $(go.Shape, { fill: 'white', strokeWidth: 2 }),
        $(
          go.Panel,
          'Table',
          $(go.RowColumnDefinition, {
            row: 1,
            separatorStrokeWidth: 2,
            separatorStroke: 'black',
          }),

          $(
            go.TextBlock,
            {
              row: 0,
              column: 0,
              columnSpan: 3,
              font: 'bold 16px sans-serif',
              editable: true,
              margin: new go.Margin(2, 0, 2, 0),
            },
            new go.Binding('text', 'name'),
          ),
          $(
            go.Placeholder,
            { row: 1, column: 0 },
            new go.Binding('margin', 'margin', function (margin) {
              return marginParse(margin)
            }),
          ),
        ),
      )
      const childGroupTemplate = $(
        go.Group,
        'Vertical',
        $(
          go.Panel,
          'Auto',
          $(go.Shape, 'RectangleLackBottom', { fill: 'white', strokeWidth: 2, desiredSize: new go.Size(400, 24) }),
          $(go.TextBlock, '', { alignment: go.Spot.Center }, new go.Binding('text', 'name')),
        ),
        $(go.Shape, {
          name: 'layoutBox',
          desiredSize: new go.Size(400, 400),
          fill: 'white',
          strokeWidth: 2,
        }),
      )

      const groupTemplateMap = new go.Map()
      groupTemplateMap.add('', groupTemplate)
      groupTemplateMap.add('child', childGroupTemplate)
      return groupTemplateMap
    },

    // 获取 NodeTemplate
    getNodeTemplate () {
      const nodeTemplate = $(
        go.Node,
        'Auto',
        // { position: new go.Point(80, 50) },
        { location: new go.Point(3, 30), locationSpot: go.Spot.TopLeft },
        $(go.Shape, { fill: '#de5e60' }),
        $(
          go.Panel,
          'Table',
          new go.Binding('itemArray', 'items'),
          {
            itemTemplate: $(
              go.Panel,
              'TableRow',
              $(go.TextBlock, { column: 0, margin: 2, font: 'bold 10pt sans-serif' }, new go.Binding('text', 'key')),
              $(go.TextBlock, { column: 1, margin: 10 }, new go.Binding('text', 'fig')),
              $(
                go.Shape,
                'Rectangle',
                { column: 2, margin: 2 },
                new go.Binding('desiredSize', 'size', go.Size.parse),
                new go.Binding('figure', 'fig'),
                new go.Binding('fill', 'fill'),
              ),
            ),
          },
          $(
            go.Panel,
            'TableRow',
            { isPanelMain: true }, // needed to keep this element when itemArray gets an Array
            $(go.TextBlock, 'key', { column: 0, margin: new go.Margin(2, 2, 2, 2), font: 'bold 10pt sans-serif' }),
            $(go.TextBlock, 'figure', { column: 1, margin: new go.Margin(2, 2, 2, 2), font: 'bold 10pt sans-serif' }),
            $(go.TextBlock, 'Location', { column: 2, margin: new go.Margin(2, 2, 2, 2), font: 'bold 10pt sans-serif' }),
          ),
          $(go.RowColumnDefinition, { row: 0, background: 'lightgray' }),
          $(go.RowColumnDefinition, { row: 1, separatorStroke: 'black' }),
        ),
      )

      return nodeTemplate
    },

    // 获取 Model
    getModel () {
      const nodeDataArray = [
        { key: 'A', name: '父容器1', isGroup: true, margin: '20,40,40,40' },
        { key: 'B', name: '父容器2', isGroup: true, margin: '20,40,40,40' },
        {
          key: 'A_1',
          name: '子容器',
          isGroup: true,
          group: 'A',
          category: 'child',
          margin: '20,20,20,20',
        },
        {
          key: 'A_1_1',
          name: 'itemArray',
          group: 'A_1',
          items: [
            { key: 'A_1_1_0', name: '0', fig: 'Ellipse', fill: '#f9d2de', size: '50 30' },
            { key: 'A_1_1_1', name: '1', fig: 'DoubleCircular', fill: '#ffeca9', size: '50 50' },
            { key: 'A_1_1_2', name: '2', fig: 'Ellipse', fill: '#ffdba9', size: '30 50' },
            { key: 'A_1_1_3', name: '3', fig: 'Ellipse', fill: '#c7e8ac', size: '30 50' },
            { key: 'A_1_1_4', name: '4', fig: 'Ellipse', fill: '#5abaa7', size: '50 40' },
            { key: 'A_1_1_5', name: '5', fig: 'Ellipse', fill: '#ef8d22', size: '60 30' },
          ],
        },
        {
          key: 'B_1',
          name: '子容器',
          isGroup: true,
          group: 'B',
          category: 'child',
          margin: '20,20,20,20',
        },
      ]
      // 范围[1-5]
      const random = getRandom(4, 1)
      const items = [...Array(random).keys()].map(item => {
        // 范围 [20-80]
        const widthRandom = getRandom(60, 20)
        const heightRandom = getRandom(60, 20)
        return {
          key: `B_1_1_${item}`,
          name: item,
          fig: widthRandom % 3 === 0 ? 'DoubleCircular' : 'Ellipse',
          fill: go.Brush.randomColor(),
          size: `${widthRandom} ${heightRandom}`,
        }
      })
      const childList = {
        key: 'B_1_1',
        name: 'itemArray',
        group: 'B_1',
        items,
      }
      nodeDataArray.push(childList)
      return new go.GraphLinksModel(nodeDataArray)
    },
  },
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
    width: 100%;
    height: 100%;
    border: 3px solid palevioletred;
  }
}
</style>
