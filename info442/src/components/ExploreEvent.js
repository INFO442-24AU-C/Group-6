import React, { useState, useEffect } from 'react';
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

    function handleCategoryChange(category) {
        setSelectedCategory(category);
        fetchEvents(category);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <div className="filter-container">
                <button onClick={() => handleCategoryChange('')}>All</button>
                <button onClick={() => handleCategoryChange('music')}>Music</button>
                <button onClick={() => handleCategoryChange('sports')}>Sports</button>
                <button onClick={() => handleCategoryChange('arts & theatre')}>Theater</button>
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