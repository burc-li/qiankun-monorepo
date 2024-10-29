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
      dragProcessList: [],
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
        maxSelectionCount: 1,
      })
      this.diagram = diagram
      window.diagram = diagram

      diagram.grid.visible = true
      diagram.toolManager.dragSelectingTool.isEnabled = true

      diagram.nodeTemplate = this.getNodeTemplate()
      diagram.groupTemplateMap = this.getGroupTemplate()

      diagram.model = this.getModel()
      this.gridLayout()
    },

    // 获取 GroupTemplate
    getGroupTemplate () {
      const groupTemplateDetailed = $(
        go.Group,
        'Vertical',
        {
          background: '#4a69ff',
          width: 400,
          mouseDragEnter: (e, grp, prev) => {
            const { data } = grp.part
            if (prev) return
            grp.diagram.commit(d => {
              d.model.set(data, 'background', '#f00')
            })
            console.log('mouseDragEnter', data, grp, prev)
          },
          mouseDragLeave: (e, grp, next) => {
            const { data } = grp.part
            if (next) return
            grp.diagram.commit(d => {
              d.model.set(data, 'background', '#4a69ff')
            })
            console.log('mouseDragLeave', data, next)
          },
          subGraphExpandedChanged: group => {
            const { diagram, data, isSubGraphExpanded } = group
            const shape = group.findObject('layoutBox')
            console.log('shape', shape)
            const animation = new go.Animation()
            if (isSubGraphExpanded) {
              diagram.commit(d => {
                d.model.set(data, 'height', data.originalHeight)
              })
              animation.add(shape, 'height', shape.height, data.originalHeight)
            } else {
              diagram.commit(d => {
                d.model.set(data, 'originalHeight', data.height)
                d.model.set(data, 'height', 0)
              })
              animation.add(shape, 'height', shape.height, 0)
            }
            animation.start()
          },
        },
        new go.Binding('background', 'background'),
        $(
          go.Panel,
          'Spot',
          { background: '#f00', width: 400 },
          $(go.Shape, 'RectangleLackBottom', {
            isPanelMain: true,
            fill: 'rgba(0,0,0,0)',
            strokeWidth: 2,
            height: 24,
          }),
          $(go.TextBlock, '', { alignment: go.Spot.Center, stroke: '#fff' }, new go.Binding('text', 'name')),
          $('SubGraphExpanderButton', { alignment: new go.Spot(0, 0.5, 15, 0) }),
        ),
        $(
          go.Shape,
          {
            name: 'layoutBox',
            fill: 'rgba(0,0,0,0)',
            width: 398,
            height: 250,
            strokeWidth: 2,
          },
          // new go.Binding('height', 'height', height => (height ? height - 24 : height)),
        ),
      )
      const groupTemplateMap = new go.Map()

      groupTemplateMap.add('detailed', groupTemplateDetailed)
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
          locationSpot: go.Spot.Center,
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
            const { data } = grp
            if (data.group !== 'B_1') return
            const [lastOne] = this.dragProcessList.slice(-1)
            const hasFalse = this.dragProcessList.includes(false)
            if (!lastOne || !hasFalse) return
            this.circularLayout('545 50')
            grp.diagram.clearSelection()
          },
        },
        new go.Binding('desiredSize', 'size', go.Size.parse),
        $(go.Shape, 'Rectangle', { fill: 'white' }, new go.Binding('figure', 'fig'), new go.Binding('fill', 'fill')),
        $(go.TextBlock, new go.Binding('text', 'name')),
      )
      return nodeTemplate
    },

    // 获取 Model
    getModel () {
      const nodeDataArray = [
        {
          key: 'A',
          name: '步骤一规则',
          isGroup: true,
          category: 'detailed',
          margin: '20,40,40,40',
          width: 400,
          height: 224,
        },
        { key: 'A_0', name: '0', group: 'A', fig: 'Ellipse', fill: '#f9d2de', size: '50 30' },
        { key: 'A_1', name: '1', group: 'A', fig: 'DoubleCircular', fill: '#ffeca9', size: '50 50' },
        { key: 'A_2', name: '2', group: 'A', fig: 'Ellipse', fill: '#ffdba9', size: '30 50' },
        { key: 'A_3', name: '3', group: 'A', fig: 'Ellipse', fill: '#c7e8ac', size: '30 50' },
        { key: 'A_4', name: '4', group: 'A', fig: 'Ellipse', fill: '#5abaa7', size: '50 40' },
        { key: 'A_5', name: '5', group: 'A', fig: 'Ellipse', fill: '#ef8d22', size: '60 30' },
      ]

      return new go.GraphLinksModel(nodeDataArray)
    },

    // 网格布局
    gridLayout () {
      const group = this.diagram.findNodeForKey('A')
      const nodeList = group.memberParts
      const myGridLayout = new MyGridLayout({ columns: 3, offset: '60 80', spacing: '20 15' })
      myGridLayout.doLayout(new go.List().addAll(nodeList))
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
