<doc>
  @author: 李百成
  @description： gojs
</doc>
<template>
  <div class="gojs-warp">
    <div id="myDiagramDiv"></div>
    <Button type="primary" @click="loadModel">Primary</Button>
  </div>
</template>

<script>
import * as go from 'gojs'
export default {
  name: 'gojs',
  components: {},
  props: {},
  data () {
    return {
      firstModel: true,
      diagram: null
    }
  },
  mounted () {
    this.initGojs()
  },
  methods: {
    initGojs () {
      const $ = go.GraphObject.make

      // 视图
      this.diagram = $(go.Diagram, 'myDiagramDiv', {
        // enable Ctrl-Z to undo and Ctrl-Y to redo
        'undoManager.isEnabled': true
      })
      this.diagram.grid.visible = true

      // A minimal Diagram
      this.diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        $(go.Shape, 'RoundedRectangle', new go.Binding('fill', 'color')),
        $(
          go.TextBlock,
          { margin: 3, font: '28px sans-serif' }, // some room around the text
          new go.Binding('text', 'key')
        )
      )
      this.diagram.nodeTemplateMap.add(
        'AnotherType2',
        $(
          go.Node,
          'Auto',
          $(go.Shape, 'Rectangle', { strokeWidth: 1, fill: 'lightyellow' }, new go.Binding('fill', 'color')),
          $(go.TextBlock, { margin: 12, font: '12px sans-serif' }, new go.Binding('text', 'text'))
        )
      )

      // Node template that is only used by the second model
      this.diagram.nodeTemplateMap.add(
        'TypeTwo',
        $(
          go.Node,
          'Horizontal',
          $(go.Shape, 'Circle', { width: 24, height: 24, strokeWidth: 0, portId: '' }, new go.Binding('fill', 'color')),
          $(go.TextBlock, { margin: 2, font: 'Bold 15px sans-serif' }, new go.Binding('text', 'key'))
        )
      )
      // Another node template that is only used by the second model
      this.diagram.nodeTemplateMap.add(
        'AnotherType',
        $(
          go.Node,
          'Auto',
          $(go.Shape, 'Rectangle', { strokeWidth: 1, fill: 'lightyellow' }, new go.Binding('fill', 'color')),
          $(go.TextBlock, { margin: 12, font: '12px sans-serif' }, new go.Binding('text', 'text'))
        )
      )
      this.loadModel()
    },
    loadModel () {
      const $ = go.GraphObject.make
      if (this.firstModel) {
        // load the first model
        this.diagram.layout = new go.Layout() // Simple layout
        this.diagram.model = new go.GraphLinksModel(
          [
            { key: 'Alpha', color: 'lightblue' },
            { key: 'Beta', color: 'lightblue' },
            { key: 'Gamma', color: 'lightgreen' },
            { key: 'Delta', color: 'lightgreen' },
            { text: 'Some comment', category: 'AnotherType2' }
          ],
          [
            { from: 'Alpha', to: 'Beta' },
            { from: 'Gamma', to: 'Delta' }
          ]
        )
      } else {
        // load the second model
        this.diagram.layout = $(go.TreeLayout, { angle: 90 })
        this.diagram.model = new go.GraphLinksModel(
          [
            { key: 'One', category: 'TypeTwo', color: go.Brush.randomColor() },
            { key: 'Two', category: 'TypeTwo', color: go.Brush.randomColor() },
            { key: 'Three', category: 'TypeTwo', color: go.Brush.randomColor() },
            { key: 'Four', category: 'TypeTwo', color: go.Brush.randomColor() },
            { key: 'Five', category: 'TypeTwo', color: go.Brush.randomColor() },
            { key: 'Six', category: 'TypeTwo', color: go.Brush.randomColor() },
            { text: 'Some comment', category: 'AnotherType' }
          ],
          [
            { from: 'One', to: 'Two' },
            { from: 'One', to: 'Three' },
            { from: 'Three', to: 'Four' },
            { from: 'Three', to: 'Five' },
            { from: 'Four', to: 'Six' }
          ]
        )
      }
      this.firstModel = !this.firstModel
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
