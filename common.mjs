 export const monthMap = {
  January:0, February:1, March:2, April:3, May:4, June:5,
  July:6, August:7, September:8, October:9, November:10, December:11
};
const weekdayMap = { Sunday:0, Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6 };
const occurrenceMap = { first:1, second:2, third:3, fourth:4 };

export function getNthWeekday(year, monthIndex, weekdayIndex, n) {
  let count=0;
  for(let day=1; day<=31; day++){
    const date = new Date(year, monthIndex, day);
    if(date.getMonth()!==monthIndex) break;
    if(date.getDay()===weekdayIndex){ count++; if(count===n) return date; }
  }
  return null;
}

export function getLastWeekday(year, monthIndex, weekdayIndex){
  for(let day=31; day>=1; day--){
    const date = new Date(year, monthIndex, day);
    if(date.getMonth()!==monthIndex) continue;
    if(date.getDay()===weekdayIndex) return date;
  }
  return null;
}

export function getCommemorativeDate(entry, year){
  const monthIndex = monthMap[entry.monthName];
  const weekdayIndex = weekdayMap[entry.dayName];
  const occurrence = entry.occurence; // ✅ match JSON
  if(occurrence==="last") return getLastWeekday(year, monthIndex, weekdayIndex);
  const nth = occurrenceMap[occurrence];
  return getNthWeekday(year, monthIndex, weekdayIndex, nth);
}

export function formatDate(date){
  return date.toISOString().split("T")[0];
}
