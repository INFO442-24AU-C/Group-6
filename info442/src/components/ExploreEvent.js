import React, { useState, useEffect } from 'react';

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
            <div className="d-flex justify-content-center gap-2 mb-3">
                <button className={`btn ${selectedCategory === '' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => handleCategoryChange('')}>All</button>
                <button className={`btn ${selectedCategory === 'music' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => handleCategoryChange('music')}>Music</button>
                <button className={`btn ${selectedCategory === 'sports' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => handleCategoryChange('sports')}>Sports</button>
                <button className={`btn ${selectedCategory === 'arts & theatre' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => handleCategoryChange('arts & theatre')}>Theater</button>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3 mx-3">
                {events.length > 0 ? events.map(event => (
                    <div key={event.id} className="card">
                        <img src={event.images[0]?.url || ''} alt={event.name}/>
                        <div className="card-body p-2">
                            <h3>{event.name}</h3>
                        </div>
                        <p className="card-text mb-3">{new Date(event.dates.start.localDate).toLocaleDateString()}</p>
                        <a href={event.url} target="_blank" rel="noopener noreferrer" className="btn btn-success">Get Tickets</a>
                    </div>
                )) : <p>No events found for this category.</p>}
            </div>
        </div>
    );
}

export default ExploreEvent;
