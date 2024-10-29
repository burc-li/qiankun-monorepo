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
import { marginParse, getSizeByList, getFigByList, getFillByList } from '@/utils'
const $ = go.GraphObject.make
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
      // 视图
      const diagram = $(go.Diagram, 'myDiagramDiv', {
        // enable Ctrl-Z to undo and Ctrl-Y to redo
        'undoManager.isEnabled': true,
      })
      diagram.grid.visible = false

      diagram.nodeTemplate = this.getNodeTemplate()
      diagram.nodeTemplate.add(
        $(go.TextBlock, '结束', {
          row: 4,
          column: 0,
          columnSpan: 3,
          textAlign: 'center',
          stretch: go.GraphObject.Horizontal,
          background: '#de5e60',
        }),
      )
      diagram.groupTemplate = this.getGroupTemplate()

      diagram.model = this.getModel()
      diagram.layout = $(go.GridLayout, { spacing: new go.Size(40, 40) })
      window.diagram = diagram

      // function CascadeLayout () {
      //   go.Layout.call(this)
      //   this._offset = new go.Size(12, 12)
      // }
      // CascadeLayout.prototype.doLayout = function (coll) {
      //   // get the Nodes and Links to be laid out
      //   const parts = this.collectParts(coll)

      //   // Start the layout at the arrangement origin, a property inherited from Layout
      //   let x = this.arrangementOrigin.x
      //   let y = this.arrangementOrigin.y
      //   const offset = this._offset

      //   const it = parts.iterator
      //   while (it.next()) {
      //     const node = it.value
      //     if (!(node instanceof go.Node)) continue // ignore Links
      //     node.move(new go.Point(x, y))
      //     x += offset.width
      //     y += offset.height
      //   }
      // }
      // go.Diagram.inherit(CascadeLayout, go.Layout)

      // const layout = new CascadeLayout()
      // layout.doLayout()
    },

    // 获取 GroupTemplate
    getGroupTemplate () {
      const groupTemplate = $(
        go.Group,
        'Auto',
        { resizable: true, resizeObjectName: 'Table', background: '#de5e60' },
        $(go.Shape, { fill: 'white', strokeWidth: 2 }),
        $(
          go.Panel,
          'Table',
          { name: 'Table' },
          $(go.RowColumnDefinition, { row: 1, separatorStrokeWidth: 2, separatorStroke: 'black' }),

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
      return groupTemplate
    },

    // 获取 NodeTemplate
    getNodeTemplate () {
      const nodeTemplate = $(
        go.Node,
        'Table',
        {
          defaultSeparatorPadding: new go.Margin(18, 18, 18, 18),
        },
        $(go.RowColumnDefinition, { row: 0, separatorPadding: new go.Margin(40, 18, 18, 18) }),
        $(go.RowColumnDefinition, { row: 3, separatorPadding: new go.Margin(18, 18, 60, 18) }),

        $(
          go.Shape,
          { row: 0, column: 0 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 0, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 0, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 0, 'fill')),
        ),
        $(
          go.Shape,
          { row: 0, column: 1 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 1, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 1, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 1, 'fill')),
        ),
        $(
          go.Shape,
          { row: 0, column: 2 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 2, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 2, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 2, 'fill')),
        ),
        $(
          go.Shape,
          { row: 1, column: 0 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 3, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 3, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 3, 'fill')),
        ),
        $(
          go.Shape,
          { row: 1, column: 1 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 4, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 4, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 4, 'fill')),
        ),
        $(
          go.Shape,
          { row: 1, column: 2 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 5, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 5, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 5, 'fill')),
        ),
        $(
          go.Shape,
          { row: 2, column: 0 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 6, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 6, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 6, 'fill')),
        ),
        $(
          go.Shape,
          { row: 2, column: 1 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 7, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 7, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 7, 'fill')),
        ),
        $(
          go.Shape,
          { row: 2, column: 2 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 8, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 8, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 8, 'fill')),
        ),
        $(
          go.Shape,
          { row: 3, column: 0 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 9, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 9, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 9, 'fill')),
        ),
        $(
          go.Shape,
          { row: 3, column: 1 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 10, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 10, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 10, 'fill')),
        ),
        $(
          go.Shape,
          { row: 3, column: 2 },
          new go.Binding('desiredSize', '', node => this.getSizeByList(node.list, 11, 'size')),
          new go.Binding('figure', '', node => this.getFigByList(node.list, 11, 'fig')),
          new go.Binding('fill', '', node => this.getFillByList(node.list, 11, 'fill')),
        ),
      )
      return nodeTemplate
    },

    // 获取 Model
    getModel () {
      const nodeDataArray = [
        { key: 'container_1', name: '容器1', isGroup: true, margin: '20,40,40,40' },
        { key: 'container_2', name: '容器2', isGroup: true, margin: '20,40,40,40' },
        {
          key: 'container_1_1',
          name: '容器',
          isGroup: true,
          group: 'container_1',
          margin: '20,20,20,20',
        },
        {
          key: 'container_1_1',
          name: '容器',
          group: 'container_1_1',
          list: [
            { key: 0, name: 'Ellipse', fig: 'Ellipse', fill: '#f9d2de', size: '50 30' },
            { key: 1, name: 'Ellipse', fig: 'DoubleCircular', fill: '#ffeca9', size: '50 50' },
            { key: 2, name: 'Ellipse', fig: 'Ellipse', fill: '#ffdba9', size: '30 50' },
            { key: 3, name: 'Ellipse', fig: 'Ellipse', fill: '#c7e8ac', size: '30 50' },
            { key: 4, name: 'Ellipse', fig: 'Ellipse', fill: '#5abaa7', size: '50 40' },
            { key: 5, name: 'Ellipse', fig: 'Ellipse', fill: '#ef8d22', size: '60 30' },
            { key: 6, name: 'Ellipse', fig: 'Ellipse', fill: '#0c7cba', size: '60 60' },
            { key: 7, name: 'Ellipse', fig: 'Ellipse', fill: '#19967d', size: '30 70' },
            { key: 8, name: 'Ellipse', fig: 'Ellipse', fill: '#99d5ca', size: '30 60' },
            { key: 9, name: 'Ellipse', fig: 'Ellipse', fill: '#3aa6dd', size: '60 30' },
            { key: 10, name: 'Ellipse', fig: 'Ellipse', fill: '#a3d977', size: '30 70' },
            { key: 11, name: 'Ellipse', fig: 'Ellipse', fill: '#c1e4f7', size: '80 30' },
          ],
        },
        {
          key: 'container_2_1',
          name: '容器',
          isGroup: true,
          group: 'container_2',
          category: 'child',
          margin: '20,20,20,20',
        },
        {
          key: 'container_2_1',
          name: '容器',
          group: 'container_2_1',
          list: [
            { key: 0, name: 'Ellipse', fig: 'Ellipse', fill: '#f9d2de', size: '50 30' },
            { key: 1, name: 'Ellipse', fig: 'DoubleCircular', fill: '#ffeca9', size: '50 50' },
            { key: 2, name: 'Ellipse', fig: 'Ellipse', fill: '#ffdba9', size: '30 50' },
            { key: 3, name: 'Ellipse', fig: 'Ellipse', fill: '#c7e8ac', size: '30 50' },
            { key: 4, name: 'Ellipse', fig: 'Ellipse', fill: '#5abaa7', size: '50 40' },
            { key: 5, name: 'Ellipse', fig: 'Ellipse', fill: '#ef8d22', size: '60 30' },
            { key: 6, name: 'Ellipse', fig: 'Ellipse', fill: '#0c7cba', size: '60 60' },
            { key: 7, name: 'Ellipse', fig: 'Ellipse', fill: '#19967d', size: '30 70' },
            { key: 8, name: 'Ellipse', fig: 'Ellipse', fill: '#99d5ca', size: '30 60' },
            { key: 9, name: 'Ellipse', fig: 'Ellipse', fill: '#3aa6dd', size: '60 30' },
            { key: 10, name: 'Ellipse', fig: 'Ellipse', fill: '#a3d977', size: '30 70' },
            { key: 11, name: 'Ellipse', fig: 'Ellipse', fill: '#c1e4f7', size: '80 30' },
          ],
        },
      ]
      return new go.GraphLinksModel(nodeDataArray)
    },

    getSizeByList (list, key, property) {
      const node = list.find(item => item.key === key)
      return node && node[property] ? go.Size.parse(node[property]) : new go.Size(20, 20)
    },

    getFigByList (list, key, property) {
      const node = list.find(item => item.key === key)
      return node && node[property] ? node[property] : 'Rectangle'
    },

    getFillByList (list, key, property) {
      const node = list.find(item => item.key === key)
      return node && node[property] ? node[property] : '#fff'
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
    width: 80vw;
    height: 80vh;
    border: 3px solid palevioletred;
  }
}
</style>
