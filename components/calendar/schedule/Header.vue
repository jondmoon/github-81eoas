<template>
  <v-row
    :style="
      'width:' +
      ((collapsed ? 122 : 302) + cellWidth * times.length) +
      'px;padding:0;margin:0'
    "
    class="topSticky"
  >
    <v-col
      class="scheduleColumn header leftSticky"
      style="z-index: 3 !important"
    >
      <v-card :style="'width:' + (collapsed ? 120 : 300) + 'px'">
        <v-toolbar elevation="0">
          <v-toolbar-title style="min-width: 60px">Room</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="settingsDialog" width="400">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" :size="thin ? 'x-small' : 'medium'" icon>
                <v-icon :size="thin ? 'small' : 'medium'">fas fa-cog</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-toolbar>
                <v-toolbar-title>Calendar Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="settingsDialog = false">
                  <v-icon>fas fa-times</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-switch
                  v-model="collapsed"
                  :label="
                    collapsed
                      ? 'Collapsed; Show Room Descriptions'
                      : 'Expanded; Hide Room Descriptions'
                  "
                ></v-switch>
                <v-switch
                  v-model="thin"
                  :label="thin ? 'Taller Rows' : 'Shorter Rows'"
                ></v-switch>
                <v-autocomplete
                  v-model="startHour"
                  :items="startHours"
                  label="Set Start Hour"
                  hide-details
                  density="compact"
                ></v-autocomplete>
                <v-autocomplete
                  v-model="endHour"
                  :items="endHours"
                  label="Set End Hour"
                  hide-details
                  density="compact"
                ></v-autocomplete>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </v-card>
    </v-col>
    <v-col
      v-for="time in times"
      :key="time"
      class="scheduleColumn header"
      :class="thin ? 'thin' : ''"
    >
      <v-card :style="'width:' + (cellWidth - 2) + 'px'">
        <v-card-text>{{ time }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useScheduleStore } from '~/store/calendar/schedule.js';
const store = useScheduleStore();
const { startHour, endHour, collapsed, thin } = storeToRefs(store);

const props = defineProps({
  times: {
    type: Array,
    required: true,
  },
  cellWidth: {
    type: Number,
    default: 100,
  },
});
const settingsDialog = ref(false);

const startHours = computed(() => {
  const arr = [{ title: '12:00 AM', value: 0 }];
  for (let i = 1; i < 24; i++) {
    if (endHour.value <= i) break;
    const hour = i <= 12 ? i : i - 12;
    const ampm = i >= 12 && i < 24 ? 'PM' : 'AM';
    arr.push({ title: hour + ':00 ' + ampm, value: i });
  }
  return arr;
});
const endHours = computed(() => {
  const arr = [];
  for (let i = startHour.value + 1; i <= 24; i++) {
    const hour = i <= 12 ? i : i - 12;
    const ampm = i >= 12 && i < 24 ? 'PM' : 'AM';
    arr.push({ title: hour + ':00 ' + ampm, value: i });
  }
  return arr;
});
</script>
