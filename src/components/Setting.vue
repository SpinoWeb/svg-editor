<script setup lang="ts">
import { toRef } from "vue";

const emit = defineEmits(["action"]);

// const

// props
interface Props {
  data?: any;
  top?: number;
  left?: number;
  toggle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => {},
  top: () => 10,
  left: () => 10,
  toggle: () => false,
});

//toRef
const data = toRef(props, "data");
const top = toRef(props, "top");
const left = toRef(props, "left");
const toggle = toRef(props, "toggle");

//ref

// mounted

// watch

// computed

// methods
const ioSetting = async () => {
  //console.log("Setting > ioSetting");
  emit("action", { action: "ioSetting" });
};

const changeGrid = () => {
  //console.log("Setting > changeGrid");
  // emit("action", { action: "changeGrid" });
};
</script>

<template>
  <v-card
    :style="`position: absolute; top: ${top}px; left: ${left}px`"
    variant="outlined"
    ><v-card-text style="margin: 0; padding: 4px; background-color: #eee">
      <v-icon
        icon="mdi-cog-outline"
        size="large"
        @click="ioSetting"
      /><v-tooltip v-if="!toggle" activator="parent" location="bottom"
        >setting</v-tooltip
      >
    </v-card-text>
  </v-card>

  <v-card
    v-show="toggle"
    :style="`position: absolute; top: ${top + 36}px; left: ${left}px`"
    variant="outlined"
    width="200"
    ><v-card-text class="ma-0 px-1" style="background-color: #fff">
      <v-checkbox
        v-model="data.ShowGrid"
        label="Show Grid"
        density="comfortable"
        @update:modelValue="changeGrid"
      />
      <v-text-field
        v-model.number="data.SnapGrid"
        min="10"
        label="Snap Grid"
        density="comfortable"
        :disabled="!data.ShowGrid"
        @update:modelValue="changeGrid"
      />
    </v-card-text>
  </v-card>
</template>
