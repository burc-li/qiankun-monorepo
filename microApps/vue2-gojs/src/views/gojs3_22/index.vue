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

      // A minimal Diagram
      // this function changes the category of the node data to cause the Node to be replaced
      function changeCategory (e, obj) {
        const node = obj.part
        if (node) {
          const diagram = node.diagram
          diagram.startTransaction('changeCategory')
          let cat = diagram.model.getCategoryForNodeData(node.data)
          if (cat === 'simple') cat = 'detailed'
          else cat = 'simple'
          diagram.model.setCategoryForNodeData(node.data, cat)
          diagram.commitTransaction('changeCategory')
        }
      }

      // The "simple" template just shows the key string and the color in the background.
      // There is a Button to invoke the changeCategory function.
      const simpletemplate = $(
        go.Node,
        'Spot',
        $(
          go.Panel,
          'Auto',
          $(go.Shape, 'Ellipse', new go.Binding('fill', 'color')),
          $(go.TextBlock, new go.Binding('text', 'key'))
        ),
        $('Button', { alignment: go.Spot.TopRight }, $(go.Shape, 'Rectangle', { width: 8, height: 8 }), {
          click: changeCategory
        })
      )

      // The "detailed" template shows all of the information in a Table Panel.
      // There is a Button to invoke the changeCategory function.
      const detailtemplate = $(
        go.Node,
        'Spot',
        $(
          go.Panel,
          'Auto',
          $(go.Shape, 'RoundedRectangle', new go.Binding('fill', 'color')),
          $(
            go.Panel,
            'Table',
            { defaultAlignment: go.Spot.Left },
            $(
              go.TextBlock,
              { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
              new go.Binding('text', 'key')
            ),
            $(go.TextBlock, { row: 1, column: 0 }, 'Description:'),
            $(go.TextBlock, { row: 1, column: 1 }, new go.Binding('text', 'desc')),
            $(go.TextBlock, { row: 2, column: 0 }, 'Color:'),
            $(go.TextBlock, { row: 2, column: 1 }, new go.Binding('text', 'color'))
          )
        ),
        $('Button', { alignment: go.Spot.TopRight }, $(go.Shape, 'Rectangle', { width: 8, height: 8 }), {
          click: changeCategory
        })
      )

      const templmap = new go.Map() // In TypeScript you could write: new go.Map<string, go.Node>();
      templmap.add('simple', simpletemplate)
      templmap.add('detailed', detailtemplate)
      diagram.nodeTemplateMap = templmap

      diagram.layout = $(go.TreeLayout)

      diagram.model.nodeDataArray = [
        { key: 'Beta', desc: 'second letter', color: 'lightblue', category: 'simple' },
        { key: 'Gamma', desc: 'third letter', color: 'pink', category: 'detailed' },
        { key: 'Delta', desc: 'fourth letter', color: 'cyan', category: 'detailed' }
      ]
      diagram.model.linkDataArray = [
        { from: 'Beta', to: 'Gamma' },
        { from: 'Gamma', to: 'Delta' }
      ]
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
