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
        new go.Binding('location', 'loc', go.Point.parse),
        $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, new go.Binding('fill', 'color')),
        $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'key'))
      )
      diagram.linkTemplate = $(
        go.Link,
        $(go.Shape, { strokeWidth: 2 }),
        // The label
        $(go.Shape, 'Circle', { segmentIndex: 0, width: 15, height: 15, fill: 'red', strokeWidth: 2 }),
        $(go.Shape, { toArrow: 'Standard' })
      )
      diagram.model = new go.GraphLinksModel(
        [
          { key: 'Alpha', color: 'lightblue', loc: '0 0' },
          { key: 'Gamma', color: 'lightgreen', loc: '400 0' },
          { key: 'Delta', color: 'pink', loc: '0 200' }
        ],
        [
          { from: 'Alpha', to: 'Gamma' },
          { from: 'Gamma', to: 'Delta' },
          { from: 'Delta', to: 'Alpha' }
        ]
      )
      // This presumes the object to be animated is a label within a Link
      go.AnimationManager.defineAnimationEffect('fraction', function (
        obj,
        startValue,
        endValue,
        easing,
        currentTime,
        duration,
        animation
      ) {
        obj.segmentFraction = easing(currentTime, startValue, endValue - startValue, duration)
      })
      window.animateColorAndFraction = function () {
        // create one Animation for each link, so that they have independent durations
        diagram.links.each(function (node) {
          const animation = new go.Animation()
          animation.add(node.elt(1), 'fraction', 0, 1)
          animation.duration = 3000
          animation.reversible = false // Re-run backwards
          animation.runCount = Infinity // Animate forever
          animation.start()
        })
      }
      window.animateColorAndFraction()
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
