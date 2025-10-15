 //import { getCommemorativeDate, formatDate } from "./common.mjs";
//import commemorative from "./days.json" assert { type: "json" };

//waiting until the DOM is loaded full loaded before running any script
 document.addEventListener("DOMContentLoaded", () => {
    //grabbing references to the HTML elements
  const calendarContainer = document.getElementById("calendar");
  const monthYearLabel = document.getElementById("monthYear");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  //get current date to initialize calender
  let now = new Date();
  let currentMonth = now.getMonth();
  let currentYear = now.getFullYear();

  // Populate month/year selects
  monthNames.forEach((m,i)=>{
    const opt = document.createElement("option");
    opt.value = i; //month index(0-11) javascript index start from zero
    opt.textContent = m; //select current month
    if(i === currentMonth) opt.selected = true;
    monthSelect.appendChild(opt);
  });
  //populate year dropdown(1900-2100)
  for(let y=1900; y<=2100; y++){
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    if(y === currentYear) opt.selected = true; //select current year
    yearSelect.appendChild(opt);
  }

  //  // Function to check if a given date matches a commemorative day from JSON
  function isCommemorativeDay(date){
    if(date.getMonth() === 9 && date.getDate() === 8){
      return { name: "Ada Lovelace Day" };
    }
    return null;
  }
// Helper function to determine how many blank cells to insert at the start of the month
  // Since our week starts on Monday, we adjust Sunday (0) to come at the end
  function leadingEmptyCount(month, year){
    const firstDay = new Date(year, month, 1).getDay();
    return (firstDay + 6) % 7; // Monday=0
  }

  function renderCalendar(month, year){
    calendarContainer.innerHTML = "";
    monthYearLabel.textContent = `${monthNames[month]} ${year}`;

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(d=>{
      const th = document.createElement("th");
      th.setAttribute("width","40");
      th.setAttribute("height","30");
      th.textContent = d;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const daysInMonth = new Date(year, month+1, 0).getDate();
    let firstDay = leadingEmptyCount(month, year);
    let day = 1;

    while(day <= daysInMonth){
      const tr = document.createElement("tr");
      for(let col=0; col<7; col++){
        const td = document.createElement("td");
        td.setAttribute("width","40");
        td.setAttribute("height","40");
        td.style.textAlign = "center";
        td.style.verticalAlign = "middle";

        if(day === 1 && col < firstDay){
          // empty cell
        } else if(day > daysInMonth){
          // empty cell
        } else {
          const date = new Date(year, month, day);
          td.textContent = day;

          const comm = isCommemorativeDay(date);
          if(comm){
            td.textContent += " - " + comm.name;
            td.title = comm.name;
          }

          day++;
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    calendarContainer.appendChild(table);

    monthSelect.value = month;
    yearSelect.value = year;
  }

  // Event listeners
  monthSelect.addEventListener("change", ()=>{
    currentMonth = parseInt(monthSelect.value,10);
    renderCalendar(currentMonth, currentYear);
  });
  yearSelect.addEventListener("change", ()=>{
    currentYear = parseInt(yearSelect.value,10);
    renderCalendar(currentMonth, currentYear);
  });
  prevBtn.addEventListener("click", ()=>{
    currentMonth--; if(currentMonth < 0){ currentMonth = 11; currentYear--; }
    renderCalendar(currentMonth, currentYear);
  });
  nextBtn.addEventListener("click", ()=>{
    currentMonth++; if(currentMonth > 11){ currentMonth = 0; currentYear++; }
    renderCalendar(currentMonth, currentYear);
  });

  // Initial render
  renderCalendar(currentMonth, currentYear);
});
