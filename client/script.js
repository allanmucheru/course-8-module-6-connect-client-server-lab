
// Get the event list and form elements
const eventList = document.getElementById("event-list");
const form = document.querySelector("form");
const titleInput = document.getElementById("title");

// Function to display events
function renderEvents(events) {
    eventList.innerHTML = "";

    events.forEach(event => {
        const li = document.createElement("li");
        li.textContent = event.title;
        eventList.appendChild(li);
    });
}

// GET: Retrieve all events from Flask
function fetchEvents() {
    fetch("http://127.0.0.1:5000/events")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }
            return response.json();
        })
        .then(events => {
            renderEvents(events);
        })
        .catch(error => {
            console.error("Error fetching events:", error);
        });
}

// POST: Add a new event
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();

    if (!title) {
        alert("Please enter an event title.");
        return;
    }

    fetch("http://127.0.0.1:5000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to create event");
        }
        return response.json();
    })
    .then(newEvent => {
        const li = document.createElement("li");
        li.textContent = newEvent.title;
        eventList.appendChild(li);

        titleInput.value = "";
    })
    .catch(error => {
        console.error("Error creating event:", error);
    });
});

// Load events when the page opens
fetchEvents();
