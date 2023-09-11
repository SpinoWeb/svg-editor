<script setup lang="ts">
import { ref, shallowRef, onMounted, computed } from "vue";

import SvgArea from "./SvgArea.vue";
import Editor from "./Editor.vue";
import Menu from "./Menu.vue";
import Setting from "./Setting.vue";
import Zoom from "./Zoom.vue";

// components

import { Utils } from "../libs/Utils";
import { SvgJs } from "../libs/Svg";
import { IO } from "../libs/IO";
const u: any = new Utils();
const svg: any = new SvgJs();
const io = new IO();

// const
const constants: Array<any> = [
  //---
  { name: "Elements", value: [] },
  {
    name: "Scripts",
    value: [
      {
        name: "test",
        code: "return [\n\t{shape: 'circle', id: 1, cx: 6, cy: 4},\n\t{shape: 'circle', id: 2, cx: 4, cy: 8},\n\t{shape: 'line', id: 1, x1: 6, y1: 4, x2: 4, y2: 8}\n];",
      },
    ],
  },
  //---
  { name: "camera", value: { x: 0, y: 0, z: 1 } },
  { name: "width", value: 600 },
  { name: "height", value: 600 },
  { name: "SvgAreaWidth", value: 300 },
  { name: "EditorWidth", value: 300 },
  { name: "ToggleLock", value: false },
  { name: "ToggleAction", value: "hand" },
  { name: "ShowGrid", value: true },
  { name: "SnapGrid", value: 20 },
  { name: "handle", value: null },
  //{ name: "data", value: [] },
  //{ name: "activeLoadPat", value: null }, // string
];
//let container: any; // HTMLDivElement
//const tabs: Array<string> = ["SvgEditor", "Data"];

// snackbar interface
interface snackbar {
  isActive?: boolean;
  message?: string; // html
  color?: string;
}

// ref
const data = ref<any>({});
const CurrUnits = ref<Array<string>>(["N", "mm", "C"]);
const plane = ref<any>({ name: "X-Z", x: "XorR", y: "Z" });
const loading = ref<boolean>(false);
const handle = ref<any>(null);
const ToggleMenu = ref<boolean>(false);
const ToggleSetting = ref<boolean>(false);

// https://michaelnthiessen.com/key-changing-technique/
//const componentKeys = ref<any>({});
const snackbar = ref<snackbar>({
  isActive: false,
  message: "",
});

const selectedItems = ref<Array<string>>([]);
const component = shallowRef<any>(null);
const item = ref<any>(null);
const svgElementDragging = ref<any>();
const results = ref<any>([]);

// mounted
onMounted(async () => {
  //console.log("SvgEditor > onMounted");

  /*
  container = document.getElementById("svg-editor")
    ? document.getElementById("svg-editor")
    : document.createElement("div");
    */

  //data.value.width = container.clientWidth / 2;
  //data.value.height = container.clientHeight;
  data.value.width = window.innerWidth;
  data.value.height = window.innerHeight - 100;

  data.value.SvgAreaWidth = 0.5 * data.value.width;
  data.value.EditorWidth = 0.5 * data.value.width;

  prepareData();

  // svg size
  addEventListener("resize", (event: Event) => {
    const currentTarget: any =
      "currentTarget" in event ? event.currentTarget : null;
    if (currentTarget) {
      data.value.width =
        "innerWidth" in currentTarget ? currentTarget.innerWidth - 2 : 800;
      data.value.height =
        "innerHeight" in currentTarget ? currentTarget.innerHeight - 2 : 600;
    }
  });

  // centering
  //zoomReset();
});

// watch

// computed
const z = computed(() => {
  return 1 / (data.value.hasOwnProperty("camera") ? data.value.camera.z : 10);
});

const xyLim = computed(() => {
  //console.log("SvgEditor > xyLim");

  let xMin: number = 0,
    xMax: number = data.value.width,
    yMin: number = 0,
    yMax: number = data.value.height;

  return { xMin: +xMin, xMax: +xMax, yMin: +yMin, yMax: +yMax };
});

const options = computed(() => {
  return {
    CurrUnits: CurrUnits.value,
    plane: plane.value,
    scale: { Length: data.value.SnapGrid },
    dimensions: {
      width: data.value.width,
      height: data.value.height,
      SvgAreaWidth: data.value.SvgAreaWidth,
      EditorWidth: data.value.EditorWidth,
    },
    z: z.value,
  };
});

