// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

//import { getGreeting } from "./common.mjs";
//import daysData from "./days.json" with { type: "json" };

//console.log(`{getGreeting()} - there are ${daysData.length} known days`);
import fs from "fs";
import { getCommemorativeDate,formatDate } from './common.mjs';


//loading days.json manually to avoid EM issues
const days = JSON.parse(fs.readFileSync('./days.json', 'utf8'));
console.log("Loaded days:", days.length);// debugging log
function generateICal(){
    let ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CYF//Days Calendar//EN
`;
    for (let year = 2020; year <= 2030; year++) {
    for (const entry of days) {
      const date = getCommemorativeDate(entry, year);
      console.log(entry.name, year, date?.toISOString() ?? "no date"); // debug
      if (!date) continue; // Skip if no valid date

      const formattedDate = formatDate(date).replace(/-/g, ''); // YYYYMMDD
      const uid = `${entry.name.replace(/\s+/g, '')}-${year}@cyf-calendar`;
      const summary = entry.name;
      const description = entry.description || '';

      ical += `BEGIN:VEVENT
UID:${uid}
DTSTART;VALUE=DATE:${formattedDate}
SUMMARY:${summary}
DESCRIPTION:${description}
END:VEVENT
`;
    }
  }

  ical += 'END:VCALENDAR\n';
  return ical;
}
const icalContent = generateICal();
fs.writeFileSync('days.ics', icalContent, 'utf8');
console.log('days.ics generated successfully.');