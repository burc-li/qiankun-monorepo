<doc>
  @author: 李百成
  @description： gojs

  layout: $(go.GridLayout, {cellSize: new go.Size(1, 1)}
  Gets or sets the minimum part size by which each part is positioned in the grid When the cell size is smaller than a part, the part will occupy more than one cell

  grp.addMembers(grp.diagram.selection, true)
  Add the Parts in the given collection as members of this Group for those Parts for which CommandHandler.isValidMember returns true

  e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true)
  Make sure all of the unnested Parts in the given collection are removed from any containing Groups

  myDiagram.findTopLevelGroups()
  Returns an iterator of all Groups that are at top-level, in other words that are not themselves inside other Groups

  myDiagram = $(go.Diagram, 'myDiagramDiv', { 'commandHandler.archetypeGroupData': { isGroup: true, category: 'OfGroups' },})
  If you want the user to be able to create a Group out of the currently selected Parts using the CommandHandler.groupSelection command,
  you need to first set the CommandHandler.archetypeGroupData property to a data object with isGroup set to true
  CommandHandler.groupSelection：This command adds a copy of archetypeGroupData to the diagram's model to create a new Group and then adds the selected Parts to that new group. This is normally invoked by the Ctrl-G keyboard shortcut

  $(go.Group,'Auto',{ungroupable: true})
  If you want the user to be able to ungroup a Group, using the CommandHandler.ungroupSelection command, you need to set ungroupable to true
  CommandHandler.ungroupSelection：This command removes selected groups from the diagram without removing their members from the diagram. This is normally invoked by the Ctrl-Shift-G keyboard shortcut.

  $(go.Group,'Auto',{computesBoundsAfterDrag: true})
  Gets or sets whether the size of the area of the Group's placeholder should remain the same during a DraggingTool move until a drop occurs
  In other words, when the value is true, re-computing the bounds of the members is suspended until a drop occurs, at which time the border is recomputed,

  $(go.Group,'Auto',{handlesDragDropForMembers: true})
  Gets or sets whether drag-and-drop events may be bubbled up to this Group if not handled by member Parts
  GraphObject.mouseDragEnter, GraphObject.mouseDragLeave, and GraphObject.mouseDrop event handlers, if you want dragging/dropping on a member part to act as if the user were acting on the group

  go.Model.fromJson(this.textareaValue)
  This static function parses a string in JSON format that was written by Model.toJson, and then constructs, initializes, and returns a model with that information.

  myDiagram.model.toJson()
  Generate a string representation of the persistent data in this model, in JSON format, that can be read in later with a call to Model.fromJson.