// methods
const prepareData = () => {
  //console.log("SvgEditor > prepareData");

  // add constants
  for (const c in constants) {
    const constant: any = constants[c];

    if (!(constant.name in data.value)) {
      data.value[constant.name] = constant.value;
    }
  }
};

const menuAction = (obj: any) => {
  //console.log("SvgEditor > menuAction", obj);

  const { action } = obj;

  // ioMenu
  if (action == "ioMenu") {
    ToggleMenu.value = !ToggleMenu.value;
    if (ToggleMenu.value) {
      ToggleSetting.value = false;
    }
  }

  // openFile
  if (action == "openFile") openFile();

  // saveOnNewFile
  if (action == "saveOnNewFile") saveOnNewFile();

  // saveFile
  if (action == "saveFile") saveFile();
};

const zoomAction = (obj: any) => {
  //console.log("SvgEditor > zoomAction", obj);

  const { action, payload } = obj;

  // zoomInOut
  if (action == "zoomInOut") zoomInOut(payload);

  // zoomReset
  if (action == "zoomReset") zoomReset();
};

const settingActions = (obj: any) => {
  //console.log("SvgEditor > settingActions", obj);

  const { action } = obj;

  // ioSetting
  if (action == "ioSetting") {
    ToggleSetting.value = !ToggleSetting.value;
    if (ToggleSetting.value) {
      ToggleMenu.value = false;
    }
  }
};

const onAction = (obj: any) => {
  //console.log("SvgEditor > onAction", obj);

  const { action, payload } = obj;

  // click
  if (action == "click") SvgAreaClick(payload);

  // selectedItem
  if (action == "selectedItem") selectedItem(payload);

  // runScript
  if (action == "runScript") runScript(payload);
};

// svgArea actions
const SvgAreaClick = (payload: any) => {
  //console.log("SvgEditor > SvgAreaClick", payload);
  if (!payload) return;

  //
  ToggleMenu.value = false;
  ToggleSetting.value = false;

  //
  if (data.value.ToggleAction == "hand") selectedItems.value = [];

  //
  //if (data.value.ToggleAction == "joint") addJoint(payload);

  //
  if (!data.value.ToggleLock) data.value.ToggleAction = "hand";
};

const selectedItem = (payload: any) => {
  //console.log("SvgEditor > selectedItem", payload);
  if (!payload) {
    component.value = null;
    item.value = null;
    return;
  }

  const [key, id] = payload.split("_");
  //console.log("SvgEditor > selectedItem", [key, id]);

  item.value = data.value[key + "s"].find((i: any) => i[key] == id);
  //console.log("SvgEditor > selectedItem", item.value);

  //if (key == "Joint") component.value = Joint;
  //if (key == "Frame") component.value = Frame;
  //console.log("SvgEditor > selectedItem", component.value);
};

// element > click
const onClick = (obj: any) => {
  //console.log("SvgEditor > onClick", obj);

  const { event } = obj;
  event.stopPropagation();

  onSelectItem(event.currentTarget.id);
};

// element > pointer
const onPointer = (obj: any) => {
  //console.log("SvgEditor > onPointer", obj);

  const { type, event } = obj;
  event.stopPropagation();

  // pointer
  /*
  const client: Array<number> = [
    event.clientX - data.value.camera.x,
    -event.clientY + data.value.camera.y,
  ];
  */
  //console.log("SvgEditor > onPointer", client);

  // drag element
  if (type == "element") {
    if (event.type == "pointerdown") onElementPointerDown(event);
    if (event.type == "pointermove") onElementPointerMove(event);
    if (event.type == "pointerup") onElementPointerUp(event);
  }
};

const onElementPointerDown = (event: any) => {
  //console.log("SvgEditor > onElementPointerDown", event, event.currentTarget.id);
  event.stopPropagation();

  event.currentTarget.setPointerCapture(event.pointerId);

  const client: Array<number> = [event.clientX, event.clientY];

  const currentTargetId = event.currentTarget.id;
  const [handle, ...rest] = currentTargetId.split("_");
  const id = handle ? rest.at(-1) : null;
  //console.log("SvgEditor > onElementPointerDown", handle, id);

  // select
  const element = data.value[handle + "s"].find((e: any) => e[handle] == id);
  //console.log("SvgEditor > onElementPointerDown > element", element);
  //onSelectItem(currentTargetId);

  // origin
  let origin: Array<number> = [0, 0];
  origin = element
    ? [
        element[plane.value.x] * options.value.scale.Length,
        element[plane.value.y] * options.value.scale.Length,
      ]
    : [0, 0];

  // adjust origin
  if (data.value.ShowGrid) {
    origin[0] =
      Math.floor(origin[0] / data.value.SnapGrid) * data.value.SnapGrid;
    origin[1] =
      Math.floor(origin[1] / data.value.SnapGrid) * data.value.SnapGrid;
  }

  svgElementDragging.value = {
    currentTargetId: currentTargetId,
    handle: handle,
    id: id,
    client: client,
    origin: origin,
  };
  /*
  console.log(
    "SvgEditor > onElementPointerDown > svgElementDragging",
    svgElementDragging.value
  );
  */
};

