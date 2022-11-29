export function stringFormatDate(date, ignoreMidnight, ignoreTime) {
  if (date === '' || date == null) return '';
  const dt = new Date(date);
  const dateStr = dt.toDateString();
  if (ignoreTime)
    return (
      dateStr.slice(0, 3) + ',' + dateStr.slice(3, 10) + ',' + dateStr.slice(10)
    );
  const time = dt.toLocaleTimeString();
  let temp = time.split(':');
  temp.splice(2, 1);
  let timeStr = temp.join(':');
  if (ignoreMidnight && time === '12:00:00 AM')
    return (
      dateStr.slice(0, 3) + ',' + dateStr.slice(3, 10) + ',' + dateStr.slice(10)
    );
  return (
    dateStr.slice(0, 3) +
    ',' +
    dateStr.slice(3, 10) +
    ',' +
    dateStr.slice(10) +
    ' at ' +
    timeStr +
    time.slice(-3)
  );
}
export function stringFormatDateToday(date, ignoreMidnight, ignoreTime) {
  if (date === '' || date == null) return '';
  const dt = new Date(date);
  const today = new Date();
  const tempStr = dt.toDateString();
  let dateStr = '';
  if (today.toDateString() === tempStr) dateStr = 'Today';
  else {
    today.setDate(today.getDate() - 1);
    if (today.toDateString() === tempStr) dateStr = 'Yeterday';
    else
      dateStr =
        tempStr.slice(0, 3) +
        ',' +
        tempStr.slice(3, 10) +
        ',' +
        tempStr.slice(10);
  }
  if (ignoreTime) {
    return dateStr;
  }
  const time = dt.toLocaleTimeString();
  let temp = time.split(':');
  temp.splice(2, 1);
  let timeStr = temp.join(':');
  if (ignoreMidnight && time === '12:00:00 AM') return dateStr;
  return dateStr + ' at ' + timeStr + time.slice(-3);
}
export function yearMonDayFormat(date) {
  if (date === '' || date == null) return '';
  const dt = new Date(date);
  let [month, day, year] = dt.toLocaleDateString().split('/');
  if (month.length === 1) month = '0' + month;
  if (day.length === 1) day = '0' + day;
  return [year, month, day].join('-');
}
export function stringFormatTime(date) {
  if (date === '' || date == null) return '';
  const dt = new Date(date);
  let str = dt.toLocaleTimeString();
  const index = str.lastIndexOf(':');
  return str.slice(0, index) + str.slice(index + 3);
}
export function dollarFormat(num) {
  return '$' + Intl.NumberFormat('en-US').format(num);
}
export function stringFormatDateRange(date1, date2, ignoreMidnight) {
  if (date1 === '' || date1 == null) return '';
  if (date2 === '' || date2 == null) return '';
  const dt1 = new Date(date1);
  const time1 = dt1.toLocaleTimeString();
  const pieces1 = time1.split(':');
  pieces1.splice(2, 1);
  const timeStr1 = pieces1.join(':') + time1.slice(-3);
  const temp1 = dt1.toDateString();
  const dateStr1 =
    temp1.slice(0, 3) + ',' + temp1.slice(3, 10) + ',' + temp1.slice(10);
  const dt2 = new Date(date2);
  const time2 = dt2.toLocaleTimeString();
  const pieces2 = time2.split(':');
  pieces2.splice(2, 1);
  const timeStr2 = pieces2.join(':') + time2.slice(-3);
  const temp2 = dt2.toDateString();
  const dateStr2 =
    temp2.slice(0, 3) + ',' + temp2.slice(3, 10) + ',' + temp2.slice(10);

  if (dateStr1 === dateStr2) {
    return dateStr1 + ' from ' + timeStr1 + ' to ' + timeStr2;
  } else {
    if (ignoreMidnight && timeStr1 === '12:00 AM' && timeStr2 === '12:00 AM') {
      return dateStr1 + ' to ' + dateStr2;
    } else {
      return (
        dateStr1 + ' at ' + timeStr1 + ' to ' + dateStr2 + ' at ' + timeStr2
      );
    }
  }
}