</doc>
<template>
  <div class="gojs-warp">
    <div class="diagram-header">
      <Slider
        class="slider--level"
        v-model="level"
        :max="3"
        :step="1"
        show-stops
        @on-input="reexpand"></Slider>
      <Button class="btn--save" type="primary" @click="save">save</Button>
      <Button class="btn--load" type="primary" @click="load">Load</Button>
    </div>

    <div class="diagram-main">
      <div id="myPaletteDiv" class="main_palette"></div>
      <div id="myDiagramDiv" class="main_diagram"></div>
      <div class="main_textarea">
        <Input
          class="textarea_inner"
          v-model="textareaValue"
          type="textarea"
          show-word-limit
          placeholder="Enter something..."
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as go from 'gojs'
let myDiagram = null
let myPalette = null
const textareaValue = {
  class: 'go.GraphLinksModel',
  nodeDataArray: [
    { key: 1, text: '哪都通', isGroup: true, category: 'OfGroups' },
    { key: 2, text: '八奇技', isGroup: true, category: 'OfGroups' },
    { key: 3, text: '华东', isGroup: true, category: 'OfNodes', group: 1 },
    { key: 4, text: '陆中', isGroup: true, category: 'OfNodes', group: 1 },
    { key: 5, text: '炁体源流', isGroup: true, category: 'OfNodes', group: 2 },
    { key: 6, text: '风后奇门', isGroup: true, category: 'OfNodes', group: 2 },
    { key: 7, text: '武侯奇门', isGroup: true, category: 'OfNodes', group: 6 },
    { text: 'first A', group: 3, key: -7 },
    { text: 'second A', group: 3, key: -8 },
    { text: 'first B', group: 4, key: -9 },
    { text: 'second B', group: 4, key: -10 },
    { text: 'third B', group: 4, key: -11 },
    { text: 'first C', group: 5, key: -12 },
    { text: 'second C', group: 5, key: -13 },
    { text: 'first D', group: 6, key: -14 },
    { text: 'first E', group: 7, key: -15 },
  ],
  linkDataArray: [],
}
export default {
  name: 'gojs',
  components: {},
  props: {},
  data () {
    return {
      level: 0,
      textareaValue: JSON.stringify(textareaValue),
    }
  },
  mounted () {
    this.initGojs()
  },
  methods: {
    initGojs () {
      const $ = go.GraphObject.make

      myDiagram = $(go.Diagram, 'myDiagramDiv', {
        // what to do when a drag-drop occurs in the Diagram's background
        mouseDrop: function (e) {
          finishDrop(e, null)
        },
        // Diagram has simple horizontal layout
        layout: $(go.GridLayout, {
          wrappingWidth: NaN, // NaN meaning to use the width of the diagram's panel's viewport (Infinity)
          wrappingColumn: NaN, // NaN  meaning not to limit the number of columns
          alignment: go.GridLayout.Position,
          cellSize: new go.Size(1, 1),
        }),
        // scrollMargin: 300,
        // scrollMode: go.Diagram.InfiniteScroll,
        // If you want the user to be able to create a Group out of the currently selected Parts using the CommandHandler.groupSelection command, you need to first set the CommandHandler.archetypeGroupData property to a data object with isGroup set to true
        // This command adds a copy of archetypeGroupData to the diagram's model to create a new Group and then adds the selected Parts to that new group. This is normally invoked by the Ctrl-G keyboard shortcut.
        'commandHandler.archetypeGroupData': { isGroup: true, category: 'OfGroups' },
        // undo or redo
        'undoManager.isEnabled': true,
      })

      // There are two templates for Groups, "OfGroups" and "OfNodes".

      // this function is used to highlight a Group that the selection may be dropped into
      function highlightGroup (e, grp, show) {
        if (!grp) return
        e.handled = true
        if (show) {
          // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
          // instead depend on the DraggingTool.draggedParts or .copiedParts
          const tool = grp.diagram.toolManager.draggingTool
          const map = tool.draggedParts || tool.copiedParts // this is a Map
          // now we can check to see if the Group will accept membership of the dragged Parts
          if (grp.canAddMembers(map.toKeySet())) {
            grp.isHighlighted = true
            return
          }
        }
        grp.isHighlighted = false
      }

      // Upon a drop onto a Group, we try to add the selection as members of the Group.
      // Upon a drop onto the background, or onto a top-level Node, make selection top-level.
      // If this is OK, we're done; otherwise we cancel the operation to rollback everything.
      function finishDrop (e, grp) {
        const ok =
          grp !== null
            ? grp.addMembers(grp.diagram.selection, true)
            : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true)
        if (!ok) e.diagram.currentTool.doCancel()
      }

      myDiagram.groupTemplateMap.add(
        'OfGroups',
        $(
          go.Group,
          'Auto',
          {
            background: 'transparent',
            // highlight when dragging into the Group
            mouseDragEnter: function (e, grp, prev) {
              highlightGroup(e, grp, true)
            },
            mouseDragLeave: function (e, grp, next) {
              highlightGroup(e, grp, false)
            },
            // when the selection is dropped into a Group, add the selected Parts into that Group;
            // if it fails, cancel the tool, rolling back any changes
            mouseDrop: finishDrop,
            // Gets or sets whether the size of the area of the Group's placeholder should remain the same during a DraggingTool move until a drop occurs
            // In other words, when the value is true, re-computing the bounds of the members is suspended until a drop occurs, at which time the border is recomputed,
            computesBoundsAfterDrag: true,
            // Gets or sets whether drag-and-drop events may be bubbled up to this Group if not handled by member Parts
            handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links
            // Groups containing Groups lay out their members horizontally
            layout: $(go.GridLayout, {
              wrappingWidth: Infinity,
              alignment: go.GridLayout.Position,
              cellSize: new go.Size(1, 1),
              spacing: new go.Size(4, 4),
            }),
          },
          new go.Binding('background', 'isHighlighted', function (h) {
            return h ? 'rgba(255,0,0,0.2)' : 'transparent'
          }).ofObject(),
          $(go.Shape, 'Rectangle', { fill: null, stroke: '#FFDD33', strokeWidth: 2 }),
          $(
            go.Panel,
            'Vertical', // title above Placeholder
            $(
              go.Panel,
              'Horizontal', // button next to TextBlock
              { stretch: go.GraphObject.Horizontal, background: '#FFDD33' },
              $('SubGraphExpanderButton', { margin: 5 }),
              $(
                go.TextBlock,
                {
                  editable: true,
                  margin: 5,
                  font: 'bold 18px sans-serif',
                  opacity: 0.75,
                  stroke: '#404040',
                },
                new go.Binding('text', 'text').makeTwoWay(),
              ),
            ), // end Horizontal Panel
            $(go.Placeholder, { padding: 5, alignment: go.Spot.TopLeft }),
          ), // end Vertical Panel
        ),
      ) // end Group and call to add to template Map

      myDiagram.groupTemplateMap.add(
        'OfNodes',
        $(
          go.Group,
          'Auto',
          {
            background: 'transparent',
            // If you want the user to be able to ungroup a Group, using the CommandHandler.ungroupSelection command, you need to set ungroupable to true
            ungroupable: true,
            // highlight when dragging into the Group
            mouseDragEnter: function (e, grp, prev) {
              highlightGroup(e, grp, true)
            },
            mouseDragLeave: function (e, grp, next) {
              highlightGroup(e, grp, false)
            },
            // when the selection is dropped into a Group, add the selected Parts into that Group;
            // if it fails, cancel the tool, rolling back any changes
            mouseDrop: finishDrop,
            // Gets or sets whether the size of the area of the Group's placeholder should remain the same during a DraggingTool move until a drop occurs
            // In other words, when the value is true, re-computing the bounds of the members is suspended until a drop occurs, at which time the border is recomputed
            computesBoundsAfterDrag: true,
            // Gets or sets whether drag-and-drop events may be bubbled up to this Group if not handled by member Parts
            handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links
            // Groups containing Nodes lay out their members vertically
            layout: $(go.GridLayout, {
              wrappingColumn: 1,
              alignment: go.GridLayout.Position,
              cellSize: new go.Size(1, 1),
              spacing: new go.Size(4, 4),
            }),
          },
          [
            new go.Binding('background', 'isHighlighted', function (h) {
              return h ? 'rgba(255,0,0,0.2)' : 'transparent'
            }).ofObject(),
          ],
          $(go.Shape, 'Rectangle', { fill: null, stroke: '#33D3E5', strokeWidth: 2 }),
          $(
            go.Panel,
            'Vertical', // title above Placeholder
            $(
              go.Panel,
              'Horizontal', // button next to TextBlock
              { stretch: go.GraphObject.Horizontal, background: '#33D3E5' },
              $('SubGraphExpanderButton', { margin: 5 }),
              $(
                go.TextBlock,
                {
                  editable: true,
                  margin: 5,
                  font: 'bold 16px sans-serif',
                  opacity: 0.75,
                  stroke: '#404040',
                },
                new go.Binding('text', 'text').makeTwoWay(),
              ),
            ), // end Horizontal Panel
            $(go.Placeholder, { padding: 5, alignment: go.Spot.TopLeft }),
          ), // end Vertical Panel
        ),
      ) // end Group and call to add to template Map

      myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        {
          // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
          // mouseDrop: function (e, nod) {
          //   finishDrop(e, nod.containingGroup) // Gets or sets the Group of which this Part or Node is a member. This will be null if this is a top-level part
          // },
        },
        $(go.Shape, 'Rectangle', { fill: '#ACE600', stroke: null }, new go.Binding('fill', 'color')),
        $(
          go.TextBlock,
          {
            margin: 5,
            editable: true,
            font: 'bold 13px sans-serif',
            opacity: 0.75,
            stroke: '#404040',
          },
          new go.Binding('text', 'text').makeTwoWay(),
        ),
      )

      // initialize the Palette and its contents
      myPalette = $(go.Palette, 'myPaletteDiv', {
        nodeTemplateMap: myDiagram.nodeTemplateMap,
        groupTemplateMap: myDiagram.groupTemplateMap,
        layout: $(go.GridLayout, {
          wrappingColumn: 1,
          alignment: go.GridLayout.Position,
          arrangement: go.GridLayout.LeftToRight,
        }),
      })
      myPalette.model = new go.Model([
        { text: '成', color: '#ACE600' },
        { text: '王也', color: '#FFDD33' },
        { text: '冯宝宝', color: '#33D3E5' },
      ])

      window.diagram = myDiagram
      window.palette = myPalette
      this.load()
    },

    expandGroups (g, i, level) {
      if (!(g instanceof go.Group)) return
      g.isSubGraphExpanded = i < level
      g.memberParts.each(m => {
        this.expandGroups(m, i + 1, level)
      })
    },

    reexpand (e) {
      myDiagram.startTransaction('reexpand')
      myDiagram.findTopLevelGroups().each(g => {
        this.expandGroups(g, 0, this.level)
      })
      myDiagram.commitTransaction('reexpand')
    },

    // save a model to and load a model from JSON text, displayed below the Diagram
    save () {
      const groupNodeData = window.diagram.model.nodeDataArray.find(item => item.key === 1)
      groupNodeData.text = '0909'
      window.diagram.model.updateTargetBindings(groupNodeData)
      // this.textareaValue = myDiagram.model.toJson()
      // myDiagram.isModified = false
    },
    load () {
      myDiagram.model = go.Model.fromJson(this.textareaValue)
    },
  },
}
</script>

<style lang="less" scoped>
.gojs-warp {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: calc(100vh - 0px - 16px);
  padding: 40px 20px;
  border: 3px solid palevioletred;
  .diagram-header {
    display: flex;
    margin-bottom: 20px;
    .slider--level {
      width: 150px;
      margin-right: 10px;
    }
    .btn--save {
      margin: 0 10px;
    }
  }

  .diagram-main {
    width: 100%;
    height: 100%;
    border: 3px solid palevioletred;
    display: flex;
  }
  .main_palette {
    width: 170px;
  }
  .main_diagram {
    width: calc(100% - 650px);
    border-left: 3px solid palevioletred;
    border-right: 3px solid palevioletred;
  }
  .main_textarea {
    width: 480px;
    .textarea_inner {
      height: 100% !important;
    }
    /deep/ .textarea_inner textarea {
      width: 100%;
      height: 100% !important;
      resize: none;
    }
  }
}
</style>
