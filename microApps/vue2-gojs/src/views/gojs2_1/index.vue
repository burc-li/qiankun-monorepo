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
import img01 from '@/assets/images/001.png'
import img02 from '@/assets/images/002.png'
import img03 from '@/assets/images/003.png'
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
      const myDiagram = $(go.Diagram, 'myDiagramDiv', {
        // enable Ctrl-Z to undo and Ctrl-Y to redo 启用  ʌnˈdu撤销  riːˈduː重做
        'undoManager.isEnabled': true,
      })
      window.diagram = myDiagram

      // 模型
      const myModel = $(go.Model)
      // in the model data, each node is represented by a JavaScript object:
      // reprɪˈzentɪd 代表
      myModel.nodeDataArray = [
        { name: 'Alpha', img: img01 },
        { name: 'Beta', img: img02 },
        { name: 'Gamma', img: img03 },
      ]

      // 给视图添加模型
      myDiagram.model = myModel

      // 给节点添加样式
      myDiagram.nodeTemplate = $(
        go.Node,
        // second argument of a Node/Panel can be a Panel type
        'Horizontal',
        {
          name: '1',
          background: '#44CCFF',
          // selectable: false,
          click: (e, pgh) => {
            console.log(pgh, pgh.isSelected)
            pgh.isSelected = false
          },
          // selectionObjectName: 'PIC',
        }, // set Node properties here

        // add Bindings here
        // example Node binding sets Node.location to the value of Node.data.loc
        new go.Binding('location', 'loc'),

        // this Shape will be Horizontal above the TextBlock
        $(
          go.Panel,
          {},
          $(
            go.Shape,
            'RoundedRectangle', // string argument can name a predefined figure
            {}, // set Shape properties here
            // example Shape binding sets Shape.figure to the value of Node.data.fig
            new go.Binding('figure', 'fig'),
          ),
        ),

        $(
          go.Picture,
          // Pictures should normally have an explicit width and height.
          // This picture has a red background, only visible when there is no source set
          // or when the image is partially transparent.
          {
            name: 'PIC',
            margin: 20,
            width: 50,
            height: 50,
            background: 'red',
            click: (e, pgh) => {
              console.log(pgh, pgh.isSelected)
              setTimeout(_ => {
                pgh.part.isSelected = true
              }, 50)
            },
          },
          // Picture.source is data bound to the "source" attribute of the model data
          new go.Binding('source', 'img'),
        ),

        $(
          go.TextBlock,
          'default text', // string argument can be initial text string
          { margin: 12, stroke: 'white', font: 'bold 16px sans-serif' }, // set TextBlock properties here
          // example TextBlock binding sets TextBlock.text to the value of Node.data.name
          new go.Binding('text', 'name'),
        ),
      )
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
  #myDiagramDiv {
    width: 100%;
    height: 100%;
    border: 3px solid palevioletred;
  }
}
</style>
