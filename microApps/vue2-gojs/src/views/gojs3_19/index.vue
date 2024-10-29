<doc>
  @author: 李百成
  @description： gojs
</doc>
<template>
  <div class="gojs-warp">
    <div class="diagram-box">
      <div id="myDiagramDiv"></div>
      <div id="contextMenuDIV" style="position: absolute; background: white; z-index: 1000; display: none;">
        <p id="contextMenuItem">菜单1</p>
        <p id="contextMenuItem">菜单2</p>
      </div>
    </div>
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
      })
      diagram.grid.visible = true

      // diagram.isEnabled = false  // 禁用图表
      diagram.isReadOnly = true // 只读

      function cmCommand (e, obj) {
        // contextMenu
        console.log('part', obj.part)
        // 被点击的节点 the Node with the context menu
        console.log('adornedPart', obj.part.adornedPart)
        // 被点击节点的 nodeData
        console.log('data', obj.part.data)

        const node = obj.part.adornedPart // the Node with the context menu
        const buttontext = obj.elt(1) // the TextBlock
        alert(buttontext.text + ' command on ' + node.data.key)
      }

      function showContextMenu (obj, diagram, tool) {
        const contextMenuDIV = document.getElementById('contextMenuDIV')
        const pt = diagram.lastInput.viewPoint
        contextMenuDIV.style.left = pt.x + 20 + 'px'
        contextMenuDIV.style.top = pt.y + 20 + 'px'
        contextMenuDIV.style.display = 'block'
      }

      function hideContextMenu (diagram, tool) {
        const contextMenuDIV = document.getElementById('contextMenuDIV')
        contextMenuDIV.style.display = 'none'
      }

      const myContextMenu = $(go.HTMLInfo, {
        show: showContextMenu,
        hide: hideContextMenu,
      })

      // this is a normal Node template that also has a contextMenu defined for it
      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        $(go.Shape, 'RoundedRectangle', { fill: 'white' }, new go.Binding('fill', 'color')),
        $(go.TextBlock, { margin: 5 }, new go.Binding('text', 'key')),
        {
          // define a context menu for each node
          contextMenu: myContextMenu, // end Adornment
        },
      )

      const nodeDataArray = [
        { key: 'Alpha', color: 'lightyellow' },
        { key: 'Beta', color: 'orange' },
      ]
      const linkDataArray = [{ from: 'Alpha', to: 'Beta' }]
      diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
    },
  },
}
</script>

<style lang="less" scoped>
.gojs-warp {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 0px - 16px);
  border: 3px solid palevioletred;
  .diagram-box {
    position: relative;
  }
  #myDiagramDiv {
    width: 70vw;
    height: 70vh;
    border: 3px solid palevioletred;
  }
}
</style>
