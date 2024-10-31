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
const $ = go.GraphObject.make
const HORIZONTAL = true
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
      function BandedTreeLayout () {
        go.TreeLayout.call(this)
        this.layerStyle = go.TreeLayout.LayerUniform // needed for straight layers
      }
      go.Diagram.inherit(BandedTreeLayout, go.TreeLayout)
      BandedTreeLayout.prototype.commitLayers = function (layerRects, offset) {
        console.log('layerRects', layerRects, offset)
        // update the background object holding the visual "bands"
        const bands = this.diagram.findPartForKey('_BANDS')
        if (bands) {
          const model = this.diagram.model
          bands.location = this.arrangementOrigin.copy().add(offset)
          console.log('bands.elements', bands.elements)
          // make each band visible or not, depending on whether there is a layer for it
          for (let it = bands.elements; it.next();) {
            console.log('it', it)
            const idx = it.key
            const elt = it.value // the item panel representing a band
            elt.visible = idx < layerRects.length
          }
          // set the bounds of each band via data binding of the "bounds" property
          const arr = bands.data.itemArray
          for (let i = 0; i < layerRects.length; i++) {
            console.log('layerRects', layerRects[i])
            const itemdata = arr[i]
            if (itemdata) {
              model.setDataProperty(itemdata, 'bounds', layerRects[i])
            }
          }
        }
      }

      const myDiagram = $(go.Diagram, 'myDiagramDiv', {
        layout: $(
          BandedTreeLayout, // custom layout is defined above
          {
            angle: HORIZONTAL ? 0 : 90,
            arrangement: HORIZONTAL ? go.TreeLayout.ArrangementVertical : go.TreeLayout.ArrangementHorizontal
          }
        ),
        'undoManager.isEnabled': true
      })

      myDiagram.nodeTemplate = $(
        go.Node,
        go.Panel.Auto,
        $(go.Shape, 'Rectangle', { fill: 'white' }),
        $(go.TextBlock, { margin: 5 }, new go.Binding('text', 'key'))
      )
      // There should be at most a single object of this category.
      // This Part will be modified by BandedTreeLayout.commitLayers to display visual "bands"
      // where each "layer" is a layer of the tree.
      // This template is parameterized at load time by the HORIZONTAL parameter.
      // You also have the option of showing rectangles for the layer bands or
      // of showing separator lines between the layers, but not both at the same time,
      // by commenting in/out the indicated code.
      myDiagram.nodeTemplateMap.add(
        'Bands',
        $(go.Part, 'Position', new go.Binding('itemArray'), {
          locationSpot: new go.Spot(0, 0, HORIZONTAL ? 0 : 16, HORIZONTAL ? 16 : 0), // account for header height
          layerName: 'Background',
          selectable: false,
          itemTemplate: $(
            go.Panel,
            HORIZONTAL ? 'Vertical' : 'Horizontal',
            new go.Binding('position', 'bounds', function (b) {
              return b.position
            }),
            $(
              go.TextBlock,
              {
                angle: HORIZONTAL ? 0 : 270,
                textAlign: 'center',
                wrap: go.TextBlock.None,
                font: 'bold 11pt sans-serif',
                background: $(go.Brush, 'Linear', { 0: 'aqua', 1: go.Brush.darken('aqua') })
              },
              new go.Binding('text'),
              // always bind "width" because the angle does the rotation
              new go.Binding('width', 'bounds', function (r) {
                return HORIZONTAL ? r.width : r.height
              })
            ),
            $(
              go.Shape,
              { stroke: null, strokeWidth: 0 },
              new go.Binding('desiredSize', 'bounds', function (r) {
                return r.size
              }),
              new go.Binding('fill', 'itemIndex', function (i) {
                return i % 2 === 0 ? 'whitesmoke' : go.Brush.darken('whitesmoke')
              }).ofObject()
            )
          )
        })
      )
      myDiagram.linkTemplate = $(go.Link, $(go.Shape)) // simple black line, no arrowhead needed
      // define the tree node data
      const nodearray = [
        {
          // this is the information needed for the headers of the bands
          key: '_BANDS',
          category: 'Bands',
          itemArray: [
            { text: 'Zero' },
            { text: 'One' },
            { text: 'Two' },
            { text: 'Three' },
            { text: 'Four' },
            { text: 'Five' }
          ]
        },
        // these are the regular nodes in the TreeModel
        { key: 'root' },
        { key: 'oneB', parent: 'root' },
        { key: 'twoA', parent: 'oneB' },
        { key: 'twoC', parent: 'root' },
        { key: 'threeC', parent: 'twoC' },
        { key: 'threeD', parent: 'twoC' },
        { key: 'fourB', parent: 'threeD' },
        { key: 'fourC', parent: 'twoC' },
        { key: 'fourD', parent: 'fourB' },
        { key: 'twoD', parent: 'root' }
      ]
      myDiagram.model = new go.TreeModel(nodearray)
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
    width: 80vw;
    height: 80vh;
    border: 3px solid palevioletred;
  }
}
</style>
