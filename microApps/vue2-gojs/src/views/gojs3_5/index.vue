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

      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        $(go.Shape, 'RoundedRectangle', { fill: '#3AA7A3' }),
        $(go.Panel, 'Vertical', new go.Binding('itemArray', 'items'), {
          itemTemplate: $(
            go.Panel,
            'Auto',
            { margin: 2 },
            $(go.Shape, 'RoundedRectangle', { fill: '#91E3E0' }, new go.Binding('fill', 'c')),
            $(go.TextBlock, new go.Binding('text', 't'), { margin: 2 })
          )
        })
      )

      diagram.model = $(go.GraphLinksModel, {
        nodeDataArray: [
          {
            key: 1,
            items: [
              { t: 'Alpha', c: 'orange' },
              { t: 'Beta' },
              { t: 'Gamma', c: 'green' },
              { t: 'Delta', c: 'yellow' }
            ]
          },
          {
            key: 2,
            items: [{ t: 'first', c: 'red' }, { t: 'second', c: 'cyan' }, { t: 'third' }]
          }
        ],
        linkDataArray: [{ from: 1, to: 2 }]
      })
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
