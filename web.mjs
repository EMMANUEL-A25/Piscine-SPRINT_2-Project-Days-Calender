// Import helper functions and commemorative days data
import { monthMap, getCommemorativeDate, formatDate } from "./common.mjs";
import commemorative from "./days.json" with { type: "json" };

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  const monthNames = Object.keys(monthMap);
  // monthMap keeps chronological order because its literal is declared that way
  // Grab references to key HTML elements
  const calendarContainer = document.getElementById("calendar");
  const monthYearLabel = document.getElementById("monthYear");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const todayBtn = document.getElementById("today");
  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");

 

  // Current date for initialization
  let now = new Date();
  let currentMonth = now.getMonth();
  let currentYear = now.getFullYear();

  // Populate month dropdown
  monthNames.forEach((m, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = m;
    if (i === currentMonth) opt.selected = true;
    monthSelect.appendChild(opt);
  });

  // Populate year dropdown (1900–2100)
  for (let y = 1900; y <= 2100; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    if (y === currentYear) opt.selected = true;
    yearSelect.appendChild(opt);
  }

  // Returns an array of all commemorative entries for a given date
  function getCommemorativeDays(date, year) {
    const matched = [];
    for (const entry of commemorative) {
      const commDate = getCommemorativeDate(entry, year);
      if (commDate && formatDate(commDate) === formatDate(date)) {
        matched.push(entry);
      }
    }
    return matched; // empty array if none match
  }

  // Determine how many blank cells at the start of the month
  function leadingEmptyCount(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    return (firstDay + 6) % 7; // Monday = 0
  }

  // Render calendar for given month/year
  function renderCalendar(month, year) {
    calendarContainer.innerHTML = ""; // Clear previous calendar

    // Update month/year label
    monthYearLabel.textContent = `${monthNames[month]} ${year}`;

    // Create table and header
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse"; // prevent double borders

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(d => {
      const th = document.createElement("th");
      th.textContent = d;
      th.style.border = "1px solid #333";
      th.style.width = "50px";
      th.style.height = "30px";
      th.style.textAlign = "center";
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    // Table body: days
    const tbody = document.createElement("tbody");
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = leadingEmptyCount(month, year);
    let day = 1;

    while (day <= daysInMonth) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 7; col++) {
        const td = document.createElement("td");

        // Rectangle box styling
        td.style.border = "1px solid #333";
        td.style.width = "50px";
        td.style.height = "50px";
        td.style.padding = "4px";
        td.style.textAlign = "center";
        td.style.verticalAlign = "top";
        td.style.boxSizing = "border-box";

        if (day === 1 && col < firstDay) {
          td.textContent = ""; // empty before first day
        } else if (day > daysInMonth) {
          td.textContent = ""; // empty after last day
        } else {
          const date = new Date(year, month, day);
          date.setHours(0, 0, 0, 0);

          const isToday = date.getTime() === today.getTime();
          if (isToday) {
            td.style.outline = "2px solid #1976d2";
            td.style.backgroundColor = "#e3f2fd";
          }

          const events = getCommemorativeDays(date, year);

          if (events.length > 0) {
            if (isToday) {
              td.style.boxShadow = "inset 0 0 0 2px #ffb300"; 
            } else {
              td.style.backgroundColor = "#ffecb3";
            }
            td.style.cursor = "pointer";
            td.title = events.map(e => e.name).join(", ");
            td.addEventListener("click", () => window.open(events[0].descriptionURL, "_blank"));

            td.innerHTML = `<div>${day}</div>` +
                           events.map(e => `<div>${e.name}</div>`).join("");
          } else {
            td.textContent = day;
          }

          day++;
        }

        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    calendarContainer.appendChild(table);

    // Update dropdowns
    monthSelect.value = month;
    yearSelect.value = year;
  }

  // Event listeners
  monthSelect.addEventListener("change", () => {
    currentMonth = parseInt(monthSelect.value, 10);
    renderCalendar(currentMonth, currentYear);
  });

  yearSelect.addEventListener("change", () => {
    currentYear = parseInt(yearSelect.value, 10);
    renderCalendar(currentMonth, currentYear);
  });

  prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  todayBtn.addEventListener("click", () => {
    const now = new Date();
    currentMonth = now.getMonth();
    currentYear = now.getFullYear();
    renderCalendar(currentMonth, currentYear);
  });

  // Initial render
  renderCalendar(currentMonth, currentYear);
});
