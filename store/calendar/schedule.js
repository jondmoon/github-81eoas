export const useScheduleStore = defineStore('schedule', () => {
  const startHour = ref(7);
  const endHour = ref(22);
  const collapsed = ref(false);
  const thin = ref(false);

  return {
    startHour,
    endHour,
    collapsed,
    thin,
  };
});
