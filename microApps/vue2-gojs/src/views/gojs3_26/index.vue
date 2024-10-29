<doc>
  @author: 李百成
  @description： gojs
</doc>
<template>
  <div class="gojs-warp">
    <div class="btn-group">
      <button @click="() => updateMove(false)">移动</button>
      <button @click="() => updateMove(true)">跳过事务移动</button>
      <button @click="() => updateTransactionNest()">嵌套事务</button>
      <button @click="() => updateTransactionAsync()">嵌套异步事务</button>
    </div>

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
    // skipsUndoManager: true 不会将此事务添加到事务栈中，撤销时会跳过此事务，然后撤销上上一个事务
    updateMove (skip = false) {
      const diagram = window.diagram
      const node = diagram.nodes.first()
      const loc = `${Math.random() * 520}, ${Math.random() * 200}`

      diagram.skipsUndoManager = skip
      diagram.startTransaction('update loc')
      diagram.model.set(node.data, 'name', loc)
      diagram.commitTransaction('update loc')
      diagram.skipsUndoManager = false

      console.log('事务栈', diagram.undoManager.history.j)
    },
    // 嵌套事务 默认只会将最外层事务添加到事务栈中，但是撤销时会将内部嵌套的事务一起撤销掉
    // 嵌套事务 最外层加 skipsUndoManager = true 则不会将事务添加到事务栈中
    // 嵌套事务 内层加 skipsUndoManager = true 则只会将最外层事务添加到事务栈中，撤销时不会将内部嵌套的事务一起撤销掉
    updateTransactionNest () {
      const diagram = window.diagram
      const node = diagram.nodes.first()
      const name = Math.random() * 100
      const loc = `${Math.random() * 520}, ${Math.random() * 200}`

      // diagram.skipsUndoManager = true
      diagram.startTransaction('update loc')
      diagram.model.set(node.data, 'loc', loc)

      diagram.skipsUndoManager = true
      diagram.startTransaction('update name')
      diagram.model.set(node.data, 'name', name.toString())
      diagram.commitTransaction('update name')
      diagram.skipsUndoManager = false

      diagram.commitTransaction('update loc')
      // diagram.skipsUndoManager = false

      console.log('事务栈', diagram.undoManager.history.j)
    },

    // 嵌套事务，因为某些原因必须延迟执行 或者 需要等待接口返回后才能执行嵌套事务，如何才能一步撤销？？？？
    // 答：在定时器内部 或者 接口返回后 提交事务
    updateTransactionAsync () {
      const diagram = window.diagram
      const node = diagram.nodes.first()
      const name = Math.random() * 100
      const loc = `${Math.random() * 520}, ${Math.random() * 200}`

      // diagram.skipsUndoManager = true
      diagram.startTransaction('update loc')
      diagram.model.set(node.data, 'loc', loc)

      setTimeout(() => {
        // diagram.skipsUndoManager = true
        // diagram.startTransaction('update name')
        diagram.model.set(node.data, 'name', name.toString())
        // diagram.commitTransaction('update name')
        // diagram.skipsUndoManager = false

        diagram.commitTransaction('update loc')
      }, 500)

      // diagram.commitTransaction('update loc')
      // diagram.skipsUndoManager = false

      setTimeout(() => {
        console.log('事务栈', diagram.undoManager.history.j)
      }, 1000)
    },

    initGojs () {
      const $ = go.GraphObject.make

      // 视图
      const myDiagram = $(go.Diagram, 'myDiagramDiv', {
        // enable Ctrl-Z to undo and Ctrl-Y to redo 启用  ʌnˈdu撤销  riːˈduː重做
        'undoManager.isEnabled': true,
      })
      window.diagram = myDiagram

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
            // pgh.isSelected = false
          },
          // selectionObjectName: 'PIC',
        }, // set Node properties here

        // add Bindings here
        // example Node binding sets Node.location to the value of Node.data.loc
        new go.Binding('location', 'loc', go.Point.parse),

        // // this Shape will be Horizontal above the TextBlock
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
            margin: new go.Margin(0, 20, 0, 20),
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
          { margin: new go.Margin(0, 20, 0, 0), stroke: 'white', font: 'bold 16px sans-serif' }, // set TextBlock properties here
          // example TextBlock binding sets TextBlock.text to the value of Node.data.name
          new go.Binding('text', 'name'),
          new go.Binding('stroke', 'color'),
        ),
      )

      // 模型
      const myModel = $(go.Model)
      // in the model data, each node is represented by a JavaScript object:
      // reprɪˈzentɪd 代表
      myModel.nodeDataArray = [
        { name: 'Alpha', color: '#de5e60', img: img01, loc: '0 0' },
        { name: 'Beta', color: '#de5e60', img: img02, loc: '200 120' },
        { name: 'Gamma', color: '#de5e60', img: img03, loc: '400 240' },
      ]

      // 给视图添加模型
      myDiagram.model = myModel
    },
  },
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
