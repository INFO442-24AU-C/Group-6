import React, { useState } from 'react';
import './ExploreEvent.css';


function ExploreEvent() {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    async function fetchEvents(category = "") {
        try {
            let url = `https://app.ticketmaster.com/discovery/v2/events.json?dmaId=385&apikey=9PrNGB9k7uy3dln6mBGBtGxL6vMXW86B`;
            if (category) {
                url += `&classificationName=${encodeURIComponent(category)}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            const fetchedEvents = data._embedded?.events || [];
            setEvents(fetchedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    return (
        <div>
            <div className="filter-container">
                <button onclick="handleCategoryChange('')">All</button>
                <button onclick="handleCategoryChange('music')">Music</button>
                <button onclick="handleCategoryChange('sports')">Sports</button>
                <button onclick="handleCategoryChange('arts & theatre')">Theater</button>
            </div>
            <div className="events-container">
                {events.length > 0 ? events.map(event => (
                    <div key={event.id} className="event-card">
                        <img src={event.images[0]?.url || ''} alt={event.name} />
                        <h3>{event.name}</h3>
                        <p>{new Date(event.dates.start.localDate).toLocaleDateString()}</p>
                        <a href={event.url} target="_blank" rel="noopener noreferrer">Get Tickets</a>
                    </div>
                )) : <p>No events found for this category.</p>}
            </div>
        </div>
    );
}

export default ExploreEvent;
