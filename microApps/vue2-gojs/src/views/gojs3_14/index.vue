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

      function onClickNode (e, node) {
        // highlight all Links and Nodes coming out of a given Node
        const diagram = node.diagram
        // diagram.startTransaction('highlight')
        // remove any previous highlighting
        diagram.clearHighlighteds()
        // for each Link coming out of the Node, set Link.isHighlighted
        node.findLinksOutOf().each(function (l) {
          l.isHighlighted = true
        })
        // for each Node destination for the Node, set Node.isHighlighted
        node.findNodesOutOf().each(function (n) {
          n.isHighlighted = true
        })
        // diagram.commitTransaction('highlight')
      }

      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        {
          // when the user clicks on a Node, highlight all Links coming out of the node
          // and all of the Nodes at the other ends of those Links.
          click: onClickNode
        },
        $(
          go.Shape,
          'Rectangle',
          { strokeWidth: 2, stroke: null },
          new go.Binding('fill', 'color'),
          // the Shape.stroke color depends on whether Node.isHighlighted is true
          new go.Binding('stroke', 'isHighlighted', function (h) {
            return h ? 'red' : 'black'
          }).ofObject()
        ),
        $(go.TextBlock, { margin: 10, font: 'bold 18px Verdana' }, new go.Binding('text', 'key'))
      )

      // define the Link template
      diagram.linkTemplate = $(
        go.Link,
        { toShortLength: 4 },
        $(
          go.Shape,
          // the Shape.stroke color depends on whether Link.isHighlighted is true
          new go.Binding('stroke', 'isHighlighted', function (h) {
            return h ? 'red' : 'black'
          }).ofObject(),
          // the Shape.strokeWidth depends on whether Link.isHighlighted is true
          new go.Binding('strokeWidth', 'isHighlighted', function (h) {
            return h ? 3 : 1
          }).ofObject()
        ),
        $(
          go.Shape,
          { toArrow: 'Standard', strokeWidth: 0 },
          // the Shape.fill color depends on whether Link.isHighlighted is true
          new go.Binding('fill', 'isHighlighted', function (h) {
            return h ? 'red' : 'black'
          }).ofObject()
        )
      )

      // when the user clicks on the background of the Diagram, remove all highlighting
      diagram.click = function (e) {
        e.diagram.commit(function (d) {
          d.clearHighlighteds()
        }, 'no highlighteds')
        // 或
        // diagram.clearHighlighteds()
      }

      diagram.model = new go.GraphLinksModel(
        [
          { key: 'Alpha', color: '#96D6D9' },
          { key: 'Beta', color: '#96D6D9' },
          { key: 'Gamma', color: '#EFEBCA' },
          { key: 'Delta', color: '#EFEBCA' }
        ],
        [
          { from: 'Alpha', to: 'Beta' },
          { from: 'Alpha', to: 'Gamma' },
          { from: 'Beta', to: 'Beta' },
          { from: 'Gamma', to: 'Delta' },
          { from: 'Delta', to: 'Alpha' }
        ]
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