const onElementPointerMove = (event: any) => {
  //console.log("SvgEditor > onElementPointerMove", e, e.currentTarget.id);
  event.stopPropagation();

  if (!svgElementDragging.value) return;
  if (!(svgElementDragging.value.handle + "s" in data.value)) return;

  const element = data.value[svgElementDragging.value.handle + "s"].find(
    (e: any) =>
      e[svgElementDragging.value.handle] == svgElementDragging.value.id
  );
  //console.log("SvgEditor > onElementPointerMove > element", element);

  if (element) {
    const point: Array<number> = [event.clientX, event.clientY];
    //console.log("SvgEditor > onElementPointerMove > point", point);

    const delta = svg
      .sub(point, svgElementDragging.value.client)
      .map((n: number) => n * z.value);
    //console.log("SvgEditor > onElementPointerMove > delta", delta);

    // snapGrid
    if (data.value.ShowGrid) {
      delta[0] =
        Math.floor(delta[0] / data.value.SnapGrid) * data.value.SnapGrid;
      delta[1] =
        Math.floor(delta[1] / data.value.SnapGrid) * data.value.SnapGrid;
    }

    // update here
    element[plane.value.x] =
      (+svgElementDragging.value.origin[0] + delta[0]) /
      options.value.scale.Length;
    element[plane.value.y] =
      (+svgElementDragging.value.origin[1] - delta[1]) /
      options.value.scale.Length;
  }
};

const onElementPointerUp = (event: any) => {
  //console.log("SvgEditor > onElementPointerUp", e);
  event.stopPropagation();

  //const currentTargetId = event.currentTarget.id;
  //onSelectItem(currentTargetId);

  event.currentTarget.releasePointerCapture(event.pointerId);
  svgElementDragging.value = { client: [], origin: [] };
};

// menu actions
// open file and store handle
const openFile = async () => {
  //console.log("SvgEditor > openFile");

  // start
  loading.value = true;

  //const io = new IO();

  const file = await io.openFile();

  // data exists
  if ("data" in file) {
    handle.value = null;

    // update data
    for (const c in constants) {
      const constant: any = constants[c];
      data.value[constant.name] =
        constant.name in file.data ? file.data[constant.name] : constant.value;

      // re-render component
      //componentKeys.value[constant.name] += 1;
    }

    // store handle
    if ("handle" in file) handle.value = file.handle;

    snackbar.value = {
      isActive: true,
      message: (handle.value ? handle.value.name : "...") + " loaded",
      color: u.colors().success,
    };
  } else {
    loading.value = false;
    snackbar.value = {
      isActive: true,
      message: "file has not been loaded!",
      color: u.colors().error,
    };
  }

  // end
  loading.value = false;
};

// save on a new file
const saveOnNewFile = async () => {
  //console.log("SvgEditor > saveOnNewFile");

  handle.value = null;
  saveFile();
};

// se l'handle esiste, salva sullo stesso file
// altrimenti su un nuovo file
const saveFile = async () => {
  //console.log("SvgEditor > saveFile");

  // start
  loading.value = true;

  // save file
  handle.value = await io.saveFile(data.value, handle.value);
  //console.log("SvgEditor > saveFile > handle", handle.value);
  snackbar.value = {
    isActive: true,
    message: "Saved on " + (handle.value ? handle.value.name : "..."),
    color: u.colors().success,
  };

  // end
  loading.value = false;
};

