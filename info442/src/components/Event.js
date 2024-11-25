import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Event.css'; 

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
        <div className="container py-4">
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {categories.map(category => (
                    <div key={category} className="col">
                        <div    
                            className="card border-1 shadow-sm text-center h-100"
                            onClick={() => handleCategoryClick(category)}
                        >
                            <div className="card-body">
                                <h2 className="card-title">{category}</h2>
                                {events[category].featured ? (
                                    <div>
                                        <img src={events[category].featured.images[0].url} alt={category} className="card-img-top rounded img-custom" />
                                        <p className="card-text mt-2">{events[category].featured.name}</p>
                                    </div>
                                ) : (
                                    <p className="card-text">Loading...</p>
                                )}
                            </div>
                            <div className="card-footer">
                                {events[category].list.map(event => (
                                    <div key={event.id} className="my-2">
                                        <img src={event.images[0].url} alt={event.name} className="img-fluid rounded"/>
                                        <p className="mt-2">{event.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;




