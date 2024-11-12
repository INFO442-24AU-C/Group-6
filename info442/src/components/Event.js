import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Event.css'; 

const Events = () => {
    const [events, setEvents] = useState({ Music: null, Art: null, Party: null, Sports: null });
    const apiKey = 'YOUR_TICKETMASTER_API_KEY';
    const categories = ['Music', 'Art', 'Party', 'Sports'];

    useEffect(() => {
        categories.forEach(category => {
            axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=${category}&size=1`)
                .then(response => {
                    const newEvents = { ...events };
                    newEvents[category] = response.data._embedded.events[0];
                    setEvents(newEvents);
                })
                .catch(error => console.error(`Error fetching ${category} events:`, error));
        });
    }, []);

    return (
        <div className="events-grid">
            {categories.map(category => (
                <div key={category} className="event-category">
                    <h2>{category}</h2>
                    {events[category] ? (
                        <div className="event-preview">
                            <img src={events[category].images[0].url} alt={category} />
                            <p>{events[category].name}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Events;

