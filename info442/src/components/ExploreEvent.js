import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, database } from '../index';
import { doc, setDoc } from "firebase/firestore";
import "./ExploreEvent.css";

function ExploreEvent() {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

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

    function handleRSVP(eventId, eventName) {
        if (!auth.currentUser) {
            alert("Please log in to RSVP");
            return;
        }
        const rsvpRef = doc(database, "RSVP", `${auth.currentUser.uid}_${eventName}`);
        setDoc(rsvpRef, {
            userId: auth.currentUser.uid,
            eventId: eventId,
            eventName: eventName,
        }, { merge: true })
        .then(() => {
            alert("RSVP successful!");
            navigate('/Myevent'); 
        })
        .catch((error) => {
            console.error("Error writing document:", error);
        });
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="home">
            <div className="filter-container d-flex justify-content-center gap-2 mb-3">
                <button className={`btn ${selectedCategory === '' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => handleCategoryChange('')}>All</button>
                <button className={`btn ${selectedCategory === 'music' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => handleCategoryChange('music')}>Music</button>
                <button className={`btn ${selectedCategory === 'sports' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => handleCategoryChange('sports')}>Sports</button>
                <button className={`btn ${selectedCategory === 'arts & theatre' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => handleCategoryChange('arts & theatre')}>Theater</button>
            </div>
            <div className="container py-4">
                <div className="row row-cols-2 row-cols-md-4 g-4">
                    {events.length > 0 ? events.map(event => (
                        <div key={event.id} className="card g-4">
                            <img src={event.images[0]?.url || ''} alt={event.name} className="card-img-top"/>
                            <div className="card-body">
                                <h3 className="card-title">{event.name}</h3>
                                <p className="card-text mb-3">{new Date(event.dates.start.localDate).toLocaleDateString()}</p>
                                <div className="button-container mt-auto">
                                    <a href={event.url} target="_blank" rel="noopener noreferrer" className="btn btn-success">Get Tickets</a>
                                    <button onClick={() => handleRSVP(event.id, event.name)} className="btn btn-primary">RSVP</button>
                                </div>
                            </div>
                        </div>
                    )) : <p>No events found for this category.</p>}
                </div>
            </div>
        </div>
    );
}

export default ExploreEvent;
