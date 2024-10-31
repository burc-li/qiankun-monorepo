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

      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        $(go.Shape, 'Ellipse', { fill: 'white' }),
        $(go.TextBlock, new go.Binding('text', 'key'))
      )

      diagram.groupTemplate = $(
        go.Group,
        'Vertical',
        $(
          go.Panel,
          'Auto',
          $(
            go.Shape,
            'RoundedRectangle', // 围绕着占位符Placeholder
            { parameter1: 4, fill: 'rgba(128,128,128,0.33)' }
          ),
          $(
            go.Placeholder, // 占位符,表示所有构件的面积，
            { padding: 5 }
          ) // 添加内边距
        ),
        $(
          go.TextBlock, // group title
          { alignment: go.Spot.Right, font: 'Bold 12pt Sans-Serif' },
          new go.Binding('text', 'key')
        )
      )

      const nodeDataArray = [
        { key: 'Alpha' },
        { key: 'Beta', group: 'Omega' },
        { key: 'Gamma', group: 'Omega' },
        { key: 'Omega', isGroup: true },
        { key: 'Delta' }
      ]
      const linkDataArray = [
        { from: 'Alpha', to: 'Beta' }, // from outside the Group to inside it
        { from: 'Beta', to: 'Gamma' }, // this link is a member of the Group
        { from: 'Omega', to: 'Delta' } // from the Group to a Node
      ]
      diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
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
