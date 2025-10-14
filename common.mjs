export function getGreeting() {
    return "Hello";
}
// Maps months to their numeric equivalents
const monthMap = {
  January: 0, February: 1, March: 2, April: 3,
  May: 4, June: 5, July: 6, August: 7,
  September: 8, October: 9, November: 10, December: 11
};
// weekdays mapped to their numeric equivalents
const weekdayMap = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6
};
// textual occurrence to numeric mapping
const occurrenceMap = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4
};

// Get nth weekday of a month
export function getNthWeekday(year, monthIndex, weekdayIndex, n) {
  let count = 0;
  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, monthIndex, day);
    if (date.getMonth() !== monthIndex) break;
    if (date.getDay() === weekdayIndex) {
      count++;
      if (count === n) return date;
    }
  }
  return null;
}

// Get last weekday of a month
export function getLastWeekday(year, monthIndex, weekdayIndex) {
  for (let day = 31; day >= 1; day--) {
    const date = new Date(year, monthIndex, day);
    if (date.getMonth() !== monthIndex) continue;
    if (date.getDay() === weekdayIndex) return date;
  }
  return null;
}

// Main function to compute commemorative date
export function getCommemorativeDate(entry, year) {
  const monthIndex = monthMap[entry.monthName];
  const weekdayIndex = weekdayMap[entry.dayName];
  const occurrence = entry.occurence;

  if (occurrence === "last") {
    return getLastWeekday(year, monthIndex, weekdayIndex);
  }

  const nth = occurrenceMap[occurrence];
  return getNthWeekday(year, monthIndex, weekdayIndex, nth);
}

// Format date as YYYY-MM-DD
export function formatDate(date) {
  return date.toISOString().split("T")[0];
}
