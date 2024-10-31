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
      diagram.grid.visible = true

      // diagram.isEnabled = false  // 禁用图表
      diagram.isReadOnly = false // 只读

      function clickNode (e, node) {
        // node.isSelected：节点选中状态
        // node.data:节点数据
        // e.diagram === node.diagram：true
        // e.diagram.model.nodeDataArray
        // e.diagram.model.linkDataArray
        console.log('node.isSelected', node.isSelected)
        console.log('node.data', node.data)
        console.log('e.diagram === node.diagram', e.diagram === node.diagram)
        console.log('e.diagram.model.nodeDataArray', e.diagram.model.nodeDataArray)
        console.log('e.diagram.model.linkDataArray', e.diagram.model.linkDataArray)
      }

      function changeZOrder (node) {
        // node.isSelected：节点选中状态
        // node.data 节点数据
        diagram.commit(function (d) {
          const isSelected = node.isSelected
          const zOrder = isSelected ? 999 : node.data.zOrderOrigin
          d.model.set(node.data, 'zOrder', zOrder)
        }, 'modified zOrder')
      }

      diagram.nodeTemplate = $(
        go.Part,
        'Spot', // no links or grouping, so can use the simpler Part class
        new go.Binding('layerName', 'color'),
        new go.Binding('location', 'loc'),
        new go.Binding('zOrder', 'zOrder'),
        $(go.Shape, { width: 80, height: 80 }, new go.Binding('fill', 'color')),
        $(go.TextBlock, { stroke: 'white', font: 'bold 12px sans-serif' }, new go.Binding('text', 'color')),
        {
          click: clickNode,
          selectionChanged: function (node) {
            changeZOrder(node)
            node.layerName = 'Foreground'
          },
          // layerName发生改变时
          layerChanged: function (p, oldLayer, newLayer) {
            if (newLayer !== null) p.elt(1).text = newLayer.name
          }
        }
      )

      const array = []
      for (let i = 0; i < 12; i++) {
        const data = { loc: new go.Point(Math.random() * 520, Math.random() * 200) }
        switch (Math.floor(Math.random() * 3)) {
          case 0:
            data.color = 'blue'
            data.zOrderOrigin = 0
            data.zOrder = 0
            break
          case 1:
            data.color = 'green'
            data.zOrderOrigin = 1
            data.zOrder = 1
            break
          default:
            data.color = 'orange'
            data.zOrderOrigin = 2
            data.zOrder = 2
            break
        }
        array.push(data)
      }
      diagram.model.nodeDataArray = array
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
