<script setup lang="ts">
import { ref, toRef, onMounted, onUnmounted, computed, watch } from "vue";

//import { Utils } from "../libs/Utils";
import { SvgJs } from "../libs/Svg";
//const u: any = new Utils();
const svg: any = new SvgJs();

const emit = defineEmits(["action", "pointer", "click"]);

// const
const font = { family: "monospace", size: "8px" };
const showText: boolean = false;

// props
interface Props {
  data?: any;
  options?: any;
  selectedItems?: Array<string>;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {
      Elements: [],
    };
  },
  options: () => {
    return {
      dimensions: { height: 600, EditorWidth: 500 },
    };
  },
  selectedItems: () => [],
});

//toRef
const data = toRef(props, "data");
const selectedItems = toRef(props, "selectedItems");
const options = toRef(props, "options");

//ref
const svgOffset = ref<any>();
//const svgElementDragging = ref<any>();

// mounted
onMounted(async () => {
  //console.log("SvgArea > onMounted");

  addEventListenerToSvg();
});

// unmounted
onUnmounted(async () => {
  //console.log("SvgPanel > onUnmounted");

  removeEventListenerToSvg();
});

// watch
watch(
  selectedItems,
  (n) => {
    //console.log("watch > selectedItems", n);

    n.length == 1
      ? emit("action", { action: "selectedItem", payload: n[0] })
      : emit("action", { action: "selectedItem", payload: null });
  },
  { deep: true }
);

// computed
const viewBox = computed(() => {
  //console.log("SvgArea > viewBox");
  return `0 0 ${options.value.dimensions.SvgAreaWidth} ${options.value.dimensions.height}`;
});

const transform = computed(() => {
  //console.log("SvgArea > transform");
  return "camera" in data.value
    ? `scale(${+data.value.camera.z}) translate(${+data.value.camera.x} ${+data
        .value.camera.y})`
    : "";
});

const cursor = computed(() => {
  //if (data.value.ToggleAction == "select") return "default";
  if (data.value.ToggleAction == "hand") return "grab";

  return "crosshair";
});

const circles = computed(() => {
  //console.log("SvgArea > circles");
  return Array.isArray(data.value.Elements)
    ? data.value.Elements.filter((i: any) => i.shape == "circle")
    : [];
  //return [];
});

const lines = computed(() => {
  //console.log("SvgArea > lines");
  return Array.isArray(data.value.Elements)
    ? data.value.Elements.filter((i: any) => i.shape == "line")
    : [];
  //return [];
});

const polygons = computed(() => {
  //console.log("SvgArea > polygons");
  return Array.isArray(data.value.Elements)
    ? data.value.Elements.filter((i: any) => i.shape == "polygon")
    : [];
  //return [];
});

// methods
const onAction = (obj: any) => {
  //console.log("SvgArea > onAction", obj);
  emit("action", obj);
};

const onClick = (obj: any) => {
  //console.log("SvgArea > onClick", obj);
  emit("click", obj);
};

const onPointer = (obj: any) => {
  //console.log("SvgArea > onPointer", obj);
  emit("pointer", obj);
};

// click
const onSvgClick = (event: any) => {
  //console.log("SvgArea > onSvgClick", event);
  if (!event) return;
  //event.stopPropagation();

  emit("action", { action: "click", payload: event });
};

// pan
const onSvgPointerDown = (event: any) => {
  //console.log("SvgArea > onSvgPointerDown", event);
  if (!event) return;
  event.stopPropagation();

  //event.currentTarget.setPointerCapture(event.pointerId);

  const client: Array<number> = [event.clientX, event.clientY];
  //console.log("SvgArea > onSvgPointerDown > client", client);

  svgOffset.value = client;
};

const onSvgPointerMove = (event: any) => {
  //console.log("SvgArea > onSvgPointerMove", e);
  if (!event) return;
  event.stopPropagation();

  if (!svgOffset.value) return;

  if (svgOffset) {
    const point: Array<number> = [event.clientX, event.clientY];
    //console.log("SvgArea > onPointerMove > point", point);
    const [dx, dy] = svg.sub(point, svgOffset.value);
    //.map((n: number) => n / z.value);
    //console.log("SvgArea > onPointerMove > dx, dy", dx, dy);

    // update here
    data.value.camera = svg.panCamera(data.value.camera, -dx, -dy);
    svgOffset.value = point;
  }
};

const onSvgPointerUp = (event: any) => {
  //console.log("SvgArea > onSvgPointerUp", e);
  if (!event) return;
  event.stopPropagation();

  svgOffset.value = null;
};

// zoom
const handleWheel = (event: WheelEvent) => {
  //console.log("SvgArea > handleWheel", event);
  //event.preventDefault();

  const { clientX, clientY, deltaX, deltaY, ctrlKey } = event;
  //console.log("SvgArea > handleWheel", { clientX, clientY, deltaX, deltaY, ctrlKey });

  if (ctrlKey) {
    event.preventDefault();

    //const center = { x: 0, y: 0 };
    const center = { x: data.value.width / 2, y: data.value.height / 3 };

    const dz = 1 / 10; // = default in svg

    data.value.camera =
      deltaY < 0
        ? svg.zoomIn(data.value.camera, center, dz)
        : svg.zoomOut(data.value.camera, center, dz);
    //data.value.camera = svg.zoomCamera({ x: clientX, y: clientY }, deltaY / 100);

    //console.log("SvgArea > handleWheel > camera", data.value.camera);
  }
};

