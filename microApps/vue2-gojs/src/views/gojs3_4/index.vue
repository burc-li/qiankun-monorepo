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

      diagram.add(
        $(
          go.Part,
          'Table',
          $(go.Shape, {
            row: 0,
            column: 0,
            figure: 'Circle',
            width: 100,
            height: 100,
            margin: 5,
            // A linear gradient brush from blue to red, going from top to bottom (default)
            fill: $(go.Brush, 'Linear', { 0.0: 'rgba(0,255,0,.3)', 1.0: '#de5e60' })
          }),
          $(go.Shape, {
            row: 0,
            column: 1,
            figure: 'Circle',
            width: 100,
            height: 100,
            margin: 5,
            // A linear gradient brush from blue to red, going from top to bottom (default)
            fill: $(go.Brush, 'Radial', { 0.0: 'rgba(0,255,0,.3)', 1.0: '#de5e60' })
          }),

          $(go.Shape, {
            row: 0,
            column: 2,
            figure: 'Circle',
            width: 100,
            height: 100,
            margin: 5,
            // A linear gradient brush from blue to red, going from bottom to top
            // by defining start and end spots
            fill: $(go.Brush, 'Linear', {
              0.0: 'rgba(0,255,0,.3)',
              1.0: '#de5e60',
              start: go.Spot.Bottom,
              end: go.Spot.Top
            })
          })
        )
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
