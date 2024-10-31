<doc>
  @author: 李百成
  @description： gojs
</doc>
<template>
  <div class="gojs-warp">
    <div id="imgBox"></div>
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
        'undoManager.isEnabled': true,
        scale: 1
      })
      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        new go.Binding('location', 'loc', go.Point.parse),
        $(go.Shape, { width: 0, height: 0 })
      )

      diagram.linkTemplate = $(
        go.Link,
        { routing: go.Link.Normal },
        $(go.Shape, { strokeDashArray: [2, 2] }),

        $(go.Shape, { fromArrow: 'Circle', fill: '#fff' }),
        $(go.Shape, { toArrow: 'OpenTriangle' })
      )

      const nodeDataArray = [
        { key: 'A', loc: '10 30' },
        { key: 'B', loc: '22 10' }
      ]
      const linkDataArray = [{ from: 'A', to: 'B' }]
      diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)

      document.getElementById('imgBox').appendChild(
        diagram.makeSvg({
          parts: diagram.links,
          size: new go.Size(32, 32)
        })
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
  overflow: auto;
  #myDiagramDiv {
    width: 100px;
    height: 100px;
    border: 3px solid palevioletred;
  }
}
</style>
