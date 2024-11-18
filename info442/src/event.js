const apiKey = '9PrNGB9k7uy3dln6mBGBtGxL6vMXW86B';  
const eventsContainer = document.getElementById('events-container');
const categorySelect = document.getElementById('category-select');


// calling the Ticketmaster API
async function fetchEvents(category = "") {
    try {
        let url = `https://app.ticketmaster.com/discovery/v2/events.json?dmaId=385&apikey=9PrNGB9k7uy3dln6mBGBtGxL6vMXW86B`;
        if (category) {
            url += `&classificationName=${encodeURIComponent(category)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        const events = data._embedded?.events;
        
        if (events) {
            displayEvents(events);
        } else {
            eventsContainer.innerHTML = '<p>No events found for this category.</p>';
        }
    } catch (error) {
        console.error('Error fetching events:', error);
        eventsContainer.innerHTML = '<p>Failed to fetch events<p>'
    }
}

// format the date
function formatDate(givenDate) {
    const date = new Date(givenDate);
    const format = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, format);
}

// showing the cards
function displayEvents(events) {
    eventsContainer.innerHTML = '';  
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        const imageUrl = event.images[0]?.url || '';
        const eventName = event.name;
        const eventDate = formatDate(event.dates.start.localDate);
        const eventLink = event.url;
        const accessibility = event.accessibleSeatingDetail;
        const time = event.time
        //const eventLocation = event.location;

        eventCard.innerHTML = `
            <img src="${imageUrl}" alt="${eventName}">
            <h3>${eventName}</h3>
            <p>${eventDate}</p>
            <p>${time}</p>
            <p>${accessibility}</p>
            <a href="${eventLink}" target="_blank">Get Tickets</a>
        `;

        eventsContainer.appendChild(eventCard);
    });
}

function filterEvents() {
    const selectedCategory = document.getElementById('category-select').value;;
    fetchEvents(selectedCategory);
}


fetchEvents();

document.getElementById('filterButton').addEventListener('click', filterEvents);