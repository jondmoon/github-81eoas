<template>
  <v-row
    :style="'width:' + maxWidth + 'px'"
    style="padding: 0; margin: 0; position: sticky"
  >
    <v-col
      class="scheduleColumn leftSticky"
      :class="thin ? 'thin' : ''"
      style="padding: 0; margin: 0"
    >
      <v-card :style="'width:' + (collapsed ? 120 : 300) + 'px'">
        <v-card-text>{{ collapsed ? shortText : longText }}</v-card-text>
      </v-card>
    </v-col>
    <v-col v-for="time in times" :key="time" class="scheduleColumn">
      <div :style="'width:' + (cellWidth - 2) + 'px'"></div>
    </v-col>
    <CalendarScheduleEvent
      v-for="(event, index) in events"
      :key="'event-' + index"
      :event="event"
      :start-hour="startHour"
      :end-hour="endHour"
      :cell-width="cellWidth"
      :half="half"
      :thin="thin"
      @click="$emit('click', event._id)"
    ></CalendarScheduleEvent>
  </v-row>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useScheduleStore } from '~/store/calendar/schedule.js';
const store = useScheduleStore();
const { startHour, endHour, collapsed, thin } = storeToRefs(store);

const props = defineProps({
  shortText: {
    type: String,
    default: '**NP**',
  },
  longText: {
    type: String,
    default: '**Not Provided**',
  },
  times: {
    type: Array,
    required: true,
  },
  events: {
    type: Array,
    required: true,
  },
  cellWidth: {
    type: Number,
    default: 100,
  },
  half: {
    type: Boolean,
    default: false,
  },
});
const maxEnd = computed(() => props.cellWidth * props.times.length);
const maxWidth = computed(() => (collapsed.value ? 122 : 302) + maxEnd.value);
</script>
