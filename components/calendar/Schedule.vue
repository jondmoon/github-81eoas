<template>
  <div
    id="schedule-container"
    ref="scheduleContainerRef"
    :class="(collapsed ? 'collapsed ' : 'expanded ') + (thin ? 'thin' : '')"
  >
    <div id="currentTime" :style="style"></div>
    <CalendarScheduleHeader :times="times" :cell-width="cellWidth">
    </CalendarScheduleHeader>
    <CalendarScheduleRow
      v-for="row in filteredRows"
      :key="'row-' + row.shortText"
      :short-text="row.shortText"
      :long-text="row.longText"
      :cell-width="cellWidth"
      :times="times"
      :events="row.events"
      :start-hour="startHour"
      :end-hour="endHour"
      @click="(id) => $emit('click', id)"
    >
    </CalendarScheduleRow>
  </div>
</template>
<style>
div#schedule-container {
  overflow-x: scroll;
  overflow-y: auto;
  position: fixed;
  max-height: calc(100% - 80px);
  max-width: calc(100% - 30px);
  margin-bottom: 10px;
  margin-right: 10px;
}
nav.v-navigation-drawer--open
  + header.v-toolbar
  + main.v-main
  div#schedule-container {
  max-width: calc(100% - 280px);
}
div#schedule-container::-webkit-scrollbar {
  width: 5px;
  height: 11px;
}
div#schedule-container::-webkit-scrollbar-button {
  width: 5px;
  height: 0px;
}
div#schedule-container::-webkit-scrollbar-corner {
  background: transparent;
}
div#schedule-container::-webkit-scrollbar-thumb {
  background: linear-gradient(to top right, #193264, #003366);
  border: 0px solid transparent;
  border-radius: 50px;
}
div#schedule-container::-webkit-scrollbar-track {
  background: #091221;
  border: 0px none;
  border-radius: 53px;
}
div#currentTime {
  z-index: 10;
  height: 100%;
  position: absolute;
  width: 10px;
  border: 2px solid rgba(255, 165, 0, 0.5);
  border-width: 0 2px 0 0;
}
div.col.scheduleColumn {
  padding: 0;
  border-width: 1px;
  border-color: #666;
  border-style: solid;
}
div.col.scheduleColumn div.v-card div.v-card__text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
div#schedule-container.thin div.scheduleColumn div.v-card div.v-card__text {
  padding-top: 1px;
  padding-bottom: 1px;
}
div#schedule-container.thin div.v-alert {
  padding: 3px 6px;
}
.topLeftSticky {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 3;
}
.topSticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}
.leftSticky {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
}
.classEvent {
  cursor: pointer;
}
.collapsed .schedule-event {
  transform: translateX(122px);
}
.expanded .schedule-event {
  transform: translateX(302px);
}
div#schedule-container.thin header.v-toolbar,
div#schedule-container.thin header.v-toolbar div.v-toolbar__content,
div#schedule-container.thin
  header.v-toolbar
  div.v-toolbar__content
  div.v-toolbar__title {
  height: 24px !important;
  line-height: 24px;
  font-size: 1em;
}
</style>
<script>
import { storeToRefs } from 'pinia';
import { useScheduleStore } from '~/store/calendar/schedule.js';
const store = useScheduleStore();
const { startHour, endHour, collapsed, thin } = storeToRefs(store);

const props = defineProps({
  half: {
    type: Boolean,
    default: false,
  },
  cellWidth: {
    type: Number,
    default: 100,
  },
  rows: {
    type: Array,
    default: () => {
      return [];
    },
  },
  rowHeight: {
    type: Number,
    default: 56,
  },
});
const style = computed(() => {
  return [
    'left:' + currentTimePosition.value + 'px',
    'height:' + ((rows.length + 1) * (thin ? 26 : 56) + 5) + 'px',
  ].join(';');
});
const times = computed(() => {
  const arr = [];
  for (let i = startHour.value; i < endHour.value; i += 1) {
    let hour = i <= 12 ? i : i - 12;
    let ampm = i < 12 ? 'am' : 'pm';
    arr.push(hour + ':00' + ampm);
    if (props.half) arr.push(hour + ':30' + ampm);
  }
  let hour = endHour.value <= 12 ? endHour.value : endHour.value - 12;
  let ampm = endHour.value < 12 || endHour.value === 24 ? 'am' : 'pm';
  arr.push(hour + ':00' + ampm);
  return arr;
});

const currentTimePosition = ref(collapsed.value ? 120 : 300);
function setTimePosition() {
  const margin = collapsed.value ? 120 : 300;
  const dt = new Date();
  let [hour, min, sec] = dt.toLocaleTimeString().split(':');
  hour = parseInt(hour);
  min = parseInt(min);
  if (sec.substring(3) === 'PM' && hour < 12) hour += 12;
  if (hour < props.startHour) currentTimePosition.value = margin;
  else if (hour < props.endHour) {
    currentTimePosition.value =
      margin +
      (hour - props.startHour + min / 60) *
        props.cellWidth *
        (props.half ? 2 : 1);
  } else {
    currentTimePosition.value = margin + props.cellWidth * props.rows.length;
  }
}

const timeInterval = ref(null);

onMounted(() => {
  timeInterval.value = setInterval(() => setTimePosition(), 60000);
  setTimePosition();
});
onBeforeUnmount(() => {
  clearInterval(timeInterval);
});

const filteredRows = computed(() => {
  // Filter props.rows to only include items that are within the given start and end times
  return props.rows;
});
</script>
