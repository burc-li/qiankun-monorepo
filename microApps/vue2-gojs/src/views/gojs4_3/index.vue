<doc>
  @author: 李百成
  @description： gojs
  @TODO 容器1使用网格布局
  @TODO 容器2使用环形布局
  @TODO 容器内圆形数量/颜色/大小随机生成
  @TODO 节点可拖入/拖出容器（拖入/拖出重新布局）
  @BUG  重新布局相对坐标位置发生偏移
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
      currDragNode: null,
      dragProcessList: []
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
        maxSelectionCount: 1
      })
      this.diagram = diagram
      window.diagram = diagram

      diagram.grid.visible = true
      diagram.toolManager.dragSelectingTool.isEnabled = true

      diagram.nodeTemplate = this.getNodeTemplate()
      diagram.groupTemplateMap = this.getGroupTemplate()

      diagram.model = this.getModel()
      this.gridLayout()
      this.circularLayout()
    },

    // 获取 GroupTemplate
    getGroupTemplate () {
      const groupTemplate = $(
        go.Group,
        'Auto',
        { selectable: false },
        $(go.Shape, { fill: 'white', strokeWidth: 2 }),
        $(
          go.Panel,
          'Table',
          $(go.RowColumnDefinition, {
            row: 1,
            separatorStrokeWidth: 2,
            separatorStroke: 'black'
          }),

          $(
            go.TextBlock,
            {
              row: 0,
              column: 0,
              columnSpan: 3,
              font: 'bold 16px sans-serif',
              editable: true,
              margin: new go.Margin(2, 0, 2, 0)
            },
            new go.Binding('text', 'name')
          ),
          $(
            go.Placeholder,
            { row: 1, column: 0 },
            new go.Binding('margin', 'margin', function (margin) {
              return marginParse(margin)
            })
          )
        )
      )
      const childGroupTemplate = $(
        go.Group,
        'Vertical',
        { selectable: false },
        $(
          go.Panel,
          'Auto',
          $(go.Shape, 'RectangleLackBottom', { fill: 'white', strokeWidth: 2, desiredSize: new go.Size(400, 24) }),
          $(go.TextBlock, '', { alignment: go.Spot.Center }, new go.Binding('text', 'name'))
        ),
        $(go.Shape, {
          name: 'layoutBox',
          desiredSize: new go.Size(400, 500),
          fill: 'white',
          strokeWidth: 2,
          // 将拖动对象移入此对象时触发
          mouseDragEnter: (e, grp, prev) => {
            const { data: groupData } = grp.part
            if (!prev || groupData.key !== 'B_1') return

            const { diagram, data } = this.currDragNode
            diagram.commit(function (d) {
              d.model.set(data, 'isEntered', true)
            }, '')
            this.dragProcessList.push(data.isEntered)
          },
          // 将拖动对象移出此对象时触发
          mouseDragLeave: (e, grp, next) => {
            const { data: groupData } = grp.part
            const { data: nextGroupData } = next ? next.part : {}
            if (!next || groupData.key !== 'B_1') return

            let isEntered = false
            if (nextGroupData && nextGroupData.group === 'B_1') isEntered = true
            // this.currDragNode.data.isEntered = false
            const { diagram, data } = this.currDragNode
            diagram.commit(function (d) {
              d.model.set(data, 'isEntered', isEntered)
            }, '')
            this.dragProcessList.push(data.isEntered)

            if (nextGroupData && nextGroupData.group === 'B_1') return
            this.circularLayout('545 50')
          },
          // 在拖动过程中，把选中节点拖动到此对象上，且松开鼠标左键时触发
          mouseDrop: (e, grp) => {
            console.log('>>>>drop group')
            const { data: groupData } = grp.part
            // 拖拽到父容器1中的子容器 return
            if (groupData.key !== 'B_1') return
            const [lastOne] = this.dragProcessList.slice(-1)
            const hasFalse = this.dragProcessList.includes(false)
            if (!lastOne || !hasFalse) return
            this.circularLayout('545 50')
            grp.diagram.clearSelection()
          }
        })
      )

      const groupTemplateMap = new go.Map()
      groupTemplateMap.add('', groupTemplate)
      groupTemplateMap.add('child', childGroupTemplate)
      return groupTemplateMap
    },

    // 获取 NodeTemplate
    getNodeTemplate () {
      // mouseHold事件触发之前等待时间
      this.diagram.toolManager.holdDelay = 0
      const nodeTemplate = $(
        go.Node,
        'Auto',
        {
          location: new go.Point(0, 0),
          locationObjectName: '',
          locationSpot: go.Spot.Center
        },
        {
          // 在此对象上按下鼠标左键/右键一段时间后执行的事件
          mouseHold: (e, grp) => {
            if (e.right) return
            console.log('mouseHold', '左击')
          },
          // 在不按住任何鼠标按键，将鼠标移动到此对象中时触发
          mouseEnter: (e, grp) => {
            if (e.right) return
            this.currDragNode = grp
            this.dragProcessList = [grp.data.isEntered]
          },
          // 节点选中/取消选中时触发
          selectionChanged: grp => {
            grp.layerName = grp.isSelected ? 'Foreground' : ''
          },
          // 在拖动过程中，把选中节点拖动到此对象上，且松开鼠标左键时触发
          mouseDrop: (e, grp) => {
            console.log('>>>>drops')
            const { data } = grp
            if (data.group !== 'B_1') return
            const [lastOne] = this.dragProcessList.slice(-1)
            const hasFalse = this.dragProcessList.includes(false)
            if (!lastOne || !hasFalse) return
            this.circularLayout('545 50')
            grp.diagram.clearSelection()
          }
        },
        new go.Binding('desiredSize', 'size', go.Size.parse),
        $(go.Shape, 'Rectangle', { fill: 'white' }, new go.Binding('figure', 'fig'), new go.Binding('fill', 'fill')),
        $(go.TextBlock, new go.Binding('text', 'name'))
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
          margin: '20,20,20,20'
        },
        { key: 'A_1_0', name: '0', group: 'A_1', fig: 'Ellipse', fill: '#f9d2de', size: '50 30' },
        { key: 'A_1_1', name: '1', group: 'A_1', fig: 'DoubleCircular', fill: '#ffeca9', size: '50 50' },
        { key: 'A_1_2', name: '2', group: 'A_1', fig: 'Ellipse', fill: '#ffdba9', size: '30 50' },
        { key: 'A_1_3', name: '3', group: 'A_1', fig: 'Ellipse', fill: '#c7e8ac', size: '30 50' },
        { key: 'A_1_4', name: '4', group: 'A_1', fig: 'Ellipse', fill: '#5abaa7', size: '50 40' },
        { key: 'A_1_5', name: '5', group: 'A_1', fig: 'Ellipse', fill: '#ef8d22', size: '60 30' },
        { key: 'A_1_6', name: '6', group: 'A_1', fig: 'Ellipse', fill: '#0c7cba', size: '60 60' },
        { key: 'A_1_7', name: '7', group: 'A_1', fig: 'Ellipse', fill: '#19967d', size: '30 70' },
        { key: 'A_1_8', name: '8', group: 'A_1', fig: 'Ellipse', fill: '#99d5ca', size: '30 60' },
        { key: 'A_1_9', name: '9', group: 'A_1', fig: 'Ellipse', fill: '#3aa6dd', size: '60 30' },
        { key: 'A_1_10', name: '10', group: 'A_1', fig: 'Ellipse', fill: '#a3d977', size: '30 70' },
        { key: 'A_1_11', name: '11', group: 'A_1', fig: 'Ellipse', fill: '#c1e4f7', size: '80 30' },
        {
          key: 'B_1',
          name: '子容器',
          isGroup: true,
          group: 'B',
          category: 'child',
          margin: '20,20,20,20'
        }
      ]
      // 范围[3-15]
      const random = getRandom(12, 3)
      const childList = [...Array(random).keys()].map(item => {
        // 范围 [20-80]
        const widthRandom = getRandom(60, 20)
        const heightRandom = getRandom(60, 20)
        return {
          key: `B_1_${item}`,
          name: item,
          group: 'B_1',
          fig: widthRandom % 3 === 0 ? 'DoubleCircular' : 'Ellipse',
          fill: go.Brush.randomColor(),
          size: `${widthRandom} ${heightRandom}`,
          isEntered: true
        }
      })
      nodeDataArray.push(...childList)
      return new go.GraphLinksModel(nodeDataArray)
    },

    // 网格布局
    gridLayout () {
      const group = this.diagram.findNodeForKey('A_1')
      const nodeList = group.memberParts
      const myGridLayout = new MyGridLayout({ columns: 3, offset: '60 80', spacing: '20 15' })
      myGridLayout.doLayout(new go.List().addAll(nodeList))
    },

    // 圆形布局
    circularLayout (offset = '0 0') {
      const group = this.diagram.findNodeForKey('B_1')
      const nodeList = group.memberParts
      const myCircularLayout = new MyCircularLayout({ radius: 120, center: '200 250', offset })
      const list = new go.List().addAll(nodeList)
      const enteredlist = list.filter(item => item.data.isEntered)
      myCircularLayout.doLayout(enteredlist)
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
    width: 100%;
    height: 100%;
    border: 3px solid palevioletred;
  }
}
</style>
