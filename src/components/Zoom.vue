<script setup lang="ts">
import { toRef } from "vue";

const emit = defineEmits(["action"]);

// const

// props
interface Props {
  data?: any;
  top?: number;
  left?: number;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => {},
  top: () => 10,
  left: () => 10,
});

//toRef
const data = toRef(props, "data");
const top = toRef(props, "top");
const left = toRef(props, "left");

//ref

// mounted

// watch

// computed

// methods
const zoomReset = () => {
  //console.log("Zoom > zoomReset");
  emit("action", { action: "zoomReset" });
};

const zoomInOut = (deltaY: number = 0) => {
  //console.log("Zoom > zoomInOut");
  emit("action", { action: "zoomInOut", payload: deltaY });
};
</script>

<template>
  <v-card
    width="150px"
    height="40px"
    :style="`position: absolute; top: ${top}px; left: ${left}px; background-color: #eee;`"
    variant="outlined"
  >
    <v-card-text style="margin: 2px; padding: 4px; background-color: #eee">
      <v-row no-gutters>
        <v-col
          ><v-btn
            icon="mdi-minus"
            flat
            density="compact"
            color="#eee"
            @click="zoomInOut(1)"
          /><v-tooltip activator="parent" location="top"
            >minus</v-tooltip
          ></v-col
        ><v-col
          ><v-btn text flat density="compact" color="#eee" @click="zoomReset()"
            >{{ (100 * data.camera.z).toFixed() }}&nbsp;%</v-btn
          ><v-tooltip activator="parent" location="top">reset</v-tooltip></v-col
        ><v-col
          ><v-btn
            icon="mdi-plus"
            flat
            density="compact"
            color="#eee"
            @click="zoomInOut(-1)"
          /><v-tooltip activator="parent" location="top">plus</v-tooltip></v-col
        >
      </v-row>
    </v-card-text>
  </v-card>
</template>
