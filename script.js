function toggleMap() {
  const mapFrame = document.getElementById("map-frame");
  mapFrame.style.display = (mapFrame.style.display === "none") ? "block" : "none";
}

// --- Google Calendar API Setup ---
const calendarDiv = document.getElementById("calendar");
const API_KEY = "YOUR_API_KEY";  // from Google Cloud
const CALENDAR_ID = "YOUR_CALENDAR_ID@group.calendar.google.com";

// Fetch events
fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    const events = data.items;
    let bookedDates = [];
    events.forEach(event => {
      if (event.start && event.start.date) {
        bookedDates.push(event.start.date);
      }
    });

    // Show next 30 days
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      let day = new Date();
      day.setDate(today.getDate() + i);
      let div = document.createElement("div");
      div.classList.add("day");
      let dateStr = day.toISOString().split("T")[0];

      if (bookedDates.includes(dateStr)) {
        div.classList.add("booked");
        div.innerText = `${day.toDateString()} - Booked`;
      } else {
        div.classList.add("available");
        div.innerText = `${day.toDateString()} - Available`;
      }
      calendarDiv.appendChild(div);
    }
  })
  .catch(err => console.error("Error fetching calendar events:", err));