// zoom actions
const zoomReset = () => {
  //console.log("SvgEditor > zoomReset");
  const dx = 50;
  const w = +xyLim.value.xMax - xyLim.value.xMin;
  const h = +xyLim.value.yMax - xyLim.value.yMin;

  const zx = (+data.value.SvgAreaWidth - 2 * dx) / w;
  const zy = (+data.value.height - 2 * dx) / h;
  const z = Math.min(zx, zy) > 0 ? Math.min(zx, zy) : 1 / 10;
  //console.log("SvgEditor > zoomReset > zx", zx);
  //console.log("SvgEditor > zoomReset > zy", zy);
  //console.log("SvgEditor > zoomReset > xyLim", xyLim.value);

  data.value.camera = {
    x:
      +data.value.SvgAreaWidth / 2 / z -
      (+xyLim.value.xMax + xyLim.value.xMin) / 2,
    y: +data.value.height / 2 / z - (+xyLim.value.yMax + xyLim.value.yMin) / 2,
    z: z,
  };

  //
  data.value.camera = {
    x: data.value.SvgAreaWidth / 2,
    y: data.value.height / 2,
    z: 1,
  };
};

const zoomInOut = (deltaY: number = 0) => {
  const center = { x: 0, y: 0 };
  //const center = { x: data.value.width / 2, y: data.value.height / 3 };

  const dz = 1 / 10; // = default in svg

  data.value.camera =
    deltaY < 0
      ? svg.zoomIn(data.value.camera, center, dz)
      : svg.zoomOut(data.value.camera, center, dz);
};

// select
const onSelectItem = (elementId: string) => {
  //console.log("SvgEditor > onSelectItem", elementId);
  if (!elementId) return;

  const index = selectedItems.value.findIndex((i: string) => i == elementId);
  index < 0
    ? selectedItems.value.push(elementId)
    : selectedItems.value.splice(index, 1);

  //console.log("SvgEditor > onSelectItem", selectedItems.value);
};

/*
const addElement = (event: any = { offsetX: 50, offsetY: 50 }) => {
  //console.log("SvgEditor > addJoint", event);

  const { offsetX, offsetY }: { offsetX: number; offsetY: number } = event;

  const x: number = data.value.ShowGrid
    ? Math.floor(
        (offsetX * z.value - data.value.camera.x) / data.value.SnapGrid
      ) * data.value.SnapGrid
    : offsetX * z.value - data.value.camera.x;
  const y: number = data.value.ShowGrid
    ? Math.floor(
        (offsetY * z.value - data.value.camera.y) / data.value.SnapGrid
      ) * data.value.SnapGrid
    : offsetY * z.value - data.value.camera.y;

  const fmn: Array<number> = findMissingNumbers(
    data.value["Joints"].map((j: any) => j.Joint)
  );
  //console.log("SvgEditor > addJoint > fmn", fmn);

  const Joint: number = fmn[0];

  data.value["Joints"].push({
    Joint: Joint,
    CoordSys: "GLOBAL",
    CoordType: "Cartesian",
    XorR: x / options.value.scale.Length,
    Y: -y / options.value.scale.Length,
    Z: 0 / options.value.scale.Length,
    SpecialJt: "No",
    GUID: u.uuid(),
  });
};
*/

/*
const findMissingNumbers = (arr: Array<number> = []) => {
  //console.log("SvgEditor > findMissingNumbers", arr);

  // Create sparse array with a 1 at each index equal to a value in the input.
  const sparse: Array<number> = arr.reduce(
    (sparse: Array<number>, i) => ((sparse[i] = 1), sparse),
    []
  );
  // Create array 0..highest number, and retain only those values for which
  // the sparse array has nothing at that index (and eliminate the 0 value).
  const a = [...sparse.keys()].filter((i) => i && !sparse[i]);

  return a.length > 0 ? a : [arr.length + 1];
};
*/

