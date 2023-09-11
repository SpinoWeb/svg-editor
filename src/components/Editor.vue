<script setup lang="ts">
import { toRef, ref, shallowRef, watch, onMounted } from "vue";

//import { Utils } from "../libs/Utils";
//const u: any = new Utils();

// const
const emit = defineEmits(["action"]);
const defaultItem: any = {
  name: "test",
  code: "return [\n\t{shape: 'circle', id: 1, cx: 6, cy: 4},\n\t{shape: 'circle', id: 2, cx: 4, cy: 8},\n\t{shape: 'line', id: 1, x1: 6, y1: 4, x2: 4, y2: 8}\n];",
};
// monaco editor options
const monacoEditorOptions: any = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  autoIndent: true,

  minimap: { enabled: false },
  scrollbar: {
    //horizontal: "hidden",
    behavior: "smooth",
  },

  //
  //lineNumbers: "off",
  //glyphMargin: false,
  //folding: false,

  // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
  //lineDecorationsWidth: 0,
  //lineNumbersMinChars: 4,
};
const editorRef = shallowRef();
const handleMount = (editor: any) => (editorRef.value = editor);
// your action
//const formatCode = () => editorRef.value?.getAction("editor.action.formatDocument").run();

// props
interface Props {
  data?: Array<any>;
  options?: any;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  options: () => {
    return {
      dimensions: { height: 600, EditorWidth: 300 },
    };
  },
});

//toRef
const data = toRef(props, "data");
const options = toRef(props, "options");

// ref
const item = ref<any>(defaultItem);

// watch
watch(data, (n) => {
  //console.log("Editor > watch > data > n", n);
  item.value = n.length > 0 ? n[0] : defaultItem;
});

// mounted
onMounted(() => {
  //console.log("Editor > onMounted");
  item.value = data.value.length > 0 ? data.value[0] : defaultItem;
  runScript();
});

// computed

// methods
const runScript = () => {
  //console.log("Editor > runScript");
  if (!item.value) return;

  //running.value = true;
  emit("action", { action: "runScript", payload: item.value });
};
</script>

<template>
  <v-card
    ><v-card-actions>
      <v-select
        label="Select script..."
        v-model="item"
        :items="data"
        item-title="name"
        item-value="name"
        v-bind="{ 'return-object': true }"
        density="comfortable"
      />&nbsp;<v-text-field v-model="item.name" density="comfortable" />
    </v-card-actions>
    <v-card-text
      class="ma-1 pa-0"
      :style="`height: ${options.dimensions.height - 130}px`"
    >
      <vue-monaco-editor
        v-model:value="item.code"
        theme="vs-dark"
        language="javascript"
        :options="monacoEditorOptions"
        @mount="handleMount"
        @change="runScript"
      />
    </v-card-text>
  </v-card>
</template>
