<template>
  <v-alert
    :style="style"
    :dark="!darkMode"
    class="schedule-event"
    color="info"
    dense
    @click="$emit('click')"
  >
    <span v-html="title"></span>
  </v-alert>
</template>
<style>
.schedule-event {
  position: absolute;
  font-size: 0.8em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
  cursor: pointer;
}
</style>
<script setup>
const emit = defineEmits(['click']);
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  startHour: {
    type: Number,
    required: true,
  },
  endHour: {
    type: Number,
    required: true,
  },
  half: {
    type: Boolean,
    default: false,
  },
  cellWidth: {
    type: Number,
    required: true,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  thin: {
    type: Boolean,
    default: false,
  },
});
const darkMode = computed(() => {
  return true;
});
const title = computed(() => {
  if (props.thin)
    return props.event.title.substring(0, props.event.title.indexOf('<br/>'));
  return props.event.title;
});
const minuteWidth = computed(() => {
  return props.cellWidth / (props.half ? 30 : 60);
});
const startMinute = computed(() => props.startHour * 60);
const start = computed(() => {
  let [hour, min] = props.event.start.split(':');
  hour = parseInt(hour);
  min = parseInt(min);
  return hour * 60 + min;
});
const end = computed(() => {
  let [hour, min] = props.event.end.split(':');
  hour = parseInt(hour);
  min = parseInt(min);
  if (hour > props.endHour) {
    hour = props.endHour + 1;
    min = 0;
  }
  const val = hour * 60 + min;
  return val > props.maxEnd ? props.maxEnd : val;
});
const offset = computed(() => {
  let startOffset = start.value - startMinute.value;
  if (startOffset < 0) startOffset = 0;
  return startOffset * minuteWidth.value;
});
const width = computed(() => {
  return (end.value - start.value) * minuteWidth.value;
});
const style = computed(() => {
  return 'left:' + offset.value + 'px;width:' + width.value + 'px;';
});
</script>
