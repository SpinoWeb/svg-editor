<script setup lang="ts">
import { toRef, computed } from "vue";

import { Utils } from "../libs/Utils";
const u: any = new Utils();

const emit = defineEmits(["action"]);

// const

// props
interface Props {
  data?: any;
  top?: number;
  left?: number;
  toggle?: boolean;
  handle?: any;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => {},
  top: 10,
  left: 10,
  toggle: false,
  handle: () => null,
});

//toRef
const data = toRef(props, "data");
const top = toRef(props, "top");
const left = toRef(props, "left");
const toggle = toRef(props, "toggle");
const handle = toRef(props, "handle");

//ref

// mounted

// watch

// computed
// menu items list
const items = computed(() => {
  let items = [{ text: "Open", icon: "mdi-folder-outline", action: openFile }];

  if (handle.value) {
    items = items.concat({
      text: "Save on current file",
      icon: "mdi-download",
      action: saveFile,
    });
  }

  items = items.concat({
    text: "Save on...",
    icon: "mdi-download-outline",
    action: saveOnNewFile,
  });

  return items;
});

// methods
const ioMenu = async () => {
  //console.log("Menu > ioMenu");
  emit("action", { action: "ioMenu" });
};

// open file and store handle
const openFile = () => {
  //console.log("Menu > openFile");
  emit("action", { action: "openFile" });
};

// save on a new file
const saveOnNewFile = async () => {
  //console.log("Menu > saveOnNewFile");
  emit("action", { action: "saveOnNewFile" });
};

// se l'handle esiste, salva sullo stesso file
// altrimenti su un nuovo file
const saveFile = async () => {
  //console.log("Menu > saveFile");
  emit("action", { action: "saveFile" });
};
</script>

<template>
  <v-card
    :style="`position: absolute; top: ${top}px; left: ${left}px`"
    variant="outlined"
    ><v-card-text style="margin: 0; padding: 4px; background-color: #eee">
      <v-icon icon="mdi-menu" size="large" @click="ioMenu"></v-icon
      ><v-tooltip v-if="!toggle" activator="parent" location="bottom"
        >menu</v-tooltip
      >
    </v-card-text>
  </v-card>

  <v-card
    v-show="toggle"
    :style="`position: absolute; top: ${top + 36}px; left: ${left}px`"
    variant="outlined"
    ><v-card-text style="margin: 0; padding: 0px; background-color: #fff">
      <v-list :lines="false" density="compact" nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          color="#1565c0"
          @click="
            item.action();
            ioMenu();
          "
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