const runScript = (payload: any) => {
  //console.log("SvgEditor > runScript", payload);
  if (!payload) return;

  // start
  //payload.isRunning = true;

  const { code }: { code: string } = payload;
  //console.log("SvgEditor > runScript > name", name);

  const f = Function(`${code ? code : ""}`);

  //let results: any;
  try {
    results.value = f();
  } catch (e: any) {
    if (u.debug()) console.error("SvgEditor > runScript > e", e);
    // (Note: the exact output may be browser-dependent)
    results.value = e;
  }
  //console.log("SvgEditor > runScript > results", results.value);

  // if results then update elements
  data.value.Elements = [];
  if (Array.isArray(results.value)) {
    for (const result of results.value) {
      const shape = result.hasOwnProperty("shape") ? result.shape : undefined;

      if (shape == "circle") {
        data.value.Elements.push({
          shape: result.shape,
          id: `(${result.hasOwnProperty("id") ? result.id : 0})`,
          cx: result.hasOwnProperty("cx")
            ? +result.cx * options.value.scale.Length
            : 0,
          cy: result.hasOwnProperty("cy")
            ? +result.cy * options.value.scale.Length
            : 0,
          r: result.hasOwnProperty("r")
            ? +result.r
            : options.value.scale.Length / 6,
        });
      }

      if (shape == "line") {
        data.value.Elements.push({
          shape: result.shape,
          id: `[${result.hasOwnProperty("id") ? result.id : 0}]`,
          x1: result.hasOwnProperty("x1")
            ? +result.x1 * options.value.scale.Length
            : 0,
          y1: result.hasOwnProperty("y1")
            ? +result.y1 * options.value.scale.Length
            : 0,
          x2: result.hasOwnProperty("x1")
            ? +result.x2 * options.value.scale.Length
            : 0,
          y2: result.hasOwnProperty("y1")
            ? +result.y2 * options.value.scale.Length
            : 0,
          stroke: result.hasOwnProperty("stroke") ? result.stroke : "#F00",
          strokeWidth: result.hasOwnProperty("strokeWidth")
            ? result.strokeWidth
            : options.value.scale.Length / 12,
        });
      }

      if (shape == "polygon") {
        let apoints = result.hasOwnProperty("points") ? result.points : [];
        let points = "",
          xt = 0,
          yt = 0;
        for (let j = 0; j < apoints.length; j++) {
          const apoint = apoints[j];
          points += `${+apoint[0] * options.value.scale.Length},${
            +apoint[1] * options.value.scale.Length
          } `;
          xt += +apoint[0] * options.value.scale.Length;
          yt += +apoint[1] * options.value.scale.Length;
        }
        //console.log(points);

        data.value.Elements.push({
          shape: result.shape,
          id: `<${result.hasOwnProperty("id") ? result.id : 0}>`,
          points: points,
          xt: xt / 4,
          yt: yt / 4,
          stroke: result.hasOwnProperty("stroke") ? result.stroke : "#0F0",
          strokeWidth: result.hasOwnProperty("strokeWidth")
            ? result.strokeWidth
            : options.value.scale.Length / 12,
          fill: result.hasOwnProperty("fill") ? result.fill : "#0F0",
        });
      }
    }
  }

  // end
  //payload.isRunning = false;
};
</script>

<template>
  <button class="btn btn-primary">One</button>
  <button class="btn btn-secondary">Two</button>
  <button class="btn btn-accent btn-outline">Three</button>

  <div class="grid grid-cols-2 gap-4">
    <div>01</div>
    <div>02</div>
    <div>03</div>
    <div>04</div>
  </div>

  <v-container
    id="container"
    fluid
    class="ma-0 pa-0"
    style="height: 100%; border: 1px solid red"
  >
    <v-row
      id="svg-editor"
      noGutters
      style="margin: 0; padding: 0; border: 1px solid green"
      ><v-col>
        <SvgArea
          v-if="data"
          :data="data"
          :options="options"
          :selectedItems="selectedItems"
          @action="onAction"
          @pointer="onPointer"
          @click="onClick"
      /></v-col>
      <v-col
        ><Editor
          v-if="data.hasOwnProperty('Scripts')"
          :data="data.Scripts"
          :options="options"
          @action="onAction" /></v-col
    ></v-row>

    <v-row
      noGutters
      style="
        border: 1px solid gray;
        height: 100px;
        overflow-x: hidden;
        overflow-y: auto;
        text-align: left;
      "
      ><v-col
        ><p v-for="i in data.Elements">{{ i }}</p> </v-col
      ><v-col v-if="Array.isArray(results)">
        <p v-for="i in results">{{ i }}</p> </v-col
      ><v-col v-else>
        <p>{{ results }}</p>
      </v-col></v-row
    >

    <v-snackbar
      v-model="snackbar.isActive"
      timeout="2000"
      location="bottom right"
      :color="'color' in snackbar ? snackbar.color : u.colors().info"
    >
      <div class="snackbar" v-html="snackbar.message" />
    </v-snackbar>
  </v-container>

  <Menu
    :data="data"
    :top="4"
    :left="20"
    :toggle="ToggleMenu"
    :handle="handle"
    @action="menuAction"
  />
  <Setting
    :data="data"
    :top="4"
    :left="60"
    :toggle="ToggleSetting"
    @action="settingActions"
  />
  <Zoom
    v-if="'camera' in data"
    :data="data"
    :top="4"
    :left="options.dimensions.SvgAreaWidth - 196"
    @action="zoomAction"
  />
</template>
