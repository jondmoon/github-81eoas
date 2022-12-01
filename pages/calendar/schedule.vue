<template>
  <v-card class="ma-4">
    <v-card-title>Calendar Schedule</v-card-title>
    <CalendarSchedule
      :cell-width="80"
      :rows="rows"
      :start-hour="7"
      :end-hour="20"
      @click="openClassDetails"
    ></CalendarSchedule>
  </v-card>
</template>
<script setup>
import { yearMonDayFormat } from '~/utils/formatters.js';
const dt = new Date();
const chartStart = ref(yearMonDayFormat(dt) + ' 07:00');
const chartEnd = ref(yearMonDayFormat(dt) + ' 20:00');
const rows = ref([]);

const rooms = ref([
  {
    bldg: 'ANDREA',
    code: 'AH108',
    name: 'Classroom',
    capacity: 40,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'BARNES',
    code: 'BC312',
    name: 'Classroom',
    capacity: 40,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'BROCK',
    code: 'BH114',
    name: 'Classroom',
    capacity: 35,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'BROCK',
    code: 'BH118',
    name: 'Classroom',
    capacity: 38,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'BROCK',
    code: 'BH120',
    name: 'Classroom',
    capacity: 38,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'BROCK',
    code: 'BH122',
    name: 'Classroom',
    capacity: 38,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'BROCK',
    code: 'BH2-TERR',
    name: 'Breezeway/Terrace',
    capacity: 99999,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'BROCK',
    code: 'BH209',
    name: 'Language Lab',
    capacity: 18,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'BROCK',
    code: 'BH212',
    name: 'Classroom',
    capacity: 25,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'BROCK',
    code: 'BH214',
    name: 'Classroom',
    capacity: 27,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'BROCK',
    code: 'BH313',
    name: 'Education Classroom',
    capacity: 20,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'CARTER',
    code: 'CH111',
    name: 'Meeting Room',
    capacity: 20,
    type: 'O',
    classes: [],
  },
  {
    bldg: 'FINART',
    code: 'CL113',
    name: 'Classroom',
    capacity: 15,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'FINART',
    code: 'CL122',
    name: 'Classroom',
    capacity: 60,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'FINART',
    code: 'CL210',
    name: 'Chapel Auditorium',
    capacity: 768,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'JACKSN',
    code: 'JH114',
    name: 'Digital Photo Studio',
    capacity: 42,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'JACKSN',
    code: 'JH116',
    name: 'Art Studio with tables & chairs',
    capacity: 30,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'JACKSN',
    code: 'JH117',
    name: 'Classroom',
    capacity: 20,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'KIRK',
    code: 'KI113',
    name: 'Charles W. Anderson Auditorium',
    capacity: 200,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'LUCAS',
    code: 'LA103',
    name: '3D studio',
    capacity: 25,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'LUCAS',
    code: 'LA109',
    name: '2D studio',
    capacity: 25,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH130',
    name: 'Classroom',
    capacity: 24,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH150',
    name: 'Computer Lab',
    capacity: 36,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH160',
    name: 'Classroom',
    capacity: 48,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH180',
    name: 'Classroom',
    capacity: 70,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH220',
    name: 'Biology Lab B',
    capacity: 32,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH232',
    name: 'Biology Lab C',
    capacity: 12,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH250',
    name: 'Biology Lab A',
    capacity: 40,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH270',
    name: 'Classroom',
    capacity: 42,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH280',
    name: 'Classroom',
    capacity: 55,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH310',
    name: 'Physics Lab',
    capacity: 32,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH320',
    name: 'Organic Chemistry Lab',
    capacity: 24,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH330',
    name: 'Physical Chemistry Lab',
    capacity: 8,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH350',
    name: 'General Chemistry Lab',
    capacity: 32,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH360',
    name: 'Physics Commons',
    capacity: 8,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'MILLS',
    code: 'MH380',
    name: 'Classroom',
    capacity: 35,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'SANDER',
    code: 'SN101',
    name: 'Classroom',
    capacity: 36,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'SANDER',
    code: 'SN102',
    name: 'Classroom',
    capacity: 55,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'SANDER',
    code: 'SN114',
    name: 'Classroom',
    capacity: 45,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'SANDER',
    code: 'SN119B',
    name: 'Classroom',
    capacity: 10,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'SANDER',
    code: 'SN201',
    name: 'Classroom with tables & chairs',
    capacity: 32,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'SANDER',
    code: 'SN202',
    name: 'Classroom',
    capacity: 55,
    type: 'C',
    classes: [],
  },
  {
    bldg: 'SANDER',
    code: 'SN215',
    name: 'Classroom/Auditorium',
    capacity: 190,
    type: 'C',
    classes: [],
  },
]);

onMounted(() => {
  for (const { code, name } of rooms.value) {
    rows.value.push({
      shortText: code,
      longText: code + ' ' + name,
      events: [],
    });
  }
  loadClasses(chartStart.value, chartEnd.value);
});

// const service = root.$feathers.service('calendar/classes')
async function loadClasses(start, end) {
  // const aggregate = [
  //   { $unwind: '$meetings' },
  //   {
  //     $addFields: {
  //       start: {
  //         $dateToString: {
  //           date: '$meetings.start',
  //           format: '%Y-%m-%d %H:%M',
  //           timezone: 'America/New_York'
  //         }
  //       },
  //       startTime: {
  //         $dateToString: {
  //           date: '$meetings.start',
  //           format: '%H:%M',
  //           timezone: 'America/New_York'
  //         }
  //       },
  //       end: {
  //         $dateToString: {
  //           date: '$meetings.end',
  //           format: '%Y-%m-%d %H:%M',
  //           timezone: 'America/New_York'
  //         }
  //       },
  //       endTime: {
  //         $dateToString: {
  //           date: '$meetings.end',
  //           format: '%H:%M',
  //           timezone: 'America/New_York'
  //         }
  //       }
  //     }
  //   },
  //   {
  //     $match: {
  //       'meetings.room': { $ne: null },
  //       $or: [
  //         { start: { $gte: start, $lte: end } },
  //         { end: { $gte: start, $lte: end } }
  //       ]
  //     }
  //   },
  //   {
  //     $project: {
  //       room: '$meetings.room',
  //       title: '$title',
  //       start: '$startTime',
  //       end: '$endTime'
  //     }
  //   },
  //   {
  //     $sort: {
  //       room: 1,
  //       startTime: 1
  //     }
  //   }
  // ]
  // const { data } = await service.find({ query: { aggregate } })
  // let i = 0
  // for (const event of data) {
  //   const { room } = event
  //   while (room !== rows.value[i].shortText) {
  //     i++
  //     if (i >= rows.value.length) {
  //       alert('Hit the end of the rows array without finding the room: ' + room)
  //       return
  //     }
  //   }
  //   rows.value[i].events.push({ ...event, title: event.title.replace(' - ', '<br/>') })
  // }
}

const showDetails = ref(false);
const detail = reactive({});

function openClassDetails(e, id) {
  console.log(e, id);
  if (id) alert(id);
  // service.get(id).then((data) => {
  //   for (let l in data) {
  //     if (l === 'instructors') {
  //       detail.instructor = (data.instructors.length > 0 ? data.instructors[0].name : '**Unknown**')
  //     } else {
  //       detail[l] = data[l]
  //     }
  //   }
  //   showDetails.value = true
  // })
}
</script>
