import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Event.css'; 

const Events = () => {
    const [events, setEvents] = useState({ Music: {featured: null, list: []}, Art: {featured: null, list: []}, Party: {featured: null, list: []}, Sports: {featured: null, list: []} });
    const apiKey = 'Q6ByjvXjuntp7jwlg4Amx6L3vbdykPrd';
    const categories = ['Music', 'Art', 'Party', 'Sports'];

    useEffect(() => {
        categories.forEach(category => {
            axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=${encodeURIComponent(category)}&city=Seattle&stateCode=WA&countryCode=US&size=5`)
                .then(response => {
                    setEvents(prevEvents => ({
                        ...prevEvents,
                        [category]: {
                            featured: response.data._embedded.events[0],
                            list: response.data._embedded.events.slice(1)
                        }
                    }));
                })
                .catch(error => console.error(`Error fetching ${category} events:`, error));
        });
    }, []);

    const handleCategoryClick = (category) => {
        console.log(`More events for ${category}:`, events[category].list);
    };

    return (
        <div className="events-grid">
            {categories.map(category => (
                <div key={category} className="event-category" onClick={() => handleCategoryClick(category)}>
                    <h2>{category}</h2>
                    {events[category].featured ? (
                        <div className="event-preview">
                            <img src={events[category].featured.images[0].url} alt={category} />
                            <p>{events[category].featured.name}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    {events[category].list.map(event => (
                        <div key={event.id} className="event-preview">
                            <img src={event.images[0].url} alt={event.name} />
                            <p>{event.name}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Events;




