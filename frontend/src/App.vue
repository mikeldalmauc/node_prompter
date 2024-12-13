<template>
  <!--
    By default, the editor completely fills its parent HTML element.
    If you directly use the editor in the <body> element, make sure to use
    a wrapper <div> with specified width and height properties:
          -->
  <div style="width: 100vw; height: 100vh">
    <baklava-editor :view-model="baklava" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  EditorComponent,
  useBaklava,
  DependencyEngine,
  applyResult
} from "baklavajs";
import "@baklavajs/themes/dist/syrup-dark.css";

import { DisplayNode } from "./DisplayNode";
import { MathNode } from "./MathNode";

export default defineComponent({
  components: {
    "baklava-editor": EditorComponent
  },
  setup() {
    const baklava = useBaklava();
    const engine = new DependencyEngine(baklava.editor);

    baklava.editor.registerNodeType(MathNode);
    baklava.editor.registerNodeType(DisplayNode);

    const token = Symbol();
    engine.events.afterRun.subscribe(token, (result) => {
      engine.pause();
      applyResult(result, baklava.editor);
      engine.resume();
    });

    engine.start();

    // Add some nodes for demo purposes
    function addNodeWithCoordinates(nodeType, x, y) {
      const n = new nodeType();
      baklava.displayedGraph.addNode(n);
      n.position.x = x;
      n.position.y = y;
      return n;
    }
    const node1 = addNodeWithCoordinates(MathNode, 300, 140);
    const node2 = addNodeWithCoordinates(DisplayNode, 550, 140);
    baklava.displayedGraph.addConnection(
      node1.outputs.result,
      node2.inputs.value
    );

    return { baklava };
  }
});
</script>
