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
import img01 from '@/assets/images/001.png'
import img02 from '@/assets/images/002.png'
import img03 from '@/assets/images/003.png'
import img04 from '@/assets/images/004.png'
import img05 from '@/assets/images/005.png'
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
      const myDiagram = $(go.Diagram, 'myDiagramDiv', {
        // enable Ctrl-Z to undo and Ctrl-Y to redo
        'undoManager.isEnabled': true
      })

      // 模型
      const myModel = $(go.TreeModel)
      myModel.nodeDataArray = [
        { key: 'A', name: '手机', img: img01 },
        { key: 'B', parent: 'A', name: '华为', img: img02 },
        { key: 'C', parent: 'A', name: '荣耀', img: img03 },
        { key: 'D', parent: 'B', name: 'Mate40', img: img04 },
        { key: 'E', parent: 'B', name: 'P50', img: img05 }
      ]

      // 添加模型
      myDiagram.model = myModel

      // 给节点添加样式
      myDiagram.nodeTemplate = $(
        go.Node,
        'Horizontal',
        { background: '#44CCFF' },

        new go.Binding('location', 'loc'),

        $(go.Shape, 'RoundedRectangle', {}, new go.Binding('figure', 'fig')),

        $(go.Picture, { margin: 12, width: 50, height: 50, background: 'red' }, new go.Binding('source', 'img')),

        $(
          go.TextBlock,
          'default text',
          { margin: 12, stroke: 'white', font: 'bold 16px sans-serif' },
          new go.Binding('text', 'name')
        )
      )

      // 添加布局
      // define a TreeLayout that flows from top to bottom
      myDiagram.layout = $(go.TreeLayout, { angle: 90, layerSpacing: 45 })

      // 连线模版
      myDiagram.linkTemplate = $(
        go.Link,
        // default routing is go.Link.Normal
        // default corner is 0
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 3, stroke: '#555' }) // the link shape
        // if we wanted an arrowhead we would also add another Shape with toArrow defined:
        // $(go.Shape, { toArrow: "Standard", stroke: null }
      )
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