// panel
const SvgPanelEvent = (obj: any) => {
  //console.log("SvgArea > SvgPanelEvent", obj);

  // if panel/element is pointed then svg is stopped
  if (obj.event.type == "pointerdown" || obj.event.type == "EditorPointerDown")
    removeEventListenerToSvg();
  if (obj.event.type == "pointerup" || obj.event.type == "EditorPointerUp")
    addEventListenerToSvg();
};

// svg events List
const eventsList = ref<Array<any>>([
  { type: "click", listener: onSvgClick, useCapture: false },
  { type: "wheel", listener: handleWheel, useCapture: false },
  { type: "pointerdown", listener: onSvgPointerDown, useCapture: false },
  { type: "pointermove", listener: onSvgPointerMove, useCapture: false },
  { type: "pointerup", listener: onSvgPointerUp, useCapture: false },
]);

const addEventListenerToSvg = () => {
  const svg = document.getElementsByTagName("svg")[0];

  for (const e of eventsList.value) {
    svg.addEventListener(e.type, e.listener, e.useCapture);
  }
};

const removeEventListenerToSvg = () => {
  const svg = document.getElementsByTagName("svg")[0];

  for (const e of eventsList.value) {
    svg.removeEventListener(e.type, e.listener, e.useCapture);
  }
};
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :class="`svg ${cursor}`"
    preserveAspectRatio="xMidYMin meet"
    :viewBox="viewBox"
    id="svgArea"
  >
    <defs>
      <pattern
        id="grid"
        :width="data.SnapGrid"
        :height="data.SnapGrid"
        patternUnits="userSpaceOnUse"
      >
        <path
          :d="`M ${data.SnapGrid} 0 L 0 0 0 ${data.SnapGrid}`"
          fill="none"
          stroke="#ddd"
          :stroke-width="1 * options.z"
        />
      </pattern>
    </defs>

    <g :transform="transform">
      <rect
        v-if="data.ShowGrid"
        :x="-data.camera.x"
        :y="-data.camera.y"
        :width="options.dimensions.SvgAreaWidth * options.z"
        :height="options.dimensions.height * options.z"
        fill="url(#grid)"
      />
      <circle
        id="0xy"
        cx="0"
        cy="0"
        :r="4 * options.z"
        stroke="#000"
        fill="none"
      />

      <polygon
        v-for="i in polygons"
        :points="i.points"
        :stroke="i.stroke"
        :stroke-width="i.strokeWidth * options.z"
        :fill="i.fill"
        fill-opacity="0.2"
      />
      <text
        v-if="showText"
        v-for="i in polygons"
        :x="i.xt"
        :y="i.yt"
        :font-size="font.size"
        :font-family="font.family"
        text-anchor="middle"
        class="prevent-select"
      >
        {{ i.id }}
      </text>

      <line
        v-for="i in lines"
        :x1="i.x1"
        :y1="i.y1"
        :x2="i.x2"
        :y2="i.y2"
        :stroke="i.stroke"
        :stroke-width="i.strokeWidth * options.z"
      />
      <text
        v-if="showText"
        v-for="i in lines"
        :x="(i.x1 + i.x2) / 2"
        :y="(i.y1 + i.y2) / 2"
        :font-size="font.size"
        :font-family="font.family"
        text-anchor="middle"
        class="prevent-select"
      >
        {{ i.id }}
      </text>

      <circle
        v-for="i in circles"
        :cx="i.cx"
        :cy="i.cy"
        :r="i.r * options.z"
        stroke="#000"
        :stroke-width="1 * options.z"
        fill="#FF0"
      />
      <text
        v-if="showText"
        v-for="i in circles"
        :x="i.cx"
        :y="i.cy"
        :font-size="font.size"
        :font-family="font.family"
        text-anchor="middle"
        class="prevent-select"
      >
        {{ i.id }}
      </text>
    </g>
  </svg>
</template>
<style scoped>
svg {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-radius: 4px;
  z-index: 1;
}

.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.small {
  font: 11px Verdana, Helvetica, Arial, sans-serif;
}

/* https://www.w3schools.com/cssref/pr_class_cursor.php */
.alias {
  cursor: alias;
}
.all-scroll {
  cursor: all-scroll;
}
.auto {
  cursor: auto;
}
.cell {
  cursor: cell;
}
.col-resize {
  cursor: col-resize;
}
.context-menu {
  cursor: context-menu;
}
.copy {
  cursor: copy;
}
.crosshair {
  cursor: crosshair;
}
.default {
  cursor: default;
}
.e-resize {
  cursor: e-resize;
}
.ew-resize {
  cursor: ew-resize;
}
.grab {
  cursor: -webkit-grab;
  cursor: grab;
}
.grabbing {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}
.help {
  cursor: help;
}
.move {
  cursor: move;
}
.n-resize {
  cursor: n-resize;
}
.ne-resize {
  cursor: ne-resize;
}
.nesw-resize {
  cursor: nesw-resize;
}
.ns-resize {
  cursor: ns-resize;
}
.nw-resize {
  cursor: nw-resize;
}
.nwse-resize {
  cursor: nwse-resize;
}
.no-drop {
  cursor: no-drop;
}
.none {
  cursor: none;
}
.not-allowed {
  cursor: not-allowed;
}
.pointer {
  cursor: pointer;
}
.progress {
  cursor: progress;
}
.row-resize {
  cursor: row-resize;
}
.s-resize {
  cursor: s-resize;
}
.se-resize {
  cursor: se-resize;
}
.sw-resize {
  cursor: sw-resize;
}
.text {
  cursor: text;
}
.url {
  cursor: url(myBall.cur), auto;
}
.w-resize {
  cursor: w-resize;
}
.wait {
  cursor: wait;
}
.zoom-in {
  cursor: zoom-in;
}
.zoom-out {
  cursor: zoom-out;
}
</style>
